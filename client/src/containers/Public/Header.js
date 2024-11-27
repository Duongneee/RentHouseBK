import React, { useCallback, useEffect, useRef, useState } from 'react'
import logo from '../../asset/bkrm.png'
import { Button, User } from '../../components'
import icons from '../../untils/icon'
import { useNavigate, Link, useSearchParams } from 'react-router-dom'
import { path } from '../../untils/constant'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../../store/actions'
import menuManage from '../../untils/menuManage'
import { IoLogOut } from "react-icons/io5";
import { FaChevronDown } from "react-icons/fa";


const { FaRegNewspaper, IoLogIn, GiArchiveRegister } = icons


const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isLoggedIn } = useSelector(state => state.auth)
  const { currentData } = useSelector(state => state.user)
  const [isShowMenu, setIsShowMenu] = useState(false)
  const [searchParams] = useSearchParams()
  const headerRef = useRef()

  const goLogin = useCallback((flag) => {
    navigate(path.LOGIN, { state: { flag } })
  }, [])

  const newPost = useCallback(() => {
    navigate('he-thong/tao-moi-bai-dang')
  }, [])

  useEffect(() => {
    headerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [searchParams.get('page')])

  useEffect(() => {
    if (!isLoggedIn) setIsShowMenu(false);
  }, [isLoggedIn]);

  return (
    <div ref={headerRef} className='w-1100 px-5 flex items-center justify-between'>
      <Link to='/'>
        <img src={logo}
          alt="logo"
          className='w-[270px] h-[100px] object-constant'
        />
      </Link>


      <div className='flex items-center gap-1'>
        {!isLoggedIn && <div className='flex items-center gap-1'>
          <small>Phòng Trọ BK xin chào ! ! !</small>
          <Button
            text={'Đăng nhập'}
            textColor='text-white'
            bgColor='bg-[#3961fb]'
            IcAfter={IoLogIn}
            onClick={() => goLogin(false)} />
          <Button
            text={'Đăng kí'}
            textColor='text-white'
            bgColor='bg-[#33CC33]'
            IcAfter={GiArchiveRegister}
            onClick={() => goLogin(true)} />
        </div>}

        {isLoggedIn && <div className='flex items-center gap-1 relative z-10'>
          <User />
          <Button
            text={'Quản lí tài khoản'}
            textColor='text-white'
            bgColor='bg-blue-700'
            IcAfter={FaChevronDown}
            onClick={() => setIsShowMenu(prev => !prev)} />

          {isShowMenu &&
            <div className='absolute min-w-200 top-full bg-white shadow-md rounded-md p-4 right-0 flex flex-col gap-2'>
              {menuManage.map(item => {
                return (
                  <Link className='hover:text-orange-500 text-blue-500 flex items-center hover:scale-110 transition-transform duration-200 gap-1 border-b border-gray-200 py-2' key={item.id} to={item?.path}>
                    {item?.icon}
                    {item.text}
                  </Link>
                )
              })}
              <span className='cursor-pointer hover:text-orange-500 text-blue-500 flex items-center gap-1 border-b border-gray-200 py-2 hover:scale-110 transition-transform duration-200  '
                onClick={() => {
                  dispatch(actions.logout())
                }
                }
              >
                <IoLogOut />
                Đăng xuất
              </span>
            </div>
          }

        </div>}

        <Button text={'Đăng tin mới'} textColor='text-white' bgColor='bg-secondary2' IcAfter={FaRegNewspaper} onClick={() => newPost()} />
      </div>
    </div>
  )
}

export default Header