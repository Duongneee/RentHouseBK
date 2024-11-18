import React, { useEffect, useState } from 'react'
import { Select , InputReadOnly} from '../components'
import data from "../untils/data.json";

const Address = () => {


    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [city, setCity] = useState('')
    const [district, setDistrict] = useState('')

    
    useEffect(() => {
      // Set cities from data.json
      setCities(data);
  }, []);
  const handleCityChange = (event) => {
    const cityId = event.target.value;
    setSelectedCity(cityId);
    setDistricts([]);
    if (cityId) {
        const selectedCityData = cities.find(city => city.Id === cityId);
        setDistricts(selectedCityData.Districts);
    }
};

const handleDistrictChange = (event) => {
    setSelectedDistrict(districtId);
};

  return (
    <div>
      <h2 className='font-semibold text-xl py-4'>Địa chỉ cho thuê</h2>
      <div>
        <div className='flex items-center gap-4'>
            <Select type='city' value={city} setValue={setCity} options={cities} label='Tỉnh/Thành phố'/>
            <Select type='district' value={district} setValue={setDistrict} options={districts} label='Quận/Huyện'/>
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
