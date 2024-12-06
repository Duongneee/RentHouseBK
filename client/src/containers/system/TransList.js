import React, { useEffect, useState } from 'react';
import { fetchPaymentHistory } from '../../services/Depositmoney';

const PaymentHistory = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(5);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const data = await fetchPaymentHistory(page, limit);
                if (data.err === 0) {
                    setPayments(data.response.rows);
                    setTotalPages(data.response.totalPages);
                } else {
                    setError(data.msg);
                }
            } catch (err) {
                setError(err.message || 'Error fetching payment history');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [page, limit]);

    if (loading) return <div className="text-center p-4 text-blue-500">Loading...</div>;
    if (error) return <div className="text-center text-red-500 p-4">Error: {error}</div>;

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-4xl font-extrabold text-indigo-700 mb-6 text-center drop-shadow-md">
                Lịch sử giao dịch
            </h1>

            {/* Bộ chọn số lượng hiển thị */}
            <div className="mb-6 flex items-center gap-x-4">
                <label htmlFor="limit" className="text-lg font-medium text-gray-800">
                    Số lượng hiển thị:
                </label>
                <select
                    id="limit"
                    value={limit}
                    onChange={(e) => setLimit(parseInt(e.target.value, 10))}
                    className="border rounded-lg p-2 text-gray-700 shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
                >
                    <option value={2}>2</option>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                </select>
            </div>


            {payments.length === 0 ? (
                <p className="text-center text-gray-500">Không tìm thấy giao dịch nào.</p>
            ) : (
                <div className="overflow-x-auto shadow-2xl rounded-lg">
                    <table className="min-w-full table-auto border-collapse border border-gray-300">
                        <thead className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                            <tr>
                                <th className="px-4 py-3 text-left text-sm font-bold border-b">#</th>
                                <th className="px-4 py-3 text-left text-sm font-bold border-b">Số tiền</th>
                                <th className="px-4 py-3 text-left text-sm font-bold border-b">Ngày</th>
                                <th className="px-4 py-3 text-left text-sm font-bold border-b">Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map((payment, index) => (
                                <tr
                                    key={payment.id}
                                    className="hover:bg-indigo-50 transform hover:scale-105 transition-transform duration-200"
                                >
                                    <td className="px-4 py-3 text-sm text-gray-900 border-b">
                                        {index + 1 + page * limit}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-900 border-b">
                                        {payment.amount} VND
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-900 border-b">
                                        {new Date(payment.createdAt).toLocaleDateString()}
                                    </td>
                                    <td
                                        className={`px-4 py-3 text-sm font-medium border-b ${payment.status === 'success' ? 'text-green-600' : 'text-red-600'
                                            }`}
                                    >
                                        {payment.status === 'success' ? 'Thành công' : 'Thất bại'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Điều hướng phân trang */}
            <div className="mt-6 flex justify-between items-center">
                <button
                    disabled={page === 0}
                    onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
                    className="bg-blue-600 text-white px-5 py-3 rounded-lg shadow-lg disabled:bg-gray-400 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300 transform hover:scale-105"
                >
                    Previous
                </button>
                <span className="text-lg font-medium">{`Trang ${page + 1} / ${totalPages}`}</span>
                <button
                    disabled={page >= totalPages - 1}
                    onClick={() => setPage((prev) => Math.min(prev + 1, totalPages - 1))}
                    className="bg-blue-600 text-white px-5 py-3 rounded-lg shadow-lg disabled:bg-gray-400 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300 transform hover:scale-105"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default PaymentHistory;
