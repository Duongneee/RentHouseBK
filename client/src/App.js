import { Routes, Route, Navigate } from 'react-router-dom';
import { DepositMoney, Return, TransList } from './containers/system';
import { path } from './untils/constant';
import { Home, Login, Categories, Homepage, DetailPost, FilterResult } from './containers/Public';
import { CreatePost, System, ManagePost, EditAccount, Bookmark, Admin, AdminManagePost, AdminManageUser } from './containers/system';
import AdminRoute from "./untils/AdminRoute";
import UserRoute from './untils/UserRoute';
import SystemUserRoute from './untils/SystemUserRoute';
import * as actions from './store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

function App() {
  const dispatch = useDispatch();
  const { isLoggedIn, isAdmin } = useSelector((state) => state.auth);  // Assuming state.auth contains isLoggedIn and isAdmin

  useEffect(() => {
    setTimeout(() => {
      if (isLoggedIn) {
        dispatch(actions.getCurrent());  // Fetch current user info
      }
    }, 500);
  }, [isLoggedIn, dispatch]);

  return (
    <div className="bg-[#DEFFFF] overflow-hidden">
      <Routes>
        <Route path={path.HOME} element={
          <UserRoute isAuthenticated={isLoggedIn} role={isAdmin ? "Admin" : "User"} dispatch={dispatch}>
            <Home />
          </UserRoute>
        }>
          <Route path="*" element={<Homepage />} />
          <Route path={path.HOME__PAGE} element={<Homepage />} />
          <Route path={path.LOGIN} element={<Login />} />
          <Route path={path.CHO_THUE_CAN_HO} element={<Categories categoryCode={"CTCH"} />} />
          <Route path={path.NHA_CHO_THUE} element={<Categories categoryCode={"NCT"} />} />
          <Route path={path.CHO_THUE_PHONG_TRO} element={<Categories categoryCode={"CTPT"} />} />
          <Route path={path.CHO_THUE_MAT_BANG} element={<Categories categoryCode={"CTMB"} />} />
          <Route path={path.DETAIL_POST__TITLE__POSTID} element={<DetailPost />} />
          <Route path={'chi-tiet/'} element={<DetailPost />} />
          <Route path={path.FILTER} element={<FilterResult />} />
        </Route>

        {/* System Routes (User Route) */}
        <Route path={path.SYSTEM} element={
          <SystemUserRoute isAuthenticated={isLoggedIn} role={isAdmin ? "Admin" : "User"} dispatch={dispatch}>
            <System />
          </SystemUserRoute>
        }>
          <Route path={path.CREATE_POST} element={<CreatePost />} />
          <Route path={path.TRANSACTION} element={<DepositMoney />} />
          <Route path={path.RETURNTRANSACTION} element={<Return />} />
          <Route path={path.TRANSACTIONLIST} element={<TransList />} />
          <Route path={path.MANAGE_POST} element={<ManagePost />} />
          <Route path={path.BOOKMARK} element={<Bookmark />} />
          <Route path={path.EDIT_ACCOUNT} element={<EditAccount />} />
        </Route>

        {/* Admin Routes */}
        <Route path={path.ADMIN} element={
          <AdminRoute isAuthenticated={isLoggedIn} role={isAdmin ? "Admin" : "User"} dispatch={dispatch}>
            <Admin />
          </AdminRoute>
        }>
          <Route path={path.ADMIN_MANAGE_POST} element={<AdminManagePost />} />
          <Route path={path.ADMIN_MANAGE_USER} element={<AdminManageUser />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
