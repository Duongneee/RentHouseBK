import React, { useState, useEffect } from "react";
import { InputForm, Button } from "../../components";
import { useNavigate } from "react-router-dom";
import * as actions from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

const DepositMoney = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Lấy thông tin từ redux
    const { isLoggedIn, msg, update } = useSelector((state) => state.auth);
    const { currentData } = useSelector((state) => state.user);


    // Quản lý payload
    const [payload, setPayload] = useState({
        userId: currentData?.id,
        amount: "",
    });

    console.log(payload)
    const [invalidFields, setInvalidFields] = useState([]);

    // Kiểm tra trạng thái đăng nhập
    useEffect(() => {
        if (!isLoggedIn) {
            Swal.fire({
                icon: "warning",
                title: "Bạn cần đăng nhập",
                text: "Vui lòng đăng nhập để tiếp tục nạp tiền.",
                confirmButtonText: "Đăng nhập",
            }).then(() => {
                navigate("/login");
            });
        }
    }, [isLoggedIn, navigate]);

    // Hiển thị thông báo lỗi từ redux
    useEffect(() => {
        if (msg) {
            Swal.fire({
                icon: "error",
                title: "Oops!",
                text: msg,
                confirmButtonText: "OK",
            });
        }
    }, [msg, update]);

    // Hàm submit
    const handleSubmit = async () => {
        const invalids = validate(payload);
        if (invalids === 0) {
            dispatch(actions.deposit(payload)); // Gửi payload lên backend
        }
    };

    // Hàm validate
    const validate = (data) => {
        let invalids = 0;
        const newInvalidFields = [];

        // Kiểm tra "amount"
        if (!data.amount || isNaN(data.amount) || parseInt(data.amount, 10) <= 0) {
            newInvalidFields.push({
                name: "amount",
                message: "Số tiền nạp phải lớn hơn 0.",
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
                    {/* Ô nhập tiền */}
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

                    {/* Nút nạp tiền */}
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
