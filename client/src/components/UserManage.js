import React, { memo, useState } from 'react'
import anonAvatar from '../asset/anon-avatar.png'
import { Button } from './index';
import Swal from 'sweetalert2';
import * as actions from '../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { apiDeleteUser } from '../services';

const UserManage = ({name, phone, id, avatar}) => {
    const dispatch = useDispatch();
     const handleDeleteUser = async (id) => {
            const result = await Swal.fire({
                title: 'Bạn có chắc chắn muốn xóa người dùng này không?',
                text: "Bạn sẽ không thể hoàn tác hành động này!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Có, xóa tài khoản này!',
                cancelButtonText: 'Hủy'
            });
    
            if (result.isConfirmed) {
                const response = await apiDeleteUser(id);
                if (response?.data.err === 0) {
                    dispatch(actions.getUsers()); // Refresh posts after deletion
                    Swal.fire('Thành công!', 'Xóa tài khoản thành công', 'success');
                } else {
                    Swal.fire('Lỗi!', 'Xóa tài khoản thất bại', 'error');
                }
            }
        };
  return (
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
                            <tr className='flex items-center h-16'>
                                <td className='border px-2 flex-1 h-full flex justify-center items-center'>
                                    {`#${id?.match(/\d/g).join('')?.slice(0, 6)}` || ''}
                                </td>
                                <td className='border px-2 flex-1 h-full flex items-center justify-center'>
                                    <img src={avatar || anonAvatar} alt='avatar-post' className='w-10 h-10 object-cover rounded-md' />
                                </td>
                                <td className='border px-2 flex-1 h-full flex justify-center items-center'>
                                    {name}
                                </td>
                                <td className='border px-2 flex-1 h-full flex justify-center items-center'>
                                    {phone}
                                </td>
                                <td className='border px-2 flex-1 h-full flex justify-center items-center'>
                                    <Button 
                                    text='Xóa'
                                    bgColor='bg-red-500'
                                    textColor='text-white' 
                                    onClick={() => handleDeleteUser(id)}        
                                    >Xóa</Button>
                                </td>
                            </tr>
                </tbody>
            </table>
            {/* <div className='flex justify-center mt-4'>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageChange(index)}
                        className={`px-4 py-2 mx-1 ${page === index ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div> */}
        </div>
  )
}

export default memo(UserManage)

