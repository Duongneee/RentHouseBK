import React, { useEffect } from 'react'
import { Item } from '../../components'
import { getPostsFilter } from '../../store/actions/post'
import { useDispatch, useSelector } from 'react-redux'


const ListFilter = ({ page, filters }) => {
    // console.log('ListFilter: ', filters, page)
    const dispatch = useDispatch()
    const { posts } = useSelector(state => state.post)
    const [lastUpdated, setLastUpdated] = React.useState(new Date().toLocaleTimeString())
    const { isLoggedIn } = useSelector(state => state.auth)

    useEffect(() => {
        setTimeout(() => {
            dispatch(getPostsFilter(page, filters, isLoggedIn))
        }, 500)
        setLastUpdated(new Date().toLocaleTimeString())
    }, [page, dispatch, filters, isLoggedIn])
    console.log('ListFilter: ', posts)
    return (
        <div className='w-full p-2 bg-white shadow-md rounded-md px-6'>
            <div className='flex items-center justify-between my-3'>
                <h4 className='text-xl font-semibold'>Danh sách tin đăng</h4>
                <span>Cập nhật: {lastUpdated}</span>
            </div>
            <div className='items'>
                {posts?.length > 0 && posts.map(item => {
                    let description = null;
                    let images = null;
                    try {
                        description = typeof item?.description === "string" ? JSON.parse(item?.description) : item?.description;
                    } catch (error) {
                        description = item?.description; 
                    }
                    try {
                        images = JSON.parse(item?.images);
                    } catch (error) {
                        images = item?.images; 
                    }
                    return (
                        <Item
                            key={item?.id}
                            city={item?.city}
                            district={item?.district}
                            price={item?.price}
                            size={item?.size}
                            description={description || ''}
                            images={images}
                            star={+item?.star}
                            title={item?.title}
                            owner={item?.owner}
                            id={item?.id}
                            isBookmarked={item?.isBookmarked}
                            isLoggedIn={isLoggedIn}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default ListFilter
