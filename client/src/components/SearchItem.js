import React, {memo} from 'react'

export const SearchItem = ({IconBefore, IconAfter, Text, fontWeight}) => {
  return (
    <div className='bg-white py-2 px-4 w-full rounded-md text-gray-400 text-[13px] flex justify-between items-center'>
        <div className='flex items-center gap-1 w-full'>
            {IconBefore}
            <span className={`${fontWeight && 'font-medium text-black'} w-[100px] overflow-hidden text-ellipsis whitespace-nowrap `}>{Text}</span>
        </div>
        {IconAfter}
    </div>
  )
}

export default memo(SearchItem)