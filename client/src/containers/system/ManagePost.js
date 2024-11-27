import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../store/actions'
import moment from 'moment'
import 'moment/locale/vi'
import { Button , UpdatePost} from '../../components'


const ManagePost = () => {
    const dispatch = useDispatch()
    const [isUpdate, setIsUpdate] = useState(false)
    const {currentPost} = useSelector(state => state.post)    
    useEffect(() => {
        dispatch(actions.getPostsLimitAdmin())
    }, [])

    const checkStatus = (datetime) => {
        let todayInSeconds = new Date().getTime()
        let expiryDateInSeconds = moment(datetime).valueOf()

        return todayInSeconds <= expiryDateInSeconds ? 'Đang hiệu lực' : 'Hết hạn'
    }

    return (
    <div className='flex flex-col gap-6 '>
      <div className='py-4 border-b border-gray-200 flex items-center justify-between'>
            <h1 className='text-3xl font-medium py-4 border-b border-gray-200'>Quản lý tin đăng</h1>
            <select className='outline-none border p-2 border-gray-200 rounded-md'>
                <option value=''>Lọc theo trạng thái</option>
            </select>
        </div>
        <table className='w-full table-auto'>
            <thead >
                <tr className='flex w-full bg-gray-200'>
                    <th className='border flex-1 p-2' >Mã tin</th>
                    <th className='border flex-1 p-2' >Ảnh đại diện</th>
                    <th className='border flex-1 p-2' >Tiêu đề</th>
                    <th className='border flex-1 p-2' >Giá</th>
                    <th className='border flex-1 p-2' >Ngày đăng</th>
                    <th className='border flex-1 p-2' >Ngày hết hạn</th>
                    <th className='border flex-1 p-2' >Trạng thái</th>
                    <th className='border flex-1 p-2' >Tùy chọn</th>

                </tr>
            </thead>
            <tbody>
            {!currentPost ?
                <tr>
                        <td> aaa </td>
                        </tr> 
                        : currentPost?.map(post => {
                            return (
                            <tr className='flex items-center h-16' key={post.id}>
                                <td className='border px-2 flex-1 h-full flex justify-center items-center '>#{post?.id?.match(/\d/g).join('')?.slice(0, 6)}</td>
                                <td className='border px-2 flex-1 h-full flex items-center justify-center '>
                                    <img src={JSON.parse(post?.images)[0] || '' } alt='avatar-post' className='w-10 h-10 object-cover rounded-md'></img>
                                </td>
                                <td className='border px-2 flex-1 h-full flex justify-center items-center '>{`${post?.title?.slice(0,40)}...`}</td>
                                <td className='border px-2 flex-1 h-full flex justify-center items-center '>{post?.price} triệu/tháng</td>
                                <td className='border px-2 flex-1 h-full flex justify-center items-center '>{moment(post.createdAt).format('DD/MM/YYYY')}</td>
                                <td className='border px-2 flex-1 h-full flex justify-center items-center '>{moment(post.expiryDate).format('DD/MM/YYYY')}</td>
                                <td className='border px-2 flex-1 h-full flex justify-center items-center '>{checkStatus(post.expiryDate)}</td>
                                <td className='border px-2 flex-1 h-full flex justify-center items-center gap-4'>
                                    <Button 
                                    text='Sửa'
                                    bgColor='bg-green-600'
                                    textColor='text-white'
                                    onClick={() => {
                                        setIsUpdate(true)
                                        dispatch(actions.updateData(post))
                                    }}
                                    />
                                    <Button 
                                    text='Xóa'
                                    bgColor='bg-orange-600'
                                    textColor='text-white'
                                    />
                                </td>
                            </tr>
                            )
                        })}
                        
            </tbody>
        </table>
        {isUpdate && <UpdatePost setIsUpdate={setIsUpdate}/>}
    </div>
  )
}

export default ManagePost
