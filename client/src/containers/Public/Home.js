import React, { useEffect } from 'react'
import Header from './Header'
import { Outlet, useLocation } from 'react-router-dom'
import { Navigation, Search } from './index'
import * as actions from '../../store/actions'
import { useDispatch, useSelector } from 'react-redux'
import { path } from '../../untils/constant'

const Home = () => {
  const { currentData } = useSelector(state => state.user)
  const dispatch = useDispatch()
  const location = useLocation()
  const { isLoggedIn } = useSelector(state => state.auth)

  useEffect(() => {
    setTimeout(() => {
      isLoggedIn && dispatch(actions.getCurrent())
    }, 500)
  }, [isLoggedIn])


  return (
    <div className='w-full flex flex-col items-center'>
      <Header />
      <Navigation />
      {isLoggedIn && !location.pathname?.includes(path.DETAIL) && <Search />}
      <div className='w-full max-w-[1130px] flex flex-col items-start justify-start mt-3'>
        <Outlet />
      </div>
    </div>
  )
}

export default Home