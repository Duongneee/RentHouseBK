import React from 'react'
import { text } from '../../untils/constant'
import { Province, ItemSidebar } from '../../components'
import { ListFilter, Pagination } from './index'
import { useSearchParams } from 'react-router-dom'

const Categories = (categoryCode) => {
  const [params] = useSearchParams()
  console.log('/<categoryCode>: ', categoryCode)
  return (
    <div className='w-full flex flex-col gap-3'>
      <div>
        <h1 className='text-[28px] font-bold'> {text.HOME_TITLE} </h1>
        <p className='text-base text-gray-700'>{text.HOME_DESCRIPTION}</p>
      </div>
      <Province />
      <div className='w-full flex gap-4'>
        <div className='w-[70%]'>
          <ListFilter page={params.get('page')} filters={categoryCode} />
          <Pagination page={params.get('page')} />
        </div>
        <div className='w-[30%] flex flex-col gap-4'>
          <ItemSidebar />
        </div>
      </div>
    </div>
  )
}

export default Categories