import React, { useEffect, useState } from 'react'
import { Select , InputReadOnly} from '../components'
import { apiGetPublicProvinces } from '../services/app'

const Address = () => {

    const [provinces, setProvinces] = useState([])
    const [districts, setDistricts] = useState([])
    const [province, setProvince] = useState('')
    const [district, setDistrict] = useState('')
    const [reset, setReset] = useState(false)

    useEffect(() => {
        const fetchPublicProvinces = async () => {
            const res = await apiGetPublicProvinces()
            if (res.status === 200) {
                setProvinces(res?.data.results)
            }
        }
        fetchPublicProvinces()
    }, [])

  return (
    <div>
      <h2 className='font-semibold text-xl py-4'>Địa chỉ cho thuê</h2>
      <div>
        <div className='flex items-center gap-4'>
            <Select options={provinces} label='Tỉnh/Thành phố'/>
            <Select label='Quận/Huyện'/>
            <InputReadOnly label='Địa chỉ chính xác'
            // value={`${district ? `${districts?.find(item => item.district_id === district)?.district_name},` : ''} ${province ? provinces?.find(item => item.province_id === province)?.province_name : ''}`}
            />
        </div>
            <input type ='text' readOnly className='border border-gray-200 outline-none rounded-md bg-gray-100 p-2 w-full'/>
      </div>
    </div>
  )
}

export default Address
