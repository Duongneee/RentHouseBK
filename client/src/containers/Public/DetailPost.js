import React, { useEffect, memo } from 'react'
import { useParams } from 'react-router-dom'
import { SliderCustom, BoxInfo, RelatedPost, GoogleMapEmbed } from '../../components'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { getPostById } from '../../store/actions/post'
import icons from '../../untils/icon'
import moment from 'moment'
import { shortenMoneyAmount } from '../../untils/moneyShorten'
import { createBookmark, deleteBookmark } from '../../store/actions/user'


const { HiLocationMarker, TbReportMoney, RiCrop2Line, BsStopwatch, BsBookmarkStarFill } = icons

const DetailPost = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { posts } = useSelector(state => state.post)
  const formattedTime = moment(posts?.createdAt).fromNow();
  const images = posts?.images ? JSON.parse(posts.images) : [];
  const address = `${posts?.street ? (posts?.street + ', ') : ''}${posts?.ward}, ${posts?.district}, ${posts?.city}`
  const formattedAddress = encodeURIComponent(address)
  const { isLoggedIn } = useSelector(state => state.auth)
  const isBookmarked = posts?.isBookmarked
  // console.log('DetailPost.Posts: ', posts)
  const [bookmarkStatus, setBookmarkStatus] = useState(isBookmarked);
  const bookmarkHandler = () => {
    if (!isLoggedIn) {
      alert("Vui lòng đăng nhập để thực hiện chức năng này");
    } else {
      if (bookmarkStatus) {
        dispatch(deleteBookmark(id));
      } else {
        dispatch(createBookmark(id));
      }
      setBookmarkStatus(!bookmarkStatus);
    }
  };
  useEffect(() => {
    setBookmarkStatus(isBookmarked);
  }, [isBookmarked]);
  useEffect(() => {
    if (id) {
      dispatch(getPostById(id, isLoggedIn))
    }
  }, [id]);

  return (
    <div className='w-full flex gap-4'>
      <div className='w-[70%] '>
        <SliderCustom images={images} />
        <div className='bg-white rounded-md shadow-md p-4'>
          <div className='flex flex-col gap-2 '>
            <div className='flex items-center gap-2 justify-between'>
              <h2 className='text-xl font-bold text-red-600 my-4'>{posts?.title}</h2>
              <div className='w-[10%] flex justify-end'>
                <BsBookmarkStarFill title="Lưu bài đăng"
                  size={24}
                  color={bookmarkStatus ? "orange" : "gray"}
                  onClick={() => {
                    bookmarkHandler();
                  }}
                />
                <p style={{ marginLeft: '10px' }}> {posts?.bookmarkCount}</p>
              </div>
            </div>
            <div className='flex items-center gap-2'>
              <HiLocationMarker color='#2563eb' />
              <span>{`Địa chỉ: ${posts?.street ? (posts?.street + ', ') : ''}${posts?.ward}, ${posts?.district}, ${posts?.city}.`}</span>
            </div>
            <div className='flex items-center justify-between'>
              <span className='flex items-center gap-1'>
                <TbReportMoney />
                <span className='font-semibold text-lg text-green-600'>{`${shortenMoneyAmount(posts?.price)} / tháng`}</span>
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
              <span>
                {(() => {
                  let description;
                  try {
                    description = JSON.parse(posts?.description);
                  } catch (error) {
                    description = posts?.description;
                  }
                  return description?.split('\n').map((line, index) => (
                    <React.Fragment key={index}>
                      {line}
                      <br />
                    </React.Fragment>
                  ));
                })()}
              </span>
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
            <div style={{ height: '400px', width: '100%' }}>
              <GoogleMapEmbed
                formattedAddress={formattedAddress}
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

export default memo(DetailPost)