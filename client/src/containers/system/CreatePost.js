import React, {useState} from 'react'
import { Overview, Address , Button, Loading, InputFormV2} from '../../components'
import { BsCameraFill } from 'react-icons/bs'
import { apiUploadImages } from '../../services'
import { useSelector } from 'react-redux'
import { BiStreetView } from 'react-icons/bi'
import { apiCreatePost } from '../../services'



const CreatePost = () => {

  const [payload, setPayload] = useState({
    title: '',
    price: 0,
    size: 0,
    images: '',
    address: '',
    description: '',
    city: '',
    target: '',
    street: ''
})

const [imagesPreview, setImagesPreview] = useState([])
const [isLoading, setIsLoading] = useState(false)
// const {prices, categories, sizes, cities} = useSelector(state => state.app)
const {currentData} = useSelector(state => state.user)
// const [price, setPrice] = useState([1000000, 5000000]);
// const [size, setSize] = useState([10, 100]);
  //console.log(payload)

  const handleFiles = async (e) => {
    e.stopPropagation()
    let files = e.target.files
    const images = new FormData()
    for (let i of files) {
      images.append('file', i)
      images.append('upload_preset', process.env.REACT_APP_UPLOAD_ASSETS_NAME);

      const respone = await apiUploadImages(images)
      console.log(respone);
    }
}


const handleSubmit = async () => {
  if(payload.title === '' || payload.price === 0 || payload.size === 0 || payload.description === '' || payload.address === '' || payload.city === '' ) {
    alert('Vui lòng điền đầy đủ thông tin')
  } 
  let finalPayload = {
    ...payload,
    price: (payload.price / 1000000).toString(),
    size: payload.size.toString(),
    userId: currentData.id,
    target: payload.target || 'Tất cả',
    
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
            <div>
              <label className='w-full border-2 h-[200px] my-4 gap-4 flex flex-col items-center justify-center border-gray-400 border-dashed rounded-md' htmlFor="file">
                <BsCameraFill color='blue' size={50}/>
                Thêm ảnh</label>
              <input onChange={handleFiles} value ='' hidden type="file" id='file' multiple/>
            </div>
          </div>
          <Button onClick={handleSubmit} text='Tạo mới' bgColor='bg-green-600' textColor='text-white' />
          <div className='h-[500px]'>

          </div>
        </div>
        <div className='w-[30%] flex-none'>
          map
        </div>
      </div>
    </div>
  )
}
export default CreatePost
