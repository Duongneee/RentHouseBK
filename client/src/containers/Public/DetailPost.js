import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { SliderCustom } from '../../components'
import { useDispatch, useSelector } from 'react-redux'
import { getPostsLimit } from '../../store/actions/post'
import icons from '../../untils/icon'

const {HiLocationMarker, TbReportMoney, RiCrop2Line, BsStopwatch} = icons

const DetailPost = () => {
  const params = useParams()
  const dispatch = useDispatch()
  const { post } = useSelector(state => state.post)

  useEffect(() => {
    dispatch(getPostsLimit())
  },[])

  return (
    <div className='w-full flex gap-4'>
        <div className='w-[70%]'>
          <SliderCustom />
          <div className='flex flex-col gap-2'>
              <h2 className='text-xl font-bold text-red-600 my-4'>title</h2>
              <div className='flex items-center gap-2'>
                <HiLocationMarker color='#2563eb'/>
                <span>Địa chỉ:....</span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='flex items-center gap-1'>
                  <TbReportMoney />
                  <span className='font-semibold text-lg text-green-600'>Giá</span>
                </span>
                <span className='flex items-center gap-1'>
                  <RiCrop2Line />
                  <span className='font-semibold text-lg text-green-600'>Diện tích</span>
                </span>
                <span className='flex items-center gap-1'>
                  <BsStopwatch />
                  <span className='font-semibold text-lg text-green-600'>Ngày đăng bài</span>
                </span>
              </div>
          </div>
          <div>
              <h3 className='font-semibold text-lg'>Thông tin mô tả</h3>
          </div>
        </div>
        <div className='w-[30%]'>
          sidebar
        </div>
    </div>
  )
}

export default DetailPost