const { DataTypes } = require('sequelize');
const db = require('../config/database');

const Session = db.define("session_table",{
    session_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true,
    },
    user_id:{
        // Foreign Key to User Table
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    jwt_token:{
        type:DataTypes.TEXT('long'),
        allowNull:false,
    },
    last_requested_at :{
        type:DataTypes.DATE,
        allowNull:false
    }
});
db.sync();
module.exports = Session;