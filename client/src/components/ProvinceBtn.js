import React, { memo } from 'react'

const ProvinceBtn = ({name, image}) => {
  return (
    <div className='shadow-md rounded-bl-md rounded-br-md bg-white'>
        <img
        src={image}
        alt={name}
        className='w-[190px] h-[110px] object-cover rounded-tl-md rounded-tr-md'
        />
        <div className='font-medium p-2 text-center text-blue-700'>{name}</div>
    </div>
  )
}

export default memo(ProvinceBtn)