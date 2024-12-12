import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import * as actions from '../store/actions';
import { Admin } from '../containers/System';

const AdminRoute = ({ isAuthenticated, role, dispatch }) => {
  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(actions.logout());
    }
  }, [isAuthenticated, dispatch]);

  if (role === "Admin") {
    return (
      <Admin>   {/* Đưa AdminLayout vào để hiển thị toàn bộ trang */}
        <Outlet />    {/* Các route con của Admin */}
      </Admin>
    );
  }

  return <Navigate to='/unauthorized' />;  // Redirect if not admin
};

export default AdminRoute;
