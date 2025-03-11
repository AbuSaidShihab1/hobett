const { signup, login, profile_update, adminlogin } = require('../Controllers/AuthController');
const ensureAuthenticated = require('../Middlewares/Auth');
const { signupValidation, loginValidation } = require('../Middlewares/AuthValidation');
const multer=require("multer")
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require("../Models/User");
const { v4: uuidv4 } = require('uuid'); // Import UUID for unique player IDs
const admin_model = require('../Models/Adminmodel');
const nodemailer=require("nodemailer");
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

router.post('/login', loginValidation, login);
router.post('/admin-login', loginValidation, adminlogin);

// Function to generate a random referral code
const generateReferralCode = (length = 8) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < length; i++) {
        code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
};

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "shihabmoni15@gmail.com", // Your email address
        pass: "kxyb btad rldf fpsn", // Your email password or app password
    },
});

const sendWelcomeEmail = async (email, name) => {
    const mailOptions = {
        from: "shihabmoni15@gmail.com",
        to: email,
        subject: "Welcome to HOBET!",
        html: `<div style="background-color: #FFCC66; padding: 20px; text-align: center; font-family: 'Poppins', Arial, sans-serif; width: 70%; margin: 0 auto; border-radius: 10px;">
           <div class="w-full">
             <img src="https://cdn.vectorstock.com/i/500p/23/47/welcome-ribbon-banner-vector-47282347.jpg" class="w-full h-[200px]"/>
           </div>            
        <div class="relative text-[20px] flex justify-center items-center xl:text-4xl font-extrabold flex items-center justify-center tracking-wide" style="display: flex; align-items: center; justify-content: center; font-size: 32px; font-weight: 800; text-transform: uppercase;">
                        <span style="color: sky; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);">H</span>
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin: 0 10px; animation: spin 2s linear infinite;">
                            <circle cx="12" cy="12" r="10" stroke="#FFC312" stroke-width="2" />
                            <polygon points="10,8 14,12 10,16" fill="#F79F1F" />
                        </svg>
                        <span style="color: #fff; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);">BET</span>
                    </div>
                    <h2 style="color: #333; margin-top: 20px;">Welcome to HBET!</h2>
                    <p>You've successfully signed up. Get ready for an amazing experience.</p>
                    <p>We are so pleased to have you onboard.</p>
                    <p>Please note you can unsubscribe at any time by clicking 'unsubscribe from this list'.</p>
                    <div style="margin-top: 20px;">
                        <a href="#" style="margin: 0 10px; text-decoration: none; color: #333;">🔗</a>
                        <a href="#" style="margin: 0 10px; text-decoration: none; color: #333;">📧</a>
                        <a href="#" style="margin: 0 10px; text-decoration: none; color: #333;">📷</a>
                    </div>
                    <p style="margin-top: 20px; font-size: 12px; color: #555;">Want to change how you receive these emails? You can <a href="#" style="color: #333;">update your preferences</a> or <a href="#" style="color: #333;">unsubscribe from this list</a>.</p>
                </div>`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("Welcome email sent successfully.");
    } catch (error) {
        console.error("Error sending welcome email:", error);
    }
};


router.post("/signup", async (req, res) => {
    try {
        const { name, email, password, currency } = req.body;
        console.log(req.body);

        const user = await UserModel.findOne({ email });
        if (user) {
            return res.json({ message: "User already exists, you can login", success: false });
        }

        const player_id = uuidv4().slice(0, 6).toUpperCase();
        const newReferralCode = generateReferralCode();

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({
            name,
            email,
            password: hashedPassword,
            currency:"BDT",
            player_id,
            referralCode: newReferralCode,
        });

        await newUser.save();

        // Send welcome email
        await sendWelcomeEmail(email, name);

        res.json({
            message: "Signup successful",
            success: true,
            player_id,
            referralCode: newReferralCode,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
});
// -----------------admin-registration-----------------------
router.post('/admin-registration', async (req, res) => {
    try {
        const { name,role,email, password} = req.body;
        console.log(req.body);

        const user = await admin_model.findOne({ email });
        if (user) {
            return res.json({ message: 'Admin already exists, you can login', success: false });
        }

        // Generate unique player ID and referral code
    
        const adminmodel= new admin_model({
            name,
            email,
            password,
            role
        });

        // Hash password before saving
        adminmodel.password = await bcrypt.hash(password, 10);
        await adminmodel.save();

        res.json({
            message: "Admin Has Been Created successfully!",
            success: true,
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
});

router.put("/update-profile",ensureAuthenticated,profile_update);
// -----------------user-balance-update----------------------------
router.put("/update-user-balance/:id",ensureAuthenticated,async(req,res)=>{
    try {
        const find_user=await UserModel.findById({_id:req.params.id});
        if(!find_user){
            return res.send({success:false,message:"User did not find!"})
        }
        find_user.balance+=req.body.amount;
        find_user.save();
    } catch (error) {
        console.log(error)
    }
})
router.get("/user/:id",ensureAuthenticated,async(req,res)=>{
    try {
        const user=await UserModel.findById({_id:req.params.id});
        if(!user){
            return res.send({success:false,message:"User did not find!"})
        }
        res.send({success:true,message:"ok",user})
    } catch (error) {
        console.log(error)
    }
})
module.exports = router;