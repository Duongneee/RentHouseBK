import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../axiosConfig';
import 'moment/locale/vi';
import { getUsers } from '../../store/actions';
import anonAvatar from '../../asset/anon-avatar.png'
import { Button } from '../../components';
import Swal from 'sweetalert2';
import { apiDeleteUser } from '../../services';

const AdminManageUser = () => {
    const dispatch = useDispatch()
     const { users, count } = useSelector(state => state.user)
     const [page, setPage] = useState(0)
     const [maxPage, setMaxPage] = useState(1);
     useEffect(() => {
             dispatch(getUsers({page}));
         }, [page]);

    useEffect(() => {
        let calculatedMaxPage = Math.ceil(count / 10) 
        setMaxPage(calculatedMaxPage)
    },[count, users])
    
         const handlePageChange = (newPage) => {
            setPage(newPage);
        };

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
                        dispatch(getUsers({page})); // Refresh posts after deletion
                        Swal.fire('Thành công!', 'Xóa tài khoản thành công', 'success');
                    } else {
                        Swal.fire('Lỗi!', 'Xóa tài khoản thất bại', 'error');
                    }
                }
            };
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
                        {users && users.length > 0 ? (
                            users.map(user => (
                                <tr className='flex items-center h-16' key={user?.id}>
                                            <td className='border px-2 flex-1 h-full flex justify-center items-center'>
                                                {`#${user?.id?.match(/\d/g).join('')?.slice(0, 6)}` || ''}
                                            </td>
                                            <td className='border px-2 flex-1 h-full flex items-center justify-center'>
                                                <img src={user?.avatar || anonAvatar} alt='avatar-post' className='w-10 h-10 object-cover rounded-md' />
                                            </td>
                                            <td className='border px-2 flex-1 h-full flex justify-center items-center'>
                                                {user?.name}
                                            </td>
                                            <td className='border px-2 flex-1 h-full flex justify-center items-center'>
                                                {user?.phone}
                                            </td>
                                            <td className='border px-2 flex-1 h-full flex justify-center items-center'>
                                                <Button
                                                    text='Xóa'
                                                    bgColor='bg-red-500'
                                                    textColor='text-white'
                                                    onClick={() => handleDeleteUser(user?.id)}
                                                >Xóa</Button>
                                            </td>
                                        </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8" className='text-center'>Không có tài khoản nào</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <div className='flex justify-center mt-4'>
                {Array.from({ length: maxPage }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageChange(index)}
                        className={`px-4 py-2 mx-1 ${page === index ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>


            </div>
        </div>
    );
};

export default AdminManageUser;
