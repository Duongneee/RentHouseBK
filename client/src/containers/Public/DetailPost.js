import React from 'react'
import { useParams } from 'react-router-dom'
import { Slider } from '../../components'

const DetailPost = () => {
  const params = useParams()

  return (
    <div>
        <div>
          <Slider />
        </div>
        <div>
          Content
        </div>
    </div>
  )
}

export default DetailPost