import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { SliderCustom, BoxInfo, RelatedPost, GoogleMapEmbed } from '../../components'
import { useDispatch, useSelector } from 'react-redux'
import { getPostById } from '../../store/actions/post'
import icons from '../../untils/icon'
import moment from 'moment'


const {HiLocationMarker, TbReportMoney, RiCrop2Line, BsStopwatch} = icons

const DetailPost = () => {
  const {id} = useParams()
  const dispatch = useDispatch()
  const { posts } = useSelector(state => state.post)
  const formattedTime = moment(posts?.createdAt).fromNow();
  const images = posts?.images ? JSON.parse(posts.images) : [];
  const address = `${posts?.street}, ${posts?.ward}, ${posts?.district}, ${posts?.city}`

  useEffect(() => {
    if (id) {
      dispatch(getPostById(id))
    }
  },[id]);

  return (
    <div className='w-full flex gap-4'>     
        <div className='w-[70%] '>
          <div className='bg-white rounded-md shadow-md p-4'>
          <div className='flex flex-col gap-2 '>
              <h2 className='text-xl font-bold text-red-600 my-4'>{posts?.title}</h2>
              <div className='flex items-center gap-2'>
                <HiLocationMarker color='#2563eb'/>
                <span>{`Địa chỉ: ${posts?.street}, ${posts?.ward}, ${posts?.district}, ${posts?.city}.`}</span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='flex items-center gap-1'>
                  <TbReportMoney />
                  <span className='font-semibold text-lg text-green-600'>{`${posts?.price} đồng/ tháng`}</span>
                </span>
                <span className='flex items-center gap-1'>
                  <RiCrop2Line />
                  <span className='font-semibold text-lg text-green-600'>{`${posts?.size} m²`}</span>
                </span>
                <span className='flex items-center gap-1'>
                  <BsStopwatch />
                  <span className='font-semibold text-lg text-green-600'>{`${formattedTime}`}</span>
                </span>
              </div>
          </div>
          <div className='mt-8'>
              <h3 className='font-semibold text-xl my-[4px]'>Thông tin mô tả</h3>
              <div className='flex flex-col gap-3'>
                  <span>{posts?.description}</span>
              </div>
          </div>
          
          <div className='mt-8'>
            <h3 className='font-semibold text-xl my-[4px]'>Thông tin liên hệ</h3>
            <table className='w-full'>
                  <tbody className='w-full'>
                    <tr className='w-full'>
                      <td className='p-2'>Liên hệ</td>
                      <td className='p-2'>{posts?.owner?.name}</td>
                    </tr>
                    <tr className=' w-full bg-gray-300'>
                      <td className='p-2'>Điện thoại</td>
                      <td className='p-2'>{posts?.owner?.phone}</td>
                    </tr>
                    <tr className=' w-full'>
                      <td className='p-2'>Zalo</td>
                      <td className='p-2'>{posts?.owner?.phone}</td>
                    </tr>
                  </tbody>
              </table>
          </div>
          <div className='mt-8'>
            <h3 className='font-semibold text-xl my-[4px]'>Bản đồ</h3>
            <div style={{ height: '300px', width: '100%' }}>
              <GoogleMapEmbed 
                address={address}
              />
            </div>
          </div>
          </div>
        </div>
        <div className='w-[30%] flex flex-col gap-8'>
          <BoxInfo userData={posts?.owner} />
          <RelatedPost />
        </div>
        
    </div>
  )
}

export default DetailPost