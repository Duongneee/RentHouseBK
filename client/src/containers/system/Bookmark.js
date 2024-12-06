import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { apiDeleteBookmark } from '../../services';
import moment from 'moment';
import { shortenMoneyAmount } from '../../untils/moneyShorten';
import * as actions from '../../store/actions';
import { Button } from '../../components';

const Bookmark = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isUpdate, setIsUpdate] = useState(false);
    const [updateData, setUpdateData] = useState(false);
    const bookmarks = useSelector(state => state.user.bookmarks?.rows);
    const bookmarkCount = useSelector(state => state.user.bookmarks?.count);
    const [posts, setPosts] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });

    useEffect(() => {
        dispatch(actions.getBookmarks());
    }, [dispatch]);

    useEffect(() => {
        setPosts(bookmarks);
    }, [bookmarks]);

    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const sortedPosts = React.useMemo(() => {
        let sortablePosts = [...posts];
        if (sortConfig.key) {
            sortablePosts.sort((a, b) => {
                if (a.post[sortConfig.key] < b.post[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a.post[sortConfig.key] > b.post[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortablePosts;
    }, [posts, sortConfig]);

    const handleDeleteBookmark = async (id) => {
        const response = await apiDeleteBookmark(id);
        if (response?.data.err === 0) {
            setUpdateData(prev => !prev);
            Swal.fire('Thành công!', 'Bỏ lưu tin đăng thành công', 'success');
            dispatch(actions.getBookmarks());
        } else {
            Swal.fire('Lỗi!', 'Xóa tin đăng thất bại', 'error');
        }
    };

    return (
        <div className='flex flex-col gap-6 '>
            <h1 className='text-3xl font-medium py-4 border-b border-gray-200'>Bài đăng đã lưu: {bookmarkCount}</h1>
            <p>Tip: sắp xếp danh sách sách bằng cách click vào trường dữ liệu tương ứng.</p>

            <table className='w-full table-auto'>
                <thead>
                    <tr className='flex w-full bg-gray-200'>
                        <th className='border flex-[1] p-2'>Ảnh</th>
                        <th className='border flex-[3] p-2 cursor-pointer' onClick={() => handleSort('title')}>Tiêu đề</th>
                        <th className='border flex-[1] p-2 cursor-pointer' onClick={() => handleSort('price')}>Giá/tháng</th>
                        <th className='border flex-[1] p-2 cursor-pointer' onClick={() => handleSort('size')}>Kích thước</th>
                        <th className='border flex-[1] p-2 cursor-pointer' onClick={() => handleSort('createdAt')}>Ngày đăng</th>
                        <th className='border flex-[1] p-2'>Tùy chọn</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedPosts.length === 0 ?
                        <tr>
                            <td colSpan="6">Bạn chưa lưu bài đăng nào.</td>
                        </tr>
                        : sortedPosts.map(bookmark => {
                            return (
                                <tr className='flex items-center h-20' key={bookmark.post.id} onClick={() => { navigate(`/chi-tiet/${bookmark.post?.id}`) }}>
                                    <td className='border px-2 flex-[1] h-full flex items-center justify-center '>
                                        <img src={JSON.parse(bookmark.post?.images)[0] || ''} alt='avatar-post' className='w-35 h-20 object-cover rounded-md'></img>
                                    </td>
                                    <td className='border px-2 flex-[3] h-full flex '>{`${bookmark.post?.title}`}</td>
                                    <td className='border px-2 flex-[1] h-full flex justify-center items-center '>{shortenMoneyAmount(bookmark.post?.price)}</td>
                                    <td className='border px-2 flex-[1] h-full flex justify-center items-center '>{bookmark.post?.size}m²</td>
                                    <td className='border px-2 flex-[1] h-full flex justify-center items-center '>{moment(bookmark.post.createdAt).format('DD/MM/YYYY')}</td>
                                    <td className='border px-2 flex-[1] h-full flex justify-center items-center gap-4'>
                                        <Button
                                            text='Bỏ lưu'
                                            bgColor='bg-orange-600'
                                            textColor='text-white'
                                            onClick={() => handleDeleteBookmark(bookmark.post?.id)}
                                        />
                                    </td>
                                </tr>
                            )
                        })}
                </tbody>
            </table>
        </div>
    );
};

export default Bookmark;