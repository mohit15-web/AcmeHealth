import React, { useContext, useState } from "react";
import { toast } from "sonner";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [patientName, setPatientName] = useState(""); // State for patient's name
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);  // Toggle between login and signup
  const { login, signup } = useContext(AuthContext);
  const navigate = useNavigate();
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      let success;
      if (isSignup) {
        success = await signup(email, password, patientName);  // Pass patientName to signup
      } else {
        success = await login(email, password);  // Regular login
      }
      if (success) {
        navigate('/dashboard');
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      setError(`An error occurred during login : ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md">
      {error && (
        <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4">
          {error}
        </div>
      )}
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
            <Mail size={18} />
          </div>
          <input
            id="email"
            type="email"
            placeholder="name@acmehealth.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 
              focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
            required
          />
        </div>
      </div>

      {/* Add Patient Name Field when Signup */}
      {isSignup && (
        <div className="space-y-2">
          <label htmlFor="patientName" className="block text-sm font-medium text-gray-700">
            Patient Name
          </label>
          <div className="relative">
            <input
              id="patientName"
              type="text"
              placeholder="Enter patient's name"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              className="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 
                focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
              required
            />
          </div>
        </div>
      )}

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <a
            href="#"
            className="text-xs text-teal-600 hover:text-teal-500 font-medium"
            onClick={(e) => {
              e.preventDefault();
              toast.info("Password reset functionality would go here");
            }}
          >
            Forgot password?
          </a>
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
            <Lock size={18} />
          </div>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 
              focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-500"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      <div className="flex items-center">
        <input
          id="remember"
          type="checkbox"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
          className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
        />
        <label htmlFor="remember" className="ml-2 block text-sm text-gray-900">
          Remember me
        </label>
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white py-2 px-4 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors"
        disabled={isLoading}
      >
        {isLoading ? "Processing..." : isSignup ? "Sign up" : "Sign in"}
      </button>

      <div className="text-center text-sm">
        <span className="text-gray-500">{isSignup ? "Already have an account?" : "Don't have an account?"} </span>
        <a
          href="#"
          className="text-teal-600 hover:text-teal-500 font-medium"
          onClick={(e) => {
            e.preventDefault();
            setIsSignup(!isSignup); // Toggle between signup and login
          }}
        >
          {isSignup ? "Login" : "Create account"}
        </a>
      </div>
    </form>
  );
};

export default LoginForm;
