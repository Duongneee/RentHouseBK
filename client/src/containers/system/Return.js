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
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="bg-white shadow-md p-8 rounded-md text-center">
                {status === 'success' ? (
                    <>
                        <h1 className="text-2xl font-bold mb-4 text-green-600">
                            Giao dịch thành công!
                        </h1>
                        <p className="text-lg mb-2">Mã giao dịch: {orderId}</p>
                        <p className="text-lg mb-2">Số tiền: {parseInt(amount).toLocaleString()} VNĐ</p>
                        <p className="text-lg mb-2">
                            Số dư mới: {parseInt(newBalance).toLocaleString()} VNĐ
                        </p>
                        <button
                            onClick={() => navigate('/')}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 mt-4"
                        >
                            Về trang chủ
                        </button>
                        <button
                            onClick={() => navigate('/he-thong/nap-tien')}
                            className="ml-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 mt-4"
                        >
                            Nạp tiền tiếp
                        </button>
                    </>
                ) : (
                    <>
                        <h1 className="text-2xl font-bold mb-4 text-red-600">
                            Giao dịch thất bại
                        </h1>
                        <p className="text-lg mb-4">{decodeURIComponent(message)}</p>
                        <button
                            onClick={() => navigate('/')}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                        >
                            Về trang chủ
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default PaymentResult;
