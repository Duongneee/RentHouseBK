import React from 'react'
import { Sitem} from './index'

const RelatedPost = () => {
  return (
    <div className='w-full bg-white round-md p-4'>
      <h3 className='font-semibold text-lg mb-4'>Tin mới đăng</h3>
      <div className='w-full flex flex-col gap-2'>
        <Sitem title='Nhà 3 tầng' price='4 triệu/tháng' createdAt='Hôm nay'/>
        <Sitem />
        <Sitem />
        <Sitem />
        </div>
    </div>
  )
}

export default RelatedPost
