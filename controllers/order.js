const {Order,CartItem}=require("../models/order.js")

exports.create=(req,res)=>{
	//console.log('create order',req.body)
	req.body.order.user=req.profile
	const order=new Order(req.body.order)
	order.save((err,data)=>
	{
		if(err)
		{
			return res.status(400).json({
				error:"order not created"
			})
		}
		res.json(data)
	})

}



exports.listOrders=(req,res)=>{
	Order.find()
	.populate('user',"_id,name,address")
	.sort('created')
	.exec((err,orders)=>{
			if(err)
		{
			return res.status(400).json({
				error:"order not created"
			})
		}
		res.json(orders)
	})
}

exports.manageOrder=(req,res)=>
{
	console.log(req.body)
	var id = req.body.id; 

	 Order.findByIdAndUpdate(id, { status: "deliverd" },
                            function (err, docs) { 
    if (err){ 
        console.log(err) 
    } 
    else{ 
        console.log("Order Deliverd : ", docs); 
    } 
}); 





/*

	Order.findById(id, function (err, docs) { 
    if (err){ 
        console.log(err); 
    } 
    else{ 
        console.log("Result : ", docs); 


    } 
}); */
}




















