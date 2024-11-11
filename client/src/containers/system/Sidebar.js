import React from 'react'
import anonAvatar from '../../asset/anon-avatar.png'
import { useSelector } from 'react-redux'
import menuSidebar from '../../untils/menuSidebar'

const Sidebar = () => {


  const { currentData } = useSelector(state => state.user)
  return (
    <div className ='w-[250px] flex-none p-4'>  
            <div className='flex flex-col gap-4'>
                <div className='flex items-center gap-4'>
                    <img src={anonAvatar} alt='avatar' className='w-13 h-13 object-cover rounded-md border-2 border-white'/>
                    <div className='flex flex-col justify-center'>
                        <span className='font-semibold'>{currentData?.name}</span>
                        <small>{currentData?.phone}</small>
                    </div>
                </div>
                <span >Mã thành viên: <small className='font-medium'> </small>{currentData?.id?.match(/\d/g).join('')?.slice(0, 6)}</span>
            </div>
            <div>
              {menuSidebar}
            </div>
    </div>
  )
}

export default Sidebar
