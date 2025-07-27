import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router";

const UserRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  if (!user || user.role !== "user") {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Forbidden</h2>
        <p>You do not have access to this page.</p>
        <Navigate to="/dashboard" replace />
      </div>
    );
  }
  return children;
};

export default UserRoute; 
