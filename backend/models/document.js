const Sequelize = require('sequelize');
const db = require('../config/database');


const Document = db.define('document',{
	doc_id : {
		type : Sequelize.INTEGER,
		allowNull :false,
		autoIncrement:true,
        primaryKey:true,
	},
	owner_id :{
        type:Sequelize.STRING,
        allowNull : false,
    },
    shared_hash :{
        type:Sequelize.STRING,
        allowNull : true,
    },
	status:{
		type:Sequelize.INTEGER,
		defaultValue:1
	},
    type: {
        type: Sequelize.STRING,
        allowNull : false
    },
    link : {
        type: Sequelize.STRING,
        allowNull : false,
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
module.exports = Document;
