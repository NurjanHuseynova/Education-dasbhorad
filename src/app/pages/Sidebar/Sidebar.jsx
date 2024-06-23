import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import graduation from "../../../assets/img/graduation.png"

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
          <div className="flex items-center ps-2.5 mb-5 gap-3">
          <img src={graduation} width={50}/>
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              {username}
            </span>
          </div>
          <ul className="space-y-2 font-medium">
            <li>
              <NavLink
                to="/universities"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                onClick={closeSidebar}
              >
                <span className="ms-3 text-white">Universities</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/schools"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                onClick={closeSidebar}
              >
                <span className="ms-3 text-white">Schools</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/highSchools"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                onClick={closeSidebar}
              >
                <span className="ms-3 text-white">High Schools</span>
              </NavLink>
            </li>
          </ul>
          <button
            onClick={handleLogout}
            className="flex items-center p-2 mt-4 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group w-full"
          >
            <svg width="21" height="18" viewBox="0 0 21 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.324 9.79624L13.657 17.6699C13.0618 18.3729 12.03 17.8808 12.03 16.8732V12.3739H6.63288C6.10507 12.3739 5.68045 11.8725 5.68045 11.2491V6.74988C5.68045 6.12654 6.10507 5.62506 6.63288 5.62506H12.03V1.12581C12.03 0.122852 13.0578 -0.373941 13.657 0.329067L20.324 8.20276C20.6931 8.64331 20.6931 9.35569 20.324 9.79624ZM8.22026 17.4356V15.5609C8.22026 15.2516 8.00596 14.9985 7.74404 14.9985H4.41054C3.70813 14.9985 3.14064 14.3283 3.14064 13.4988V4.50025C3.14064 3.6707 3.70813 3.0005 4.41054 3.0005H7.74404C8.00596 3.0005 8.22026 2.74742 8.22026 2.43809V0.563403C8.22026 0.25408 8.00596 0.000996803 7.74404 0.000996803H4.41054C2.30726 0.000996803 0.60083 2.01629 0.60083 4.50025V13.4988C0.60083 15.9827 2.30726 17.998 4.41054 17.998H7.74404C8.00596 17.998 8.22026 17.7449 8.22026 17.4356Z" fill="#FFFFFF" />
            </svg>
            <span className="ms-3 text-white">Logout</span>
          </button>
        </div>
      </aside>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 sm:hidden"
          onClick={closeSidebar}
        ></div>
      )}

      <div className="sm:ml-[16rem]">
      </div>
    </div>
  );
}

export default Sidebar;
