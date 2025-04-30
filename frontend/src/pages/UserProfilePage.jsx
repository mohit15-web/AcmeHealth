import { Bell, LogOut, LogOutIcon, UserIcon } from "lucide-react";
import { useContext, useState } from "react";
import { navItems } from "../utils/utils";
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';

const UserProfilePage = () => {
    const [activeTab, setActiveTab] = useState('personal');
    const [editMode, setEditMode] = useState(false);
    const navigate = useNavigate();
    const { user, logout } = useContext(AuthContext);
    
    const TempUser = {
      id: '68108dd0d8b508263e7cd8a0',
      name: user?.patientName || 'John Doe',
      email: 'sarah.johnson@example.com',
      role: 'Patient',
      memberSince: 'January 2023',
      phone: '(555) 123-4567',
      address: '123 Health St, Medical City, MC 12345',
      dateOfBirth: '04/12/1985',
      bloodType: 'O+',
      allergies: ['Penicillin', 'Peanuts'],
      emergencyContact: 'Michael Johnson - (555) 987-6543'
    };
    
    return (
      <div className="bg-gray-50 min-h-screen">
        {/* Dashboard Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0 flex items-center">
                  <span className="text-blue-600 font-bold text-xl">Acme Health</span>
                </div>
              </div>
              <div className="flex items-center">
                <Bell className="h-6 w-6 text-gray-500 mr-4" />
                <div className="relative">
                 <UserIcon className="h-6 w-6 text-gray-500" />
                </div>
              </div>
            </div>
          </div>
        </header>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Sidebar */}
            <div className="w-full md:w-64 flex-shrink-0">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex flex-col items-center">
                    <UserIcon className="w-12 h-12 mb-2" />
                    <h2 className="text-lg font-medium text-gray-900">{TempUser.name}</h2>
                    <p className="text-sm text-gray-500">{TempUser.role}</p>
                  </div>
                </div>
                
                <nav className="py-2">
                  <ul>
                    {navItems.map((item) => (
                      <li key={item.name} onClick={() => navigate(item.path)}>
                        <a 
                          className={`flex items-center px-6 py-3 text-sm font-medium ${
                            item.active 
                              ? 'text-blue-600 bg-blue-50' 
                              : 'text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          <item.icon className="h-5 w-5 mr-3" />
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
                
                <div className="p-4 border-t border-gray-200">
                  <button className="flex items-center text-sm font-medium text-gray-700 hover:text-red-600" onClick={() => logout()}>
                    <LogOutIcon className="h-5 w-5 mr-3" />
                    Log out
                  </button>
                </div>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="flex-1">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="border-b border-gray-200">
                  <div className="px-6 py-4 flex justify-between items-center">
                    <h1 className="text-xl font-semibold text-gray-900">User Profile</h1>
                    <button 
                      onClick={() => setEditMode(!editMode)}
                      className={`px-4 py-2 rounded-md text-sm font-medium ${
                        editMode 
                          ? 'bg-gray-200 text-gray-800' 
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      {editMode ? 'Cancel' : 'Edit Profile'}
                    </button>
                  </div>
                  
                  <div className="px-6 pb-4">
                    <nav className="flex space-x-8">
                      {['Personal Information', 'Medical Information', 'Security'].map((tab) => {
                        const value = tab.toLowerCase().split(' ')[0];
                        return (
                          <button
                            key={tab}
                            onClick={() => setActiveTab(value)}
                            className={`py-2 px-1 border-b-2 text-sm font-medium ${
                              activeTab === value
                                ? 'border-blue-600 text-blue-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                          >
                            {tab}
                          </button>
                        );
                      })}
                    </nav>
                  </div>
                </div>
                
                <div className="p-6">
                  {activeTab === 'personal' && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name
                          </label>
                          {editMode ? (
                            <input 
                              type="text" 
                              defaultValue={TempUser.name}
                              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            />
                          ) : (
                            <p className="text-gray-900">{TempUser.name}</p>
                          )}
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                          </label>
                          {editMode ? (
                            <input 
                              type="email" 
                              defaultValue={TempUser.email}
                              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            />
                          ) : (
                            <p className="text-gray-900">{TempUser.email}</p>
                          )}
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Phone Number
                          </label>
                          {editMode ? (
                            <input 
                              type="tel" 
                              defaultValue={TempUser.phone}
                              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            />
                          ) : (
                            <p className="text-gray-900">{TempUser.phone}</p>
                          )}
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            User ID
                          </label>
                          <p className="text-gray-900">{TempUser.id}</p>
                        </div>
                        
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Address
                          </label>
                          {editMode ? (
                            <input 
                              type="text" 
                              defaultValue={TempUser.address}
                              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            />
                          ) : (
                            <p className="text-gray-900">{TempUser.address}</p>
                          )}
                        </div>
                      </div>
                      
                      {editMode && (
                        <div className="flex justify-end pt-4">
                          <button 
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                            onClick={() => setEditMode(false)}
                          >
                            Save Changes
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {activeTab === 'medical' && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Date of Birth
                          </label>
                          {editMode ? (
                            <input 
                              type="text" 
                              defaultValue={TempUser.dateOfBirth}
                              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            />
                          ) : (
                            <p className="text-gray-900">{TempUser.dateOfBirth}</p>
                          )}
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Blood Type
                          </label>
                          {editMode ? (
                            <select 
                              defaultValue={TempUser.bloodType}
                              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            >
                              {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(type => (
                                <option key={type} value={type}>{type}</option>
                              ))}
                            </select>
                          ) : (
                            <p className="text-gray-900">{TempUser.bloodType}</p>
                          )}
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Allergies
                          </label>
                          {editMode ? (
                            <input 
                              type="text" 
                              defaultValue={TempUser.allergies.join(', ')}
                              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            />
                          ) : (
                            <p className="text-gray-900">{TempUser.allergies.join(', ')}</p>
                          )}
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Emergency Contact
                          </label>
                          {editMode ? (
                            <input 
                              type="text" 
                              defaultValue={TempUser.emergencyContact}
                              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            />
                          ) : (
                            <p className="text-gray-900">{TempUser.emergencyContact}</p>
                          )}
                        </div>
                      </div>
                      
                      {editMode && (
                        <div className="flex justify-end pt-4">
                          <button 
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                            onClick={() => setEditMode(false)}
                          >
                            Save Changes
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {activeTab === 'security' && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Password</h3>
                        <div className="grid grid-cols-1 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Current Password
                            </label>
                            <input 
                              type="password" 
                              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              New Password
                            </label>
                            <input 
                              type="password" 
                              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Confirm New Password
                            </label>
                            <input 
                              type="password" 
                              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            />
                          </div>
                        </div>
                        <div className="mt-4">
                          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
                            Update Password
                          </button>
                        </div>
                      </div>
                      
                      <div className="border-t border-gray-200 pt-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Two-Factor Authentication</h3>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-gray-700">Protect your account with 2FA</p>
                            <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                          </div>
                          <div>
                            <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-md">
                              Enable 2FA
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default UserProfilePage;