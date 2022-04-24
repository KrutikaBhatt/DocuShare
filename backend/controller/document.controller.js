const Document = require('../models/document');
const {JWT_KEY,ZOHO_PASS,SENDER_MAIL,CDN_BUCKET,CDN_ACCESS} = require('../env');
const generateToken = require('../JWT/generate_token')
const authenticateToken = require('../JWT/autheticateToken');
const bcrypt = require("bcryptjs");
const passport = require("passport");
const jwt = require("jsonwebtoken");
var nodemailer = require('nodemailer');
const fs = require('fs');
const crypto = require("crypto");
const SHA256 = require('crypto-js/sha256');
const db = require('../config/database');
const cookieSession = require('cookie-session');
const fetch = require('node-fetch');
const upload = require('multer')();

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

const createDocument =async(req,res) =>{
    try {
        console.log(req);
        const file = req.files;
        console.log(file);
        const filename = file.originalname;
        console.log(filename);
        const upload_docs = __dirname + "/upload/";

        file.mv(`${upload_docs}/${filename}`, (err) => {
            if (err) {s
              res.status(500).send({ message: "File upload failed"});
            }
            console.log("File Uploaded");

            let fileLink = `https://storage.bunnycdn.com/${CDN_BUCKET}/${fileName}`;
            const inputOptions = {
                method :"PUT",
                headers: {
                    Accept: 'application/json',
                    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                    AccessKey: CDN_ACCESS
                },
                body : fs.createReadStream(upload_docs+"/filename")

            };
        
            fetch(fileLink,inputOptions)
            .then(res => res.json())
            .then((json) => {
                console.log(json);
                res.status(200).send(`File added succesfully `)
            })
            .catch(err => res.status(500).json(
                {error:"Error in uploading file",message :err}
            ))
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send("Some error occurred. Please refresh and try again")
    }
}

var document_controller = {
    createDocument : createDocument
};
module.exports = document_controller;