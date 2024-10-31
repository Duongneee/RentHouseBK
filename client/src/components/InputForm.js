import React from 'react'

const InputForm = ({label, value, setValue, type }) => {
  return (
    <div>
        <label htmlFor= "phone" className='text-xs'>{label}</label>
        <input
            type = "text"
            id = "phone"
            className = "outline-none bg-[#e8f0fe] p-2 round-md w-full"
            value = {value}
            onChange = {(e) => setValue(prev => ({...prev, [type]: e.target.value}))}           
        />
    </div>
  )
}

export default InputForm