import React, { memo } from 'react';

const Select = ({ label, options, value, setValue, type, reset, name, onChange = () => {}, invalidFields, setInvalidFields}) => {

    return (
        <div className='flex flex-col gap-2 flex-1'>
            <label className='font-medium' htmlFor={name}>{label}</label>
            <select
                value={value}
                onChange={onChange}
                id={name}
                name={name}
                className='outline-none border border-gray-300 p-2 rounded-md w-full'
                onFocus={() => setInvalidFields([])}
            >
                <option value="">{`--Chọn ${label}--`}</option>
                {options.map((option, index) => (
                    <option key={option.Id || index} value={option.Id}>
                        {option.Name}
                </option>
                ))}
            </select >
            <small className='text-red-500'>
                {invalidFields?.some(item => item.name === name) && invalidFields?.find(item => item.name === name)?.message}
            </small>
        </div>
    );
};

export default memo(Select);