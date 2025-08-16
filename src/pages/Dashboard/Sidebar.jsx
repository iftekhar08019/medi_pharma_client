import { NavLink } from "react-router"; // Use react-router-dom!
import {
  FaHome,
  FaUsers,
  FaListAlt,
  FaMoneyCheckAlt,
  FaChartBar,
  FaAd,
  FaPills,
  FaHistory,
  FaBullhorn,
} from "react-icons/fa";
import Logo from "../../utility/Logo";
import useUserRole from "../../hooks/useUserRole";
import { useTranslation } from "react-i18next";
import ManualLoading from "../../components/ManualLoading";

const Sidebar = () => {
  const { role, roleLoading } = useUserRole();
  const { t } = useTranslation();

  const adminMenu = [
    {
      name: t('dashboard.admin.home.title'),
      icon: <FaHome className="text-xl" />,
      path: "/dashboard/admin-home",
    },
    {
      name: t('dashboard.admin.manageUsers.title'),
      icon: <FaUsers className="text-xl" />,
      path: "/dashboard/manage-users",
    },
    {
      name: t('dashboard.admin.manageCategory.title'),
      icon: <FaListAlt className="text-xl" />,
      path: "/dashboard/manage-category",
    },
    {
      name: t('dashboard.admin.managePayments.title'),
      icon: <FaMoneyCheckAlt className="text-xl" />,
      path: "/dashboard/payment-management",
    },
    {
      name: t('dashboard.admin.salesReport.title'),
      icon: <FaChartBar className="text-xl" />,
      path: "/dashboard/sales-report",
    },
    {
      name: t('dashboard.admin.manageBanner.title'),
      icon: <FaAd className="text-xl" />,
      path: "/dashboard/manage-banner",
    },
  ];

  const sellerMenu = [
    {
      name: t('dashboard.seller.home.title'),
      icon: <FaHome className="text-xl" />,
      path: "/dashboard/seller-home",
    },
    {
      name: t('dashboard.seller.manageMedicines.title'),
      icon: <FaPills className="text-xl" />,
      path: "/dashboard/manage-medicines",
    },
    {
      name: t('dashboard.seller.paymentHistory.title'),
      icon: <FaHistory className="text-xl" />,
      path: "/dashboard/seller-payments",
    },
    {
      name: t('dashboard.seller.askForAdvertisement.title'),
      icon: <FaBullhorn className="text-xl" />,
      path: "/dashboard/seller-advertise",
    },
  ];

  const userMenu = [
    {
      name: t('dashboard.user.paymentHistory.title'),
      icon: <FaHistory className="text-xl" />,
      path: "/dashboard/user-payments",
    },
  ];

  if (roleLoading) {
    return (
      <aside className="h-full min-h-screen w-20 md:w-64 bg-[#396961] text-white flex flex-col py-8 px-2 md:px-4 font-outfit shadow-lg transition-all duration-300">
        <div className="flex items-center justify-center h-full">
          <ManualLoading size="small" text={t('common.loading')} />
        </div>
      </aside>
    );
  }

  let menu = [];
  if (role === "admin") menu = adminMenu;
  else if (role === "seller") menu = sellerMenu;
  else menu = userMenu;

  return (
    <aside className="h-full min-h-screen w-20 md:w-64 bg-[#396961] text-white flex flex-col py-8 px-2 md:px-4 font-outfit shadow-lg transition-all duration-300">
      {/* Logo and Heading: show only on md+ */}
      <div className="hidden md:flex flex-col items-center mb-6">
        <Logo />
      </div>
      <h2 className="hidden md:block text-2xl font-bold mb-8 text-center tracking-wide">
        {t('dashboard.title')}
      </h2>
      <nav className="flex flex-col gap-2">
        {menu.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center justify-center md:justify-start gap-0 md:gap-3 px-0 md:px-4 py-3 rounded-lg transition font-medium hover:bg-[#28524c] ${isActive ? "bg-[#28524c]" : ""}`
            }
          >
            {item.icon}
            <span className="hidden md:inline">{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
