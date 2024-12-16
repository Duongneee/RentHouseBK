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
    <div>
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
    </div>
  )
}

export default memo(UserManage)

