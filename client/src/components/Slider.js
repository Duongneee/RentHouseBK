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
          {images?.length > 0 && images?.map((item, index) => {
            return (
              <div key={index} className='bg-black flex justify-center h-[320px] px-12'>
              <img
                src={item}
                alt='slider'
                className=' m-auto h-full object-contain'
              >
              </img>
              </div> 
            )
          })}
            
        </Slider>
    </div>
  )
}

export default memo(SliderCustom)