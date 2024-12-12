import React, { useState, useEffect } from "react";
import { InputForm, Button } from "../../components";
import { useNavigate } from "react-router-dom";
import * as actions from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

const DepositMoney = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isLoggedIn, msg, update } = useSelector((state) => state.auth);
    const { currentData } = useSelector((state) => state.user);

    const [payload, setPayload] = useState({
        userId: currentData?.id,
        amount: "",
    });
    const [invalidFields, setInvalidFields] = useState([]);

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

    useEffect(() => {
        if (msg) {
            Swal.fire({
                icon: "error",
                title: "Thông báo",
                text: msg,
                confirmButtonText: "OK",
            });
        }
    }, [msg, update]);

    const validate = (data) => {
        let invalids = 0;
        const newInvalidFields = [];
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

    const handleSubmit = async () => {
        const invalids = validate(payload);
        if (invalids === 0) {
            dispatch(actions.deposit(payload));
        }
    };

    return (
        <div className="flex-auto bg-gradient-to-r from-indigo-50 to-blue-50 flex justify-center items-center h-screen">
            <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-2xl transform hover:scale-105 transition-all duration-300 ease-in-out">
                <h3 className="font-bold text-2xl text-center text-gray-800 mb-6">
                    Nạp tiền vào tài khoản
                </h3>
                <div className="flex flex-col gap-6">
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
                        bgColor="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
                        textColor="text-white"
                        fullWidth
                        onClick={handleSubmit}
                        className="shadow-lg hover:shadow-xl transition-shadow duration-300"
                    />
                </div>

                {/* Hiển thị lỗi */}
                {invalidFields.length > 0 && (
                    <div className="mt-4 text-red-500 text-sm bg-red-100 p-3 rounded-md shadow-md">
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
