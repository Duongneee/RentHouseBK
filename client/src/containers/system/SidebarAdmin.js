import React from 'react';
import anonAvatar from '../../asset/anon-avatar.png';
import { useSelector, useDispatch } from 'react-redux';
import menuManage from '../../untils/AdminManage';
import { NavLink } from 'react-router-dom';
import * as actions from '../../store/actions';
import { AiOutlineLogout } from 'react-icons/ai';

const Sidebar = () => {
    const dispatch = useDispatch();
    const { currentData } = useSelector((state) => state.user);

    const activeStyle =
        'flex items-center gap-3 py-3 px-5 rounded-xl bg-indigo-600 text-white font-semibold shadow-lg transition-transform transform hover:scale-105';
    const notActiveStyle =
        'flex items-center gap-3 py-3 px-5 rounded-xl text-gray-700 hover:bg-gray-100 hover:shadow-md transition-all';

    return (
        <div className="w-[256px] h-full flex-none bg-gradient-to-br from-indigo-50 to-gray-100 shadow-lg p-6 flex flex-col gap-6">
            {/* Header */}
            <div className="flex flex-col items-center gap-4">
                {/* Avatar */}
                <div className="relative w-20 h-20">
                    <img
                        src={currentData.avatar || anonAvatar}
                        alt="avatar"
                        className="w-full h-full object-cover rounded-full border-4 border-indigo-500 shadow-lg"
                    />
                </div>
                {/* Info */}
                <div className="text-center">
                    <h2 className="text-lg font-bold text-gray-800">{currentData?.name || 'Admin'}</h2>
                    <small className="text-gray-500">{currentData?.phone || 'No phone'}</small>
                </div>
                <p className="text-sm text-indigo-600 italic">Chào mừng Admin quay trở lại!</p>
            </div>

            {/* Menu */}
            <nav className="flex flex-col gap-4">
                {menuManage.map((item) => (
                    <NavLink
                        className={({ isActive }) => (isActive ? activeStyle : notActiveStyle)}
                        key={item.id}
                        to={item?.path}
                    >
                        <span className="text-xl">{item?.icon}</span>
                        <span className="font-medium">{item.text}</span>
                    </NavLink>
                ))}
            </nav>

            {/* Logout */}
            <button
                onClick={() => dispatch(actions.logout())}
                className="mt-auto flex items-center gap-3 py-3 px-5 rounded-xl bg-red-500 text-white font-semibold shadow-lg hover:bg-red-600 transition-transform transform hover:scale-105"
            >
                <AiOutlineLogout size={20} />
                <span>Đăng xuất</span>
            </button>
        </div>
    );
};

export default Sidebar;
