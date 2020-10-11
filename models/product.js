const mongoose=require("mongoose");
const {ObjectId}=mongoose.Schema


const productSchema=new mongoose.Schema({
	name:
	{
		type:String,
		require:true
		
	},
	description:
	{
		type:String,
		require:true
		
	},
	price:
	{
		type:Number,
		require:true
		
	},
	category:
	{
		type:ObjectId,
		//type:String,
		ref:'Category',
		require:true
		
	},
	quantity:
	{
		type:Number,
		require:true
		
	},
	sold:
	{
		type:Number,
		default:0		
	},
	photo:
	{
		data:Buffer,
		contentType:String
		
	},
	shipping:
	{
		type:Boolean
	}
	
},
{
	timestamps:true
}
);



module.exports=mongoose.model('Product',productSchema);





