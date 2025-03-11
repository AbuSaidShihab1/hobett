const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    player_id: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    currency: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "user"
    },
    balance: {
        type: Number,
        default: 0
    },
    deposit: {
        type: Number,
        default: 0
    },
    withdraw: {
        type: Number,
        default: 0
    },
    invest: {
        type: Number,
        default: 0
    },
    win: {
        type: Number,
        default: 0
    },
    loss: {
        type: Number,
        default: 0
    },
    bonus: {
        type: Number,
        default: 0
    },
    referralCode: {
        type: String,
    },
    transactions: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ['active', 'banned', 'deactivated'],
        default: 'active',
    },
    referralCode: {  // Unique referral code for inviting users
        type: String,
        unique: true,
    },
    referredBy: {  // Stores the referrer’s user ID
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        default: null,
    },
    referralEarnings: {  // Total earnings from referrals
        type: Number,
        default: 0
    },
    reason: String,
    bet_deposit:{
        type: Number,
        default: 0
    },
    deposit_money:{
        type: Number,
        default: 0
    },
    bet_number:{
        type: Number,
        default: 0
    },
    otp: {
        code: String,
        expiresAt: Date
    },    
    // Login history tracking
    loginHistory: [{
        ipAddress: String,
        device: String,
        location: String,
        timestamp: {
            type: Date,
            default: Date.now
        }
    }]
}, { timestamps: true });

const UserModel = mongoose.model('users', UserSchema);
module.exports = UserModel;
