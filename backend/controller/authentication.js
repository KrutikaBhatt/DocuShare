const User = require('../models/users');
const Session = require('../models/sessions');
const {JWT_KEY,ZOHO_PASS,SENDER_MAIL} = require('../env');
const generateToken = require('../JWT/generate_token')
const bcrypt = require("bcryptjs");
const passport = require("passport");
const jwt = require("jsonwebtoken");
var nodemailer = require('nodemailer');
const fs = require('fs');
const crypto = require("crypto");
const SHA256 = require('crypto-js/sha256');
const db = require('../config/database');
const cookieSession = require('cookie-session');

var transport = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure:false,
  requireTLS:true,
    auth: {
      user: SENDER_MAIL,
      pass: ZOHO_PASS,
    }
});

const computeHash=(previous_block)=>{
  return SHA256(JSON.stringify(previous_block)).toString();
}

const login = async(req,res)=>{
    try {
        var email = req.body.email;
        var password = req.body.password;

        var sqlCheck = await User.findOne({
            where:{
                email : email
            }

        });

        if (!sqlCheck) {
            return res.status(203).json({
              success: 0,
              message: "Email not registered",
            });
          } else {
              if(password == ""){
                  return res.status(400).json({
                      sucess:0,
                      error :"Please provide password parameter"
                  });
              }
              
              let storedPassword = sqlCheck.dataValues.password;

              const matchPassword = bcrypt.compareSync(
                password,
                storedPassword
              );
              if (!matchPassword) {
                return res.status(203).json({
                  success: 0,
                  error: "Incorrect Password",
                });
              }

              const JWT_token = generateToken({user_id : sqlCheck.dataValues.index});
      
              res.cookie("auth-token", JWT_token, {
                httpOnly: false,
              });
              const Sessioncheck = await Session.findOne({
                where : {
                    user_id :sqlCheck.dataValues.index
                }
              })
              if(!Sessioncheck){
                // Create a session
                const session_object ={
                  user_id:sqlCheck.dataValues.index,
                  jwt_token:JWT_token,
                  last_requested_at:new Date()
                };

                await Session.create(session_object)
                .then(async () =>{
                  return res.status(200).json({
                    success:1,
                    message : "Login successfull",
                    email : sqlCheck.dataValues.email,
                  })
                })

              }
              else{
                const updated ={
                    jwt_token:JWT_token,
                    last_requested_at:new Date()
                };

                await Session.update(updated,{
                  where :{user_id :sqlCheck.dataValues.index}
                })
                .then(async num =>{
                  if(num ==1){
                    return res.status(200).json({
                      success:1,
                      message : "Login successfull",
                      email : sqlCheck.dataValues.email,
                    })
                  }
                  else{
                    return res.status(500).send("There is an error in updating")
                  }
                })
              }
              
            }
    } catch (error) {
      console.log(error);
        return res.status(500).send("Some error occurred. Please refresh and try again")
    }
};

const registerUser = async(req,res)=>{
  try {
    let{
      password,
      email,
    }  = req.body;

    if(password ==null ||email ==null){
      return res.status(404).send("Please provide the complete information")
    }

    var sqlCheck = await User.findOne({
      where:{
          email:email,
      },
    });

    if(sqlCheck){
        return res.status(409).json({
            success:0,
            error :"This Email already exist"
        });
    }

    

    const salt = bcrypt.genSaltSync(10);
    password = bcrypt.hashSync(password, salt);
    const query = 'select * from docushare.users where users.index=(SELECT MAX(users.index) AS LastID FROM docushare.users);'
    var previous_block = await db.query(query);
    var previous_hash = computeHash(previous_block[0][0]);

    var create_user = {
      password : password,
      email:email,
      proof:1,
      previous_hash:previous_hash,
    };

    await User.create(create_user).then(
      data =>{
        return res.status(200).send("The User is created successfully");
      }
    )
    .catch(err =>{
      console.log(err);
      return res.status(500).send("There is a error with database creation")
    })

  } catch (error) {
    console.log(error);
    return res.status(500).send("Some Internal error occurred. Please refresh")
  }
}

const logout = async(req,res) =>{
  try {
    req.session = null;
    req.logout();
    res.clearCookie("auth-token");
    return res.status(200).json({
      success: 1,
      msg: "Logged out successfully",
    });
  } catch (error) {
    res.status(203).json(
      {
        msg: "Unable to logout",
        err: error,
      });
  }
};

const forgotPassword = async(req,res) =>{
  //Fetch email from body of post request
  const email = req.body.email;
  const forgot_pass_page_url = req.body.forgot_pass_page_url;
  console.log(req.body);

  //Fetching data
  sqlCheck = await User.findOne({
    where: {
        email: email,
    },
    attributes: ["index","email"],
  });

  //Not registered
  if (!sqlCheck) {
    return res.status(500).json({
      success: 0,
      error: "Email not registered",
    });
  }

  const encryptedData = jwt.sign({ email, valid: new Date() }, JWT_KEY, {
    expiresIn: "1h",
  });

  
  fs.readFile(
    "./controller/forgot_password_body.html",
    "utf8",
    function (err, data) {
      if (err) throw err;
      const myobj = {
        from: SENDER_MAIL,
        to: email,
        sender_name: "DocuShare",
        sender_id: 1,
        user_index: sqlCheck.dataValues.index,
        method: "default",
        subject: "Reset your password",
        html: `Nice to have you here.
          <style>a:visited {
              color:green;
              pointer-events: none;
              cursor: default;
             }</style>
              <h2>Reset Your Password</h2>

              <a href="${forgot_pass_page_url}?oobCode=${encryptedData}">Reset</a>

              `,
      };

      //const JWT_token = generateToken(myobj);
     
      transport.sendMail(myobj, async (error, info) => {
        if (error) {
          console.log(error);
          return res.status(500).send("Error is sending email");
        }
        else{
          console.log('Successfully sent');
          res.status(200).send("Password reset mail sent successfully");
        }
        
    })
  })

}

const reset_password = async(req,res)=>{
  try {
    const token = req.body.token;
    const newPassword = req.body.new_password;

    jwt.verify(token, JWT_KEY, async (err, decoded) => {
      if (err) {
        if (err.name == "TokenExpiredError") {
          return res.status(400).json({
            success: 0,
            error: "Link Expired",
          });
        } else {
          return res.status(400).json({
            success: 0,
            error: "Inavlid token",
          });
        }
      }
      console.log("Resetting your password");
      console.log(decoded);

      //Hashing password
      const salt = bcrypt.genSaltSync(10);
      new_hashed_password = await bcrypt.hashSync(newPassword, salt);

      //Updating password
      console.log( decoded.email );
      const sqlCheck = await User.update(
        { password: new_hashed_password,
    
       },
        { where: { email: decoded.email } }
      );

      if (sqlCheck == 0) {
        return res.status(500).json({
          success: 0,
          error: "Email not registered",
        });
      }

      return res.status(200).json({
        success: 1,
        message: "Password updated successfully",
      });
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: 0,
      error: "Database Connection Error",
      errorReturned: err,
    });
  }
}

var authentication_controller = {
  login: login,
  forgotPassword: forgotPassword,
  reset_password: reset_password,
  logout : logout,
  registerUser : registerUser
};
module.exports = authentication_controller;