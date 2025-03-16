const mongoose=require("mongoose");

const transaction_schema=new mongoose.Schema({
    transiction:String,
     customer_id:{
        type:String,
        required:true
     },
     customer_name:{
        type:String,
        required:true
     },
     customer_email:{
        type:String,
        required:true
     },
        payment_type:{
            type:String,
            required:true
        },
        payment_method:{
            type:String,
            required:true
        },
        amount:{
            type:Number,
            required:true
        },
        post_balance:{
            type:Number,
            required:true
        },
        transaction:{
            type:String,
            required:true
        },
        type:{
            type: String,
            default:"deposit"
          },
        status:{
            type:String,
            required:true   
        },
        updated_by:{
            type:String,
            default:""
         },
        reason:{
            type:String,
            default:""
        },
},{timestamps:true});

const transaction_model=mongoose.model("Transaction",transaction_schema);

module.exports=transaction_model;