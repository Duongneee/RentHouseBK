import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PaymentResult = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Lấy các tham số từ URL
    const queryParams = new URLSearchParams(location.search);
    const status = queryParams.get('status');
    const orderId = queryParams.get('orderId');
    const amount = queryParams.get('amount');
    const newBalance = queryParams.get('newBalance');
    const message = queryParams.get('message');

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-50 to-indigo-100">
            <div className="bg-white shadow-2xl p-10 rounded-3xl text-center max-w-lg w-full">
                {status === 'success' ? (
                    <>
                        <h1 className="text-4xl font-extrabold text-green-600 mb-8">
                            Giao dịch thành công!
                        </h1>
                        <p className="text-xl mb-4">Mã giao dịch: <span className="font-semibold">{orderId}</span></p>
                        <p className="text-xl mb-4">Số tiền: <span className="font-semibold">{parseInt(amount).toLocaleString()} VNĐ</span></p>
                        <p className="text-xl mb-8">
                            Số dư mới: <span className="font-semibold">{parseInt(newBalance).toLocaleString()} VNĐ</span>
                        </p>
                        <div className="flex justify-center gap-6">
                            <button
                                onClick={() => navigate('/')}
                                className="px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 active:bg-blue-800 transition duration-300 transform hover:scale-105"
                            >
                                Về trang chủ
                            </button>
                            <button
                                onClick={() => navigate('/he-thong/nap-tien')}
                                className="px-8 py-4 bg-green-600 text-white rounded-xl hover:bg-green-700 active:bg-green-800 transition duration-300 transform hover:scale-105"
                            >
                                Nạp tiền tiếp
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <h1 className="text-4xl font-extrabold text-red-600 mb-8">
                            Giao dịch thất bại
                        </h1>
                        <p className="text-lg mb-6">Hãy thử lại !!!</p>
                        <div className="flex justify-center gap-6">
                            <button
                                onClick={() => navigate('/')}
                                className="px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 active:bg-blue-800 transition duration-300 transform hover:scale-105"
                            >
                                Về trang chủ
                            </button>
                            <button
                                onClick={() => navigate('/he-thong/nap-tien')}
                                className="px-8 py-4 bg-green-600 text-white rounded-xl hover:bg-green-700 active:bg-green-800 transition duration-300 transform hover:scale-105"
                            >
                                Nạp tiền tiếp
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default PaymentResult;
