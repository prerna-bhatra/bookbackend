const User=require('../models/user')
const jwt=require('jsonwebtoken');
var expressJwt=require('express-jwt')
exports.signup=(req,res)=>
{
	console.log("reqbody",req.body);
	const user=new User(req.body);
	user.save((err,user)=>
	{
		if(err)
		{
			return res.status(400).json({
				err
			})
		}

		 res.json({
			user
		})
	})
};

exports.signin=(req,res)=>
{
	//find the user on email

	const {email,password}=req.body;
	User.findOne({email},(err,user)=>
	{
		if(err || !user)
		{
			return res.status(400).json({err:'email not exisits'});
		}
		//if user is found the email and password match
		//ceate atuthetication
			if(!user.authenticate(password))
			{
				return res.status(401).json(
				{
					error:'email and password not matching'
				});
			}

		//generate a toekn
		const token=jwt.sign({_id:user._id},expressJwt({ secret: "123456", algorithms: ['RS256'] , userProperty: "auth" }))
		//persist the token as 't' in cookie with expiry date

		res.cookie('t',token,{expire:new Date()+9999})

		//return response
		const {_id,name,email,role,address,contact}=user
		return res.json({token,user:{_id,email,name,role,address,contact}});

	})
}



exports.signout=(req,res)=>
{
	res.clearCookie('t')
	res.json({message:"Signput success"});
}

exports.requireSignin = expressJwt({
  secret: "123456"  ,
  algorithms: ["HS256"], // added later
  userProperty: "auth",
});

exports.isAuth=(req,res,next)=>
{
	let user=req.profile && req.auth && req.profile._id==req.auth._id
	if(!user)
	{
		return res.status(403).json({
			error:"Access Denied"
		})
	}
	next()
}


exports.isAdmin=(req,res,next)=>
{
	if(req.profile.role===0)
	{
		return res.status(403).json(
		{
			error:"Admin resoruces Access Denied"
		})
	}
		
		next();
}







