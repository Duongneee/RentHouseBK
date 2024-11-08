import React, { useEffect, useState } from 'react'
import {PageNumber} from '../../components'
import {useSelector} from 'react-redux'
import icons from '../../untils/icon'

const {GrLinkNext, GrLinkPrevious} = icons
const arrNumber = [1,2,3,4]

const Pagination = ({page}) => {
    const {count, posts} = useSelector(state => state.post)
    const [arrPage, setarrPage] = useState([])
    const [currentPage, setcurrentPage] = useState(+page || 1)
    const [isHideEnd, setisHideEnd] = useState(false)
    const [isHideStart, setisHideStart] = useState(false)
    
    
    useEffect(() => {
        let maxPage = Math.floor(count / posts.length)
        let end = (currentPage + 1) > maxPage ? maxPage : (currentPage + 1)
        let start = (currentPage - 1) < 1 ? 1 : (currentPage - 1) 
        let temp = []
        for(let i = start; i <= end; i++) temp.push(i)
            setarrPage(temp)
        if (currentPage >= maxPage - 1) {
            setisHideEnd(true)
        } else {
            setisHideEnd(false)
        }
        if (currentPage <= 2) {
            setisHideStart(true)
        } else {
            setisHideStart(false)
        }
    },[count, posts, currentPage])
  return (
    <div className='flex items-center justify-center gap-2 py-5'>
        {!isHideStart && <PageNumber icon={<GrLinkPrevious />} setcurrentPage={setcurrentPage} text = {1} />}
        {!isHideStart && <PageNumber text={'...'} />}
        {arrPage.length > 0 && arrPage.map(item => {
            return (
                <PageNumber 
                key={item}
                text={item}
                setcurrentPage={setcurrentPage}
                currentPage={currentPage}
                />
            )
        })}
        {!isHideEnd && <PageNumber text={'...'} />}
        {!isHideEnd && <PageNumber icon={<GrLinkNext />} setcurrentPage={setcurrentPage} text = {Math.floor(count / posts.length)}/>}
    </div>
  )
}

export default Pagination