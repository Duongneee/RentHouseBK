import React from 'react'
import { Select } from './'
// import { useSelector } from 'react-redux'

const Overview = () => {

  // const { categories } = useSelector(state => state.app)
  return (
    <div>
      <h2 className='font-semibold text-xl py-4'>Thông tin mô tả</h2>
      <div className='w-full flex flex-col gap-4'>
        <div className='w-1/2'><Select label='Loại chuyên mục'/></div>
        <div>
            <label htmlFor='title'>Tiêu đề</label>
            <input type='text' id='title' className='w-full rounded-md outlone-none border border-gray-300 p-2'/>
        </div>
        <div className='flex flex-col gap-2'>
              <label htmlFor="desc">Nội dung mô tả</label>
              <textarea
                      id='desc' cols='30' rows='10'  className='w-full rounded-md outline-none border border-gray-300 p-2'
                      
              ></textarea>
        </div>
      </div>
    </div>
  )
}

export default Overview
