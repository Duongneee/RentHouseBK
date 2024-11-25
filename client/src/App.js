import { Routes, Route } from 'react-router-dom'
//import { Home, Login, RentalApartment, RentalHouse, RentalRoom, RentalSpace, Homepage, DetailPost } from './containers/Public';
import { DepositMoney, Return, TransList } from './containers/system'
import { path } from './untils/constant';
import { Home, Login, Categories, Homepage, DetailPost, FilterResult } from './containers/Public';

import {CreatePost, System, ManagePost} from './containers/system'
import * as actions from './store/actions'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'


function App() {
  const dispatch = useDispatch()
  const { isLoggedIn } = useSelector(state => state.auth)
  useEffect(() => {
    setTimeout(() => {
      isLoggedIn && dispatch(actions.getCurrent())
    }, 500)
  }, [isLoggedIn])


  return (
    <div className=" bg-[#c0c0c0] overflow-hidden">
      <Routes>
        <Route path={path.HOME} element={< Home />}>
          <Route path='*' element={<Homepage />} />
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

        <Route path={path.SYSTEM} element={< System />}>
          <Route path={path.CREATE_POST} element={< CreatePost />} />
          <Route path={path.TRANSACTION} element={<DepositMoney />} />
          <Route path={path.RETURNTRANSACTION} element={<Return />} />
          <Route path={path.TRANSACTIONLIST} element={< TransList/>} />
          <Route path={path.MANAGE_POST} element={< ManagePost/>} />

        </Route>

      </Routes>
    </div>
  );
}

export default App;
