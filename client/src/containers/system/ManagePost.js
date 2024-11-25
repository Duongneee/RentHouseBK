import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../store/actions'
import moment from 'moment'
import 'moment/locale/vi'


const ManagePost = () => {
    const dispatch = useDispatch()
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
    <div className='flex flex-col gap-6'>
      <div className='py-4 border-b border-gray-200 flex items-center justify-between'>
            <h1 className='text-3xl font-medium py-4 border-b border-gray-200'>Quản lý tin đăng</h1>
            <select className='outline-none border p-2 border-gray-200 rounded-md'>
                <option value=''>Lọc theo trạng thái</option>
            </select>
        </div>
        <table className='w-full table-auto'>
            <thead >
                <tr >
                    <th className='border p-2' >Mã tin</th>
                    <th className='border p-2' >Ảnh đại diện</th>
                    <th className='border p-2' >Tiêu đề</th>
                    <th className='border p-2' >Giá</th>
                    <th className='border p-2' >Ngày đăng</th>
                    <th className='border p-2' >Ngày hết hạn</th>
                    <th className='border p-2' >Trạng thái</th>
                </tr>
            </thead>
            <tbody>
            {!currentPost ?
                <tr>
                        <td> aaa </td>
                        </tr> 
                        : currentPost?.map(post => {
                            return (
                            <tr key={post.id}>
                                <td className='border text-center p-2 '>#{post?.id?.match(/\d/g).join('')?.slice(0, 6)}</td>
                                <td className='border flex items-center justify-center p-2 '>
                                    <img src={JSON.parse(post?.images)[0] || '' } alt='avatar-post' className='w-10 h-10 object-cover rounded-md'></img>
                                </td>
                                <td className='border text-center p-2 '>{post?.title}</td>
                                <td className='border text-center p-2 '>{post?.price} triệu/tháng</td>
                                <td className='border text-center p-2 '>{moment(post.createdAt).format('DD/MM/YYYY')}</td>
                                <td className='border text-center p-2 '>{moment(post.expiryDate).format('DD/MM/YYYY')}</td>
                                <td className='border text-center p-2 '>{checkStatus(post.expiryDate)}</td>

                            </tr>
                            )
                        })}
                        
            </tbody>
        </table>
    </div>
  )
}

export default ManagePost
