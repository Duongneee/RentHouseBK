import React from 'react'
import { Navigation } from '../Public'

const Header = () => {
    return (
        <div className='w-full flex h-[80px]'>
            <div className='flex justify-center items-center font-bold bg-secondary1 text-white w-[256px]'>
                Phòng Trọ BK
            </div>
            <div className='flex-1'>
                <Navigation isAdmin={true} />
            </div>
        </div>
    )
}

export default Header
