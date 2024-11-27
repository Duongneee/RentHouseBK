import React, { useEffect } from 'react'
import { Sitem } from './index'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../store/actions'

const RelatedPost = () => {
  const { newPosts } = useSelector(state => state.post)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(actions.getNewPosts())
  }, [dispatch])
  
  return (
    <div className='w-full bg-white round-md p-4'>
      <h3 className='font-semibold text-lg mb-4'>Tin mới đăng</h3>
      <div className='w-full flex flex-col gap-2 '>
        {newPosts?.map(item => {
          return (
            //   <Sitem
            //   key = {item.id}
            //   title={item.title}
            //   price={item?.attributes?.price}
            //   createdAt={item.createdAt}
            //   image={JSON.parse(item.images)}
            //   id={item?.id}
            //   />
            <div
              key={item.id}
              className="hover:scale-105 transition-transform duration-200"
            >
              <Sitem

                key={item.id}
                title={item.title}
                price={item?.price}
                createdAt={item.createdAt}
                image={JSON.parse(item.images)}
                id={item?.id}

              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default RelatedPost
