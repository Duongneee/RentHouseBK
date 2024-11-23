import React, { memo } from 'react'
import icons from '../untils/icon'
import { useNavigate } from 'react-router-dom'
import { useSearchParams } from 'react-router-dom'

const { GrNext } = icons
const ItemSidebar = () => {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  function clickHandler(key, value, key2, value2) {
    const paramsObject = Object.fromEntries(params.entries())
    paramsObject[key] = value
    if (key2 && value2) {
      paramsObject[key2] = value2
    } else if (value2 === '') {
      delete paramsObject[key2]
    }

    console.log('params: ', paramsObject.toString())
    const query = new URLSearchParams(paramsObject).toString()
    console.log('query: ', query)
    navigate(`/filter?${query}`)
  }
  return (
    <div className='w-full flex flex-col gap-4 justify-start items-center'>
      <div className='p-4 rounded-md bg-white w-full'>
        <h3 className='text-lg font-semibold mb-4'>Danh sách cho thuê</h3>
        <div className='flex flex-col gap-2'>
          <div className='flex gap-2 items-center border-b border-gray-200 pb-1 border-dashed'>
            <GrNext size={10} color='#c0c0c0' />
            <p className='cursor-pointer hover:text-orange-600 '
              onClick={() => clickHandler('categoryCode', 'CTCH')}>Cho thuê nhà chung cư</p>
          </div>
          <div className='flex gap-2 items-center border-b border-gray-200 pb-1 border-dashed'>
            <GrNext size={10} color='#c0c0c0' />
            <p className='cursor-pointer hover:text-orange-600'
              onClick={() => clickHandler('categoryCode', 'CTPT')}
            >Cho thuê phòng trọ</p>
          </div>
          <div className='flex gap-2 items-center border-b border-gray-200 pb-1 border-dashed'>
            <GrNext size={10} color='#c0c0c0' />
            <p className='cursor-pointer hover:text-orange-600'
              onClick={() => clickHandler('categoryCode', 'NCT')}
            >Cho thuê nhà nguyên căn</p>
          </div>
          <div className='flex gap-2 items-center border-b border-gray-200 pb-1 border-dashed'>
            <GrNext size={10} color='#c0c0c0' />
            <p className='cursor-pointer hover:text-orange-600'
              onClick={() => clickHandler('categoryCode', 'CTMB')}
            >Cho thuê mặt bằng</p>
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
                onClick={() => clickHandler('priceFrom', '0', 'priceTo', '1000000')}>Dưới 1 triệu</p>
            </div>
            <div className='flex flex-1 gap-2 items-center'>
              <GrNext size={10} color='#c0c0c0' />
              <p className='cursor-pointer hover:text-orange-600'
                onClick={() => clickHandler('priceFrom', '1000000', 'priceTo', '2000000')}>Từ 1-2 triệu</p>
            </div>
          </div>
          <div className='flex items-center border-b border-gray-200 pb-1 border-dashed'>
            <div className='flex flex-1 gap-2 items-center'>
              <GrNext size={10} color='#c0c0c0' />
              <p className='cursor-pointer hover:text-orange-600'
                onClick={() => clickHandler('priceFrom', '2000000', 'priceTo', '3000000')}>Từ 2-3 triệu</p>
            </div>
            <div className='flex flex-1 gap-2 items-center'>
              <GrNext size={10} color='#c0c0c0' />
              <p className='cursor-pointer hover:text-orange-600'
                onClick={() => clickHandler('priceFrom', '3000000', 'priceTo', '5000000')}>Từ 3-5 triệu</p>
            </div>
          </div>
          <div className='flex items-center border-b border-gray-200 pb-1 border-dashed'>
            <div className='flex flex-1 gap-2 items-center'>
              <GrNext size={10} color='#c0c0c0' />
              <p className='cursor-pointer hover:text-orange-600'
                onClick={() => clickHandler('priceFrom', '5000000', 'priceTo', '7000000')}>Từ 5-7 triệu</p>
            </div>
            <div className='flex flex-1 gap-2 items-center'>
              <GrNext size={10} color='#c0c0c0' />
              <p className='cursor-pointer hover:text-orange-600'
                onClick={() => clickHandler('priceFrom', '7000000', 'priceTo', '10000000')}>Từ 7-10 triệu</p>
            </div>
          </div>
          <div className='flex items-center border-b border-gray-200 pb-1 border-dashed'>
            <div className='flex flex-1 gap-2 items-center'>
              <GrNext size={10} color='#c0c0c0' />
              <p className='cursor-pointer hover:text-orange-600'
                onClick={() => clickHandler('priceFrom', '10000000', 'priceTo', '15000000')}>Từ 10-15 triệu</p>
            </div>
            <div className='flex flex-1 gap-2 items-center'>
              <GrNext size={10} color='#c0c0c0' />
              <p className='cursor-pointer hover:text-orange-600'
                onClick={() => clickHandler('priceFrom', '15000000', 'priceTo', '')}>Trên 15 triệu</p>
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
              <p className='cursor-pointer hover:text-orange-600'
                onClick={() => clickHandler('sizeFrom', '0', 'sizeTo', '20')}>Dưới 20 m²</p>
            </div>
            <div className='flex flex-1 gap-2 items-center'>
              <GrNext size={10} color='#c0c0c0' />
              <p className='cursor-pointer hover:text-orange-600'
                onClick={() => clickHandler('sizeFrom', '20', 'sizeTo', '30')}>Từ 20-30 m²</p>
            </div>
          </div>
          <div className='flex items-center border-b border-gray-200 pb-1 border-dashed'>
            <div className='flex flex-1 gap-2 items-center'>
              <GrNext size={10} color='#c0c0c0' />
              <p className='cursor-pointer hover:text-orange-600'
                onClick={() => clickHandler('sizeFrom', '30', 'sizeTo', '50')}>Từ 30-50 m²</p>
            </div>
            <div className='flex flex-1 gap-2 items-center'>
              <GrNext size={10} color='#c0c0c0' />
              <p className='cursor-pointer hover:text-orange-600'
                onClick={() => clickHandler('sizeFrom', '50', 'sizeTo', '70')}>Từ 50-70 m²</p>
            </div>
          </div>
          <div className='flex items-center border-b border-gray-200 pb-1 border-dashed'>
            <div className='flex flex-1 gap-2 items-center'>
              <GrNext size={10} color='#c0c0c0' />
              <p className='cursor-pointer hover:text-orange-600'
                onClick={() => clickHandler('sizeFrom', '70', 'sizeTo', '90')}>Từ 70-90 m²</p>
            </div>
            <div className='flex flex-1 gap-2 items-center'>
              <GrNext size={10} color='#c0c0c0' />
              <p className='cursor-pointer hover:text-orange-600'
                onClick={() => clickHandler('sizeFrom', '90', 'sizeTo', '')}>Trên 90 m²</p>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default memo(ItemSidebar)