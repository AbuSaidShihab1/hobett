import { BarChart2, DollarSign, Menu, Settings, TrendingUp, Users } from "lucide-react";
import { useState,useEffect} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { IoGameController, IoTicketOutline, IoBugOutline } from "react-icons/io5";
import { FaRegCreditCard } from "react-icons/fa";
import { IoChevronDown } from "react-icons/io5";
import { TbReportAnalytics } from "react-icons/tb";
import { TbUserStar } from "react-icons/tb";
import axios from "axios"
import { CgController } from "react-icons/cg";
import { HiCode } from "react-icons/hi";
import { HiOutlineShare } from "react-icons/hi";
const Sidebar = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);
	const [openSubmenus, setOpenSubmenus] = useState({});
	const [countation_number,set_countation_number]=useState();
	const [pending_withdraw,set_pending_withdraw]=useState();
	const [approved_withdraw,set_approved_withdraw]=useState();
	const [rejected_withdraw,setrejected_withdraw]=useState();
	const [all_withdraw,set_allwithdraw]=useState();
	const base_url = import.meta.env.VITE_API_KEY_Base_URL;
	// ----------------deposit--------------------------
	const [pending_deposit,set_pending_deposit]=useState();
	const [success_deposit,set_success_deposit]=useState();
	const [all_deposit,set_all_deposit]=useState();
  // Fetch Pending Withdrawals
  const fetch_countation = () => {
    axios
      .get(`${base_url}/admin/all-coutation`)
      .then((res) => {
        set_pending_withdraw(res.data.pending_withdraw);
		set_approved_withdraw(res.data.approved_withdraw);
		setrejected_withdraw(res.data.rejected_withdraw);
		set_allwithdraw(res.data.all_withdraw);
		// ---------------------deposit---------------
		set_pending_deposit(res.data.pending_deposit);
		set_success_deposit(res.data.success_deposit);
		set_all_deposit(res.data.all_deposit)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetch_countation();
  }, []);
  const SIDEBAR_ITEMS = [
	{
		name: "Overview",
		icon: BarChart2,
		color: "#6366f1",
		href: "/",
	},
	{
		name: "Frontend",
		icon: HiCode,
		color: "#0fb9b1",
		submenu: [
			{ name: "Banner", href: "/add-banner" },
			{ name: "Banner List", href: "/banner-list" },
			{ name: "Notice", href: "/notice" },
			{ name: "Add Provider", href: "/add-provider" },
			{ name: "Provider List", href: "/provider-list" },
		],
	},
	{
		name: "Manage Games",
		icon: IoGameController,
		color: "#8B5CF6",
		submenu: [
			{ name: "Games", href: "/games" },
			{ name: "Games Log", href: "/games/game-log" },
		],
	},
	// {
	// 	name: "User Logas",
	// 	icon: TbUserStar,
	// 	color: "#20bf6b",
	// 	href: "/",
	// },
	{ name: "Manage Users", icon: Users, color: "#EC4899", href: "/users",submenu: [
		{ name: "Active Users", href: "/users/active-user" },
		{ name: "Banned Users", href: "/users/banned-user",count:20 },
		// { name: "Email Unverified", href: "/games/slog" },
		// { name: "Mobile Unverified", href: "/games/slog" },
		// { name: "With Balance", href: "/games/slog" },
		{ name: "All Users", href: "/users/all-user" },
		{ name: "Send Notification", href: "/users/send-notification" },
	],},
	{ name: "Deposits", icon: DollarSign, color: "#10B981", href: "/deposits",submenu: [
		// { name: "Pending Deposits", href: "/deposits/pending-deposit" },
		// { name: "Approved Deposits", href: "/games/slog" },
		{ name: "Successful Deposits", href: "/deposits/successful-deposit",count:success_deposit },
		// { name: "Mobile Unverified", href: "/games/slog" },
		{ name: "Failed Deposits", href: "/deposits/failed-deposit",count:pending_deposit },
		{ name: "All Deposits", href: "/deposits/all-deposits",count:all_deposit},
	] },
	{ name: "Withdrawal", icon: FaRegCreditCard, color: "#F59E0B", href: "/withdrwals" ,submenu: [
		{ name: "Pending Withdrawals", href: "/withdrawals/pending-withdrawal",count:pending_withdraw},
		{ name: "Approved Withdrawals", href: "/withdrawals/approved-withdrawal",count:approved_withdraw },
		{ name: "Success Withdrawals", href: "/withdrawals/success-withdrawal" },
		{ name: "Rejected Withdrawals", href: "/withdrawals/rejected-withdrawal",count:rejected_withdraw },
		{ name: "All Withdrawals", href: "/withdrawals/all-withdrawals",count:all_withdraw},
	]},
	{ name: "Reports", icon: TbReportAnalytics, color: "#a55eea", href: "/reports",submenu: [
		{ name: "Transaction History", href: "/reports/transaction-history" },
		{ name: "Login History", href: "/report/login/history" },
		{ name: "Notification History", href: "/report/nptification/history" },
	]  },
	{ name: "Moderator", icon: CgController, color: "#fa8231", href: "/moderator/all-admins",submenu: [
		{ name: "Admin", href: "/moderator/all-admins" },
		{ name: "Super Admin", href: "/moderator/all-super-admins" },
		{ name: "Pending Role", href: "/moderator/pending-admins" },
		{ name: "Create User", href: "/moderator/create-user" },
	]  },
	{
		name: "Referal",
		icon: HiOutlineShare,
		color: "#f7b731",
		submenu: [
			{ name: "Add Referal", href: "/referal/add-referal" },
			{ name: "Referal Logs", href: "/banner-list" },
		],
	},
	// { name: "Analytics", icon: TrendingUp, color: "#3B82F6", href: "/analytics" },
	// { name: "Support Tickets", icon: IoTicketOutline, color: "#2bcbba", href: "/supports",submenu: [
	// 	{ name: "Pending Ticket", href: "/supports/pending-support" },
	// 	{ name: "Closed Ticket", href: "/games/slog" },
	// 	{ name: "Answered Ticket", href: "/games/slog" },
	// 	{ name: "All Ticket", href: "/games/slog" },
	// ] },
	{ name: "System Settings", icon: Settings, color: "#6EE7B7", href: "/settings" },
	{ name: "Reports & Request", icon: IoBugOutline, color: "#eb3b5a", href: "/request-reports" },
];
	const toggleSubmenu = (index) => {
		setOpenSubmenus((prev) => ({ ...prev, [index]: !prev[index] }));
	};

	return (
		<motion.div
			className={`relative z-10 transition-all overflow-y-auto overflow-x-hidden font-bai duration-300 ease-in-out flex-shrink-0 ${
				isSidebarOpen ? "w-64" : "w-20"
			}`}
			animate={{ width: isSidebarOpen ? 256 : 80 }}
		>
			<div className='h-full overflow-y-auto bg-[#071251] overflow-x-hidden custom-scrollbar backdrop-blur-md p-4 flex flex-col border-r border-gray-700'>
				<div className='flex justify-between items-center'>
					<motion.button
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
						onClick={() => setIsSidebarOpen(!isSidebarOpen)}
						className='p-[10px] rounded-full hover:bg-[#4634FF]  transition-colors max-w-fit'
					>
						<Menu size={24} />
					</motion.button>
					<div className='py-4 px-4 sm:px-6 lg:px-8'>
			<div className="relative text-[30px] font-extrabold flex items-center tracking-wide ">
        <span className="text-bg5 drop-shadow-lg">H</span>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-2 animate-spin">
        <circle cx="12" cy="12" r="10" stroke="#FFC312" strokeWidth="2" />
        <polygon points="10,8 14,12 10,16" fill="#F79F1F" />
        </svg>
        <span className="text-white drop-shadow-lg">BET</span>
      </div>
			</div>
				</div>

				<nav className='mt-8 flex-grow'>
					{SIDEBAR_ITEMS.map((item, index) => (
						<div key={index}>
							{item.submenu ? (
								<div>
									<div
										onClick={() => toggleSubmenu(index)}
										className='flex items-center px-[10px] py-[10px] text-sm font-medium rounded-lg hover:bg-[#4634FF] transition-colors mb-2 cursor-pointer'
									>
										<item.icon size={20} style={{ color: item.color, minWidth: "20px" }} />
										<AnimatePresence>
											{isSidebarOpen && (
												<motion.span className='ml-4 whitespace-nowrap'>{item.name}</motion.span>
											)}
										</AnimatePresence>
										<motion.div
											className='ml-auto'
											animate={{ rotate: openSubmenus[index] ? 180 : 0 }}
										>
											<IoChevronDown size={16} />
										</motion.div>
									</div>
									<AnimatePresence>
  {openSubmenus[index] && (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="ml-8"
    >
      {item.submenu.map((sub, subIndex) => (
        <Link
          key={subIndex}
          to={sub.href}
          className="flex justify-between items-center relative p-2 text-sm text-gray-400 hover:text-white"
        >
          <span>{sub.name}</span>
          {sub.count !== undefined && (
            <span className="bg-blue-500 absolute right-[4%] top-[2%] text-white text-xs font-bold px-2 py-1 rounded">
              {sub.count}
            </span>
          )}
        </Link>
      ))}
    </motion.div>
  )}
</AnimatePresence>

								</div>
							) : (
								<Link to={item.href} className='flex items-center text-sm p-2 font-medium rounded-lg hover:bg-[#4634FF] transition-colors mb-2'>
									<item.icon size={20} style={{ color: item.color, minWidth: "20px" }} />
									{isSidebarOpen && <span className='ml-4'>{item.name}</span>}
								</Link>
							)}
						</div>
					))}
				</nav>
			</div>
		</motion.div>
	);
};

export default Sidebar;
