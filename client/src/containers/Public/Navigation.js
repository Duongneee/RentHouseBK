import React from 'react'
import {NavLink} from 'react-router-dom'

const nav = [{name: "Trang chủ", path:'home'},"Cho thuê phòng trọ","Nhà cho thuê","Cho thuê căn hộ","Cho thuê mặt bằng"]
const Navigation = () => {
  return (
    <div className='w-screen flex justify-center items-center h-[40px] bg-secondary1 text-white'>
        <div className='w-1100'>
            {nav?.length > 0 && nav.map((item, index) => {
                return(
                    <div key={index}>
                        <NavLink to={}> 
                            {item}
                        </NavLink>
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default Navigation