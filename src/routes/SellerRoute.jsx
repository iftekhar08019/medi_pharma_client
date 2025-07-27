import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router";
import useUserRole from "../hooks/useUserRole";

const SellerRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const { role, roleLoading } = useUserRole();
  if (loading || roleLoading) {
    return <span className="loading loading-spinner loading-xl"></span>;
  }
      if (!user || role !== 'seller') {
        return <Navigate state={{ from: location.pathname }} to="/forbidden"></Navigate>
    }

    return children;
 
};

export default SellerRoute; 
