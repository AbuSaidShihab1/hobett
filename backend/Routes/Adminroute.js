const express=require("express");
const UserModel = require("../Models/User");
const transaction_model = require("../Models/Transactionmodel");
const admin_route=express();
const nodemailer=require("nodemailer");
const notification_model = require("../Models/Usernotification");
const Withdrawmodel = require("../Models/Withdrawmodel");
const admin_model = require("../Models/Adminmodel");
const ensureAuthenticated = require("../Middlewares/Auth");
const path=require("path");
const Bannermodel = require("../Models/Bannermodel");
const fs=require("fs")
const multer=require("multer");
const ensureadminAuthenticated = require("../Middlewares/Adminauth");
const Noticemodel = require("../Models/Noticemodel");
const Providermodel = require("../Models/Providermodel");


// ------------file-upload----------
const storage=multer.diskStorage({
  destination:function(req,file,cb){
      cb(null,"./public/images")
  },
  filename:function(req,file,cb){
      cb(null,`${Date.now()}_${file.originalname}`)
  }

});
const uploadimage=multer({storage:storage});
// --------------admin-dashboard----------------
admin_route.get("/admin-overview", async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set start of the day

    // Fetch all successful deposits
    const success_deposit = await transaction_model.find({ status: "success" });
    const rejected_deposit = await transaction_model.find({ status: "failed" });
    const rejected_withdraw=await Withdrawmodel.find({status:"rejected"})
// Fetch all rejected deposits and withdrawals


// Calculate total rejected amounts
const totalRejectedDeposit = rejected_deposit.reduce((sum, txn) => sum + txn.amount, 0);
const totalRejectedWithdraw = rejected_withdraw.reduce((sum, txn) => sum + txn.amount, 0);

    const totalDeposit = success_deposit.reduce((sum, txn) => sum + txn.amount, 0);
    const todaysDeposit = success_deposit
      .filter(txn => new Date(txn.createdAt) >= today)
      .reduce((sum, txn) => sum + txn.amount, 0);

    // Fetch all successful withdrawals
    const successful_withdraw = await Withdrawmodel.find({ status: "success" });
    const totalWithdraw = successful_withdraw.reduce((sum, txn) => sum + txn.amount, 0);
    const todaysWithdraw = successful_withdraw
      .filter(txn => new Date(txn.createdAt) >= today)
      .reduce((sum, txn) => sum + txn.amount, 0);

 // Calculate the withdraw trend
const withdrawDifference = todaysWithdraw - todaysDeposit;
const withdrawPercentageDifference = todaysDeposit > 0 ? ((withdrawDifference / todaysDeposit) * 100).toFixed(2) : 0;
const withdrawTrend = withdrawDifference > 0 ? "up" : "down";

// Calculate the deposit trend
const depositDifference = todaysDeposit - todaysWithdraw;
const depositPercentageDifference = todaysWithdraw > 0 ? ((depositDifference / todaysWithdraw) * 100).toFixed(2) : 0;
const depositTrend = depositDifference > 0 ? "up" : "down";

    res.send({
      success: true,
      message: "ok",
      totalDeposit,
      todaysDeposit,
      totalWithdraw,
      todaysWithdraw,
      withdrawDifference,
      withdrawPercentageDifference,
      withdrawTrend,
      depositDifference,
      depositPercentageDifference,
      depositTrend,
      totalRejectedDeposit,
      totalRejectedWithdraw,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Server Error" });
  }
});

// --------------user-total-information--------------------
admin_route.get("/user-financials/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Start of today

    // Fetch all deposits and withdrawals for the user
    const successDeposits = await transaction_model.find({ userId, status: "success" });
    const successWithdrawals = await Withdrawmodel.find({ userId, status: "success" });

    // Calculate **total** deposit & withdrawal amounts (all time)
    const totalDeposit = successDeposits.reduce((sum, txn) => sum + txn.amount, 0);
    const totalWithdraw = successWithdrawals.reduce((sum, txn) => sum + txn.amount, 0);

    // Calculate **today's** deposit & withdrawal amounts
    const todaysDeposit = successDeposits
      .filter(txn => new Date(txn.createdAt) >= today)
      .reduce((sum, txn) => sum + txn.amount, 0);

    const todaysWithdraw = successWithdrawals
      .filter(txn => new Date(txn.createdAt) >= today)
      .reduce((sum, txn) => sum + txn.amount, 0);

    // Calculate deposit & withdrawal difference
    const depositDifference = todaysDeposit - todaysWithdraw;
    const depositPercentageDifference = totalWithdraw > 0 ? ((depositDifference / totalWithdraw) * 100).toFixed(2) : 0;

    const withdrawDifference = todaysWithdraw - todaysDeposit;
    const withdrawPercentageDifference = totalDeposit > 0 ? ((withdrawDifference / totalDeposit) * 100).toFixed(2) : 0;

    res.send({
      success: true,
      message: "ok",
      totalDeposit,
      totalWithdraw,
      todaysDeposit,
      todaysWithdraw,
      depositDifference,
      depositPercentageDifference,
      withdrawDifference,
      withdrawPercentageDifference,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Server Error" });
  }
});

// ------------------all-information---------------------
admin_route.get("/all-coutation",async(req,res)=>{
  try {
     const pending_withdraw=await Withdrawmodel.find({status:"in review"}).countDocuments();
     const approved_withdraw=await Withdrawmodel.find({status:"approved"}).countDocuments();
     const rejected_withdraw=await Withdrawmodel.find({status:"rejected"}).countDocuments();
     const all_withdraw=await Withdrawmodel.find().countDocuments();
    //  -------------------------deposit------------------------------
    const pending_deposit=await transaction_model.find({status:"failed"}).countDocuments();
    const success_deposit=await transaction_model.find({status:"success"}).countDocuments();
    const all_deposit=await transaction_model.find().countDocuments();
     res.send({success:true,pending_withdraw,approved_withdraw,rejected_withdraw,all_withdraw,pending_deposit,success_deposit,all_deposit})
  } catch (error) {
    console.log(error)
  }
})
// ========================users===================================
admin_route.get("/all-users",async(req,res)=>{
    try {
       const all_users=await UserModel.find();
       if(!all_users){
           return res.send({success:false,message:"Users Not found!"})   
       }
       res.send({success:true,message:"Active users",data:all_users})
    } catch (error) {
        console.log(error)
    }
});
admin_route.get("/active-users",async(req,res)=>{
    try {
       const active_user=await UserModel.find({status:"active"});
       if(!active_user){
           return res.send({success:false,message:"Active Users Not found!"})   
       }
       res.send({success:true,message:"Active users",data:active_user})
    } catch (error) {
        console.log(error)
    }
});
admin_route.get("/banned-users",async(req,res)=>{
    try {
       const banned_user=await UserModel.find({status:"banned"});
       if(!banned_user){
           return res.send({success:false,message:"Banned Users Not found!"})   
       }
       res.send({success:true,message:"Active users",data:banned_user})
    } catch (error) {
        console.log(error)
    }
});
admin_route.get("/single-user-details/:id",async(req,res)=>{
    try {
       const user_detail=await UserModel.findOne({_id:req.params.id});
       if(!user_detail){
           return res.send({success:false,message:"User Not found!"})   
       }
       res.send({success:true,message:"Ok",data:user_detail})
    } catch (error) {
        console.log(error)
    }
});
admin_route.put("/add-user-balance/:id",async(req,res)=>{
    try {
        const {amount}=req.body;
        const find_user=await UserModel.findOne({_id:req.params.id});
        if(!find_user){
          return res.send({success:false,message:"User did not find!"})
        }
        find_user.balance+=amount;
        const update_deposit_money=await UserModel.findByIdAndUpdate({_id:find_user._id},{$set:{deposit_money:amount}})
        find_user.save();
       res.send({success:true,message:`${amount} BDT has been added to ${find_user.name}'s account!`})
    } catch (error) {
        console.log(error)
    }
});
admin_route.put("/subtract-user-balance/:id", async (req, res) => {
    try {
        const { amount } = req.body;
        if (!amount || amount <= 0) {
            return res.status(400).send({ success: false, message: "Invalid amount!" });
        }

        const find_user = await UserModel.findOne({ _id: req.params.id });

        if (!find_user) {
            return res.status(404).send({ success: false, message: "User not found!" });
        }

        if (find_user.balance < amount) {
            return res.status(400).send({ success: false, message: "Insufficient balance!" });
        }

        find_user.balance -= amount;
        await find_user.save();

        res.send({ 
            success: true, 
            message: `${amount} BDT has been subtracted from ${find_user.name}'s account!` 
        });

    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: "Something went wrong!" });
    }
});

admin_route.put("/banned-user/:id",async(req,res)=>{
    try {
        const find_user=await UserModel.findOne({_id:req.params.id});
        if(!find_user){
          return res.send({success:false,message:"User did not find!"})
        }
        const banned_user=await UserModel.findByIdAndUpdate({_id:req.params.id},{$set:{status:"banned",reason:req.body.reason}});
       res.send({success:true,message:`${find_user.name}'s account has been banned!`})
    } catch (error) {
        console.log(error)
    }
})
admin_route.put("/unban-user/:id",async(req,res)=>{
    try {
        const find_user=await UserModel.findOne({_id:req.params.id});
        if(!find_user){
          return res.send({success:false,message:"User did not find!"})
        }
        const unban_user=await UserModel.findByIdAndUpdate({_id:req.params.id},{$set:{status:"active",reason:req.body.reason}});
       res.send({success:true,message:`${find_user.name}'s account has been banned!`})
    } catch (error) {
        console.log(error)
    }
})
// ========================users=================================

// ---------------------send-notification------------------------------

// Nodemailer Transporter
const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "shihabmoni15@gmail.com", // Your email address
        pass: "cdir niov oqpo didg", // Your email password or app password
    },
});

// Send Notification Route
admin_route.post("/send-notification", async (req, res) => {
  try {
    const { recipients, subject, message, sendViaEmail } = req.body;

    if (!recipients || !subject || !message) {
      return res.status(400).json({ success: false, message: "All fields are required!" });
    }

    let recipientEmails = [];

    // If "All Users" is selected, fetch all user emails from DB
    if (recipients === "All Users") {
      const users = await UserModel.find({}, "email"); // Fetch all users' emails
      recipientEmails = users.map(user => user.email);
    } else {
      recipientEmails = [recipients]; // Single recipient email
    }

    // Save Notification in Database
    const newNotification = new notification_model({ recipients: recipientEmails, subject, message, sentViaEmail: sendViaEmail });
    await newNotification.save();

    // If email sending is enabled
    if (sendViaEmail && recipientEmails.length > 0) {
        const mailOptions = {
            from: "shihabmoni15@gmail.com",
            to: recipientEmails.join(","), // Convert array to comma-separated string
            subject,
            html: `
              <div style="
                max-width: 600px;
                margin: 0 auto;
                font-family: 'Arial', sans-serif;
                text-align: center;
              ">
                <!-- Header with Black Background -->
                <div style="
                  background: black;
                  color: white;
                  padding: 15px;
                  font-size: 24px;
                  font-weight: bold;
                ">
                  Ho<span class="text-orange-500">Bet</span>
                </div>
          
                <!-- Notification Box -->
                <div style="
                  background: white;
                  color: #333;
                  padding: 20px;
                  margin-top: 10px;
                  border-radius: 8px;
                  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
                  text-align: left;
                ">
                  <h2 style="font-size: 22px; margin-bottom: 10px; text-align: center;">${subject}</h2>
                  <p style="line-height: 1.6; font-size: 16px;">${message}</p>
                </div>
          
                <!-- Footer -->
                <p style="margin-top: 15px; font-size: 14px; opacity: 0.8;">Best Regards,</p>
                <p style="margin: 0; font-size: 16px; font-weight: bold;">HoBet Team</p>
              </div>
            `,
          };
          
      await transporter.sendMail(mailOptions);
    }

    res.status(201).json({ success: true, message: "Notification sent successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});
admin_route.get("/notifications/:email",ensureAuthenticated,async (req, res) => {
    try {
      const { email } = req.params;
  
      // Find notifications where:
      // - The user's email exists in the recipients array
      // - OR The notification is for all users (null recipients array)
      const notifications = await notification_model
        .find({ recipients: { $in: [email] } }) // Check if email exists in recipients array
        .sort({ createdAt: -1 });
  
      res.status(200).json({ success: true, data: notifications });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  });
  
  admin_route.delete("/notifications/:id", ensureAuthenticated,async (req, res) => {
    try {
      const { id } = req.params;
  
      // Find and delete the notification by ID
      const deletedNotification = await notification_model.findByIdAndDelete(id);
  
      if (!deletedNotification) {
        return res.status(404).json({ success: false, message: "Notification not found" });
      }
  
      res.status(200).json({ success: true, message: "Notification deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  });
// Get all notifications with search and date filtering
admin_route.get("/notification-history", async (req, res) => {
  try {
    const { search, date, email } = req.query;
    let filter = {};

    // 🔹 Search filter
    if (search) {
      filter.$or = [
        { "recipients": { $regex: search, $options: "i" } },
        { "subject": { $regex: search, $options: "i" } },
        { "message": { $regex: search, $options: "i" } }
      ];
    }

    // 🔹 Email filter (for recipients array)
    if (email) {
      filter.recipients = { $in: [email] }; // Matches if the email is inside the recipients array
    }

    // 🔹 Date filter
    if (date) {
      const startOfDay = new Date(date);
      startOfDay.setUTCHours(0, 0, 0, 0);
      const endOfDay = new Date(date);
      endOfDay.setUTCHours(23, 59, 59, 999);
      filter.createdAt = { $gte: startOfDay, $lte: endOfDay };
    }

    // 🔹 Fetch notifications with sorting
    const notifications = await notification_model.find(filter).sort({ createdAt: -1 });

    res.json({ success: true, data: notifications });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});


// ========================deposit-transactions=============================
admin_route.get("/failed-deposit",async(req,res)=>{
    try {
        const pending_deposit=await transaction_model.find({status:"failed"}).sort({ createdAt: -1 });
        if(!pending_deposit){
            return res.send({success:false,message:"Transaction not found!"})
        };
        res.send({success:true,data:pending_deposit})
    } catch (error) {
        console.log(error)
    }
});
admin_route.get("/successful-deposit",async(req,res)=>{
    try {
        const success_deposit=await transaction_model.find({status:"success"}).sort({ createdAt: -1 });
        if(!success_deposit){
            return res.send({success:false,message:"Transaction not found!"})
        };
        res.send({success:true,data:success_deposit})
    } catch (error) {
        console.log(error)
    }
});
admin_route.get("/all-deposits",async(req,res)=>{
    try {
        const all_deposit=await transaction_model.find().sort({ createdAt: -1 });
        if(!all_deposit){
            return res.send({success:false,message:"Transaction not found!"})
        };
        res.send({success:true,data:all_deposit})
    } catch (error) {
        console.log(error)
    }
});
admin_route.get("/single-deposit/:id",async(req,res)=>{
  try {
      const single_deposit=await transaction_model.findById({_id:req.params.id})
      if(!single_deposit){
          return res.send({success:false,message:"Transaction not found!"})
      };
      res.send({success:true,data:single_deposit})
  } catch (error) {
      console.log(error)
  }
});
// Get single user's deposit history
admin_route.get("/single-user-deposits/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { startDate, endDate } = req.query;

    let query = { customer_id: id };

    if (startDate && endDate) {
      query.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const deposits = await transaction_model.find(query).sort({ createdAt: -1 });

    if (!deposits.length) {
      return res.json({ success: false, message: "No deposits found!" });
    }

    res.json({ success: true, data: deposits });
  } catch (error) {
    console.error("Error fetching deposit history:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


// --------------------------withdrawal--------------------------
admin_route.get("/pending-withdrawal",async(req,res)=>{
  try {
      const pending_deposit=await Withdrawmodel.find({
        status:"in review"
      }).sort({ createdAt: -1 });
      if(!pending_deposit){
          return res.send({success:false,message:"Transaction not found!"})
      };
      res.send({success:true,data:pending_deposit})
  } catch (error) {
      console.log(error)
  }
});
admin_route.get("/approved-withdrawal",async(req,res)=>{
  try {
      const success_deposit=await Withdrawmodel.find({status:"approved"}).sort({ createdAt: -1 });
      if(!success_deposit){
          return res.send({success:false,message:"Transaction not found!"})
      };
      res.send({success:true,data:success_deposit})
  } catch (error) {
      console.log(error)
  }
});
admin_route.get("/rejected-withdrawal",async(req,res)=>{
  try {
      const rejected_withdraw=await Withdrawmodel.find({status:"rejected"}).sort({ createdAt: -1 });
      if(!rejected_withdraw){
          return res.send({success:false,message:"Transaction not found!"})
      };
      res.send({success:true,data:rejected_withdraw})
  } catch (error) {
      console.log(error)
  }
});
admin_route.get("/success-withdrawal",async(req,res)=>{
  try {
      const rejected_withdraw=await Withdrawmodel.find({status:"success"}).sort({ createdAt: -1 });
      if(!rejected_withdraw){
          return res.send({success:false,message:"Transaction not found!"})
      };
      res.send({success:true,data:rejected_withdraw})
  } catch (error) {
      console.log(error)
  }
});
admin_route.get("/all-withdrawals",async(req,res)=>{
  try {
      const all_deposit=await Withdrawmodel.find().sort({ createdAt: -1 });
      if(!all_deposit){
          return res.send({success:false,message:"Transaction not found!"})
      };
      res.send({success:true,data:all_deposit})
  } catch (error) {
      console.log(error)
  }
});
admin_route.get("/single-withdraw/:id",async(req,res)=>{
  try {
      const single_withdraw=await Withdrawmodel.findById({_id:req.params.id})
      if(!single_withdraw){
          return res.send({success:false,message:"Transaction not found!"})
      };
      res.send({success:true,data:single_withdraw})
  } catch (error) {
      console.log(error)
  }
});
admin_route.get("/all-transactions", async (req, res) => {
  try {
      // Fetch deposits and withdrawals
      const deposits = await transaction_model.find();
      const withdrawals = await Withdrawmodel.find();

      // Merge both arrays
      const allTransactions = [...deposits, ...withdrawals];

      // Sort transactions by `createdAt` in descending order (latest first)
      allTransactions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      res.send({ success: true, data: allTransactions });
  } catch (error) {
      console.error(error);
      res.status(500).send({ success: false, message: "Server error!" });
  }
});
// PUT route to update the status of a transaction
admin_route.put('/update-deposit-status/:id', async (req, res) => {
  const { status, reason, updated_by } = req.body;
  const { id } = req.params; // Transaction ID from the URL parameter

  // Custom Validation
  if (!status || !['pending', 'success', 'failed'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status. Must be "pending", "success", or "failed".' });
  }

  if (!reason || reason.trim() === '') {
    return res.status(400).json({ message: 'Reason is required and cannot be empty.' });
  }

  if (!updated_by || updated_by.trim() === '') {
    return res.status(400).json({ message: 'Updated by field is required and cannot be empty.' });
  }

  try {
    // Find the transaction by ID
    const transaction = await transaction_model.findById(id);
    
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    // Update the status and reason
    transaction.status = status;
    transaction.reason = reason;
    transaction.updated_by = updated_by;
    const find_user=await UserModel.findOne({email:transaction.customer_email});
    if(status=="success"){
      find_user.balance+=transaction.amount;
      find_user.save();
    }

    // Save the updated transaction
    await transaction.save();

    // Send success response
    return res.status(200).json({
      success: true,
      message: 'Transaction status updated successfully',
      data: transaction,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
});

// Get Withdraw History
admin_route.get("/single-user-withdraws/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { startDate, endDate } = req.query;

    let query = { userId };

    if (startDate && endDate) {
      query.createdAt = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

    const withdraws = await Withdrawmodel.find(query).sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: withdraws });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

admin_route.put("/withdrawals/:withdrawalId/status", async (req, res) => {
  try {
    const { withdrawalId } = req.params;
    const { status } = req.body;

    // Allowed status values
    const validStatuses = ["pending", "in review","assigned","success","approved", "rejected"];

    // Validate the new status
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value." });
    }

    // Find and update the withdrawal status
    const updatedWithdrawal = await Withdrawmodel.findByIdAndUpdate(
      withdrawalId,
      { status },
      { new: true }
    );

    if (!updatedWithdrawal) {
      return res.status(404).json({ message: "Withdrawal not found." });
    }

    res.json({ message: "Withdrawal status updated successfully.", withdrawal: updatedWithdrawal });
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
});
// Update withdrawal status
admin_route.put("/withdrawals/:withdrawalId/status", async (req, res) => {
  try {
    const { withdrawalId } = req.params;
    const { status } = req.body;

    // Allowed status values
    const validStatuses = ["pending", "in review", "assigned", "success", "approved", "rejected"];

    // Validate the new status
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value." });
    }

    // Find the withdrawal
    const withdrawal = await Withdrawmodel.findById(withdrawalId);

    if (!withdrawal) {
      return res.status(404).json({ message: "Withdrawal not found." });
    }

    // Check if the status is 'rejected' and update the balance
    if (status === "rejected") {  // Assuming `userId` is stored in the withdrawal

      // Find the user to update the balance
      const user = await UserModel.findOne({email:withdrawal.email});

      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }

      // Add the withdrawal amount back to the user's balance
      user.balance += withdrawal.amount;

      // Save the updated user balance
      await user.save();
    }

    // Update the withdrawal status
    const updatedWithdrawal = await Withdrawmodel.findByIdAndUpdate(
      withdrawalId,
      { status },
      { new: true }
    );

    res.json({ message: "Withdrawal status updated successfully.", withdrawal: updatedWithdrawal });
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
});

admin_route.post("/withdrawals-take", async (req, res) => {
  try {
    console.log(req.body)
     const find_withdraw=await Withdrawmodel.findOne({orderId:req.body.orderId})
     if(!find_withdraw){
        return res.send({success:false,message:"Withdraw id not found!"});
        console.log("ok")
     }
     const update_status=await Withdrawmodel.findByIdAndUpdate({_id:find_withdraw._id},{$set:{status:req.body.status}})
     // If status is 'failed' or 'rejected', refund the user
    if (req.body.status === "failed" || req.body.status === "rejected") {
      const user = await UserModel.findById(find_withdraw.userId);
      if (user) {
        user.balance += find_withdraw.amount; // Refund the amount
        await user.save();
        console.log(`Refunded ${find_withdraw.amount} to user ${user._id}`);
      }
    }
    res.send({ success: true, message: "Withdrawal status updated successfully." });
     console.log(update_status);
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
});
// -------------------------report-------------------------
// ===========================================login history===========================
admin_route.get('/login-history', async (req, res) => {
  try {
      const { username, startDate, endDate } = req.query;
      let query = {};

      // Apply username search if provided
      if (username) {
          query["name"] = { $regex: username, $options: "i" }; // Case-insensitive search
      }

      const users = await UserModel.find(query, 'name email loginHistory').lean();

      // Ensure loginHistory exists and is an array
      const loginHistory = users.flatMap(user => 
          (user.loginHistory || []).map(history => ({
              name: user.name,
              email: user.email,
              ipAddress: history.ipAddress,
              device: history.device,
              location: history.location,
              loginAt: history.loginAt || new Date()
          }))
      );

      // Apply date filtering after extracting login history
      let filteredHistory = loginHistory;
      if (startDate && endDate) {
          const start = new Date(startDate);
          const end = new Date(endDate);
          filteredHistory = loginHistory.filter(history =>
              history.loginAt >= start && history.loginAt <= end
          );
      }

      res.status(200).json({ success: true, data: filteredHistory });
  } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Error fetching login history' });
  }
});
// -------------moderator---------------------------
admin_route.get("/all-admins",async(req,res)=>{
  try {
     const all_admins=await admin_model.find({role:"admin",is_admin:true});
     if(!all_admins){
         return res.send({success:false,message:"Active admin Not found!"})   
     }
     res.send({success:true,message:"Active users",data:all_admins})
  } catch (error) {
      console.log(error)
  }
});
admin_route.get("/all-super-admins",async(req,res)=>{
  try {
     const all_admins=await admin_model.find({role:"super-admin",is_admin:true});
     if(!all_admins){
         return res.send({success:false,message:"Active admin Not found!"})   
     }
     res.send({success:true,message:"Active users",data:all_admins})
  } catch (error) {
      console.log(error)
  }
});
admin_route.get("/pending-admins",async(req,res)=>{
  try {
     const pending_admins=await admin_model.find({is_admin:false});
     if(!pending_admins){
         return res.send({success:false,message:"Active admin Not found!"})   
     }
     res.send({success:true,message:"Pending admins",data:pending_admins})
  } catch (error) {
      console.log(error)
  }
});
// -----------chnage-admin-status------------------
admin_route.put("/admin-status-update/:id",async(req,res)=>{
  try {
      const admin_find=await admin_model.findOne({_id:req.params.id});
      if(!admin_find){
        return res.send({success:false,message:"Admin did not find!"})
      }
      const update_status=await admin_model.findByIdAndUpdate({_id:req.params.id},{$set:{status:req.body.status}});
     res.send({success:true,message:`${admin_find.name}'s account has been banned!`})
  } catch (error) {
      console.log(error)
  }
})
// --------------------frontend-----------------------------
// Route to upload multiple images
admin_route.post("/upload",ensureadminAuthenticated,uploadimage.array("images", 10), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    // Extract filenames and paths from uploaded files
    const filenames = req.files.map(file => file.filename);
    const paths = req.files.map(file => `${file.filename}`);

    // Find the existing document (if any)
    let existingImageSet = await Bannermodel.findOne();

    // If no document exists, create a new one
    if (!existingImageSet) {
      existingImageSet = new Bannermodel({ filenames, paths });
      await existingImageSet.save();
    } else {
      // Add the new images to the existing arrays
      existingImageSet.filenames.push(...filenames);
      existingImageSet.paths.push(...paths);
      await existingImageSet.save();
    }

    res.json({ message: "Images uploaded successfully", images: existingImageSet });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error uploading images", error });
  }
});

// Route to get all uploaded images (for slider)
// GET route to fetch images
admin_route.get('/banners',async (req, res) => {
  try {
    // Find the image document in the database
    const imageSet = await Bannermodel.findOne(); 

    // Check if the imageSet exists
    if (!imageSet) {
      return res.status(404).json({ message: 'No images found' });
    }

    // Send the filenames in the response
    res.json({ filenames: imageSet.filenames });
  } catch (error) {
    console.error('Error fetching banners:', error);
    res.status(500).json({ message: 'Error fetching banners', error });
  }
});
// Delete a single image
admin_route.delete("/banners/:imageName",ensureAuthenticated,async (req, res) => {
  const { imageName } = req.params;

  try {
    // Find the carousel entry
    const carousel = await Bannermodel.findOne({});

    if (!carousel) {
      return res.status(404).json({ message: "Carousel not found" });
    }

    // Find the index of the image to delete
    const imageIndex = carousel.filenames.indexOf(imageName);
    if (imageIndex === -1) {
      return res.status(404).json({ message: "Image not found" });
    }

    // Remove the image from the filenames and paths arrays
    carousel.filenames.splice(imageIndex, 1);
    carousel.paths.splice(imageIndex, 1);

    // Delete the actual image file from the server
    const filePath = path.join(__dirname, "public", "images", imageName); // Adjust the path if necessary
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath); // Delete the file from the server
    }

    // Save the updated carousel record
    await carousel.save();

    res.json({ message: "Image deleted successfully" });
  } catch (error) {
    console.error("Error deleting image:", error);
    res.status(500).json({ message: "Error deleting image", error });
  }
});

// ------------notice----------------------
// Create a new notice (this will replace the existing notice)
admin_route.post('/add-notice',ensureadminAuthenticated,async (req, res) => {
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ message: 'Notice content is required' });
  }

  try {
    // Find the first notice and update it with the new content, or create a new one if it doesn't exist
    let existingNotice = await Noticemodel.findOne();

    if (existingNotice) {
      // Update the existing notice with new content
      existingNotice.content = content;
      await existingNotice.save();
      res.status(200).json({ message: 'Notice updated successfully', notice: existingNotice });
    } else {
      // If no notice exists, create a new one
      const newNotice = new Noticemodel({ content });
      await newNotice.save();
      res.status(201).json({ message: 'Notice created successfully', notice: newNotice });
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error creating or updating notice', error: error.message });
  }
});

// Fetch the latest notice
admin_route.get('/notice', async (req, res) => {
  try {
    const notice = await Noticemodel.findOne();  // Fetch the first notice
    if (!notice) {
      return res.json({ message: 'notice found' });
    }
    res.status(200).json({ notice });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching notice', error: error.message });
  }
});
// --------------add-provider---------------
// @route   POST /api/providers/add
// @desc    Add a new provider
admin_route.post("/add-provider", uploadimage.single("image"), async (req, res) => {
  try {
    const { providerName } = req.body;

    if (!providerName || !req.file) {
      return res.status(400).json({ message: "Provider name and image are required." });
    }

    const imageUrl = `${req.file.filename}`; // Store image path

    const newProvider = new Providermodel({ providerName, imageUrl });
    await newProvider.save();

    res.status(201).json({ message: "Provider added successfully!", provider: newProvider });
  } catch (error) {
    console.error("Error adding provider:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

// @route   GET /api/providers
// @desc    Get all providers
admin_route.get("/providers", async (req, res) => {
  try {
    const providers = await Providermodel.find().sort({ createdAt: -1 });
    res.status(200).json(providers);
  } catch (error) {
    console.error("Error fetching providers:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});
// @desc    Delete a provider
admin_route.delete("/provider-remove/:id", async (req, res) => {
  try {
    const provider = await Providermodel.findById(req.params.id);
    if (!provider) {
      return res.status(404).json({ message: "Provider not found." });
    }

    // Delete the image file from the server
    const imagePath = `./images/${provider.imageUrl.split("/").pop()}`;
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    // Remove provider from database
    await Providermodel.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Provider deleted successfully!" });
  } catch (error) {
    console.error("Error deleting provider:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});
module.exports=admin_route;