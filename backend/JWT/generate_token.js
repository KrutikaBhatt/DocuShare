const jwt = require("jsonwebtoken");
const {JWT_KEY} = require('../env');

const generateToken = (token) =>{
    
    const encrypt = jwt.sign(token,JWT_KEY,{ expiresIn: '7d',});

    return encrypt
};

module.exports = generateToken;