import React, {memo} from 'react'
import icons from '../untils/icon'

const {GrNext} = icons 
const ItemSidebar = () => {
  return (
    <div className='p-4 rounded-md bg-white w-full'>
        <h3 className='text-lg font-semibold'>Danh sách cho thuê</h3>
        <div className='flex gap-1 items-center'>
            <GrNext size={10} color='#c0c0c0' />
            <p>Cho thuê căn hộ</p>
        </div>
    </div>
  )
}

export default memo(ItemSidebar)