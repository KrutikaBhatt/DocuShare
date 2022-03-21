const Sequelize = require('sequelize');
const db = require('../config/database');


const User = db.define('user',{
	index : {
		type : Sequelize.INTEGER,
		allowNull :false,
		autoIncrement:true,
        primaryKey:true,
	},
	password:Sequelize.STRING,

	email:Sequelize.STRING,
	
	status:{
		type:Sequelize.INTEGER,
		defaultValue:1
	},

    proof: {
        type : Sequelize.INTEGER,
		allowNull :false,
    },

    previous_hash:Sequelize.STRING,
    createdAt: {
        type: Sequelize.DATE,
        defaultValue: new Date()
    }

	},
	
	{timestamps:false,}
);

db.sync();
module.exports = User;
