const mongoose = require("mongoose");

const WithdrawalSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    playerId: { type: String, required: true },
    reason:String,
    type:{
      type: String,
      default:"withdraw"
    },
    provider: { type: String, required: true },
    amount: { type: Number, required: true },
    orderId: { type: String, required: true, unique: true },
    payeeAccount: { type: String, required: true },
    post_balance:{
      type:Number,
      required:true
  },
  tax_amount:{
    type:Number,
    required:true
  },
  recieved_amount:{
    type:Number,
    required:true
  },
  updated_by:{
     type:String,
     default:""
  },
    status: { 
      type: String,
      enum: ["pending", "in review", "aprroved", "assigned","success","rejected","failed"], 
      default: "in review" 
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Withdrawal", WithdrawalSchema);
