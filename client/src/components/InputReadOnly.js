import React from 'react'

const InputReadOnly = ({ label, value, direction }) => {
    return (
        <div className={`flex ${direction ? direction : 'flex-col gap-2'}  w-full`}>
            <label className='font-medium w-48 flex-none' htmlFor="exactly-address">{label}</label>
            <div className='flex-auto'>
            <input
                type='text'
                id='exactly-address'
                readOnly
                className='border border-gray-200 outline-none rounded-md bg-gray-100 p-2 w-full'
                value={value || ''}
            />
            </div>
        </div>
    )
}

export default InputReadOnly