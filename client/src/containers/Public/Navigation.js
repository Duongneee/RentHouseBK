import React from 'react'
import { NavLink } from 'react-router-dom'

const nav = [
    { name: "Trang chủ", path: '/' },
    { name: "Cho thuê phòng trọ", path: 'cho-thue-phong-tro' },
    { name: "Nhà cho thuê", path: 'nha-cho-thue' },
    { name: "Cho thuê căn hộ", path: 'cho-thue-can-ho' },
    { name: "Cho thuê mặt bằng", path: 'cho-thue-mat-bang' }
]

const notActive = 'px-6 py-3 h-full flex items-center text-gray-200 hover:text-white hover:bg-indigo-400 transition-all duration-300 rounded-lg transform hover:scale-105 hover:shadow-lg'
const active = 'px-6 py-3 h-full flex items-center bg-gradient-to-r from-indigo-300 to-blue-400 text-white font-semibold transition-all duration-300 shadow-lg rounded-lg'



const Navigation = ({ isAdmin }) => {
    return (
        <div className={`w-full flex ${isAdmin ? 'justify-start' : 'justify-center'} items-center h-[70px] bg-gradient-to-r from-indigo-400 to-purple-500 text-white shadow-xl`}>
            <div className='w-full max-w-screen-xl flex justify-center items-center px-5'>
                <div className='flex items-center space-x-6 justify-center w-full'>
                    {nav?.length > 0 && nav.map((item, index) => {
                        return (
                            <NavLink
                                key={index}
                                to={item.path}
                                className={({ isActive }) => isActive ? active : notActive}
                            >
                                {item.name}
                            </NavLink>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Navigation
