import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom'; // ✅ Import useSearchParams
import { FiSearch, FiX } from 'react-icons/fi';
import axios from 'axios';
import moment from 'moment';
import Header from '../components/common/Header';

const Loginhistory = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const base_url = import.meta.env.VITE_API_KEY_Base_URL;
    const [loginHistory, setLoginHistory] = useState([]);
    const [searchQuery, setSearchQuery] = useState(searchParams.get('name') || '');
    const [startDate, setStartDate] = useState(searchParams.get('startDate') || '');
    const [endDate, setEndDate] = useState(searchParams.get('endDate') || '');
    const [loading, setLoading] = useState(false);

    const fetchLoginHistory = () => {
        setLoading(true);

        axios.get(`${base_url}/admin/login-history`, {
            params: {
                username: searchQuery || undefined,
                startDate: startDate || undefined,
                endDate: endDate || undefined
            }
        })
        .then((res) => {
            setLoginHistory(res.data.data);
        })
        .catch((err) => {
            console.error(err);
        })
        .finally(() => setLoading(false));
    };

    // Fetch data when the component mounts OR when searchParams change
    useEffect(() => {
        fetchLoginHistory();
    }, [searchParams]);

    // Function to Handle Search
    const handleSearch = () => {
        setSearchParams({
            name: searchQuery || '',
            startDate: startDate || '',
            endDate: endDate || ''
        });
    };

    // Function to Clear Search Filters
    const clearSearch = () => {
        setSearchQuery('');
        setStartDate('');
        setEndDate('');
        setSearchParams({}); // Reset URL params
    };

    return (
        <div className="w-full font-bai overflow-y-auto">
            <Header />
            <section className="p-4">
                <div className="p-6">
                    <div className="w-full p-4">
                        <div className="flex justify-between items-center mb-4">
                            <h1 className="text-2xl font-semibold text-gray-800 mb-6">User Login History</h1>

                            {/* Search and Date Inputs */}
                            <div className="flex gap-[20px] mb-6">

{/* Search by Username */}
<div className="relative w-[250px] h-[50px] flex items-center">
    <input
        type="text"
        placeholder="Search Username"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="py-2 px-4  h-[50px] border border-gray-300 text-black rounded-l-md  focus:outline-none"
    />
    {searchQuery && (
        <div onClick={clearSearch} className="absolute cursor-pointer right-10 text-gray-600">
            <FiX size={18} />
        </div>
    )}
    <button onClick={handleSearch} className="bg-indigo-600 h-[50px] py-2 px-4 rounded-r-md text-white">
        <FiSearch />
    </button>
</div>

{/* Date Range Search */}
<div className="relative w-[350px] h-[50px] flex items-center">
    <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className="py-2 px-4 border w-[150px] h-[50px] border-gray-300 text-black rounded-l-md focus:outline-none"
    />
    <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        className=" py-2 px-4 border h-[50px] w-[150px] border-gray-300 text-black focus:outline-none"
    />
    <button onClick={handleSearch} className="bg-indigo-600 w-[50px] flex justify-center items-center h-[50px] p-2 rounded-r-md text-white">
        <FiSearch />
    </button>
</div>

</div>
                        </div>

                        {/* Table with Search Results */}
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse shadow-xl bg-white border-[1px] border-[#eee] rounded-md overflow-hidden">
                                <thead>
                                    <tr className="bg-[#4634FF] text-white">
                                        <th className="py-3 px-4 text-left">User</th>
                                        <th className="py-3 px-4 text-left">Login at</th>
                                        <th className="py-3 px-4 text-left">IP</th>
                                        <th className="py-3 px-4 text-left">Location</th>
                                        <th className="py-3 px-4 text-left">Browser | OS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading ? (
                                        <tr>
                                            <td colSpan="5" className="text-center py-6 text-gray-600">Loading...</td>
                                        </tr>
                                    ) : loginHistory.length === 0 ? (
                                        <tr>
                                            <td colSpan="5" className="text-center py-6 text-gray-600">No Data Found</td>
                                        </tr>
                                    ) : (
                                        loginHistory.map((entry, index) => (
                                            <tr key={index} className="border-b even:bg-gray-50">
                                                <td className="py-3 px-4 text-gray-800">
                                                    <strong>{entry.name}</strong>
                                                    <br />
                                                    <span className="text-gray-600">{entry.email}</span>
                                                </td>
                                                <td className="py-3 px-4 text-gray-800">
                                                    <span className='font-[600] text-[14px]'>{moment(entry.loginAt).format("MMMM Do YYYY, h:mm A")}</span>
                                                    <br />
                                                    <span className="text-gray-600">{moment(entry.loginAt).fromNow()}</span>
                                                </td>
                                                <td className="py-3 px-4 text-gray-800 font-[600]">{entry.ipAddress}</td>
                                                <td className="py-3 px-4 text-gray-800">{entry.location}</td>
                                                <td className="py-3 px-4 text-gray-800 font-[600]">{entry.device}</td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Loginhistory;
