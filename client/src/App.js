import { Routes, Route } from 'react-router-dom'
import { Home, Login, RentalApartment, RentalHouse, RentalRoom, RentalSpace, Homepage, DetailPost } from './containers/Public';
import { DepositMoney,Return } from './containers/system'
import { path } from './untils/constant';

function App() {
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
          <Route path={'chi-tiet/*'} element={<DetailPost />}/>
          <Route path={'he-thong/nap-tien'} element={<DepositMoney />}/>
          <Route path={'he-thong/nap-tien/return'} element={<Return />}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
