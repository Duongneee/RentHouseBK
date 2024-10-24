import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import { Navigation, Search } from './index'

const Home = () => {
  return (
    <div className = 'w-full m-auto h-full'>
      <Header/>
      <Navigation/>
      <div className='w-1100 flex flex-col items-center justify-start mt-3'>
       <Outlet/>
      </div>
    </div>
  )
}

export default Home