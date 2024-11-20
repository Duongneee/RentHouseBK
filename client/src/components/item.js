import React, { memo, useState } from 'react'
import icons from '../untils/icon'
import { Link } from 'react-router-dom'
import { path } from '../untils/constant'
import { shortenMoneyAmount } from '../untils/moneyShorten'


const indexs = [0, 1, 2, 3]
const { GrStar, RiHeartFill, RiHeartLine, BsBookmarkStarFill } = icons

const Item = ({ images, owner, title, star, description, price, size, city, district, id }) => {
    const [isHoverHeart, setIsHoverHeart] = useState(false)
    const handleStar = (star) => {
        let stars = []
        for (let i = 1; i <= +star; i++) stars.push(<GrStar className='star-item' size={18} color='yellow' />)
        return stars
    }
    return (
        <div className='w-full flex border-t border-orange-600 py-4 '>
            <Link to={`${path.DETAIL}${title?.replaceAll('/', '')}/${id}`} className='w-2/5 flex flex-wrap gap-[2px] items-center cursor-pointer relative'>
                {images.length > 0 && images.filter((i, index) => indexs.some(i => i === index))?.map((i, index) => {
                    return (
                        <img key={index} src={i} alt="preview" className='w-[140px] h-[120px] object-cover' />
                    )
                })}
                <span className='bg-overlay-70 rounded-md absolute bottom-1 left-1 text-white px-2'>{`${images.length} ảnh`}</span>
                <span
                    onMouseEnter={() => setIsHoverHeart(true)}
                    onMouseLeave={() => setIsHoverHeart(false)}
                    className=' absolute bottom-1 right-5 text-white'
                >
                    {isHoverHeart ? <RiHeartFill size={26} color='red' /> : <RiHeartLine size={26} />}
                </span>
            </Link>
            <div className='w-3/5'>
                <div className='flex justify-between gap-4 w-full'>
                    <div className='text-red-600 font-medium ' >
                        {handleStar(+star).length > 0 && handleStar(+star).map((star, number) => {
                            return (
                                <span key={number}>{star}</span>
                            )
                        })}
                        {title}
                    </div>
                    <div className='w-[10%] flex justify-end'>
                        <BsBookmarkStarFill size={24} color='orange' />
                    </div>
                </div>
                <div className='my-2 flex items-center justify-between gap-1'>
                    <span className='font-bold text-green-600 flex-3 whitespace-nowrap overflow-hidden text-ellipsis'>{`${shortenMoneyAmount(price)}/tháng`}</span>
                    <span className='flex-1'>{`${size}m²`}</span>
                    <span className='flex-3 whitespace-nowrap overflow-hidden text-ellipsis'>{`${district}, ${city}`}</span>
                </div>
                <p className='text-gray-500 w-full h-[50px] text-ellipsis overflow-hidden'>
                    {description}
                </p>
                <div className="flex items center my-5 justify-between">
                    <div className=" flex items-center gap-1">
                        <img src="https://img.favpng.com/15/23/18/computer-icons-anonymous-anonymity-png-favpng-xjSdB3CKmqCSGUUqCxESbEFm0.jpg" alt="avatar" className='w-[30px] h-[30px]
                        object-cover rounded-full' />
                        <p>{owner?.name}</p>
                    </div>
                    <div className='flex items-center gap-1'>
                        <button
                            type='button'
                            className='bg-blue-700 text-white p-1 rounded-md'
                        >
                            {`Gọi ${owner?.phone}`}
                        </button>
                        <button
                            type='button'
                            className='text-blue-700 px-1 rounded-md border border-blue-700'
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