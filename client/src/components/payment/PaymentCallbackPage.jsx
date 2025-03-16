/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSearchParams } from "react-router-dom";
import moment from "moment";

function PaymentCallbackPage() {
  const base_url = import.meta.env.VITE_API_KEY_Base_URL;
  const base_url2=import.meta.env.VITE_API_KEY_Base_URL2;

  const [ paymentparams ] = useSearchParams();
  const user_info = JSON.parse(localStorage.getItem("user"))

  const [transaction_info, set_transaction_info]=useState([]);
  const [loading, setLoading] = useState(false);
  const [amount,set_amount] = useState();
  const transactionId = paymentparams.get("paymentID"); // Get query param
  const status = paymentparams.get("status")

  const user_money_info = async () => {
    try {
      setLoading(true); // Start loading
  
      // Fetch transaction status
      const {data: transactionResponse} = await axios.get(`${base_url2}/api/user/transaction-status/${transactionId}`);
      
      if (transactionResponse.success) {
        const transactionData = transactionResponse.data;
        
        set_transaction_info(transactionData);
        set_amount(transactionData.expectedAmount);

        // Fetch user details
        const {data: userResponse} = await axios.get(`${base_url}/auth/user/${user_info?._id}`, {
          headers: {
            'Authorization': localStorage.getItem('token')
          }
        });

        if (userResponse.success) {
          const {data: paymentResult } = await executePaymentCallback();
          console.log('paymentResult', paymentResult);

          const {data: createTransactionResponse} = await axios.post(`${base_url}/user/create-transaction`, {
            payment_type: "Deposit",
            post_balance: userResponse.user.balance,
            transaction: paymentResult.paymentId,
            amount: paymentResult.receivedAmount,
            payment_method: paymentResult.provider,
            status: paymentResult.status === "pending" ? "failed" : transactionData.status,
            customer_id: user_info._id,
          });
          if(createTransactionResponse && createTransactionResponse?.transaction) {
            console.log('createTransactionResponse', createTransactionResponse?.transaction);
            set_transaction_info({...transaction_info, ...createTransactionResponse?.transaction});
          }

        }
      }
    } catch (error) {
      console.error("Error in user_money_info:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };
  
  const executePaymentCallback = async () => {
    try {
      const response = await axios.post(`${base_url2}/api/payment/p2c/bkash/callback`, {
        payment_type: "Deposit",
        amount: amount,
        payment_method: transaction_info.provider,
        status: status === "cancel" ? "failed" : status,
        customer_id: user_info._id,
        paymentID: transactionId,
      });
      return response.data;
    } catch (error) {
      console.error("Error processing payment:", error);
      return false;
    }
  };

  const fetchAndExecPayment = () => {
    user_money_info();
    set_amount(transaction_info.expectedAmount)
  }

  useEffect(async () => {
    fetchAndExecPayment();
  },[]);
 
  console.log('transaction_info.status', transaction_info);

  return (
    <div className="min-h-screen flex flex-col justify-center font-bai items-center bg-gray-900 py-10">
      {/* Header */}
      {
        loading ? 'Loading! Please wait...': (
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
              {transaction_info.status === 'Success' || transaction_info.status === 'fully paid' ? (
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
              className="inline-block px-6 py-3 text-lg font-semibold text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-600 hover:text-white transition duration-300"
            >
              Back to Dashboard
            </a>
          </div>
        </div>
        )
      }
    </div>
  );
}

export default PaymentCallbackPage;
