import React, { memo } from 'react'
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom'

const notActive = 'w-[46px] h-[48px] flex justify-center items-center bg-white hover:bg-gray-300 rounded-md'
const active = 'w-[46px] h-[48px] flex justify-center items-center bg-[#e13427] text-white hover:opacity-90 rounded-md '

const PageNumber = ({ text, currentPage, icon, setcurrentPage, type }) => {
    const [params] = useSearchParams()
    const navigate = useNavigate()
    const location = useLocation()
    const handleChangePage = () => {
        if (!(text === '...')) {
            setcurrentPage(+text)
            params.set('page', text)
            navigate({
                pathname: location.pathname,        // adaptively for ./filter also
                search: params.toString()
            });
        }
    }
    return (
        <div
            className={+text === +currentPage ? `${active} ${text === '...' ? 'cursor-text' : 'cursor-pointer'}` : `${notActive} ${text === '...' ? 'cursor-text' : 'cursor-pointer'}`}
            onClick={handleChangePage}
        >
            {icon || text}
        </div>
    )
}

export default memo(PageNumber)