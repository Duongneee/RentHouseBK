import React, { memo, useState } from 'react'
import icons from '../untils/icon'
  const images = [
  "https://pt123.cdn.static123.com/images/thumbs/900x600/fit/2024/10/19/f2d6667fe8e751b908f69_1729303929.jpg",
    "https://pt123.cdn.static123.com/images/thumbs/900x600/fit/2024/10/19/2a1e51b6df2e66703f3f13_1729303923.jpg",
    "https://pt123.cdn.static123.com/images/thumbs/900x600/fit/2024/10/19/7fd78e7e00e6b9b8e0f711_1729303923.jpg",
    "https://pt123.cdn.static123.com/images/thumbs/900x600/fit/2024/10/19/32f75b5fd5c76c9935d615_1729303925.jpg",
 ]

const { GrStar, RiHeartFill, RiHeartLine, BsBookmarkStarFill } = icons

        const Item = () => {
        const [isHoverHeart, setIsHoverHeart] = useState(false)
            return(
            <div className='w-full flex border-t border-orange-600 p-4 '>
             <div className='w-2/5 flex flex-wrap gap-[2px] items-center cursor-pointer relative'>
                    <img src={images[0]} alt="preview" className='w-[140px] h-[120px] object-cover' />
                    <img src={images[1]} alt="preview" className='w-[140px] h-[120px] object-cover' />
                    <img src={images[2]} alt="preview" className='w-[140px] h-[120px] object-cover' />
                    <img src={images[3]} alt="preview" className='w-[140px] h-[120px] object-cover' />
                    <span className='bg-overlay-70 rounded-md absolute bottom-1 left-1 text-white px-2'>4 ảnh</span>
                    <span
                    onMouseEnter={() => setIsHoverHeart(true)}
                    onMouseLeave={() => setIsHoverHeart(false)}
                    className=' absolute bottom-1 right-5 text-white'
                    >
                        {isHoverHeart ? <RiHeartFill size={26} color='red' /> : <RiHeartLine size={26} />}
                    </span>
            </div>
            <div className='w-3/5'>
            <div className='flex justify-between gap-4 w-full'>
                <div className='text-red-600 font-medium ' >
                        <GrStar className='star-item' size={18}  color='yellow' />
                        <GrStar className='star-item' size={18}  color='yellow' />
                        <GrStar className='star-item' size={18}  color='yellow' />
                        <GrStar className='star-item' size={18} color='yellow' />
                        <GrStar className='star-item' size={18} color='yellow' /> 
                        CHO THUÊ CĂN HỘ HOẶC VĂN PHÒNG LÀM VIỆC
                </div>
                <div className='w-[10%] flex justify-end'>
                    <BsBookmarkStarFill size={24} color='orange' />
                </div> 
            </div>
                <div className='my-2 flex items-center justify-between'>
                    <span className='font-bold text-green-600'>3.7 triệu/tháng</span>
                    <span>28m²</span>
                    <span>Quận Tân Bình, Hồ Chí Minh</span>
                </div> 
                <p className='text-gray-500'>
                    CẦN HỘ CAO CẤP ĐƯỜNG CỘNG HOÀ Đặc điểm: + Nội thất: Máy lạnh, máy giặt, giường, bàn trang điểm, máy nóng lạnh. + Giờ giấc tự do, phòng sạch...
                </p>
                <div className="flex items center my-5 justify-between">
                    <div className=" flex items-center">
                        <img src="https://img.favpng.com/15/23/18/computer-icons-anonymous-anonymity-png-favpng-xjSdB3CKmqCSGUUqCxESbEFm0.jpg" alt="avatar" className='w-[30px] h-[30px]
                        object-cover rounded-full' />
                    <p>Tuệ Thu</p>
                </div>
                <div className='flex items-center gap-1'>
                    <button
                    type='button'
                    className='bg-blue-700 text-white p-1 rounded-md'
                    >
                        Gọi 4656465464
                    </button>
                    <button
                        type='button'
                        className='text-blue-700 px-1 rounded-ad border border-blue-700'
                    >
                    Nhắn zalo
                    </button>
                    </div>
                </div> 
            </div>
        </div>
    )
}

export default memo(Item)