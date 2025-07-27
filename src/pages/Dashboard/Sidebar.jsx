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


const adminMenu = [
  {
    name: "Admin Home",
    icon: <FaHome className="text-xl" />,
    path: "/dashboard/admin-home",
  },
  {
    name: "Manage Users",
    icon: <FaUsers className="text-xl" />,
    path: "/dashboard/manage-users",
  },
  {
    name: "Manage Category",
    icon: <FaListAlt className="text-xl" />,
    path: "/dashboard/manage-category",
  },
  {
    name: "Payment Management",
    icon: <FaMoneyCheckAlt className="text-xl" />,
    path: "/dashboard/payment-management",
  },
  {
    name: "Sales Report",
    icon: <FaChartBar className="text-xl" />,
    path: "/dashboard/sales-report",
  },
  {
    name: "Manage Banner Advertise",
    icon: <FaAd className="text-xl" />,
    path: "/dashboard/manage-banner",
  },
];

const sellerMenu = [
  {
    name: "Seller Home",
    icon: <FaHome className="text-xl" />,
    path: "/dashboard/seller-home",
  },
  {
    name: "Manage Medicines",
    icon: <FaPills className="text-xl" />,
    path: "/dashboard/manage-medicines",
  },
  {
    name: "Payment History",
    icon: <FaHistory className="text-xl" />,
    path: "/dashboard/seller-payments",
  },
  {
    name: "Ask For Advertisement",
    icon: <FaBullhorn className="text-xl" />,
    path: "/dashboard/seller-advertise",
  },
];

const userMenu = [
  {
    name: "User Home",
    icon: <FaHome className="text-xl" />,
    path: "/dashboard/user-home",
  },
  {
    name: "Payment History",
    icon: <FaHistory className="text-xl" />,
    path: "/dashboard/user-payments",
  },
];

const Sidebar = () => {
  const { role, roleLoading } = useUserRole();

  if (roleLoading) {
    return (
      <aside className="h-full min-h-screen w-20 md:w-64 bg-[#396961] text-white flex flex-col py-8 px-2 md:px-4 font-outfit shadow-lg transition-all duration-300">
        <h1 className="text-center text-white text-lg font-bold">Loading...</h1>
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
        Dashboard
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
