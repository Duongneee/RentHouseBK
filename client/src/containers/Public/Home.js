import React, { useEffect } from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import { Navigation, Search} from './index'
import * as actions from '../../store/actions'
import { useDispatch, useSelector } from 'react-redux'

const Home = () => {
  const dispatch = useDispatch()
  const { isLoggedIn } = useSelector(state => state.auth)
 
  useEffect(()=>{
    setTimeout(() =>{
      isLoggedIn && dispatch(actions.getCurrent())
    },500)
  }, [isLoggedIn])
  
  return (
    <div className='w-full flex flex-col items-center'>
      <Header />
      <Navigation />
      {isLoggedIn && <Search />}
      <div className='w-4/5 lg:w-4/5 flex flex-col items-start justify-start mt-3'>
        <Outlet />
      </div>
    </div>
  )
}

export default Home