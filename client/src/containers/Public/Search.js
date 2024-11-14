import React from 'react'
import { SearchItem } from '../../components'
import icons from '../../untils/icon'
import Popup from '../../components/popup'

const { GrNext, HiOutlineLocationMarker, TbReportMoney, RiCrop2Line, MdOutlineHouseSiding, FiSearch } = icons
const Search = () => {
  const [isDisplayPopup, setIsDisplayPopup] = React.useState(false)
  const [popupContent, setPopupContent] = React.useState(0)
  const popupEvent = (value) => {
    setIsDisplayPopup(true)
    setPopupContent(value)
  }

  return (
    <>
      <div className='p-[10px] w-3/5 my-3 bg-[#febb02] rounded-lg flex-col lg:flex-row flex items-center justify-around gap-2'>
        <span onClick={() => popupEvent(0)} className='cursor-pointer flex-1'>
          <SearchItem Text='Phòng trọ, nhà trọ' IconAfter={<GrNext />} IconBefore={<MdOutlineHouseSiding />} fontWeight />
        </span>
        <span onClick={() => popupEvent(1)} className='cursor-pointer flex-1'>
          <SearchItem Text='Toàn quốc' IconAfter={<GrNext />} IconBefore={<HiOutlineLocationMarker />} />
        </span>
        <span onClick={() => popupEvent(2)} className='cursor-pointer flex-1'>
          <SearchItem Text='Chọn giá' IconAfter={<GrNext />} IconBefore={<TbReportMoney />} />
        </span>
        <span onClick={() => popupEvent(3)} className='cursor-pointer flex-1'>
          <SearchItem Text='Chọn diện tích' IconAfter={<GrNext />} IconBefore={<RiCrop2Line />} />
        </span>
        <button
          type='button'
          className='cursor-pointer outline-none py-2 px-4 w-full bg-secondary1 text-[13px] flex items-center justify-center gap-2 text-white rounded-md font-medium'
        >
          <FiSearch />
          Tìm kiếm
        </button>
      </div>
      {isDisplayPopup && <Popup content={popupContent} setIsDisplayPopup={setIsDisplayPopup} />}
    </>
  )
}

export default Search