import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'

const Home = () => {
  return (
    <div className = 'w-1100 m-auto h-full'>
      <Header/>
      <Outlet/>
    </div>
  )
}

export default Home