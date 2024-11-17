import React from 'react'
import {text} from '../../untils/constant'
import {Province, ItemSidebar} from '../../components'
import {ListFilter, Pagination} from './index'
import {  useSearchParams } from 'react-router-dom'

const Homepage = () => {
  const [params] = useSearchParams()  
  const filters = {}
  if (params.get('categoryCode') !== null) {
    filters.categoryCode = params.get('categoryCode')
  }
  if (params.get('city') !== null) {
    filters.city = params.get('city')
  }
  if (params.get('district') !== null) {
    filters.district = params.get('district')
  }
  if (params.get('ward') !== null) {
    filters.ward = params.get('ward')
  }
  if (params.get('priceFrom') !== null & params.get('priceTo') !== null) {
    filters.priceFrom = params.get('priceFrom')
    filters.priceTo = params.get('priceTo')
  }
  if (params.get('sizeFrom') !== null & params.get('sizeTo') !== null) {
    filters.sizeFrom = params.get('sizeFrom')
    filters.sizeTo = params.get('sizeTo')
  }
  // console.log('FilterResult.js: ', filters)
  return (
    <div className='w-full flex flex-col gap-3'>
      <div>
        <h1 className='text-[28px] font-bold'> {text.HOME_TITLE} </h1>
        <p className='text-base text-gray-700'>{text.HOME_DESCRIPTION}</p>
      </div>
      <Province />
      <div className='w-full flex gap-4'>
      <div className='w-[70%]'>
        <ListFilter page={params.get('page')} filters={filters} />
        <Pagination page={params.get('page')} />
      </div>
      <div className='w-[30%] flex flex-col gap-4 justify-start items-center'>
        <ItemSidebar />
        <ItemSidebar />
        <ItemSidebar />
      </div>
      </div>
    </div>
  )
}

export default Homepage