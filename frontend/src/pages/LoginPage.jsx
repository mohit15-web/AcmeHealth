import React from "react";
import LoginForm from "../components/layout/LoginForm";
import AcmeHealthLogo from "../components/layout/AcmeHealth";

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex flex-col md:flex-row">
      {/* Left panel with medical illustration */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-teal-500 to-blue-600 p-12 items-center justify-center">
        <div className="max-w-md">
          <div className="text-white mb-6">
            <AcmeHealthLogo />
          </div>
          <h1 className="text-4xl font-bold text-white mb-6">
            Welcome to your healthcare dashboard
          </h1>
          <p className="text-blue-100 text-lg mb-8">
            Access your patient records, schedule appointments, and manage your healthcare experience all in one place.
          </p>
          <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
            <p className="text-white font-medium italic">
              "Acme Health has revolutionized how we deliver patient care, streamlining our processes and improving outcomes."
            </p>
            <div className="mt-4 flex items-center">
              <div className="w-10 h-10 rounded-full bg-teal-400 flex items-center justify-center text-blue-800 font-bold">
                DR
              </div>
              <div className="ml-3">
                <p className="text-white font-medium">Dr. Jane Roberts</p>
                <p className="text-blue-100 text-sm">Chief Medical Officer</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right panel with login form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <div className="flex justify-center mb-6 md:hidden">
              <AcmeHealthLogo />
            </div>
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              Sign in to your account
            </h2>
            <p className="mt-2 text-gray-600">
              Enter your credentials to access the dashboard
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <LoginForm />
          </div>
          
          <div className="text-center text-xs text-gray-500 mt-8">
            <p>© 2025 Acme Health. All rights reserved.</p>
            <div className="mt-2 flex justify-center space-x-4">
              <a href="#" className="hover:text-teal-600">Privacy Policy</a>
              <a href="#" className="hover:text-teal-600">Terms of Service</a>
              <a href="#" className="hover:text-teal-600">Contact</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;