import React, { useState, useEffect } from 'react'
import { InputForm, Button } from '../../components'
import { useLocation, useNavigate } from 'react-router-dom'
import * as actions from '../../store/actions'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'

const DepositMoney = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isLoggedIn, msg, update } = useSelector(state => state.auth)
    const [invalidFields, setInvalidFields] = useState([])
    const [payload, setPayload] = useState({
        amount: '' // Số tiền nạp
    })

    useEffect(() => {
        if (!isLoggedIn) {
            // Nếu chưa đăng nhập, chuyển hướng đến trang đăng nhập
            navigate('/login')
        }
    }, [isLoggedIn, navigate])

    useEffect(() => {
        msg && Swal.fire('Oops !', msg, 'error')
    }, [msg, update])

    const handleSubmit = async () => {
        let invalids = validate(payload)
        if (invalids === 0) {
            // Gửi yêu cầu nạp tiền
            dispatch(actions.deposit(payload))
        }
    }

    const validate = (payload) => {
        let invalids = 0
        let fields = Object.entries(payload)
        fields.forEach(item => {
            if (item[1] === '') {
                setInvalidFields(prev => [...prev, {
                    name: item[0],
                    message: 'Bạn không được bỏ trống trường này.'
                }])
                invalids++
            }
        })
        // Kiểm tra số tiền nạp hợp lệ
        if (parseInt(payload.amount) <= 0) {
            setInvalidFields(prev => [...prev, {
                name: 'amount',
                message: 'Số tiền nạp phải lớn hơn 0.'
            }])
            invalids++
        }
        return invalids
    }

    return (
        <div className='w-full flex items-center justify-center'>
            <div className='bg-white w-[600px] p-[30px] pb-[100px] rounded-md shadow-sm'>
                <h3 className='font-semibold text-2xl mb-3'>Nạp tiền vào tài khoản</h3>
                <div className='w-full flex flex-col gap-5'>
                    <InputForm
                        setInvalidFields={setInvalidFields}
                        invalidFields={invalidFields}
                        label={'SỐ TIỀN NẠP'}
                        value={payload.amount}
                        setValue={setPayload}
                        keyPayload={'amount'}
                        type='number'
                    />
                    <Button
                        text={'Nạp tiền'}
                        bgColor='bg-secondary1'
                        textColor='text-white'
                        fullWidth
                        onClick={handleSubmit}
                    />
                </div>
            </div>
        </div>
    )
}

export default DepositMoney
