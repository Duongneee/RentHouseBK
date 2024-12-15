import { Navigate, Outlet } from 'react-router-dom';
import { Home } from '../containers/Public';

const UserRoute = ({ isAuthenticated, role, dispatch }) => {
  // Nếu người dùng không đăng nhập

  // Nếu người dùng là Admin, chuyển hướng đến trang /admin
  if (role === "Admin") {
    return <Navigate to='/admin/thong-ke' />;
  }

  return (
    <Home>
      <Outlet />
    </Home>
  );
};

export default UserRoute;
