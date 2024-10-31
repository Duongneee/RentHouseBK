import React from 'react'
import { Button, Item } from '../../components'

    const List = () => {
        return (
            <div className='w-full p-2 bg-[#c0c0c0] shadow-md rounded-md'>
                <div className='flex items-center justify-between my-3'>
                    <h4 className='text-xl font-semibold'>Danh sách tin đăng</h4>
                    <span>Cập nhật: 12:05 25/08/2022</span>
                </div>
                <div className='flex items-center gap-2 my-2'>
                    <span>Sắp xếp: </span>
                    <Button bgColor='bg-gray-200' text='Mặc định' />
                    <Button bgColor='bg-gray-200' text='Mới nhất' /> 
                </div>
                <div className='items'>
                   <Item />
                </div>
            </div>
        )
    }

export default List
