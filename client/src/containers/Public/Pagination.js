import React, { useEffect, useState } from 'react'
import {PageNumber} from '../../components'
import {useSelector} from 'react-redux'
import icons from '../../untils/icon'

const {GrLinkNext, GrLinkPrevious} = icons


const Pagination = ({page}) => {
    const {count, posts} = useSelector(state => state.post)
    const [arrPage, setarrPage] = useState([])
    const [currentPage, setcurrentPage] = useState(+page || 1)
    const [isHideEnd, setisHideEnd] = useState(false)
    const [isHideStart, setisHideStart] = useState(false)
    console.log(posts)
    
    useEffect(() => {
        let maxPage = Math.ceil(count / posts.length)
        let end = (currentPage + 2) > maxPage ? maxPage : (currentPage + 2)
        let start = (currentPage - 2) < 1 ? 1 : (currentPage - 2) 
        let temp = []
        for(let i = start; i <= end; i++) temp.push(i)
            setarrPage(temp)
        currentPage >= (maxPage - 2) ? setisHideEnd(true) : setisHideEnd(false)
        currentPage <= 3 ? setisHideStart(true) : setisHideStart(false)
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