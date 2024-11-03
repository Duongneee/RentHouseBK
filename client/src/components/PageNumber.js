import React, { memo } from 'react'
import { createSearchParams, useNavigate } from 'react-router-dom'

const notActive = 'w-[46px] h-[48px] flex justify-center items-center bg-white hover:bg-gray-300 rounded-md cursor-pointer'
const active = 'w-[46px] h-[48px] flex justify-center items-center bg-[#e13427] text-white hover:bg-gray-300 rounded-md cursor-pointer '

const PageNumber = ({number, currentPage}) => {
    const navigate = useNavigate()
    const handleChangePage = ()  => { 
        navigate({
            pathname: "/",
            search: createSearchParams({
                page: number
            }).toString()
        });
    }
  return (
    <div 
    className={+number === +currentPage ? active : notActive}
    onClick={handleChangePage}
    >
        {number}
    </div>
  )
}

export default memo(PageNumber)