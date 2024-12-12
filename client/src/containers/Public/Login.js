import React, { useState, useEffect } from 'react'
import { InputForm, Button } from '../../components'
import { useLocation, useNavigate } from 'react-router-dom'
import * as actions from '../../store/actions'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import validate from '../../untils/common/validateField'
import img from '../../asset/rent.png'
import image from '../../asset/image.png'

const Login = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isLoggedIn, msg, update, isAdmin } = useSelector(state => state.auth)
  const [isRegister, setIsRegister] = useState(location.state?.flag)
  const [invalidFields, setInvalidFields] = useState([])
  const [payload, setPayload] = useState({
    phone: '',
    password: '',
    name: ''
  })

  const [showImages, setShowImages] = useState(false);

  useEffect(() => {
    // Khi component load, cho hình ảnh bắt đầu trượt vào
    setShowImages(true);
  }, []);

  useEffect(() => {
    setIsRegister(location.state?.flag)
  }, [location.state?.flag])

  useEffect(() => {
    if (isLoggedIn) navigate(isAdmin ? '/admin' : '/')
  }, [isLoggedIn, isAdmin, navigate])

  useEffect(() => {
    msg && Swal.fire('Oops !', msg, 'error')
  }, [msg, update])

  const handleSubmit = async () => {
    let finalPayload = isRegister ? payload : {
      phone: payload.phone,
      password: payload.password
    }
    let invalids = validate(finalPayload, setInvalidFields)
    if (invalids === 0) isRegister ? dispatch(actions.register(payload)) : dispatch(actions.login(payload))
  }

  return (
    <div className='w-full bg-gradient-to-r flex items-center justify-center'>

      <div
        className={`absolute left-[-90px] top-[54%] transform -translate-y-[50%] transition-transform duration-5000 ease-out ${showImages ? 'translate-x-[200px]' : 'translate-x-[-200px]'}`}
      >
        <img src={img} alt="Image 1" className="w-[400px] h-auto" />
      </div>

      <div
        className={`absolute right-[-90px] top-[50%] transform -translate-y-[50%] transition-transform duration-5000 ease-out ${showImages ? 'translate-x-[-200px]' : 'translate-x-[200px]'}`}
      >
        <img src={image} alt="Image 2" className="w-[400px] h-auto" />
      </div>

      <div className='bg-white w-[400px] sm:w-[500px] p-[30px] rounded-xl shadow-lg'>
        <h3 className='font-semibold text-3xl text-center mb-6'>{isRegister ? 'Đăng ký tài khoản' : 'Đăng nhập'}</h3>
        <div className='w-full flex flex-col gap-6'>
          {isRegister && <InputForm
            setInvalidFields={setInvalidFields}
            invalidFields={invalidFields} label={'HỌ TÊN'}
            value={payload.name}
            setValue={setPayload}
            keyPayload={'name'}
          />}
          <InputForm
            setInvalidFields={setInvalidFields}
            invalidFields={invalidFields}
            label={'SỐ ĐIỆN THOẠI'}
            value={payload.phone}
            setValue={setPayload}
            keyPayload={'phone'}
          />
          <InputForm
            setInvalidFields={setInvalidFields}
            invalidFields={invalidFields}
            label={'MẬT KHÂU'}
            value={payload.password}
            setValue={setPayload}
            keyPayload={'password'}
            type='password'
          />
          <Button
            text={isRegister ? 'Đăng ký' : 'Đăng nhập'}
            bgColor='bg-gradient-to-r from-green-400 to-green-600'
            textColor='text-white'
            fullWidth
            onClick={handleSubmit}
          />
        </div>
        <div className='mt-6 text-center md:text-xl '>
          {isRegister
            ? <small>Bạn đã có tài khoản? <span
              onClick={() => {
                setIsRegister(false)
                setPayload({
                  phone: '',
                  password: '',
                  name: ''
                })
              }}
              className='text-blue-500 hover:underline cursor-pointer'
            >
              Đăng nhập ngay
            </span></small>
            : <>
              <small className='text-blue-500 hover:text-blue-700 cursor-pointer'>Quên mật khẩu?</small>
              <div className='mt-4'>
                <small
                  onClick={() => {
                    setIsRegister(true)
                    setPayload({
                      phone: '',
                      password: '',
                      name: ''
                    })
                  }}
                  className='text-blue-500 hover:text-blue-700 cursor-pointer'
                >
                  Tạo tài khoản mới
                </small>
              </div>
            </>}
        </div>
      </div>
    </div>
  )
}

export default Login
