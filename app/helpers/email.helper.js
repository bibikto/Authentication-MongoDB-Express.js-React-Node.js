
const Str = require('@supercharge/strings')
var nodemailer = require('nodemailer');
const UserEmail = require("../models/user.email.model");

var path = require('path');
require('dotenv').config();


var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'no.reply.xdxd.tech@gmail.com',
        pass: process.env.EMAIL_PASSWORD
    }
});




genAddUrlToDb = async (firstName,reqEmail) => {
    urlString = Str.random(128);
    console.log(urlString)
    const user = new UserEmail({
        email: reqEmail,
        emailVerifyString: urlString
    });

    await user.save()
    await sendEmail(firstName,urlString,reqEmail)
}


sendEmail = async (firstName ,urlString,email) => {
    targetUrl = "https://www.xdxd.tech/api/verify/email/" + urlString
    htmlTemplate = "<!DOCTYPE html> <html lang='en'> <head> <meta charset='UTF-8'> <meta http-equiv='X-UA-Compatible' content='IE=edge'> <meta name='viewport' content='width=device-width, initial-scale=1.0'> <title>Document</title> <style> @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600;700&display=swap'); * { font-family: 'Nunito', sans-serif; box-sizing: border-box; } .body { height: 100%; width: 100% !important; display: flex; justify-content: center; align-items: center; background-color: #f2f2f2; } .mainCon { border-radius: 8px; padding: 5px 20px 20px 20px; background-color: white; } a { text-decoration: none; } .button { margin: 10px auto; color: white; background-color: #5A5A5A; padding: 5px 10px; font-size: 20px; display: block; outline: none; border-radius: 8px; border: none; } </style> </head> <body> <div class='body'> <div class='mainCon'> <h1>You’re almost there!</h1> <subtitle>Hi " + firstName + ",</subtitle><br> <subtitle>Please verify your email address by clicking the button below.</subtitle> <a href='" + targetUrl + "' target='_blank'> <button class='button' type='submit'>Verify Email</button> </a> <subtitle>If you didn’t make this request, ignore this email.</subtitle> </div> </div> </body> </html>"
    const mailOptions = {
        from: 'no.reply.xdxd.tech@gmail.com',
        to: email, 
        subject: 'Verify your email address', 
        html: htmlTemplate 
    };

    transporter.sendMail(mailOptions, function (err, info) {
        if (err)
            console.log(err)
        else
            console.log(info);
    });
}


const emailHelper = {
    genAddUrlToDb,
    sendEmail,
    transporter
}

module.exports = emailHelper