import React, { useCallback, useEffect, useRef } from 'react'
import logo from '../../asset/bkrm.png'
import Button from '../../components/Button'
import icons from '../../untils/icon'
import { useNavigate, Link, useSearchParams } from 'react-router-dom'
import { path } from '../../untils/constant'

const { FaRegNewspaper, IoLogIn, GiArchiveRegister } = icons


const Header = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const headerRef = useRef()
  const goLogin = useCallback((flag) => {
    navigate(path.LOGIN, { state: { flag } })
  }, [])

useEffect(() => {
  headerRef.current.scrollIntoView({behavior: 'smooth', block: 'start'})
},[searchParams.get('page')])  
  
return (
    <div ref={headerRef} className='w-1100 px-5 flex items-center justify-between'>
      <Link to = '/'>
        <img src={logo}
          alt="logo"
          className='w-[270px] h-[100px] object-constant'
        />
      </Link>


      <div className='flex items-center gap-1'>
        <small>Phòng Trọ BK xin chào ! ! !</small>
        <Button text={'Đăng nhập'} textColor='text-white' bgColor='bg-[#3961fb]' IcAfter={IoLogIn} onClick={() => goLogin(false)} />
        <Button text={'Đăng kí'} textColor='text-white' bgColor='bg-[#33CC33]' IcAfter={GiArchiveRegister} onClick={() => goLogin(true)} />
        <Button text={'Đăng tin miễn phí'} textColor='text-white' bgColor='bg-secondary2' IcAfter={FaRegNewspaper} />
      </div>
    </div>
  )
}

export default Header