import React, { memo } from 'react'

const Select = ({ label, options, value, setValue, type, reset, name  }) => {
  return (
    <div className='flex flex-col gap-2 flex-1'>
      <label className='font-medium' htmlFor='select-address'>{label}</label>
      <select id="select-address" className='outline-none border border-gray-300 p-2 rounded-md w-full'>
        <option value="">{`--Chọn ${label}--`}</option>
        {options?.map(item => {
                    return (
                      <option
                          key={item?.province_id}
                          value={item?.province_id}
                      >
                          {item?.province_name}
                      </option>
                  )
                })}
      </select>
    </div>
  )
}

export default memo(Select)
