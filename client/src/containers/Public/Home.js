import React, { useEffect } from 'react'
import Header from './Header'
import { Outlet, useLocation } from 'react-router-dom'
import { Navigation, Search} from './index'
import * as actions from '../../store/actions'
import { useDispatch, useSelector } from 'react-redux'
import { path } from '../../untils/constant'

const Home = () => {
  const { isLoggedIn } = useSelector(state => state.auth)
  const { currentData } = useSelector(state => state.user)
  const location = useLocation()

  return (
    <div className='w-full flex flex-col items-center'>
      <Header />
      <Navigation />
      {isLoggedIn && !location.pathname?.includes(path.DETAIL) && <Search /> }
      <div className='w-4/5 lg:w-3/5 flex flex-col items-start justify-start mt-3'>
        <Outlet />
      </div>
    </div>
  )
}

export default Home