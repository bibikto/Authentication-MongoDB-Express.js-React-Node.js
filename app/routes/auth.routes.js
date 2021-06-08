const { verifySignUp , verifyInput , verifyEmail } = require("../middlewares");
const controller = require("../controllers/auth.controller");

module.exports = async(app) => {
  app.use(async(req, res, next) =>{
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkEmail,
      verifyInput.verifyMissingEmptyParams,
      verifyInput.verifySignUpParams,
      verifyInput.validateEmail,
      verifyInput.validatePassword
    ],
    controller.signup
  );

  app.post("/api/auth/signin",[verifyInput.verifyMissingEmptyParams,verifyInput.validateEmail], controller.signin);

  app.get("/api/verify/email/:emailVerifyString",verifyEmail.verifyAccountEmail)
};