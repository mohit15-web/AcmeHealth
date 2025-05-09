import React, { useContext, useState } from "react";
import { BellIcon, MenuIcon, UserIcon, XIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ title }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow px-4 py-3 flex items-center justify-between">
      {/* Left section: Menu button (mobile) + Title */}
      <div className="flex items-center space-x-4">
        <button
          type="button"
          className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 md:hidden hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className="sr-only">
            {mobileMenuOpen ? "Close menu" : "Open menu"}
          </span>
          {mobileMenuOpen ? (
            <XIcon className="w-5 h-5" />
          ) : (
            <MenuIcon className="w-5 h-5" />
          )}
        </button>
        <h1 className="text-xl font-semibold text-gray-700">{title}</h1>
      </div>

      <div className="flex items-center space-x-4 cursor-pointer">
        <button className="text-gray-500 hover:text-blue-600">
          <BellIcon className="w-5 h-5" />
        </button>

        <div
          className="w-8 h-8 flex items-center justify-center bg-blue-100 text-blue-700 rounded-full font-semibold"
          onClick={() => navigate("/profile")}
        >
          <UserIcon />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
