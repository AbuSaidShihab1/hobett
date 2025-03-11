import React, { useState, useEffect } from 'react';
import { FiSearch, FiFilter } from 'react-icons/fi';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../common/Header';
import moment from 'moment';

const TransactionLogs = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const base_url = import.meta.env.VITE_API_KEY_Base_URL;
  const [searchQuery, setSearchQuery] = useState('');
  const [type, setType] = useState('All');
  const [remark, setRemark] = useState('All');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Get filters from URL query params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSearchQuery(params.get('q') || '');
    setType(params.get('type') || 'All');
    setRemark(params.get('remark') || 'All');
    setDateRange({
      start: params.get('startDate') || '',
      end: params.get('endDate') || '',
    });
  }, [location.search]);

  // Fetch transactions
  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${base_url}/admin/all-transactions`, {
        params: {
          q: searchQuery,
          type: type !== 'All' ? type : undefined,
          remark: remark !== 'All' ? remark : undefined,
          startDate: dateRange.start || undefined,
          endDate: dateRange.end || undefined,
        },
      });
      setTransactions(response.data.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [searchQuery, type, remark, dateRange]);

  // Handle filter submission
  const applyFilters = () => {
    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery);
    if (type !== 'All') params.set('type', type);
    if (remark !== 'All') params.set('remark', remark);
    if (dateRange.start) params.set('startDate', dateRange.start);
    if (dateRange.end) params.set('endDate', dateRange.end);
    navigate({ search: params.toString() });
  };

  return (
    <section className="w-full font-bai overflow-y-auto">
      <Header />
      <div className="w-full p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Transaction Logs</h1>

        {/* Filter Section */}
        <div className="grid grid-cols-5 items-center text-gray-700 gap-4 p-4 w-full mb-6">
  <div className="flex flex-col w-full">
    <label className="text-gray-600 text-sm">TRX/Username</label>
    <input
      type="text"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder="Enter TRX/Username"
      className="border px-3 py-2 rounded-md h-10 w-full min-w-[150px]"
    />
  </div>

  <div className="flex flex-col w-full">
    <label className="text-gray-600 text-sm">Type</label>
    <select
      value={type}
      onChange={(e) => setType(e.target.value)}
      className="border px-3 py-2 rounded-md h-10 w-full min-w-[150px]"
    >
      <option value="All">All</option>
      <option value="Deposit">Deposit</option>
      <option value="Withdrawal">Withdrawal</option>
    </select>
  </div>

  <div className="flex flex-col w-full">
    <label className="text-gray-600 text-sm">Remark</label>
    <select
      value={remark}
      onChange={(e) => setRemark(e.target.value)}
      className="border px-3 py-2 rounded-md h-10 w-full min-w-[150px]"
    >
      <option value="All">All</option>
      <option value="Bonus">Bonus</option>
      <option value="Investment">Investment</option>
      <option value="Other">Other</option>
    </select>
  </div>

  <div className="flex flex-col w-full">
    <label className="text-gray-600 text-sm">Date</label>
    <div className="flex gap-2">
      <input
        type="date"
        value={dateRange.start}
        onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
        className="border px-3 py-2 rounded-md h-10 w-full min-w-[150px]"
      />
      <input
        type="date"
        value={dateRange.end}
        onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
        className="border px-3 py-2 rounded-md h-10 w-full min-w-[150px]"
      />
    </div>
  </div>

  <button
    onClick={applyFilters}
    className="bg-indigo-600 mt-[20px] text-white px-6 py-2 rounded-md flex items-center justify-center gap-2 hover:bg-indigo-700 h-10 w-full min-w-[150px]"
  >
    <FiFilter />
    Filter
  </button>
</div>


        {/* Transactions Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse shadow-xl bg-white border border-gray-200 rounded-md">
            <thead>
              <tr className="bg-indigo-600 text-white">
                <th className="py-3 px-4 text-left">User</th>
                <th className="py-3 px-4 text-left">TRX</th>
                <th className="py-3 px-4 text-left">Transacted</th>
                <th className="py-3 px-4 text-left">Amount</th>
                <th className="py-3 px-4 text-left">Post Balance</th>
                <th className="py-3 px-4 text-left">Details</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-gray-600">Loading...</td>
                </tr>
              ) : transactions.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-gray-600">No Transactions Found</td>
                </tr>
              ) : (
                transactions.map((tx, index) => (
                  <tr key={index} className="border-b even:bg-gray-50">
                     <td className="py-3 px-4 text-gray-800">
                                                    <strong className='text-gray-800'>{tx.name}</strong>
                                                    <br />
                                                    <span className="text-blue-600 font-[500]">{tx.email}</span>
                                                </td>
                    <td className="py-3 px-4 text-gray-800">{tx.trx || 'N/A'}</td>
                    <td className="py-3 px-4 text-gray-800">
                      {moment(tx.createdAt).format("YYYY-MM-DD hh:mm A")}
                    </td>
                    {
                      tx.type=="deposit" ?    <td className={`py-3 px-4 font-semibold ${tx.amount < 0 ? 'text-red-600' : 'text-green-600'}`}>
                      {tx.amount ? `৳${tx.amount.toFixed(2)} BDT` : 'N/A'}
                    </td>:   <td className={`py-3 px-4 font-semibold ${tx.amount < 0 ? 'text-red-600' : 'text-red-600'}`}>
                      {tx.amount ? `৳${tx.amount.toFixed(2)} BDT` : 'N/A'}
                    </td>
                    }
                
                    <td className="py-3 px-4 text-gray-800 font-[600]">৳{tx?.post_balance ? `${tx.post_balance} BDT` : 'N/A'}</td>
                    <td className="py-3 px-4 text-gray-800">{tx.details || 'N/A'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default TransactionLogs;
