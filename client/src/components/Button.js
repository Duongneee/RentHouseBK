import React, { memo } from 'react'

const Button = ({ text, textColor, bgColor, IcAfter, IcBefore, onClick, fullWidth, px }) => {
    return (
        <button
            type='button'
            className={`py-2 ${px ? px : 'px-2'} ${textColor} ${bgColor} ${fullWidth && 'w-full'} outline-none rounded-md flex items-center justify-center gap-1`}
            onClick={onClick}
        >   
            {IcBefore && <span><IcBefore /></span>}
            <span className='text-center'> {text}</span>
            {IcAfter && <span><IcAfter /></span>}

        </button>
    )


}
export default memo(Button)