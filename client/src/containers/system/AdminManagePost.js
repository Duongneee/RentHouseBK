import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions';
import moment from 'moment';
import 'moment/locale/vi';
import { Button } from '../../components';
import { apiDeletePost } from '../../services';
import Swal from 'sweetalert2';
import icons from '../../untils/icon'

const {FiSearch} = icons

const AdminManagePost = () => {
    const dispatch = useDispatch();
    const { posts, totalPages } = useSelector(state => state.post);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(5);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        dispatch(actions.getAllPosts({ page, limit }));
    }, [page, limit]);

    useEffect(() => {
        console.log(posts, totalPages);
    }, [posts, totalPages]);

    const handleDeletePost = async (id) => {
        const result = await Swal.fire({
            title: 'Bạn có chắc chắn muốn xóa bài đăng này không?',
            text: "Bạn sẽ không thể hoàn tác hành động này!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Có, xóa nó!',
            cancelButtonText: 'Hủy'
        });

        if (result.isConfirmed) {
            const response = await apiDeletePost(id);
            if (response?.data.err === 0) {
                dispatch(actions.getAllPosts({ page, limit })); // Refresh posts after deletion
                Swal.fire('Thành công!', 'Xóa tin đăng thành công', 'success');
            } else {
                Swal.fire('Lỗi!', 'Xóa tin đăng thất bại', 'error');
            }
        }
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const handleLimitChange = (event) => {
        setLimit(parseInt(event.target.value));
        setPage(0); // Reset to first page when limit changes
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredPosts = posts.filter(post => {
        const postId = post?.id?.match(/\d/g)?.join('')?.slice(0, 6) || '';
        const postTitle = post?.title?.toLowerCase() || '';
        const userName = post?.owner?.name?.toLowerCase() || '';
        const query = searchQuery.toLowerCase();

        return postId.includes(query) || postTitle.includes(query) || userName.includes(query);
    });

    return (
        <div className='flex flex-col gap-6'>
            <h1 className='text-3xl font-medium py-4 border-b border-gray-200'>Quản lý tin đăng</h1>
            <div className='flex justify-between mb-4'>
                <div className='flex items-center'>
                    <label htmlFor="search" className='mr-2'><FiSearch /></label>
                    <input
                        id="search"
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className='border p-2 rounded w-80'
                        placeholder='Mã tin, tiêu đề, tên người đăng'
                    />
                </div>
                <div className='flex items-center'>
                    <label htmlFor="limit" className='mr-2'>Số lượng bài viết mỗi trang:</label>
                    <select id="limit" value={limit} onChange={handleLimitChange} className='border p-2 rounded'>
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                    </select>
                </div>
            </div>
            <table className='w-full table-auto'>
                <thead>
                    <tr className='flex w-full bg-gray-200'>
                        <th className='border flex-1 p-2'>Mã tin</th>
                        <th className='border flex-1 p-2'>Ảnh đại diện</th>
                        <th className='border flex-1 p-2'>Tiêu đề</th>
                        <th className='border flex-1 p-2'>Giá</th>
                        <th className='border flex-1 p-2'>Ngày đăng</th>
                        <th className='border flex-1 p-2'>Ngày hết hạn</th>
                        <th className='border flex-1 p-2'>Người đăng</th>
                        <th className='border flex-1 p-2'>Tùy chọn</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredPosts && filteredPosts.length > 0 ? (
                        filteredPosts.map(post => (
                            <tr className='flex items-center h-16' key={post.id}>
                                <td className='border px-2 flex-1 h-full flex justify-center items-center'>
                                    #{post?.id?.match(/\d/g)?.join('')?.slice(0, 6)}
                                </td>
                                <td className='border px-2 flex-1 h-full flex items-center justify-center'>
                                    <img src={JSON.parse(post?.images)[0] || ''} alt='avatar-post' className='w-10 h-10 object-cover rounded-md' />
                                </td>
                                <td className='border px-2 flex-1 h-full flex justify-center items-center'>
                                    {`${post?.title?.slice(0, 40)}...`}
                                </td>
                                <td className='border px-2 flex-1 h-full flex justify-center items-center'>
                                    {post?.price / 1000000} triệu/tháng
                                </td>
                                <td className='border px-2 flex-1 h-full flex justify-center items-center'>
                                    {moment(post.createdAt).format('DD/MM/YYYY')}
                                </td>
                                <td className='border px-2 flex-1 h-full flex justify-center items-center'>
                                    {moment(post.expiryDate).format('DD/MM/YYYY')}
                                </td>
                                <td className='border px-2 flex-1 h-full flex justify-center items-center'>
                                    {post?.owner?.name || 'N/A'}
                                </td>
                                <td className='border px-2 flex-1 h-full flex justify-center items-center'>
                                    <Button 
                                    text='Xóa'
                                    bgColor='bg-red-500'
                                    textColor='text-white'         
                                    onClick={() => handleDeletePost(post.id)}>Xóa</Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8" className='text-center'>Không có bài đăng nào</td>
                        </tr>
                    )}
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