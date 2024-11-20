import React, {memo} from 'react'
import icons from '../untils/icon'
import { useNavigate } from 'react-router-dom'

const {GrNext} = icons 
const ItemSidebar = () => {
  const navigate = useNavigate()
  return (
    <div className='w-full flex flex-col gap-4 justify-start items-center'>
      <div className='p-4 rounded-md bg-white w-full'>
        <h3 className='text-lg font-semibold mb-4'>Danh sách cho thuê</h3>
        <div className='flex flex-col gap-2'>
          <div className='flex gap-2 items-center border-b border-gray-200 pb-1 border-dashed'>
            <GrNext size={10} color='#c0c0c0' />
            <p className='cursor-pointer hover:text-orange-600'>Cho thuê căn hộ</p>
          </div>
          <div className='flex gap-2 items-center border-b border-gray-200 pb-1 border-dashed'>
            <GrNext size={10} color='#c0c0c0' />
            <p className='cursor-pointer hover:text-orange-600'>Cho thuê phòng trọ</p>
          </div>
          <div className='flex gap-2 items-center border-b border-gray-200 pb-1 border-dashed'>
            <GrNext size={10} color='#c0c0c0' />
            <p className='cursor-pointer hover:text-orange-600'>Cho thuê nhà nguyên căn</p>
          </div>
          <div className='flex gap-2 items-center border-b border-gray-200 pb-1 border-dashed'>
            <GrNext size={10} color='#c0c0c0' />
            <p className='cursor-pointer hover:text-orange-600'>Cho thuê mặt bằng</p>
          </div>
        </div>
      </div>
      <div className='p-4 rounded-md bg-white w-full'>
        <h3 className='text-lg font-semibold mb-4'>Xem theo giá</h3>
        <div className='flex flex-col gap-2'>
          <div className='flex items-center border-b border-gray-200 pb-1 border-dashed'>
            <div className='flex flex-1 gap-2 items-center'>
              <GrNext size={10} color='#c0c0c0' />
              <p className='cursor-pointer hover:text-orange-600' 
                  onClick={() => navigate('/filter?priceFrom=0&priceTo=1000000')}>Dưới 1 triệu</p>
            </div>
            <div className='flex flex-1 gap-2 items-center'>
              <GrNext size={10} color='#c0c0c0' />
              <p className='cursor-pointer hover:text-orange-600'>Từ 1-2 triệu</p>
            </div>
          </div>
          <div className='flex items-center border-b border-gray-200 pb-1 border-dashed'>
            <div className='flex flex-1 gap-2 items-center'>
              <GrNext size={10} color='#c0c0c0' />
              <p className='cursor-pointer hover:text-orange-600'>Từ 2-3 triệu</p>
            </div>
            <div className='flex flex-1 gap-2 items-center'>
              <GrNext size={10} color='#c0c0c0' />
              <p className='cursor-pointer hover:text-orange-600'>Từ 3-5 triệu</p>
            </div>
          </div>
          <div className='flex items-center border-b border-gray-200 pb-1 border-dashed'>
            <div className='flex flex-1 gap-2 items-center'>
              <GrNext size={10} color='#c0c0c0' />
              <p className='cursor-pointer hover:text-orange-600'>Từ 5-7 triệu</p>
            </div>
            <div className='flex flex-1 gap-2 items-center'>
              <GrNext size={10} color='#c0c0c0' />
              <p className='cursor-pointer hover:text-orange-600'>Từ 7-10 triệu</p>
            </div>
          </div>
          <div className='flex items-center border-b border-gray-200 pb-1 border-dashed'>
            <div className='flex flex-1 gap-2 items-center'>
              <GrNext size={10} color='#c0c0c0' />
              <p className='cursor-pointer hover:text-orange-600'>Từ 10-15 triệu</p>
            </div>
            <div className='flex flex-1 gap-2 items-center'>
              <GrNext size={10} color='#c0c0c0' />
              <p className='cursor-pointer hover:text-orange-600'>Trên 15 triệu</p>
            </div>
          </div>
        </div>
      </div>
      <div className='p-4 rounded-md bg-white w-full'>
        <h3 className='text-lg font-semibold mb-4'>Xem theo diện tích</h3>
        <div className='flex flex-col gap-2'>
          <div className='flex items-center border-b border-gray-200 pb-1 border-dashed'>
            <div className='flex flex-1 gap-2 items-center'>
              <GrNext size={10} color='#c0c0c0' />
              <p className='cursor-pointer hover:text-orange-600'>Dưới 20 m²</p>
            </div>
            <div className='flex flex-1 gap-2 items-center'>
              <GrNext size={10} color='#c0c0c0' />
              <p className='cursor-pointer hover:text-orange-600'>Từ 20-30 m²</p>
            </div>
          </div>
          <div className='flex items-center border-b border-gray-200 pb-1 border-dashed'>
            <div className='flex flex-1 gap-2 items-center'>
              <GrNext size={10} color='#c0c0c0' />
              <p className='cursor-pointer hover:text-orange-600'>Từ 30-50 m²</p>
            </div>
            <div className='flex flex-1 gap-2 items-center'>
              <GrNext size={10} color='#c0c0c0' />
              <p className='cursor-pointer hover:text-orange-600'>Từ 50-70 m²</p>
            </div>
          </div>
          <div className='flex items-center border-b border-gray-200 pb-1 border-dashed'>
            <div className='flex flex-1 gap-2 items-center'>
              <GrNext size={10} color='#c0c0c0' />
              <p className='cursor-pointer hover:text-orange-600'>Từ 70-90 m²</p>
            </div>
            <div className='flex flex-1 gap-2 items-center'>
              <GrNext size={10} color='#c0c0c0' />
              <p className='cursor-pointer hover:text-orange-600'>Trên 90 m²</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  )
}

export default memo(ItemSidebar)