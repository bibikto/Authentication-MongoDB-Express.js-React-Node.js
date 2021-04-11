checkSignUpInput = async (req, res, next) => {
    if (!('confirmPassword' in req.body)){
        res.status(400).send({ message: "Missing confirm password field!" });
        return
    }

    if (!('firstName' in req.body) || !('lastName' in req.body)){
        res.status(400).send({ message: "Missing first name or/and last name field!" });
        return
    }

    if (req.body.password != req.body.confirmPassword){
        res.status(400).send({ message: "Passwords donot match!" });
        return
    }


    if (!req.body.firstName || !req.body.lastName){
        res.status(400).send({ message: "Empty first name or/and last name!" });
        return
    }
    next();
}

nullEmailPasswordCheck = async (req,res,next) => {
    if (!('email' in req.body) || !('password' in req.body)){
        res.status(400).send({ message: "Missing password or/and email field!" });
        return
    }

    if (!(req.body.email || req.body.password)){
        res.status(400).send({ message: "Empty email or/and password!" });
        return;
    }
    else {
        const re_email = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        
        if(!re_email.test(req.body.email)){
            res.status(400).send({ message: "Invalid Email Address!" });
            return;
        }


        const re_uc = /[A-Z]/
        const re_lc = /[a-z]/
        const re_nm = /[0-9]/

        if(!(re_uc.test(req.body.password) && re_lc.test(req.body.password) && re_nm.test(req.body.password)) || (req.body.password).length < 8 ){
            res.status(400).send({ message: "Use 8 or more characters with a mix of uppercase letters, lowercase letter & numbers" });
            return;
        }
    }
    next();
}




const verifyInput = {
    checkSignUpInput,
    nullEmailPasswordCheck
  };
  
module.exports = verifyInput;