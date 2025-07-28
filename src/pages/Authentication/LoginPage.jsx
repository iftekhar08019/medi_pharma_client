import React, { useState } from "react";
import SignInForm from "./SignInForm";
import RegistrationPage from "./RegistrationPage";
import { useNavigate, useLocation } from "react-router";
import { Helmet } from 'react-helmet';


const LoginPage = () => {
  const [showRegister, setShowRegister] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();


  // Animation classes
  const transitionClass =
    "transition-all duration-700 ease-in-out w-full h-full flex flex-col md:flex-row";

  // Redirect after login
  const handleLoginSuccess = () => {
    const from = location.state?.from || "/";
    navigate(from, { replace: true });
  };

  return (
    <>
      <Helmet>
        <title>MediPharma - Login</title>
      </Helmet>
      <div className="min-h-screen w-full flex items-center justify-center px-2 py-6">
        <div className="w-full max-w-4xl h-auto md:h-[600px] rounded-3xl overflow-hidden flex relative border-[#396961] border-2 shadow-xl">
          {/* Animated container */}
          <div
            className={transitionClass}
            style={{
              transform: showRegister ? "translateX(-100%)" : "translateX(0%)",
              minHeight: "400px",
            }}
          >
            {/* Login Side */}
            <div className="w-full md:w-1/2 h-full flex flex-col items-center justify-center p-4 sm:p-8">
              <SignInForm
                onClose={() => {}}
                onSignUpClick={() => setShowRegister(true)}
                onLoginSuccess={handleLoginSuccess}
              />
            </div>
            {/* LOGIN Text Side */}
            <div className="hidden md:flex w-1/2 h-full items-center justify-center bg-[#396961]">
              <h1 className="text-4xl lg:text-6xl font-extrabold text-white tracking-widest">LOGIN</h1>
            </div>
          </div>
          {/* RegistrationPage overlays with animation */}
          <div
            className={transitionClass + " absolute top-0 left-0"}
            style={{
              transform: showRegister ? "translateX(0%)" : "translateX(100%)",
              zIndex: showRegister ? 10 : -1,
              pointerEvents: showRegister ? "auto" : "none",
              minHeight: "400px",
            }}
          >
            {/* Register Text Side */}
            <div className="hidden md:flex w-1/2 h-full items-center justify-center bg-[#396961]">
              <h1 className="text-4xl lg:text-6xl font-extrabold text-white tracking-widest">REGISTER</h1>
            </div>
            {/* Registration Form Side */}
            <div className="w-full md:w-1/2 h-full flex items-center justify-center text-sm p-4 sm:p-8">
              <RegistrationPage onSignInClick={() => setShowRegister(false)} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage; 
