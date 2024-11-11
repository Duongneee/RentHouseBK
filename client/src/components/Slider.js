import React, { memo } from 'react'
import Slider from 'react-slick'

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
};

const SliderCustom = ({ images }) => {
  return (
    <div className='w-full'>
        <Slider {...settings}>
            <div className='bg-black flex justify-center h-[320px] px-12'>
            <img
              src="https://pt123.cdn.static123.com/images/thumbs/900x600/fit/2024/10/17/img-6957_1729154236.jpg"
              alt='slider'
              className=' m-auto h-full object-contain'
            >
            </img>
            </div>
        </Slider>
    </div>
  )
}

export default memo(SliderCustom)