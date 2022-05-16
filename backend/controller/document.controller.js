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
const docusign = require("docusign-esign");

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


const sendEnvelopeUsingEmbeddedSending = async (req,res) => {
    
    var args={
      accessToken: 'eyJ0eXAiOiJNVCIsImFsZyI6IlJTMjU2Iiwia2lkIjoiNjgxODVmZjEtNGU1MS00Y2U5LWFmMWMtNjg5ODEyMjAzMzE3In0.AQsAAAABAAUABwCABV1LCDfaSAgAgEWAWUs32kgCAGxL5x2OYQxArdtjVEsSfo8VAAEAAAAYAAEAAAAFAAAADQAkAAAANDVmODg5NzAtYWVhYi00MzZlLTlmYjgtOGRiMGQzZmZmYzBkIgAkAAAANDVmODg5NzAtYWVhYi00MzZlLTlmYjgtOGRiMGQzZmZmYzBkEgABAAAACwAAAGludGVyYWN0aXZlMACA2CtKCDfaSDcAwwJ29AxY9kKK5KrHfyx51g.YY0BnLGgsMyi-ma7oSjw3pqnlOpwYJoCy6iZPqHyaZxF_Op-Dp4AX0HHfiSK7o4vlQNNfOyGbygLhasyUoszzaNlihHOmQVUHtBXVRUrUonT9tLMgYBnra9-s2qBh4cuaMXLu9nEXGmxSVQejBSutzX5D5HZbmW5ct-Oi47ZF-hT22a26qxJFFifEVNsoTO8IgsBokcJy-rAkNKzpjZMT3bebC3sTRiuHsg_EpueSK_AAxMzf8zemiZ3pgPx7MMePQbwQ0DqMBDePePnvRUTJnM4Z2UyVLqrY3oxrLtdExhPWNKzdTWqYeMrbCBmyowsoCRNkFYO7HAvXhaPvj8aFA',
      basePath: 'https://demo.docusign.net/restapi',
      accountId: 'b8b14b35-52e5-4d6b-89dc-0b57f270cf03',
        startingView: 'tagging',
        envelopeArgs: {
            signerEmail: ['krutika.bhatt@somaiya.edu','krutikabhatt222@gmail.com'],
            signerName: ['Krutika Bhatt','Diamonds Shine'],
            dsReturnUrl: 'http://localhost:3000/ds-return',
            doc2File: 'C:/Users/User/Desktop/agency-alpha-next/backend/controller/sample-pdf.pdf'
        }
    }
    
    let dsApiClient = new docusign.ApiClient();
    dsApiClient.setBasePath(args.basePath);
    dsApiClient.addDefaultHeader("Authorization", "Bearer " + args.accessToken);
    let envelopesApi = new docusign.EnvelopesApi(dsApiClient);
  
    // Step 1. Make the envelope with "created" (draft) status
    args.envelopeArgs.status = "created"; // We want a draft envelope
  
    let envelope = makeEnvelope(args.envelopeArgs);
  
    let results = await envelopesApi.createEnvelope(args.accountId, {
      envelopeDefinition: envelope,
    });
    let envelopeId = results.envelopeId;
  
    // Step 2. create the sender view
    let viewRequest = makeSenderViewRequest(args.envelopeArgs);
    console.log("This make Sender Request is done");
    results = await envelopesApi.createSenderView(args.accountId, envelopeId, {
      returnUrlRequest: viewRequest,
    });

    console.log("In results log");
    // Switch to Recipient and Documents view if requested by the user
    let url = results.url;
    console.log(`startingView: ${args.startingView}`);
    if (args.startingView === "recipient") {
      url = url.replace("send=1", "send=0");
    }
  
    //return { envelopeId: envelopeId, redirectUrl: url };
    return res.status(200).json({ envelopeId: envelopeId, redirectUrl: url });
  };

  function makeSenderViewRequest(args) {
    let viewRequest = new docusign.ReturnUrlRequest();
  
    viewRequest.returnUrl = args.dsReturnUrl;
    return viewRequest;
  }
  
  function makeEnvelope(args) {
  
    let doc2DocxBytes, doc3PdfBytes;
  
    doc2DocxBytes = fs.readFileSync(args.doc2File);
 
    let env = new docusign.EnvelopeDefinition();
    env.emailSubject = "Please sign this document set";
  
    // add the documents
    let doc1 = new docusign.Document(),
      doc2b64 = Buffer.from(doc2DocxBytes).toString("base64");
    
    let doc2 = new docusign.Document.constructFromObject({
      documentBase64: doc2b64,
      name: "Battle Plan", 
      fileExtension: "pdf",
      documentId: "1",
    });
  
    env.documents = [doc2];
 
    var Allsigners =[];
    var signerEmail_list = args.signerEmail;
    var signerName_list = args.signerName;
    var recIDs = 1;
    for(var i=0;i<signerEmail_list.length;i++){
        var signer1 = docusign.Signer.constructFromObject({
            email: signerEmail_list[i],
            name: signerName_list[i],
            recipientId: recIDs.toString(),
            routingOrder: recIDs.toString(),
        });
        Allsigners.push(signer1);
        recIDs = parseInt(recIDs) + 1;
    }
   
    console.log("All signers :",Allsigners);
    let recipients = docusign.Recipients.constructFromObject({
      signers: Allsigners
    });
    env.recipients = recipients;
  
    env.status = args.status;
  
    return env;
  }

var document_controller = {
    createDocument : createDocument,
    sendEnvelopeUsingEmbeddedSending : sendEnvelopeUsingEmbeddedSending
};
module.exports = document_controller;