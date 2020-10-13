const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;
 
const CartItemSchema = new mongoose.Schema(
  {
    product: { type: ObjectId, ref: "Product" },
    name: String,
    price: Number,
    count: Number
  },
  { timestamps: true }
);
 
const CartItem = mongoose.model("CartItem", CartItemSchema);
 
const OrderSchema = new mongoose.Schema(
  {
    /*
    request comes into orderSchema and then it looks for  cartschema where it cheks for object id of products 
    and then is stores in cartSChema but cartSchema is not saved anywhere 
    and it stores that into products 
    */
    
    products: [CartItemSchema],//It is collection in collection 
    transaction_id: {},
    amount: { type: Number,default:0 },
    address: String,
    contact:Number,
    status: {
      type: String,
      default: "Not processed",
      enum: ["Not processed", "Processing", "Shipped", "Delivered", "Cancelled"] // enum means string objects
    },
    updated: Date,
    user: { type: ObjectId, ref: "User" }
  },
  { timestamps: true }
);
 
const Order = mongoose.model("Order", OrderSchema);
 
module.exports = { Order, CartItem };