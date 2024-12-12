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
        if (!posts) return [];
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
        <div className="flex flex-col gap-8 p-6 bg-gray-50 rounded-lg shadow-md">
            <h1 className="text-3xl font-semibold py-4 border-b border-gray-200 text-gray-800">Bài đăng đã lưu: {bookmarkCount}</h1>
            <p className="text-sm text-gray-600">Tip: Sắp xếp danh sách bài đăng bằng cách nhấp vào các tiêu đề cột.</p>

            <div className="overflow-x-auto"> {/* Thêm cuộn ngang cho bảng */}
                <table className="w-full table-auto text-sm">
                    <thead>
                        <tr className="bg-gray-100 text-gray-700 hover:bg-gray-200">
                            <th className="border p-3 text-left">Ảnh</th>
                            <th className="border p-3 text-left cursor-pointer" onClick={() => handleSort('title')}>Tiêu đề</th>
                            <th className="border p-3 text-left cursor-pointer" onClick={() => handleSort('price')}>Giá/tháng</th>
                            <th className="border p-3 text-left cursor-pointer" onClick={() => handleSort('size')}>Kích thước</th>
                            <th className="border p-3 text-left cursor-pointer" onClick={() => handleSort('createdAt')}>Ngày đăng</th>
                            <th className="border p-3 text-center">Tùy chọn</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedPosts.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="p-4 text-center text-gray-600">Bạn chưa lưu bài đăng nào.</td>
                            </tr>
                        ) : sortedPosts.map(bookmark => (
                            <tr
                                key={bookmark.post.id}
                                className="border-b hover:bg-gray-50 cursor-pointer"
                                onClick={() => navigate(`/chi-tiet/${bookmark.post?.id}`)}
                            >
                                <td className="p-3 flex items-center justify-center">
                                    <img
                                        src={JSON.parse(bookmark.post?.images)[0] || ''}
                                        alt="avatar-post"
                                        className="w-20 h-12 object-cover rounded-md shadow-sm"
                                    />
                                </td>
                                <td className="p-3">{bookmark.post?.title}</td>
                                <td className="p-3 text-center">{shortenMoneyAmount(bookmark.post?.price)}</td>
                                <td className="p-3 text-center">{bookmark.post?.size}m²</td>
                                <td className="p-3 text-center">{moment(bookmark.post.createdAt).format('DD/MM/YYYY')}</td>
                                <td className="p-3 text-center">
                                    <Button
                                        text="Bỏ lưu"
                                        bgColor="bg-orange-600"
                                        textColor="text-white"
                                        onClick={(e) => {
                                            e.stopPropagation();  // Prevent triggering row click event
                                            handleDeleteBookmark(bookmark.post?.id);
                                        }}
                                        className="px-4 py-2 rounded-md hover:bg-orange-700 transition-colors"
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Bookmark;
