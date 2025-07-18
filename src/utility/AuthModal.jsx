import React, { useState } from "react";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";


const AuthModal = ({ isOpen, onClose }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="relative w-full max-w-xl h-[570px] perspective">
        <div
          className={`absolute w-full h-full transition-transform duration-500 [transform-style:preserve-3d] ${
            isFlipped ? "rotate-y-180" : ""
          }`}
        >
          {/* Front: Sign In */}
          <div className="absolute w-full h-full [backface-visibility:hidden]">
            <SignInForm
              onClose={onClose}
              onSignUpClick={() => setIsFlipped(true)}
            />
          </div>
          {/* Back: Sign Up */}
          <div className="absolute w-full h-full rotate-y-180 [backface-visibility:hidden]">
            <SignUpForm
              onClose={onClose}
              onSignInClick={() => setIsFlipped(false)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
