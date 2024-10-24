import React, { useState, useEffect } from 'react'
import { Button, InputForm } from '../../components'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'



const Login = () => {

  const location = useLocation()
  const [IsRegister, setIsRegister] = useState(location.state?.flag)
  useEffect(() => {
    setIsRegister(location.state?.flag)
  }, [location.state?.flag])
  console.log(location)

  return (
    <div className='bg-white w-[600px] p-[30px] pb-[100px] rounded-md shadow-sm'>
      <h3 className='font-semibold text-2xl mb-3'> {IsRegister ? 'Đăng kí tài khoản' : 'Đăng nhập'}</h3>
      <div className='w-full flex flex-col gap-3'>
        {IsRegister && <InputForm label={'HỌ VÀ TÊN'} />}
        <InputForm label={'SỐ ĐIỆN THOẠI'} />
        <InputForm label={'MẬT KHẨU'} />

        <Button
          text={IsRegister ? 'Tạo tài khoản' : 'Đăng nhập'}
          bgColor='bg-secondary1'
          textColor='text-white'
          fullWidth
        />

      </div>
      <div className='mt-7 flex items-center justify-between' >
        {IsRegister
          ? <small>Bạn đã có tài khoản ? <span onClick={() => { setIsRegister(false) }} className='text-blue-500 hover:underline cursor-pointer'>Đăng nhập ngay</span></small>
          : <>
            <small className='text-[blue] hover:text-[red] cursor-pointer'>Bạn quên mật khẩu?</small>
            <small onClick={() => { setIsRegister(true) }} className='text-[blue] hover:text-[red] cursor-pointer'>Tạo tài khoản mới </small>
          </>
        }

      </div>
    </div>

  )
}

export default Login