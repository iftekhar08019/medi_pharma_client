import React from "react";
import RegistrationForm from "./RegistrationForm";
import { useNavigate, useLocation } from "react-router";

const RegistrationPage = ({ onSignInClick }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect after registration
  const handleRegisterSuccess = () => {
    const from = location.state?.from || "/";
    navigate(from, { replace: true });
  };

  return (
    <RegistrationForm onSignInClick={onSignInClick} onRegisterSuccess={handleRegisterSuccess} />
  );
};

export default RegistrationPage; 
