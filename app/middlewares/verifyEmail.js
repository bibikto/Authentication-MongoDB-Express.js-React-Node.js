const db = require("../models");
const UserEmail = db.userEmail;
const User = db.user
var path = require('path');


verifyAccountEmail = async(req,res) => {
    const {emailVerifyString} = req.params
    const userEmail = await UserEmail.findOne({emailVerifyString: emailVerifyString})
    if(userEmail){
        await User.findOneAndUpdate({email: userEmail.email},{emailVerified: true})
        await UserEmail.findOneAndDelete({emailVerifyString: emailVerifyString})
        res.sendFile(path.join(__dirname, '../views', 'emailVerify.html'));
    }
    else{
        res.json("Invalid Url!")
    }
}

const verifyEmail = {
    verifyAccountEmail
  };


  
module.exports = verifyEmail;