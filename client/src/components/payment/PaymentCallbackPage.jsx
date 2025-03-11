import axios from 'axios';
import React,{useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { useSearchParams } from "react-router-dom";
import moment from "moment"; // ✅ Import Moment.js
function PaymentCallbackPage() {
  // Sample payment data (replace with real data)
  const [paymentparams] = useSearchParams();
  const user_info = JSON.parse(localStorage.getItem("user"))

  const paymentDetails = {
    transactionId: 'TXN1234567890',
    amount: '$120.00',
    status: 'Success',
    paymentMethod: 'Credit Card',
    paymentDate: '2025-02-25',
  };
  const base_url = import.meta.env.VITE_API_KEY_Base_URL;
  const base_url2="http://localhost:6001";
  const transactionId = paymentparams.get("paymentID"); // Get query param
  const status=paymentparams.get("status")
  const [transaction_info,set_transaction_info]=useState([]);
  const status2 = status === "cancel" ? "failed" : status;
  const [amount,set_amount]=useState();

  const [user_details,set_userdetails]=useState([])

  const user_data=()=>{
    axios.get(`${base_url}/auth/user/${user_info?._id}`, {
      headers: {
          'Authorization': localStorage.getItem('token')
      }
  })
    .then((res)=>{
      console.log(res)
      if(res.data.success){
        set_userdetails(res.data.user)
      }
    }).catch((err)=>{
      console.log(err)
    })
  }   

  useEffect(()=>{
    user_data();
  },[])
  const user_money_info=()=>{
      axios.get(`${base_url2}/api/user/transaction-status/${transactionId}`)
      .then((res)=>{
        console.log(res)
          if(res.data.success){
            console.log(res)
            set_transaction_info(res.data.data);
            set_amount(res.data.data.expectedAmount)
            axios.get(`${base_url}/auth/user/${user_info?._id}`, {
              headers: {
                  'Authorization': localStorage.getItem('token')
              }
          })
            .then((userres)=>{
              console.log(userres)
              if(userres.data.success){
                set_userdetails(res.data.user);
                axios.post(`${base_url}/user/create-transaction`,{payment_type:"Deposit",post_balance:userres.data.user.balance,transaction:res.data.data.paymentId,amount:res.data.data.expectedAmount,payment_method:res.data.data.provider,status:res.data.data.status === "pending" ? "failed" : status,customer_id:user_info._id}, {
                  headers: {
                      'Authorization': localStorage.getItem('token')
                  }
              })
                .then((res)=>{
                  console.log(res)
                }).catch((err)=>{
                  console.log(err)
                })
              }
            }).catch((err)=>{
              console.log(err)
            })
       
          }
      }).catch((err)=>{
          console.log(err.name)
      })
  };
  const payment_status=()=>{
    axios.post(`${base_url}/api/payment/p2c/bkash/callback`,{payment_type:"Deposit",amount:amount,payment_method:transaction_info.provider,status:status === "cancel" ? "failed" : status,customer_id:user_info._id})
    .then((res)=>{
      console.log(res)
    }).catch((err)=>{
      console.log(err)
    })
 }
  useEffect(()=>{
      user_money_info();
    // ------------------post-transaction-data-on-paymnet--------------------
    set_amount(transaction_info.expectedAmount)
  },[]);
 

  return (
    <div className="min-h-screen flex flex-col justify-center font-bai items-center bg-gray-900 py-10">
      {/* Header */}
      <div className="w-full max-w-4xl px-4 sm:px-6 md:px-8">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-semibold text-white">Payment Status</h1>
          <p className="text-lg text-gray-400">Your payment details are below</p>
        </div>

        {/* Payment Card */}
        <div className="bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
    
                {
                   status=="cancel" ? <>
                       <div className="bg-red-500 animate-pulse text-white rounded-full p-2">
                <i className="fas fa-check-circle"></i>
              </div>
              <span className="ml-2 text-xl font-semibold text-white">Payment Status: <span className='text-red-500'>{status}</span></span>
           
                   </>:<>
                       <div className="bg-green-500 animate-pulse text-white rounded-full p-2">
                <i className="fas fa-check-circle"></i>
              </div>
              <span className="ml-2 text-xl font-semibold text-white">Payment Status: <span className='text-green-500'>{transaction_info.status}</span></span>
           
                   </>
                }
          </div>
            <span className="text-sm text-gray-400">{moment(transaction_info.createdAt).format("MMMM Do YYYY, h:mm A")}</span>
          </div>

          {/* Payment Info */}
          <div className="space-y-4">
            <div className="flex justify-between text-gray-400">
              <span>Transaction ID:</span>
              <span className="font-medium text-white">{transaction_info?.paymentId}</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Amount:</span>
              <span className="font-medium text-white">৳{transaction_info?.expectedAmount}</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Payment Method:</span>
              <span className="font-medium text-orange-300">{transaction_info?.provider}</span>
            </div>
          </div>

          {/* Status Badge */}
          <div className="mt-6 flex justify-center">
            {transaction_info.status === 'Success' ? (
              <span className="px-4 py-2 text-sm text-white bg-green-500 rounded-full">Payment Successful</span>
            ) : (
              <span className="px-4 py-2 text-sm text-white bg-red-500 rounded-full">Payment Failed</span>
            )}
          </div>
        </div>

        {/* Back to Dashboard Button */}
        <div className="mt-6 text-center">
          <a
            href="/"
            onClick={payment_status}
            className="inline-block px-6 py-3 text-lg font-semibold text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-600 hover:text-white transition duration-300"
          >
            Back to Dashboard
          </a>
        </div>
      </div>
    </div>
  );
}

export default PaymentCallbackPage;
