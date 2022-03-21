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
 *    summary: Adding a User
 *    parameters:
 *      - in: body
 *        name: body
 *        description: Adding the user data
 *        required: true
 *        example: {"email":"krutikabhatt222@gmail.com","password":"asdfghjkl"}
 *    responses:
 *      '200':
 *        description: successful operation
 *      '500':
 *        description: Failed to send email
 */

/**
 * @swagger
 * /auth/login:
 *  post:
 *    tags:
 *      - Authentication
 *    summary: Logging in as User
 *    parameters:
 *      - in: body
 *        name: body
 *        description: Logging in User with email and password
 *        required: true
 *        example: {"email":"krutikabhatt222@gmail.com","password":"Testing123"}
 *    responses:
 *      '200':
 *        description: Logged in succesfully
 */

/**
 * @swagger
 * /auth/logout:
 *  post:
 *      tags:
 *      - Authentication
 *      description: Logging out User
 *      responses:
 *         '200':
 *              description: Logging out User
 *         '404':
 *              description: Failed to logout
 */
 

/**
 * @swagger
 * /auth/forgotPassword:
 *  post:
 *    tags:
 *      - Authentication
 *    summary: Emailing password reset
 *    parameters:
 *      - in: body
 *        name: body
 *        description: Emailing password reset
 *        required: true
 *        example: {"email":"krutikabhatt222@gmail.com", "forgot_pass_page_url":"http://localhost:3000/user/forgotPass"}
 *    responses:
 *      '200':
 *        description: successful operation
 *      '500':
 *        description: Failed to send email
 */

/**
 * @swagger
 * /auth/reset-password:
 *  post:
 *    tags:
 *      - Authentication
 *    summary: Password reset
 *    parameters:
 *      - in: body
 *        name: body
 *        description: Password reset
 *        required: true
 *        example: {"token":"","new_password":""}
 *    responses:
 *      '200':
 *        description: successful operation
 */


/**
 * @swagger
 * /dashboard:
 *  get:
 *      tags:
 *      - Dashboard
 *      description: Dashboard routes
 *      responses:
 *         '200':
 *              description: dashboard count
 *         '404':
 *              description: Failed to do so
 */
 
 db.sync().then(() => {
    app.listen(PORT, console.log(`Server started on port ${PORT}`));
}).catch(err => console.log("Error: " + err));
