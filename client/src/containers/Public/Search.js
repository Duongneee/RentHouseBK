import React, { useEffect } from 'react'
import { SearchItem } from '../../components'
import icons from '../../untils/icon'
import Popup from '../../components/popup'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { categories } from '../../untils/constant'
import { shortenMoneyAmount } from '../../untils/moneyShorten'

const { GrNext, HiOutlineLocationMarker, TbReportMoney, RiCrop2Line, MdOutlineHouseSiding, FiSearch } = icons
const Search = () => {
  const [params] = useSearchParams()
  const filtersInit = {}
  if (params.get('categoryCode') !== null) {
    filtersInit.categoryCode = params.get('categoryCode')
  }
  if (params.get('city') !== null) {
    filtersInit.city = params.get('city')
  }
  if (params.get('district') !== null) {
    filtersInit.district = params.get('district')
  }
  if (params.get('ward') !== null) {
    filtersInit.ward = params.get('ward')
  }
  if (params.get('priceFrom') !== null & params.get('priceTo') !== null) {
    filtersInit.priceRange = [Number(params.get('priceFrom')), Number(params.get('priceTo'))]
  }
  if (params.get('sizeFrom') !== null & params.get('sizeTo') !== null) {
    filtersInit.sizeRange = [Number(params.get('sizeFrom')), Number(params.get('sizeTo'))]
  }
  const navigate = useNavigate()
  const [isDisplayPopup, setIsDisplayPopup] = React.useState(false)
  const [popupContent, setPopupContent] = React.useState(0)
  const [filters, setFilters] = React.useState(filtersInit)

  const popupEvent = (value) => {
    setIsDisplayPopup(true)
    setPopupContent(value)
  }
  useEffect(() => {
    console.log('Search.js: filteres', filters)
  }, [filters])
  const searchHandler = () => {
    // TODO: Call navigate to search route
    const filterParams = {}
    if (filters.categoryCode !== undefined) {
      filterParams.categoryCode = filters.categoryCode
    }
    if (filters.city !== undefined) {
      filterParams.city = filters.city
      if (filters.district !== undefined) {
        filterParams.district = filters.district
        if (filters.ward !== undefined) {
          filterParams.ward = filters.ward
        }
      }
    }
    if (filters.priceRange !== undefined) {
      filterParams.priceFrom = filters.priceRange[0]
      filterParams.priceTo = filters.priceRange[1]
    }
    if (filters.sizeRange !== undefined) {
      filterParams.sizeFrom = filters.sizeRange[0]
      filterParams.sizeTo = filters.sizeRange[1]
    }
    const query = new URLSearchParams(filterParams).toString()
    navigate(`/filter?${query}`)
  }
  function categoryDisplay() {
    if (filters.categoryCode !== undefined) {
      console.log('Search.js: filters.categoryCode', filters.categoryCode)
      return (
        <span onClick={() => popupEvent(0)} className='cursor-pointer flex-1'>
          <SearchItem Text={categories.find(category => category.id === filters.categoryCode).name} IconAfter={<GrNext />} IconBefore={<MdOutlineHouseSiding />} fontWeight />
        </span>
      )
    } else {
      return (
        <span onClick={() => popupEvent(0)} className='cursor-pointer flex-1'>
          <SearchItem Text='Tất cả loại hình' fontWeight />
        </span>
      )
    }
  }
  function addressDisplay() {
    if (filters.city !== undefined) {
      return (
        <span onClick={() => popupEvent(1)} className='cursor-pointer flex-1'>
          <SearchItem Text={filters.city} IconAfter={<GrNext />} IconBefore={<HiOutlineLocationMarker />} fontWeight />
        </span>
      )
    } else {
      return (
        <span onClick={() => popupEvent(1)} className='cursor-pointer flex-1'>
          <SearchItem Text='Chọn khu vực' fontWeight />
        </span>
      )
    }
  }
  function priceDisplay() {
    if (filters.priceRange !== undefined) {
      return (
        <span onClick={() => popupEvent(2)} className='cursor-pointer flex-1'>
          <SearchItem Text={`${shortenMoneyAmount(filters.priceRange[0])} - ${shortenMoneyAmount(filters.priceRange[1])}`} IconAfter={<GrNext />} IconBefore={<TbReportMoney />} fontWeight />
        </span>
      )
    } else {
      return (
        <span onClick={() => popupEvent(2)} className='cursor-pointer flex-1'>
          <SearchItem Text='Chọn giá' IconAfter={<GrNext />} IconBefore={<TbReportMoney />} fontWeight />
        </span>
      )
    }
  }
  function sizeDisplay() {
    if (filters.sizeRange !== undefined) {
      return (
        <span onClick={() => popupEvent(3)} className='cursor-pointer flex-1'>
          <SearchItem Text={`${filters.sizeRange[0]} - ${filters.sizeRange[1]} m²`} IconAfter={<GrNext />} IconBefore={<RiCrop2Line />} fontWeight />
        </span>
      )
    } else {
      return (
        <span onClick={() => popupEvent(3)} className='cursor-pointer flex-1'>
          <SearchItem Text='Chọn diện tích' IconAfter={<GrNext />} IconBefore={<RiCrop2Line />} fontWeight />
        </span>
      )
    }
  }
  return (
    <>
      <div className='p-[10px] w-full max-w-[1200px] my-3 bg-[#febb02] rounded-lg flex-col lg:flex-row flex items-center justify-around gap-2'>
        {categoryDisplay()}
        {addressDisplay()}
        {priceDisplay()}

        {sizeDisplay()}
        <button
          type='button'
          className='cursor-pointer outline-none py-2 px-4 bg-secondary1 text-[13px] flex items-center justify-center gap-2 text-white rounded-md font-medium'
          onClick={searchHandler}
        >
          <FiSearch />
          Tìm kiếm
        </button>
      </div>
      {isDisplayPopup && <Popup content={popupContent} setIsDisplayPopup={setIsDisplayPopup} filters={filters} setFilters={setFilters} />}
    </>
  )
}

export default Search