import React, { useCallback } from 'react'
import logo from '../../asset/bkrm.png'
import Button from '../../components/Button'
import icons from '../../untils/icon'
import {useNavigate} from 'react-router-dom'
import { path } from '../../untils/constant'

const {FaRegNewspaper,IoLogIn, GiArchiveRegister } = icons


const Header = () => {
  const navigate = useNavigate()
  const goLogin = useCallback(()=>{
    navigate(path.LOGIN)
  },[])
  return (
    <div className = 'w-full px-5 flex items-center justify-between'>
      <img src={logo}
      alt="logo"
      className = 'w-[270px] h-[100px] object-constant'
      />
      
      <div className = 'flex items-center gap-1'>
      <small>Phòng Trọ BK xin chào ! ! !</small>
        <Button text = {'Đăng nhập'} textColor = 'text-white' bgColor ='bg-[#3961fb]' IcAfter={IoLogIn} onClick={goLogin} />
        <Button text = {'Đăng kí'} textColor = 'text-white' bgColor ='bg-[#33CC33]'  IcAfter={GiArchiveRegister}/>
        <Button text = {'Đăng tin miễn phí'} textColor = 'text-white' bgColor ='bg-secondary2' IcAfter={FaRegNewspaper}  />
      </div>

    </div>
  )
}

export default Header