import React, {useEffect} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import * as actions from '../../store/actions';
import { useNavigate, Link, useSearchParams } from 'react-router-dom'

const AdminDashboard = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector(state => state.auth)

  useEffect(() => {
    if (!isLoggedIn) navigate('/');
  }, [isLoggedIn]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 p-8">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-blue-800">Admin Dashboard</h2>
          <button
            onClick={() => dispatch(actions.logout())}
            className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 focus:ring focus:ring-red-300"
          >
            Đăng xuất
          </button>
        </div>


        <p className="text-gray-600 mb-8 text-lg">
          Chào mừng bạn đến với trang quản trị. Dưới đây là các chức năng bạn có thể sử dụng:
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          <FeatureCard
            title="Quản lý người dùng"
            description="Xem và quản lý tất cả người dùng trong hệ thống."
            buttonLabel="Xem người dùng"
            bgColor="bg-blue-500"
            hoverColor="hover:bg-blue-600"
          />

          {/* Post Management */}
          <FeatureCard
            title="Quản lý bài viết"
            description="Quản lý các bài viết của người dùng."
            buttonLabel="Xem bài viết"
            bgColor="bg-green-500"
            hoverColor="hover:bg-green-600"
          />

          {/* Product Management */}
          <FeatureCard
            title="Quản lý sản phẩm"
            description="Quản lý các sản phẩm được đăng tải."
            buttonLabel="Xem sản phẩm"
            bgColor="bg-purple-500"
            hoverColor="hover:bg-purple-600"
          />

          {/* Statistics */}
          <FeatureCard
            title="Thống kê"
            description="Xem thống kê hệ thống và các báo cáo."
            buttonLabel="Xem thống kê"
            bgColor="bg-yellow-500"
            hoverColor="hover:bg-yellow-600"
          />

          {/* Customer Support */}
          <FeatureCard
            title="Hỗ trợ khách hàng"
            description="Quản lý yêu cầu và hỗ trợ khách hàng."
            buttonLabel="Xem hỗ trợ"
            bgColor="bg-teal-500"
            hoverColor="hover:bg-teal-600"
          />
        </div>
      </div>
    </div>
  );
};

/**
 * FeatureCard - Component for displaying individual features in the admin dashboard.
 */
const FeatureCard = ({ title, description, buttonLabel, bgColor, hoverColor }) => {
  return (
    <div className={`${bgColor} text-white p-6 rounded-lg shadow-md ${hoverColor}`}>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm mt-2">{description}</p>
      <button
        className={`mt-4 ${bgColor} px-4 py-2 rounded-full ${hoverColor}`}
      >
        {buttonLabel}
      </button>
    </div>
  );
};

export default AdminDashboard;
