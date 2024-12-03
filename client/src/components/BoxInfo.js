import React, { memo } from 'react'
import anonAvatar from '../asset/anon-avatar.png'
import icons from '../untils/icon'
import {Button} from './'

const {BsDot, BsTelephoneFill, SiZalo} = icons

const BoxInfo = ({userData}) => {
  return (
    <div className='w-full bg-yellow-500 rounded-md flex flex-col items-center p-4 gap-4'>
        <img src={userData?.avatar || anonAvatar} alt='avatar' className='w-16 h-16 object-contain rounded-full' />
        <h3 className='font-medium text-xl'>{userData?.name}</h3>
        <span className='flex items-center'>
            <BsDot color='green' size={28} />
            <span>Đang hoạt động</span>           
        </span>
        <a className='bg-[#13BB7B] py-2 flex items-center justify-center gap-2 w-full rounded-md text-white font-bold text-lg' href='/' ><BsTelephoneFill />{userData?.phone}</a>
        <a className='bg-white py-2 flex items-center justify-center gap-2 w-full rounded-md font-bold text-lg' href={`https://zalo.me/${userData?.phone}`}>
        <SiZalo size={30} color='blue ' />{"Nhắn Zalo"}
        </a>
    </div>
  )
}

export default memo(BoxInfo)