import React, { useState } from 'react';

const AdminManageUser = () => {
    const [posts, setPosts] = useState([
        { id: 1, title: 'Người dùng 1', description: 'Số điện thoại 1' },
        { id: 2, title: 'Người dùng 2', description: 'Số điện thoại 2' },
        { id: 3, title: 'Người dùng 3', description: 'Số điện thoại 3' },
    ]);

    const handleDelete = (id) => {
        const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa người dùng này không?');
        if (confirmDelete) {
            setPosts(posts.filter((post) => post.id !== id));
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4">
            {/* Header */}
            <div className="max-w-4xl mx-auto mb-8">
                <h1 className="text-3xl font-bold text-center text-indigo-700">Quản lý người dùng</h1>
                <p className="text-center text-gray-600 mt-2">
                    Quản lý danh sách người dùng, xóa những tài khoản người dùng hiện có.
                </p>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-indigo-100 text-indigo-700">
                            <th className="border border-gray-300 px-4 py-3 text-left">ID</th>
                            <th className="border border-gray-300 px-4 py-3 text-left">Tên người dùng</th>
                            <th className="border border-gray-300 px-4 py-3 text-left">Số điện thoại</th>
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
                                    Không có người dùng nào để hiển thị.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminManageUser;
