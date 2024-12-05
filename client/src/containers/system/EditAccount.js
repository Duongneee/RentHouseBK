import React, {useState} from 'react'
import { InputReadOnly, InputFormV2, Button } from '../../components'
import anonAvatar from '../../asset/anon-avatar.png'
import { useSelector, useDispatch } from 'react-redux'
import { apiUploadImages, apiUpdateUser } from '../../services'
import { getCurrent } from '../../store/actions'
import Swal from 'sweetalert2'
import validate from '../../untils/common/validateField'

const EditAccount = () => {
    const {currentData} = useSelector(state => state.user)
    const [invalidFields, setInvalidFields] = useState([])
    const dispatch = useDispatch()
    const [payload, setpayload] = useState({
        name: currentData?.name || '',
        avatar: currentData?.avatar,
        phone: currentData?.phone || ''
    })
    const handleSummit = async () => { 
        const validcounter = validate(payload, setInvalidFields)
        const response = await apiUpdateUser(payload)
        if (response?.data.err === 0 && validcounter === 0){
            Swal.fire('Done', 'Chỉnh sửa thông tin cá nhân thành công', 'success').then(() => { 
                dispatch(getCurrent())
             })
        }else{
            Swal.fire('Oops!', 'Chỉnh sửa thông tin cá nhân không thành công', 'error')
        }
    }
    const handleUploadFile = async (e) => { 
    const image = e.target.files[0]
    let formData = new FormData()
      formData.append('file', image)
      formData.append('upload_preset', process.env.REACT_APP_UPLOAD_ASSETS_NAME)
      const response = await apiUploadImages(formData)
      if (response.status === 200) {
        setpayload(prev => ({ ...prev, avatar: response.data.secure_url }))
      }
       
     }
  return (
    <div className='flex flex-col h-full items-center'>
        <h1 className='text-3xl w-full text-start font-medium py-4 border-b border-gray-200'>Chỉnh sửa thông tin cá nhân</h1>
        <div className='w-3/5 flex items-center justify-center flex-auto'>
        <div className='py-6 flex flex-col gap-4 w-full'>
            <InputReadOnly value={`#${currentData?.id?.match(/\d/g).join('')?.slice(0, 6)}` || ''} direction={'flex-row'} label={'Mã thành viên'} />
            <InputFormV2 setInvalidFields={setInvalidFields} invalidFields={invalidFields} name='name' setValue={setpayload} value={payload.name} direction={'flex-row'} label={'Tên hiển thị'} />
            <InputFormV2 setInvalidFields={setInvalidFields} invalidFields={invalidFields} name='phone' setValue={setpayload} value={payload.phone} direction={'flex-row'} label={'Số điện thoại'} />
            <div className='flex'>
                <label className='w-48 flex-none' htmlFor='password'>Mật khẩu</label>
                <small className='flex-auto text-blue-500 h-12 cursor-pointer'>Đổi mật khẩu</small>
            </div>
            <div className='flex mb-6'>
                <label className='w-48 flex-none' htmlFor='avatar'>Ảnh đại diện</label>
                <div>
                    <img src={payload.avatar || anonAvatar} alt='avatar' className='w-28 h-28 rounded-full object-cover' />
                    <input onChange={handleUploadFile} type='file' className='appearance-none my-4' id='avatar' />
                </div>
            </div>
            <Button text='Cập nhật' bgColor='bg-blue-600' textColor='text-white' onClick={handleSummit} />
        </div>
        </div>
    </div>
  )
}

export default EditAccount