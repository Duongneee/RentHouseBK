import React from 'react';
import anonAvatar from '../../asset/anon-avatar.png';
import { useSelector, useDispatch } from 'react-redux';
import menuManage from '../../untils/menuManage';
import { NavLink } from 'react-router-dom';
import * as actions from '../../store/actions';
import { AiOutlineLogout } from 'react-icons/ai';

const activeStyle = 'hover:bg-gray-100 flex rounded-md items-center gap-3 py-3 font-semibold text-blue-600 bg-gray-200 transition-all duration-300 ease-in-out shadow-md';
const notActiceStyle = 'hover:bg-gray-100 flex rounded-md items-center gap-3 py-3 cursor-pointer text-gray-700 transition-all duration-300 ease-in-out hover:shadow-md';

const Sidebar = () => {
    const dispatch = useDispatch();
    const { currentData } = useSelector(state => state.user);

    return (
        <div className="w-[256px] flex-none p-6 bg-white shadow-lg rounded-lg flex flex-col">
            {/* User Info */}
            <div className="flex flex-col gap-3 mb-6">
                <div className="flex items-center gap-4">
                    <img
                        src={currentData.avatar || anonAvatar}
                        alt="avatar"
                        className="w-16 h-16 object-cover rounded-full border-2 border-white shadow-lg"
                    />
                    <div className="flex flex-col justify-center">
                        <span className="font-semibold text-2xl text-gray-800">{currentData?.name}</span>
                        <small className="text-gray-500 text-sm">{currentData?.phone}</small>
                    </div>
                </div>
                <span className="text-sm text-gray-600">
                    Mã thành viên: <span className="font-medium">{currentData?.id?.match(/\d/g).join('')?.slice(0, 6)}</span>
                </span>
            </div>

            {/* Menu */}
            <div className="flex flex-col gap-3 mb-6">
                {menuManage.map(item => (
                    <NavLink
                        key={item.id}
                        to={item?.path}
                        className={({ isActive }) => (isActive ? activeStyle : notActiceStyle)}
                    >
                        {item?.icon}
                        {item.text}
                    </NavLink>
                ))}
            </div>

            {/* Logout Button */}
            <span
                onClick={() => dispatch(actions.logout())}
                className={`${notActiceStyle} text-red-500 hover:bg-red-100`}
            >
                <AiOutlineLogout />
                Thoát
            </span>
        </div>
    );
};

export default Sidebar;
