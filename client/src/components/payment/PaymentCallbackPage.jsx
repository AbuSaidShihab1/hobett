/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSearchParams } from "react-router-dom";
import moment from "moment";

function PaymentCallbackPage() {
  const base_url = import.meta.env.VITE_API_KEY_Base_URL;
  const base_url2 = import.meta.env.VITE_API_KEY_Base_URL2;

  const [paymentparams] = useSearchParams();
  const user_info = JSON.parse(localStorage.getItem("user"));

  const [transaction_info, set_transaction_info] = useState([]);
  const [loading, setLoading] = useState(false);
  const [amount, set_amount] = useState();
  const [progress, setProgress] = useState(0);
  const [showProgress, setShowProgress] = useState(true);
  
  const transactionId = paymentparams.get("paymentID");
  const status = paymentparams.get("status");
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
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.error("Error processing payment:", error);
      return false;
    }
  };
useEffect(()=>{
  executePaymentCallback()
},[])
  useEffect(() => {
    let interval;
    if (showProgress) {
      interval = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress >= 100) {
            clearInterval(interval);
            setShowProgress(false);
            user_money_info();
            return 100;
          }
          return oldProgress + 10;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [showProgress]);

  const user_money_info = async () => {
    try {
      setLoading(true);
      const { data: transactionResponse } = await axios.get(`${base_url2}/api/user/transaction-status/${transactionId}`);
      if (transactionResponse.success) {
        const transactionData = transactionResponse.data;
        set_transaction_info(transactionData);
        console.log(transactionData)
        set_amount(transactionData.expectedAmount);

        const { data: userResponse } = await axios.get(`${base_url}/auth/user/${user_info?._id}`, {
          headers: { 'Authorization': localStorage.getItem('token') }
        });
          // hello deposit
        if (userResponse.success) {
          const { data: paymentResult } = await executePaymentCallback();
          console.log('paymentResult', paymentResult);

          const { data: createTransactionResponse } = await axios.post(`${base_url}/user/create-transaction`, {
            payment_type: "Deposit",
            post_balance: userResponse.user.balance,
            transaction:transactionData.paymentId,
            amount:transactionData.receivedAmount ? transactionData.receivedAmount : transactionData.expectedAmount,
            payment_method: transactionData.provider,
            status: transactionData.status === "pending" 
            ? "failed" 
            : transactionData.status === "fully paid" 
              ? "success" 
              : transactionData.status,
            customer_id: user_info._id,
          });

          if (createTransactionResponse?.transaction) {
            console.log('createTransactionResponse', createTransactionResponse.transaction);
            set_transaction_info({ ...transaction_info, ...createTransactionResponse.transaction });
          }
        }
      }
    } catch (error) {
      console.error("Error in user_money_info:", error);
    } finally {
      setLoading(false);
    }
  };

  

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-900 py-10">
      {showProgress ? (
        <div>
            <h1 className='text-center text-white font-[500] text-[18px] xl:text-[20px] font-bai mb-[10px]'>Payment Is Processing...</h1>
        <div className="w-64 h-2 bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-indigo-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        </div>
      ) : (
        loading ? 'Loading! Please wait...' : (
          <div className="w-full max-w-4xl px-4 sm:px-6 md:px-8">
            <div className="text-center mb-6">
              <h1 className="text-[20px] xl:text-3xl font-semibold text-white">Payment Status</h1>
              <p className="text-[16px] xl:text-lg text-gray-400">Your payment details are below</p>
            </div>
            <div className="bg-gray-800 rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg xl:text-xl font-semibold text-white">Payment Status: <span className={`text-${status === 'cancel' ? 'red' : 'green'}-500`}>{transaction_info.status}</span></span>
                <span className="text-sm text-gray-400">{moment(transaction_info.createdAt).format("MMMM Do YYYY, h:mm A")}</span>
              </div>
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
              <div className="mt-6 flex justify-center">
                {transaction_info.status === 'Success' || transaction_info.status === 'fully paid' ? (
                  <span className="px-4 py-2 text-sm text-white bg-green-500 rounded-full">Payment Successful</span>
                ) : (
                  <span className="px-4 py-2 text-sm text-white bg-red-500 rounded-full">Payment Failed</span>
                )}
              </div>
            </div>
            <div className="mt-6 text-center">
              <a href="/" className="inline-block px-6 py-3 text-lg font-semibold text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-600 hover:text-white transition duration-300">
                Back to Dashboard
              </a>
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default PaymentCallbackPage;