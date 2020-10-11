const Category=require('../models/category')

exports.categoryById=(req,res,next,id)=>
{
	Category.findById(id).exec((err,category)=>{
		if(err || !category)
		{
			err:'no category'
		}
		req.category=category
		next()
	})
}
exports.read=(req,res)=>
{
	return res.json(req.category)
}


exports.create=(req,res)=>
{
	const category=new Category(req.body);
	category.save((err,data)=>
	{
		if(err)
		{
			return res.status(400).json({
				error:'error'
			});

		}
		res.json({data:data})
	})
}


exports.list=(req,res)=>
{
	Category.find().exec((err,data)=>{
		if(err)
		{
			return res.status(400).json({
				error:"can not read"
			})
		}
		res.json(data)
	})
}












