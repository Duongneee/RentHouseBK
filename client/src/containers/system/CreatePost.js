import React, {useState} from 'react'
import { Overview, Address , Button, Loading, InputFormV2} from '../../components'
import { apiUploadImages } from '../../services'
import { useSelector } from 'react-redux'
import { apiCreatePost } from '../../services'
import icon from '../../untils/icon'

const {BsCameraFill, ImBin} = icon

const CreatePost = () => {

  const [payload, setPayload] = useState({
    title: '',
    price: 0,
    size: 0,
    images: '',
    address: '',
    description: '',
    city: '',
    street: ''
})


const [imagesPreview, setImagesPreview] = useState([])
const [isLoading, setIsLoading] = useState(false)
const {currentData} = useSelector(state => state.user)
  console.log(payload)

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
  setImagesPreview(prev => prev?.filter(item => item !== image))
        setPayload(prev => ({
            ...prev,
            images: prev.images?.filter(item => item !== image)
        }))
}


const handleSubmit = async () => {
  if(payload.title === '' || payload.price === 0 || payload.size === 0 || payload.description === ''  || payload.city === '' || payload.street === '' || payload.images === '') {
    alert('Vui lòng điền đầy đủ thông tin')
  } 
  let finalPayload = {
    ...payload,
    price: (payload.price / 1000000).toString(),
    size: payload.size.toString(),
    userId: currentData.id,    
  }
  const response = await apiCreatePost(finalPayload)
  console.log(response)
}



  return (
    <div className='px-6'>
      <h1 className='text-3xl font-medium py-4 border-b border-gray-200'>Đăng tin mới</h1>
      <div className='flex gap-4'>
        <div className='py-4 flex flex-col gap-8 flex-auto'>
          <Address payload={payload} setPayload={setPayload}/>
          <Overview payload={payload} setPayload={setPayload}/>
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
          <Button onClick={handleSubmit} text='Tạo mới' bgColor='bg-green-600' textColor='text-white' />
          <div className='h-[500px]'>

          </div>
        </div>
        <div className='w-[30%] flex-none'>
          <Loading />
        </div>
      </div>
    </div>
  )
}
export default CreatePost
