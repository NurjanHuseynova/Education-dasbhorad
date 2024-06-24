import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaHome, FaUniversity, FaSchool, FaUserGraduate, FaSignOutAlt } from 'react-icons/fa';
import graduation from "../../../assets/img/graduation.png";

function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = JSON.parse(localStorage.getItem('user'));
    if (storedUsername.username) {
      setUsername(storedUsername.username);
    }
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const navLinkClasses = ({ isActive }) => 
    `flex items-center p-2 rounded-lg group ${
      isActive
        ? 'bg-gray-700 text-white dark:bg-gray-700 dark:text-white'
        : 'text-gray-900 dark:text-white hover:bg-gray-700 hover:text-white dark:hover:bg-gray-700'
    }`;

  return (
    <div>
      <button
        data-drawer-target="logo-sidebar"
        data-drawer-toggle="logo-sidebar"
        aria-controls="logo-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
        onClick={toggleSidebar}
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform transform bg-gray-50 dark:bg-gray-800 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto">
          <div className="flex items-center mb-5 gap-3">
            <img src={graduation} width={50} alt="Graduation"/>
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              {username}
            </span>
          </div>
          <ul className="space-y-2 font-medium">
            <li>
              <NavLink
                to="/home"
                className={navLinkClasses}
                onClick={closeSidebar}
              >
                <FaHome className="w-5 h-5" />
                <span className="ms-3">Home</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/universities"
                className={navLinkClasses}
                onClick={closeSidebar}
              >
                <FaUniversity className="w-5 h-5" />
                <span className="ms-3">Universities</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/schools"
                className={navLinkClasses}
                onClick={closeSidebar}
              >
                <FaSchool className="w-5 h-5" />
                <span className="ms-3">Schools</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/highSchools"
                className={navLinkClasses}
                onClick={closeSidebar}
              >
                <FaUserGraduate className="w-5 h-5" />
                <span className="ms-3">High Schools</span>
              </NavLink>
            </li>
         
          </ul>
          <button
            onClick={handleLogout}
            className="flex items-center p-2 mt-4 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group w-full"
          >
            <FaSignOutAlt className="w-5 h-5" />
            <span className="ms-3">Logout</span>
          </button>
        </div>
      </aside>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 sm:hidden"
          onClick={closeSidebar}
        ></div>
      )}

      <div className="sm:ml-[16rem]"></div>
    </div>
  );
}

export default Sidebar;
