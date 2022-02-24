const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const {BACKEND_SERVER_IP_ADDR, PORT} = require('./env');

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");


//Database Connection
const db = require('./config/database');
db.authenticate().then(() => {
    console.log('Database connected...');
}).catch(err => {
    console.log('Error: ' + err);
})

const app = express();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(cors("*"));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());


app.use('/', require('./routes/routes'));



app.use('/', require('./routes/routes'));



const swaggerOptions = {
    swaggerDefinition: {
      info: {
        title: "DocuShare Backend",
        description: "This is the routes and description of backend for DocuShare ",
        contact: {
          name: "Krutika Bhatt",
        },
        servers: [`http://${BACKEND_SERVER_IP_ADDR}:${PORT}`],
      },
    },
    apis: ["index.js"],
  };
  
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  

/**
 * @swagger
 * /auth/register:
 *  post:
 *    tags:
 *      - Authentication
 *    summary: Adding a Admin
 *    parameters:
 *      - in: body
 *        name: body
 *        description: Adding the Admin data
 *        required: true
 *        example: {"email":"krutikabhatt222@gmail.com", "username":"Krutika#123","password":"asdfghjkl","role":1}
 *    responses:
 *      '200':
 *        description: successful operation
 *      '500':
 *        description: Failed to send email
 */


 db.sync().then(() => {
    app.listen(PORT, console.log(`Server started on port ${PORT}`));
}).catch(err => console.log("Error: " + err));
