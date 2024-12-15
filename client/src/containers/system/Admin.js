import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { path } from '../../untils/constant';
import HeaderAdmin from './HeaderAdmin'; // Component Header
import Sidebar from './SidebarAdmin'; // Component Sidebar

const Admin = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  // Nếu chưa đăng nhập, chuyển hướng về trang login
  if (!isLoggedIn) return <Navigate to={`/${path.LOGIN}`} replace={true} />;

  return (
    <div className="w-full flex flex-col bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex-none">
        <HeaderAdmin />
      </div>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-[256px] bg-white shadow-md fixed top-0 bottom-0 left-0 z-10">
          <Sidebar />
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-gray-100 p-6 ml-[256px] overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Admin;
