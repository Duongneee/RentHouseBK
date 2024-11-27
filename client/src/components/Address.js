import React, { memo, useEffect, useState } from 'react'
import { InputFormV2, InputReadOnly} from '../components'
import data from "../untils/data.json";
import { useDispatch, useSelector } from 'react-redux'

const Address = ({ setPayload}) => {

    const { dataUpdate } = useSelector(state => state.post)
    console.log(dataUpdate)

    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [selectedWard, setSelectedWard] = useState("");
    const [exactAddress, setExactAddress] = useState("");
    useEffect(() => {
      // Set cities from data.json
      setCities(data);
      
      if (dataUpdate?.city) {
        const city = data.find(city => city.Name === dataUpdate.city);
        if (city) {
            setSelectedCity(city.Id);
            setDistricts(city.Districts || []);
        }
    }

    if (dataUpdate?.district && selectedCity) {
        const city = data.find(city => city.Id === selectedCity);
        const district = city?.Districts.find(district => district.Name === dataUpdate.district);
        if (district) {
            setSelectedDistrict(district.Id);
            setWards(district.Wards || []);
        }
    }
  }, [dataUpdate, data, selectedCity]);

  useEffect(() => {
    if (selectedCity) {
        const selectedCityData = cities.find(city => city.Id === selectedCity);
        setDistricts(selectedCityData?.Districts || []);
    }
  }, [selectedCity, cities]);

  useEffect(() => {
    if (selectedDistrict) {
        const selectedDistrictData = districts.find(district => district.Id === selectedDistrict);
        setWards(selectedDistrictData?.Wards || []);
    }
  }, [selectedDistrict, districts]);

  const handleCityChange = (event) => {
    const cityId = event.target.value;
    setSelectedCity(cityId);
    setDistricts([]);
    setWards([]);
    if (cityId) {
        const selectedCityData = cities.find(city => city.Id === cityId);
        setDistricts(selectedCityData?.Districts || []);
        setPayload(prev => ({ ...prev, city: selectedCityData.Name, district: '', ward: '' }));
    }
  };

  const handleDistrictChange = (event) => {
    const districtId = event.target.value;
    setSelectedDistrict(districtId);
    setWards([]);
    if (districtId) {
        const selectedDistrictData = districts.find(district => district.Id === districtId);
        setWards(selectedDistrictData?.Wards || []);
        setPayload(prev => ({ ...prev, district: selectedDistrictData.Name, ward: '' }));
    }
  };

  const handleWardChange = (event) => {
    const wardId = event.target.value;
    setSelectedWard(wardId);
    setPayload(prev => ({ ...prev, ward: wardId }));
  };


useEffect(() => {
  const selectedCityData = cities.find(city => city.Id === selectedCity);
  const selectedDistrictData = districts.find(district => district.Id === selectedDistrict);
  const selectedWardData = wards.find(ward => ward.Id === selectedWard);

  setPayload(prev => ({
    ...prev,
    address: `${selectedWardData ? selectedWardData.Name + ', ' : ''}${selectedDistrictData ? selectedDistrictData.Name + ', ' : ''}${selectedCityData ? selectedCityData.Name : ''}`,
    city: selectedCityData ? selectedCityData.Name : '',
    district: selectedDistrictData ? selectedDistrictData.Name : '',
    ward: selectedWardData ? selectedWardData.Name : '',
  }));
}, [selectedCity, selectedDistrict, selectedWard, wards, districts, cities, setPayload]);



  return (
    <div>
      <h2 className='font-semibold text-xl py-4 '>Địa chỉ cho thuê</h2>
        <div className='flex items-center gap-4'>
          <div className='flex flex-col gap-2 flex-1'>
            <label className='font-medium' htmlFor='select-address'>Tỉnh/TP</label>
            <select className='outline-none border border-gray-300 p-2 rounded-md w-full ' value={selectedCity} onChange={handleCityChange}>
              <option value="">{`--Chọn Tỉnh/TP--`}</option>
              {cities.map(city => (
                        <option key={city.Id} value={city.Id}>{city.Name}</option>
                    ))}
            </select>
          </div>
          <div className='flex flex-col gap-2 flex-1'>
            <label className='font-medium' htmlFor='select-address'>Quận/Huyện</label>
            <select className='outline-none border border-gray-300 p-2 rounded-md w-full' value={selectedDistrict} onChange={handleDistrictChange}>
              <option value="">{`--Chọn Quận/Huyện--`}</option>
              {districts.map(district => (
                        <option key={district.Id} value={district.Id}>{district.Name}</option>
                    ))}
            </select>
          </div>
          <div className='flex flex-col gap-2 flex-1'>
            <label className='font-medium' htmlFor='select-address'>Phường/Xã</label>
            <select className='outline-none border border-gray-300 p-2 rounded-md w-full' value={selectedWard} onChange={handleWardChange}>
              <option value="">{`--Chọn Phường/Xã--`}</option>
              {wards.map(ward => (
                        <option key={ward.Id} value={ward.Id}>{ward.Name}</option>
                    ))}
            </select>
          </div>
      </div>
      
    </div>
  )
}

export default memo(Address)
