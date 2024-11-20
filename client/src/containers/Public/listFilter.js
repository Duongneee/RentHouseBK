import React, { useEffect } from 'react'
import { Button, Item } from '../../components'
import { getPostsFilter } from '../../store/actions/post'
import { useDispatch, useSelector } from 'react-redux'


const ListFilter = ({ page, filters }) => {
    console.log('ListFilter: ', filters, page)
    const dispatch = useDispatch()
    const { posts } = useSelector(state => state.post)
    const [lastUpdated, setLastUpdated] = React.useState(new Date().toLocaleTimeString())

    useEffect(() => {
        dispatch(getPostsFilter(page, filters))
        setLastUpdated(new Date().toLocaleTimeString())
    }, [page, dispatch, filters])
    console.log('ListFilter: ', posts)
    return (
        <div className='w-full p-2 bg-white shadow-md rounded-md px-6'>
            <div className='flex items-center justify-between my-3'>
                <h4 className='text-xl font-semibold'>Danh sách tin đăng</h4>
                <span>Cập nhật: {lastUpdated}</span>
            </div>
            <div className='flex items-center gap-2 my-2'>
                <span>Sắp xếp: </span>
                <Button bgColor='bg-gray-200' text='Mặc định' />
                <Button bgColor='bg-gray-200' text='Mới nhất' />
            </div>
            <div className='items'>
                {posts?.length > 0 && posts.map(item => {
                    return (
                        <Item
                            key={item?.id}
                            city={item?.city}
                            district={item?.district}
                            price={item?.price}
                            size={item?.size}
                            description={item?.description}
                            images={JSON.parse(item?.images)}
                            star={+item?.star}
                            title={item?.title}
                            owner={item?.owner}
                            id={item?.id}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default ListFilter