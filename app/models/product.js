const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const productSchema = new Schema({
    "name": { 
    	type: String,
    	required: true,
    	max: 100  },
 	"description": { 
 		type: String },
 	"category": { 
 		type: String, 
 		enum: ['computers', 'phones', 'accesories'] 
 	},
 	"createdAt": { 
 		type: Date,
 		default: Date.now },
 	"sales": [
 		{
 			type: mongoose.Schema.Types.ObjectId,
        	ref: "Client"
 		}
 	]
}, { versionKey: false });

module.exports = mongoose.model("Product", productSchema);