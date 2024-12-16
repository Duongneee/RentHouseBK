import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions';
import 'moment/locale/vi';
import { Button, UserManage } from '../../components';

const AdminManageUser = () => {
    const dispatch = useDispatch()
    const {currentData} = useSelector(state => state.user)
    console.log(currentData)
    useEffect(() => {
        dispatch(actions.getUsers())
            }, [])

    return (
        <div className='flex flex-col gap-6'>
        <h1 className='text-3xl font-medium py-4 border-b border-gray-200'>Quản lý người dùng</h1>
        <div className='flex flex-col gap-6'>
            <table className='w-full table-auto'>
                <thead>
                    <tr className='flex w-full bg-gray-200'>
                        <th className='border flex-1 p-2'>ID người dùng</th>
                        <th className='border flex-1 p-2'>Ảnh đại diện</th>
                        <th className='border flex-1 p-2'>Tên người dùng</th>
                        <th className='border flex-1 p-2'>Số điện thoại</th>
                        <th className='border flex-1 p-2'>Tùy chọn</th>
                    </tr>
                </thead>
                <tbody>
                {currentData?.length > 0 && currentData.map(item => {
                return (
                    <UserManage 
                        key={item?.id}
                        name={item?.name}
                        phone={item?.phone}
                        id={item?.id}
                        avatar={item?.avatar}
                    />
                )
            })}
                </tbody>
                </table>
    </div>
    </div>
    );
};

export default AdminManageUser;
