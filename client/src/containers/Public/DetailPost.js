import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { SliderCustom } from '../../components'
import { useDispatch, useSelector } from 'react-redux'
import { getPostById } from '../../store/actions/post'
import icons from '../../untils/icon'

const {HiLocationMarker, TbReportMoney, RiCrop2Line, BsStopwatch} = icons

const DetailPost = () => {
  const {id} = useParams()
  const dispatch = useDispatch()
  const { post, loading } = useSelector(state => state.post)

  useEffect(() => {
    if (id) {
      dispatch(getPostById(id))
    }
  },[id, dispatch]);

  if(loading) return <p>Loading...</p>
  if(!post) return <p>No post found.</p>

  return (
    <div className='w-full flex gap-4'>
        <div className='w-[70%]'>
          <SliderCustom />
          <div className='flex flex-col gap-2'>
              <h2 className='text-xl font-bold text-red-600 my-4'>{post.title}</h2>
              <div className='flex items-center gap-2'>
                <HiLocationMarker color='#2563eb'/>
                <span>{`Địa chỉ: ${post.district}, ${post.city}`}</span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='flex items-center gap-1'>
                  <TbReportMoney />
                  <span className='font-semibold text-lg text-green-600'>{`${post.price} đồng/ tháng`}</span>
                </span>
                <span className='flex items-center gap-1'>
                  <RiCrop2Line />
                  <span className='font-semibold text-lg text-green-600'>{`${post.size} m²`}</span>
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