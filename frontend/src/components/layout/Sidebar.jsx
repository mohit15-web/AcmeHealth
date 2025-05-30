import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LogOutIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { navItems } from "../../utils/utils";

const Sidebar = ({ isCollapsed, toggleCollapse }) => {
  const { user, logout } = useContext(AuthContext);

  const navigate = useNavigate();

  return (
    <div
      className={`fixed top-0 left-0 h-screen ${
        isCollapsed ? "w-20" : "w-64"
      } bg-white shadow-md flex flex-col transition-all duration-300 z-50`}
    >
      <div className="p-4 flex items-center justify-between cursor-pointer">
        {!isCollapsed && (
          <span
            className="text-xl font-bold text-blue-600 cursor-pointer"
            onClick={() => navigate("/dashboard")}
          >
            Acme Health
          </span>
        )}
        <button onClick={toggleCollapse} className="cursor-pointer">
          {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
        </button>
      </div>

      {user && !isCollapsed && (
        <div className="px-4 mb-6">
          <div className="text-sm text-gray-500">
            Welcome {user.patientName}{" "}
          </div>
        </div>
      )}

      <nav className="flex-1 space-y-2 px-2">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center space-x-3 p-2 rounded-md transition ${
                isActive
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:bg-gray-100"
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            {!isCollapsed && <span>{item.name}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t">
        <button
          onClick={logout}
          className="flex items-center space-x-2 text-gray-600 hover:text-red-600 cursor-pointer"
        >
          <LogOutIcon className="w-5 h-5 " />
          {!isCollapsed && <span onClick={() => logout()}>Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
