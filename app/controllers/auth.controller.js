const db = require("../models");
const User = db.user;
const Role = db.role;

const helpers = require("../helpers")
const emailHelper = helpers.emailHelper

var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");

exports.signup = async (req, res) => {
  console.log(req.body.email)

  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      res.status(500).send({
        message: {
          error: "Internal server error"
        }
      });
      return;
    }
    const user = new User({
      email: req.body.email,
      password: hash,
      emailVerified: false,
      firstName: req.body.firstName,
      lastName: req.body.lastName
    });
    user.save((err, user) => {
      if (err) {
        res.status(500).send({
          message: {
            error: "Internal server error"
          }
        });
        return;
      }
      req.body.roles = ["user"]
      if (req.body.roles) {
        Role.find(
          {
            name: { $in: req.body.roles }
          },
          (err, roles) => {
            if (err) {
              res.status(500).send({
                message: {
                  error: "Internal server error"
                }
              });
              return;
            }

            user.roles = roles.map(role => role._id);
            user.save(err => {
              if (err) {
                res.status(500).send({ message: err });
                return;
              }
              emailHelper.genAddUrlToDb(req.body.firstName, req.body.email)
              res.send({
                message: {
                  success: "User was registered successfully!",
                  info: " Verification Email Sent!"
                }
              });
            });
          }
        );
      } else {
        Role.findOne({ name: "user" }, (err, role) => {
          if (err) {
            res.status(500).send({
              message: {
                error: "Internal server error"
              }
            });
            return;
          }

          user.roles = [role._id];
          user.save(err => {
            if (err) {
              res.status(500).send({
                message: {
                  error: "Internal server error"
                }
              });
              return;
            }
            emailHelper.genAddUrlToDb(req.body.firstName, req.body.email)
            res.send({
              message: {
                success: "User was registered successfully!",
                info: " Verification Email Sent!"
              }
            });
          });
        });
      }
    });
  })



};

exports.signin = async (req, res) => {
  User.findOne({
    email: req.body.email
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({
          message: {
            error: "Internal server error"
          }
        });
        return;
      }

      if (!user) {
        return res.status(404).send({
          message: {
            error: "User Not found."
          }
        });
      }

      bcrypt.compare(req.body.password, user.password, function (err, result) {
        if (err) {
          res.status(500).send({
            message: {
              error: "Internal server error"
            }
          });
          return;
        }

        if (!result) {
          return res.status(401).send({
            accessToken: null,
            message: {
              error: "Invalid Password!"
            }
          });
        }

        if (!user.emailVerified) {
          return res.status(401).send({
            accessToken: null,
            message: {
              info: "Email not verified!"
            }
          });
        }

        var token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET, {
          expiresIn: 86400 // 24 hours
        });

        var authorities = [];

        for (let i = 0; i < user.roles.length; i++) {
          authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          roles: authorities,
          accessToken: token
        });
      });
    });
};