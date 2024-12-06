import React, { memo } from 'react'
import moment from 'moment'
import 'moment/locale/vi'
import { Link } from 'react-router-dom'
import { path } from '../untils/constant'
import { shortenMoneyAmount } from '../untils/moneyShorten'

const Sitem = ({ title, price, image, createdAt, id }) => {

  const formatTime = (createdAt) => {
    return moment(createdAt).fromNow()
  }

  return (
    <div className='w-full flex items-center gap-2 py-2 border-b border-gray-300'>
      <img src={image[0]}
        //src="https://pt123.cdn.static123.com/images/thumbs/450x300/fit/2024/11/01/z5988970599282-eba7976461c5968368d6e7d6df677f9a_1730458316.jpg" 
        alt="anh"
        className='w-[65px] h-[65px] object-cover flex-none rounded-md'
      />
      <div className='w-full flex-auto flex flex-col justify-between gap-1'>
        <Link to={`${path.DETAIL}${id}`} className='text-blue-600 text-[14px]'>{`${title?.slice(0, 45)}...`}</Link>
        <div className='flex items-center justify-between w-full'>
          <span className='text-sm font-medium text-green-500'>{shortenMoneyAmount(price)} /tháng</span>
          <span className='text-sm text-gray-500'>{formatTime(createdAt)}</span>
        </div>
      </div>
    </div>
  )
}

export default memo(Sitem)
