import { Routes, Route } from 'react-router-dom'
import { Home, Login, RentalApartment, RentalHouse, RentalRoom, RentalSpace, Homepage, DetailPost } from './containers/Public';
import { path } from './untils/constant'
import {CreatePost, System} from './containers/System'
import * as actions from './store/actions'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

function App() {
  const dispatch = useDispatch()
  const { isLoggedIn } = useSelector(state => state.auth)
  useEffect(()=>{
    setTimeout(() =>{
      isLoggedIn && dispatch(actions.getCurrent())
    },500)
  }, [isLoggedIn])
  

  return (
    <div className=" bg-[#c0c0c0]">
      <Routes>
        <Route path={path.HOME} element={< Home/>}>
          <Route path='*' element={<Homepage />}/>
          <Route path={path.HOME__PAGE} element={<Homepage />}/>
          <Route path={path.LOGIN} element={<Login />}/>
          <Route path={path.CHO_THUE_CAN_HO} element={<RentalApartment />}/>
          <Route path={path.NHA_CHO_THUE} element={<RentalHouse />}/>
          <Route path={path.CHO_THUE_PHONG_TRO} element={<RentalRoom />}/>
          <Route path={path.CHO_THUE_MAT_BANG} element={<RentalSpace />}/>
          <Route path={path.DETAIL_POST__TITLE__POSTID} element={<DetailPost />}/>
          <Route path={'chi-tiet/'} element={<DetailPost />}/>
        </Route>
        <Route path={path.SYSTEM} element={< System/>}>
          <Route path={path.CREATE_POST} element={< CreatePost/>} />
        </Route>

      </Routes>
    </div>
  );
}

export default App;
