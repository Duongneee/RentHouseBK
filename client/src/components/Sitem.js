import React, { memo } from 'react'
import moment from 'moment'
import 'moment/locale/vi'

const Sitem = ({title, price, image, createdDate}) => {

  const formatTime = (createdAt) => {
    return moment(createdAt).fromNow()
}

  return (
    <div className='w-full flex items-center gap-2 py-2 border-b border-gray-300'>
      <img src="https://pt123.cdn.static123.com/images/thumbs/450x300/fit/2024/11/01/z5988970599282-eba7976461c5968368d6e7d6df677f9a_1730458316.jpg" 
      alt="anh" 
      className='w-[65px] h-[65px] object-cover flex-none rounded-md'
      />
      <div className='w-full flex-auto flex flex-col justify-between gap-1'>
        <h4 className='text-blue-600 text-[14px]'>{`${title?.slice(0,45)}...`}</h4>
        <div className='flex items-center justify-between w-full'>
            <span className='text-sm font-medium text-green-500'>{price}</span>
            <span className='text-sm text-gray-500'>{formatTime(createdDate)}</span>
        </div>
     </div>
    </div>
  )
}

export default memo(Sitem)
