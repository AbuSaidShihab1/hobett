import { Route, Routes, useLocation,Navigate } from "react-router-dom";
import Sidebar from "./components/common/Sidebar";
import OverviewPage from "./pages/OverviewPage";
import ProductsPage from "./pages/ProductsPage";
import UsersPage from "./pages/UsersPage";
import SalesPage from "./pages/SalesPage";
import OrdersPage from "./pages/OrdersPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import SettingsPage from "./pages/SettingsPage";
import AdminLogin from "./pages/AdminLogin";
import GamesTable from "./components/games/GamesTable";
import Gamelogs from "./components/games/Gamelogs";
import Activeuser from "./components/users/Activeuser";
import Pendingdeposit from "./components/depoist/Alldeposit";
import Pendingwithdraw from "./components/withdraw/Pendingwithdraw";
import Pendingticket from "./components/Support/Pendingticket";
import TransactionLogs from "./components/reports/TransactionLogs";
import Setting from "./components/system/Setting";
import Generalsettings from "./components/settings/Generalsettings";
import Reportsandrequest from "./components/request/Reportsandrequest";
import LogoFaviconUploader from "./components/system/LogoFaviconUploader";
import Configuration from "./components/system/Configuration";
import SEOConfig from "./components/system/SEOConfig";
import NotificationTemplates from "./components/system/NotificationTemplates";
import RobotsTxtForm from "./components/system/RobotsTxtForm";
import UserDetail from "./components/users/userdetails/UserDetail";
import Banneduserdetail from "./components/users/banneduser/Banneduserdetail";
import Banneduser from "./components/users/Banneduser";
import Alluser from "./components/users/Alluser";
import NotificationPage from "./components/users/NotificationPage";
import DepositRequest from "./components/depoist/deposit_details/DepositRequest";
import Withdrawdetails from "./components/withdraw/withdraw_detials/Withdrawdetails";
import Approvedwithdraw from "./components/withdraw/Approvedwithdraw";
import Rejectedwithdraw from "./components/withdraw/Rejectedwithdraw";
import Allwithdraw from "./components/withdraw/Allwithdraw";
import Successdeposit from "./components/depoist/Successdeposit";
import Alldeposit from "./components/depoist/Alldeposit";
import Faileddeposit from "./components/depoist/Faileddeposit";
import Loginhistory from "./pages/Loginhistory";
import Allnotifications from "./pages/Allnotifications";
import Singledeposithistory from "./components/depoist/Singledeposithistory";
import SingleWithdrawHistory from "./components/withdraw/withdraw_detials/SingleWithdrawHistory";
import Successwithdraw from "./components/withdraw/Successwithdraw";
import Alladmin from "./components/moderator/Alladmin";
import Superadmin from "./components/moderator/Superadmin";
import Pendingadmin from "./components/moderator/Pendingadmin";
import Createuser from "./components/moderator/Createuser";
import Addbanner from "./components/frontend/banner/Addbanner";
import Bannerlist from "./components/frontend/banner/Bannerlist";
import Gamesdetails from "./components/games/Gamesdetails";
import Notice from "./components/frontend/banner/Notice";
import Addprovider from "./components/frontend/banner/Addprovider";
import Providerlist from "./components/frontend/banner/Providerlist";
import Referal from "./components/referal/Referal";

function App() {
	const location = useLocation();
	const hideSidebar = location.pathname === "/hobet-admin-login";
	const isAdminAuthenticated = localStorage.getItem("admin");
	return (
		<div className='flex h-screen  text-gray-100 overflow-hidden'>
			{/* BG */}
			{/* <div className='fixed inset-0 z-0'>
				<div className='absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80' />
				<div className='absolute inset-0 backdrop-blur-sm' />
			</div> */}

			{!hideSidebar && <Sidebar />}

      <Routes>
  <Route path="/hobet-admin-login" element={<AdminLogin />} />
  
  {!isAdminAuthenticated ? (
    <Route path="*" element={<Navigate to="/hobet-admin-login" replace />} />
  ) : (
    <>
      <Route path="/" element={<OverviewPage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/users" element={<UsersPage />} />
      <Route path="/sales" element={<SalesPage />} />
      <Route path="/orders" element={<OrdersPage />} />
        {/*----------------frontend-------------------------*/}
      <Route path="/add-banner" element={<Addbanner />} />
      <Route path="/banner-list" element={<Bannerlist />} />
      <Route path="/notice" element={<Notice />} />
      <Route path="/add-provider" element={<Addprovider />} />
      <Route path="/provider-list" element={<Providerlist />} />
        {/*----------------frontend-------------------------*/}
      <Route path="/analytics" element={<AnalyticsPage />} />
      <Route path="/games" element={<GamesTable />} />
      <Route path="/games/game-log" element={<Gamelogs />} />
      <Route path="/games/game-details" element={<Gamesdetails />} />
      
      {/* ----------------------users----------------------------- */}
      <Route path="/users/all-user" element={<Alluser />} />
      <Route path="/users/send-notification" element={<NotificationPage />} />
      <Route path="/users/active-user" element={<Activeuser />} />
      <Route path="/users/banned-user" element={<Banneduser />} />
      <Route path="/users/user-detail/:id" element={<UserDetail />} />
      <Route path="/users/banned-user-detail/:id" element={<Banneduserdetail />} />

      {/* ----------------------users----------------------------- */}

      {/* ---------------------deposit-------------------------- */}
      <Route path="/deposits/failed-deposit" element={<Faileddeposit />} />
      <Route path="/deposits/successful-deposit" element={<Successdeposit />} />
      <Route path="/deposits/all-deposits" element={<Alldeposit />} />
      <Route path="/deposits/pending-deposit-details/:id" element={<DepositRequest />} />
      <Route path="/deposits/single-deposit-history/:id" element={<Singledeposithistory />} />
      
      {/* ---------------------deposit-------------------------- */}

      {/* --------------------------------withdraw----------------------------- */}
      <Route path="/withdraw/single-withdraw-history/:id" element={<SingleWithdrawHistory />} />
      <Route path="/withdraw/pending-withdraw-details/:id" element={<Withdrawdetails />} />
      <Route path="/withdrawals/pending-withdrawal" element={<Pendingwithdraw />} />
      <Route path="/withdrawals/success-withdrawal" element={<Successwithdraw />} />
      <Route path="/withdrawals/approved-withdrawal" element={<Approvedwithdraw />} />
      <Route path="/withdrawals/rejected-withdrawal" element={<Rejectedwithdraw />} />
      <Route path="/withdrawals/all-withdrawals" element={<Allwithdraw />} />
      {/* ----------------------report-------------------------- */}
      <Route path="/report/login/history" element={<Loginhistory />} />
      <Route path="/report/nptification/history" element={<Allnotifications />} />
      
      {/* ----------------------report-------------------------- */}
      {/* ------------------moderator-------------------- */}
      <Route path="/moderator/all-admins" element={<Alladmin />} />
      <Route path="/moderator/all-super-admins" element={<Superadmin />} />
      <Route path="/moderator/pending-admins" element={<Pendingadmin />} />
      <Route path="/moderator/create-user" element={<Createuser />} />
      {/* --------------------referal--------------------- */}
      <Route path="/referal/add-referal" element={<Referal/>} />

      {/* ---------settings----------------------------- */}
      <Route path="/supports/pending-support" element={<Pendingticket />} />
      <Route path="/reports/transaction-history" element={<TransactionLogs />} />
      <Route path="/settings" element={<Setting />} />
      <Route path="/request-reports" element={<Reportsandrequest />} />
      <Route path="/settings/general-settings" element={<Generalsettings />} />
      <Route path="/settings/logo-icon" element={<LogoFaviconUploader />} />
      <Route path="/settings/system-config" element={<Configuration />} />
      <Route path="/settings/seo-config" element={<SEOConfig />} />
      <Route path="/settings/notification" element={<NotificationTemplates />} />
      <Route path="/settings/robot-text" element={<RobotsTxtForm />} />
    </>
  )}
</Routes>

		</div>
	);
}

export default App;
