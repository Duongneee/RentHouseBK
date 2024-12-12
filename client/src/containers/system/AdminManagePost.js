import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions';
import moment from 'moment';
import 'moment/locale/vi';
import { Button } from '../../components';
import { apiDeletePost } from '../../services';
import Swal from 'sweetalert2';

const AdminManagePost = () => {
    const dispatch = useDispatch();
    const { posts, totalPages } = useSelector(state => state.post);
    const [page, setPage] = useState(0);

    useEffect(() => {
        dispatch(actions.getAllPosts({ page, limit: 10 }));
    }, [page]);

    useEffect(() => {
        console.log(posts, totalPages); // Verify the posts and totalPages values
    }, [posts, totalPages]);

    const handleDeletePost = async (id) => {
        const response = await apiDeletePost(id);
        if (response?.data.err === 0) {
            dispatch(actions.getAllPosts({ page, limit: 10 })); // Refresh posts after deletion
            Swal.fire('Thành công!', 'Xóa tin đăng thành công', 'success');
        } else {
            Swal.fire('Lỗi!', 'Xóa tin đăng thất bại', 'error');
        }
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    return (
        <div className='flex flex-col gap-6 '>
          <div className='py-4 border-b border-gray-200 flex items-center justify-between'>
                <h1 className='text-3xl font-medium py-4 border-b border-gray-200'>Quản lý tin đăng</h1>
            </div>
            <table className='w-full table-auto'>
                <thead >
                    <tr className='flex w-full bg-gray-200'>
                        <th className='border flex-1 p-2' >Mã tin</th>
                        <th className='border flex-1 p-2' >Ảnh đại diện</th>
                        <th className='border flex-1 p-2' >Tiêu đề</th>
                        <th className='border flex-1 p-2' >Giá</th>
                        <th className='border flex-1 p-2' >Ngày đăng</th>
                        <th className='border flex-1 p-2' >Ngày hết hạn</th>
                        <th className='border flex-1 p-2' >Tùy chọn</th>
    
                    </tr>
                </thead>
                <tbody>
                {!posts ?
                    <tr>
                            <td> Error! </td>
                            </tr> 
                            : posts?.map(post => {
                                return (
                                <tr className='flex items-center h-16' key={post.id}>
                                    <td className='border px-2 flex-1 h-full flex justify-center items-center '>#{post?.id?.match(/\d/g).join('')?.slice(0, 6)}</td>
                                    <td className='border px-2 flex-1 h-full flex items-center justify-center '>
                                        <img src={JSON.parse(post?.images)[0] || '' } alt='avatar-post' className='w-10 h-10 object-cover rounded-md'></img>
                                    </td>
                                    <td className='border px-2 flex-1 h-full flex justify-center items-center '>{`${post?.title?.slice(0,40)}...`}</td>
                                    <td className='border px-2 flex-1 h-full flex justify-center items-center '>{post?.price/ 1000000 } triệu/tháng</td>
                                    <td className='border px-2 flex-1 h-full flex justify-center items-center '>{moment(post.createdAt).format('DD/MM/YYYY')}</td>
                                    <td className='border px-2 flex-1 h-full flex justify-center items-center '>{moment(post.expiryDate).format('DD/MM/YYYY')}</td>
                                    <td className='border px-2 flex-1 h-full flex justify-center items-center gap-4'>
                                        <Button 
                                        text='Xóa'
                                        bgColor='bg-orange-600'
                                        textColor='text-white'
                                        onClick={() => handleDeletePost(post.id)}
                                        />
                                    </td>
                                </tr>
                                )
                            })}
                            
                </tbody>
            </table>
            <div className='flex justify-center mt-4'>
                {Array.from({ length: totalPages }, (_, index) => (
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
    );
};

export default AdminManagePost;