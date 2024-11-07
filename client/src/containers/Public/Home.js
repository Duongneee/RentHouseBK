import React, { useEffect } from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import { Navigation, Search} from './index'
import { useDispatch, useSelector } from 'react-redux'
import { apiGetCurrent, apiGetCurrentapi } from '../../services/user'
// import {}

const Home = () => {
  const { isLoggedIn } = useSelector(state => state.auth)
  useEffect (()=>{
    const fetchCurrent = async () => {
      const response = await apiGetCurrent()
      console.log(response)
    }
    isLoggedIn&&fetchCurrent()

  },[isLoggedIn])

  return (
    <div className='w-full flex flex-col items-center'>
      <Header />
      <Navigation />
      {isLoggedIn && <Search />}
      <div className='w-4/5 lg:w-3/5 flex flex-col items-start justify-start mt-3'>
        <Outlet />
      </div>
    </div>
  )
}

export default Home