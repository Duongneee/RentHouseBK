import React from 'react'
import {text} from '../../untils/constant'
import {Province, ItemSidebar} from '../../components'
import {List, Pagination} from './index'
import {  useSearchParams } from 'react-router-dom'

const Homepage = () => {
  const [params] = useSearchParams()  
  return (
    <div className='w-full flex flex-col gap-3'>
      <div>
        <h1 className='text-[28px] font-bold'> {text.HOME_TITLE} </h1>
        <p className='text-base text-gray-700'>{text.HOME_DESCRIPTION}</p>
      </div>
      <Province />
      <div className='w-full flex gap-4'>
      <div className='w-[70%]'>
        <List page={params.get('page')} />
        <Pagination page={params.get('page')} />
      </div>
      <div className='w-[30%]'>
        <ItemSidebar />
      </div>
      </div>
    </div>
  )
}

export default Homepage