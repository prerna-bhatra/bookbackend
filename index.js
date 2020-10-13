require('dotenv').config()
const cors=require('cors')
const express=require('express');
const mongoose=require('mongoose');
//import router
const userRoutes=require('./routes/users')
const userRoutes1=require('./routes/user1')
const categoryRoutes=require('./routes/category')
const productRoutes=require('./routes/product')
//const BraintreeRoutes=require('./routes/braintree')
const orderRoutes=require('./routes/order')
const config=require('./dev.js')
const morgan=require("morgan");
const bodyParser=require('body-parser');
const cookieParser=require('cookie-parser')
const expressValidator=require('express-validator')
const app=express();


const connect = mongoose.connect(config.mongoURI,
  {
    useNewUrlParser: true, useUnifiedTopology: true,
    useCreateIndex: true, useFindAndModify: false
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));


app.use(morgan('dev'));
app.use(bodyParser.json())
app.use(cookieParser());
app.use(expressValidator())
app.use(cors())

//routes midllewaye
app.use('/api',userRoutes);
app.use('/api',userRoutes1);
app.use('/api',categoryRoutes);
app.use('/api',productRoutes);
//app.use('/api',BraintreeRoutes);
app.use('/api',orderRoutes);

const port=process.env.PORT || 8000


app.listen(port,()=>
{
	console.log(port);
})