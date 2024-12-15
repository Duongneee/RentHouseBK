import { Navigate, Outlet } from 'react-router-dom';
import { System } from '../containers/system';

const UserRoute = ({ isAuthenticated, role, dispatch }) => {

  // Nếu người dùng là Admin, chuyển hướng đến trang /admin
  if (role === "Admin") {
    return <Navigate to='/admin/thong-ke' />;
  }

  return (
    <System>
      <Outlet />
    </System>
  );
};

export default UserRoute;
