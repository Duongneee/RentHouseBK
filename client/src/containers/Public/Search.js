import React from 'react'
import { SearchItem } from '../../components'
import icons from '../../untils/icon'

const {GrNext, HiOutlineLocationMarker, TbReportMoney, RiCrop2Line, MdOutlineHouseSiding, FiSearch} = icons

const Search = () => {
  return (
    <div className='p-[10px] bg-[#febb02] rounded-lg flex-col lg:flex-row flex items-center justify-around gap-2'>
        <SearchItem Text='Phòng trọ, nhà trọ' IconAfter={<GrNext />} IconBefore={<MdOutlineHouseSiding />} fontWeight />
        <SearchItem Text='Toàn quốc' IconAfter={<GrNext />} IconBefore={<HiOutlineLocationMarker />} />
        <SearchItem Text='Chọn giá' IconAfter={<GrNext />} IconBefore={<TbReportMoney />} />
        <SearchItem Text='Chọn diện tích' IconAfter={<GrNext />} IconBefore={<RiCrop2Line />} />
        <button
        type='button'
        className='outline-none py-2 px-4 w-full bg-secondary1 text-[13px] flex items-center justify-center gap-2 text-white rounded-md font-medium'
        >
            <FiSearch />
            Tìm kiếm
        </button> 
    </div>
  )
}

export default Search