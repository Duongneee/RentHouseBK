import React, {useEffect, useState} from 'react'
import { Overview, Address , Button, Loading} from '../../components'
import { apiUploadImages } from '../../services'
import { useSelector } from 'react-redux'
import { apiCreatePost } from '../../services'
import { apiUpdatePost } from '../../services'
import icon from '../../untils/icon'
import Swal from 'sweetalert2'
import validate from '../../untils/common/validateField'
import { useDispatch } from 'react-redux'
import { resetData } from '../../store/actions'

const {BsCameraFill, ImBin} = icon

const CreatePost = ({isUpdate}) => {
  const dispatch = useDispatch()
  const { dataUpdate } = useSelector(state => state.post)
  const { currentData } = useSelector(state => state.user)

  const [payload, setPayload] = useState(() => {
    const initData = {
      categoryCode: '',
      title: '',
      price: 0,
      size: 0,
      images: '',
      address: '',
      description: '',
      city: '',
      district: '',
      ward: '',
      street: ''
    };

    if (isUpdate && dataUpdate) {
      try {
        return {
          ...initData,
          ...dataUpdate,
          price: dataUpdate.price * 1000000,
          images: JSON.parse(dataUpdate.images || ''),
          description: JSON.parse(dataUpdate.description)
        };
      } catch (error) {
        console.error('Error parsing JSON:', error);
        return initData;
      }
    }

    return initData;
  });



  const [imagesPreview, setImagesPreview] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [invalidFields, setInvalidFields] = useState([])

  useEffect(() => {
    if (dataUpdate) {
        try {
            let images = JSON.parse(dataUpdate?.images || '');
            images && setImagesPreview(images);
        } catch (error) {
            console.error('Error parsing JSON:', error);
            setImagesPreview([]);
        }
    }
}, [dataUpdate]);

  const handleFiles = async (e) => {
    e.stopPropagation()
    setIsLoading(true)
    let images = []
    let files = e.target.files
    let formData = new FormData()
    for (let i of files) {
      formData.append('file', i)
      formData.append('upload_preset', process.env.REACT_APP_UPLOAD_ASSETS_NAME)
      let response = await apiUploadImages(formData)
      if (response.status === 200) images = [...images, response.data?.secure_url]
    }
    setIsLoading(false)
    setImagesPreview(prev => [...prev, ...images])
        setPayload(prev => ({ ...prev, images: [...prev.images, ...images] }))
}

const handleDeleteImage = (image) => {
  setImagesPreview(prev => prev.filter(item => item !== image));

  // Update the payload state
  setPayload(prev => ({
    ...prev,
    images: prev.images.filter(item => item !== image)
  }))
}


const handleSubmit = async () => {
  if(payload.title === '' || payload.price === 0 || payload.size === 0 || payload.description === ''  || payload.city === '' || payload.street === '' || payload.images === '', payload.district === '', payload.ward === '') {
    alert('Vui lòng điền đầy đủ thông tin');
    return;
  } 
  
  let finalPayload = {
    ...payload,
    price: +payload.price / 1000000,
    size: payload.size.toString(),
    userId: currentData.id,    
  }
  // let invalids = validate(finalPayload, setInvalidFields)
  // if (invalids === 0) {
  //   console.log(payload);
  //   console.log(invalidFields);
  // const result = 
  // if ( result === 0) {

  // }
    try {
      let response;
      if (isUpdate) {
        response = await apiUpdatePost(finalPayload);
      } else {
        response = await apiCreatePost(finalPayload);
      }

      if (response?.data.err === 0) {
        Swal.fire('Thành công', isUpdate ? 'Đã chỉnh sửa bài đăng' : 'Đã thêm bài đăng mới', 'success').then(() => {
          resetPayload();
          if (isUpdate) {
            dispatch(resetData());
          }
        })
          } else {
            Swal.fire('Thất bại', 'Đã có lỗi xảy ra', 'error');
          }
        } catch (error) {
          if (error.response?.data?.message === 'Tài khoản không đủ số dư để đăng bài') {
            Swal.fire('Thất bại', 'Tài khoản không đủ số dư để đăng bài', 'error');
          } else {
            Swal.fire('Thất bại', 'Đã có lỗi xảy ra', 'error');
          }
    }
  };
  const resetPayload = () => {
    setPayload({
      title: '',
      price: 0,
      size: 0,
      images: '',
      address: '',
      description: '',
      city: '',
      district: '',
      ward: '',
      street: ''
    });
    setImagesPreview([]);
  }


  return (
    <div className='px-6'>
      <h1 className='text-3xl font-medium py-4 border-b border-gray-200'>{isUpdate ? 'Chỉnh sửa tin đăng' : 'Đăng tin mới'}</h1>
      <div className='flex gap-4'>
        <div className='py-4 flex flex-col gap-8 flex-auto'>
          <Address invalidFields={invalidFields} payload={payload} setPayload={setPayload}/>
          <Overview invalidFields={invalidFields} payload={payload} setPayload={setPayload}/>
          <div className='w-full'>
            <h2 className='font-semibold text-xl py-4'>Hình ảnh</h2>
            <small>Cập nhật hình ảnh rõ ràng sẽ giúp cho thuê nhanh hơn</small>
            <div className='w-full'>
              <label className='w-full border-2 h-[200px] my-4 gap-4 flex flex-col items-center justify-center border-gray-400 border-dashed rounded-md' htmlFor="file">
                {isLoading
                ? <Loading />
                : <div className='flex flex-col items-center'>
                <BsCameraFill color='blue' size={50}/>
                Thêm ảnh
                  </div>}
              </label>
              <input onChange={handleFiles} hidden type="file" id='file' multiple/>
              <div className='w-full mb-6'>
                <h3 className='font-medium'>Ảnh đã chọn</h3>
                <div className='flex gap-4 items-center'>
                  {imagesPreview?.map(item => {
                    return(
                    <div key={item} className='relative w-1/3 h-1/3'>
                      <img   src={item} alt='preview' className='w-full h-full object-cover rounded-md'/>
                      <span 
                      title='Xóa' 
                      onClick={() => handleDeleteImage(item)}
                      className='absolute top-0 right-0 p-2 cursor-pointer bg-gray-300 hover:bg-gray-400 rounded-full'>
                        <ImBin color='red' size={20}/>
                      </span>
                    </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
          <Button 
          onClick={handleSubmit} 
          text={isUpdate ? 'Chỉnh sửa' : 'Đăng tin'} 
          bgColor='bg-green-600' 
          textColor='text-white' />
          <div className='h-[500px]'>

          </div>
        </div>
        <div className='w-[30%] flex-none'>
          
        </div>
      </div>
    </div>
  )
}
export default CreatePost
