import React, { useState, useEffect } from 'react';
import { InputForm, Button } from '../../components';
import { useLocation, useNavigate } from 'react-router-dom';
import * as actions from '../../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';

const DepositMoney = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoggedIn, msg, update } = useSelector(state => state.auth);
    const [invalidFields, setInvalidFields] = useState([]); 
    const [payload, setPayload] = useState({        
        amount: '', 
    });

    // Xác thực đăng nhập
    useEffect(() => {
        if (!isLoggedIn) {
            Swal.fire({
                icon: 'warning',
                title: 'Bạn cần đăng nhập',
                text: 'Vui lòng đăng nhập để tiếp tục nạp tiền.',
                confirmButtonText: 'Đăng nhập',
            }).then(() => {
                navigate('/login');
            });
        }
    }, [isLoggedIn, navigate]);

    // Hiển thị thông báo lỗi từ redux
    useEffect(() => {
        if (msg) {
            Swal.fire({
                icon: 'error',
                title: 'Oops!',
                text: msg,
                confirmButtonText: 'OK',
            });
        }
    }, [msg, update]);

    const handleSubmit = async () => {
        let invalids = validate(payload);
        if (invalids === 0) {
            dispatch(actions.deposit(payload));
        }
    };

    const validate = (payload) => {
        let invalids = 0;
        const fields = Object.entries(payload);

        const newInvalidFields = [];
        fields.forEach(([key, value]) => {
            if (!value.trim()) {
                newInvalidFields.push({
                    name: key,
                    message: 'Bạn không được bỏ trống trường này.',
                });
                invalids++;
            }
        });

        // Kiểm tra số tiền nạp phải lớn hơn 0
        if (parseInt(payload.amount, 10) <= 0) {
            newInvalidFields.push({
                name: 'amount',
                message: 'Số tiền nạp phải lớn hơn 0.',
            });
            invalids++;
        }

        setInvalidFields(newInvalidFields);
        return invalids;
    };

    return (
        <div className="w-full h-[500px] flex items-center justify-center bg-gray-100">
            <div className="bg-white w-[500px] p-8 rounded-lg shadow-lg">
                <h3 className="font-semibold text-2xl mb-6 text-center text-gray-800">
                    Nạp tiền vào tài khoản
                </h3>
                <div className="w-full flex flex-col gap-6">
                    <InputForm
                        setInvalidFields={setInvalidFields}
                        invalidFields={invalidFields}
                        label="Số tiền nạp (VNĐ)"
                        value={payload.amount}
                        setValue={setPayload}
                        keyPayload="amount"
                        type="number"
                        placeholder="Nhập số tiền cần nạp"
                    />

                    {/* Chọn phương thức thanh toán */}
                    <div className="flex flex-col">
                        <label className="text-gray-700 font-medium">Chọn phương thức thanh toán</label>
                        <div className="flex items-center gap-4 mt-2">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    value="VNPay"
                                    checked={payload.paymentMethod === 'VNPay'}
                                    onChange={(e) => setPayload({ ...payload, paymentMethod: e.target.value })}
                                    className="mr-2"
                                />
                                VNPay
                            </label>
                            {/* Bạn có thể thêm các lựa chọn khác ở đây */}
                        </div>
                    </div>

                    <Button
                        text="Nạp tiền"
                        bgColor="bg-blue-500 hover:bg-blue-600"
                        textColor="text-white"
                        fullWidth
                        onClick={handleSubmit}
                    />
                </div>

                {/* Hiển thị lỗi */}
                {invalidFields.length > 0 && (
                    <div className="mt-4 text-red-500 text-sm">
                        {invalidFields.map((field, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <span className="font-bold">•</span> {field.message}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DepositMoney;
