import React, { useState, useEffect } from "react";
import { BarChart2, ShoppingBag, Users, Zap, ArrowUp, ArrowDown } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";
import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import SalesOverviewChart from "../components/overview/SalesOverviewChart";
import CategoryDistributionChart from "../components/overview/CategoryDistributionChart";
import SalesChannelChart from "../components/overview/SalesChannelChart";
import Dashboardcard from "../components/overview/Dashboardcard";

const OverviewPage = () => {
  const base_url = import.meta.env.VITE_API_KEY_Base_URL;

  const [overviewData, setOverviewData] = useState({
    totalDeposit: 0,
    todaysDeposit: 0,
    totalWithdraw: 0,
    todaysWithdraw: 0,
    percentageDifference: "0%",  // New field for withdraw percentage
    withdrawTrend: "equal", // "up", "down", or "equal"
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${base_url}/admin/admin-overview`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        setOverviewData(response.data);
		console.log(response.data)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex-1 overflow-auto relative z-10 font-bai">
      <Header title="Overview" />

      <main className="py-6 px-4 lg:px-8 bg-white w-[100%]">
        {/* STATS */}
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Total Withdraw */}
		  <StatCard
  name="Today Withdraw"
  icon={Zap}
  value={`৳${overviewData.todaysWithdraw.toFixed(2)}`}
  color="#6366F1"
  extra={
    <span className={`flex flex-col mt-2 ${overviewData.withdrawTrend === "up" ? "text-red-500" : "text-green-500"}`}>
      <span className="flex items-center">
        {overviewData.withdrawTrend === "up" ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
        {Math.abs(overviewData.withdrawDifference)} ৳ ({overviewData.withdrawPercentageDifference}%)
      </span>
    </span>
  }
/>


          {/* Total Deposit */}
		  <StatCard
  name="Today Deposit"
  icon={Users}
  value={`৳${overviewData.todaysDeposit.toFixed(2)}`}
  color="#8B5CF6"
  extra={
    overviewData.todaysWithdraw > 0 ? (
      <span className={`flex flex-col mt-2 ${overviewData.depositTrend === "up" ? "text-green-500" : "text-red-500"}`}>
        <span className="flex items-center">
          {overviewData.depositTrend === "up" ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
          {Math.abs(overviewData.depositDifference)} ৳ ({overviewData.depositPercentageDifference}%)
        </span>
      </span>
    ) : (
      <span className="text-gray-500 mt-2">No Withdrawals Today</span>
    )
  }
/>


          {/* Total Games */}
          <StatCard name="Total Games" icon={ShoppingBag} value="0" color="#EC4899" />

          {/* Winning Rate */}
          <StatCard name="Winning Rate" icon={BarChart2} value="0%" color="#10B981" />
        </motion.div>

        {/* CHARTS */}
        <Dashboardcard />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <SalesOverviewChart />
          <CategoryDistributionChart />
          <SalesChannelChart />
        </div>
      </main>
    </div>
  );
};

export default OverviewPage;
