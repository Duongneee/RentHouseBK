import React, {memo} from 'react'

const Button = ({text, textColor, bgColor, IcAfter, onclick }) => {

  return (
    <button
    type='button'
    className={`p-2 ${textColor} ${bgColor} outline-none rounded-md hover:underline flex items-center justify-center gap-1`}
    onClick={onclick}
    >
        <span>{text}</span>
        <span>{IcAfter && <IcAfter />}</span>
    </button>
  )
}

export default memo(Button)