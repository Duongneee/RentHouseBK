import React, { useState } from 'react';

const AdminManagePost = () => {
    const [posts, setPosts] = useState([
        { id: 1, title: 'Bài đăng 1', description: 'Mô tả bài đăng 1' },
        { id: 2, title: 'Bài đăng 2', description: 'Mô tả bài đăng 2' },
        { id: 3, title: 'Bài đăng 3', description: 'Mô tả bài đăng 3' },
    ]);

    const handleDelete = (id) => {
        const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa bài đăng này không?');
        if (confirmDelete) {
            setPosts(posts.filter((post) => post.id !== id));
        }
    };

    const handleEdit = (id) => {
        alert(`Chỉnh sửa bài đăng với ID: ${id}`);
        // Thêm logic chỉnh sửa tại đây.
    };

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4">
            {/* Header */}
            <div className="max-w-4xl mx-auto mb-8">
                <h1 className="text-3xl font-bold text-center text-indigo-700">Quản lý bài đăng</h1>
                <p className="text-center text-gray-600 mt-2">
                    Quản lý danh sách bài đăng, chỉnh sửa hoặc xóa các bài đăng hiện có.
                </p>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-indigo-100 text-indigo-700">
                            <th className="border border-gray-300 px-4 py-3 text-left">ID</th>
                            <th className="border border-gray-300 px-4 py-3 text-left">Tiêu đề</th>
                            <th className="border border-gray-300 px-4 py-3 text-left">Mô tả</th>
                            <th className="border border-gray-300 px-4 py-3 text-center">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.length > 0 ? (
                            posts.map((post, index) => (
                                <tr
                                    key={post.id}
                                    className={`${
                                        index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                                    } hover:bg-gray-100`}
                                >
                                    <td className="border border-gray-300 px-4 py-2">{post.id}</td>
                                    <td className="border border-gray-300 px-4 py-2">{post.title}</td>
                                    <td className="border border-gray-300 px-4 py-2">{post.description}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">
                                        <button
                                            onClick={() => handleEdit(post.id)}
                                            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-all mr-2"
                                        >
                                            Chỉnh sửa
                                        </button>
                                        <button
                                            onClick={() => handleDelete(post.id)}
                                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-all"
                                        >
                                            Xóa
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="4"
                                    className="text-center py-4 text-gray-500"
                                >
                                    Không có bài đăng nào để hiển thị.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminManagePost;
