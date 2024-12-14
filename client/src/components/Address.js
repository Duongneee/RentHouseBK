import React, { memo, useEffect, useState } from 'react'
import { InputFormV2, InputReadOnly} from '../components'
import data from "../untils/data.json";
import { useDispatch, useSelector } from 'react-redux'
import Select from './Select'

const Address = ({ setPayload, invalidFields, setInvalidFields, resetTrigger}) => {

    const { dataUpdate } = useSelector(state => state.post)
    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedCity, setSelectedCity] = useState(dataUpdate?.city || '');
    const [selectedDistrict, setSelectedDistrict] = useState(dataUpdate?.district || '');
    const [selectedWard, setSelectedWard] = useState(dataUpdate?.ward || '');

    useEffect(() => {
      if (cities.length === 0) {
        setCities(data);
      }
    }, [data, cities]);

    useEffect(() => {
      if (resetTrigger) {
        setSelectedCity('');
        setSelectedDistrict('');
        setSelectedWard('');
      }
    }, [resetTrigger]);
  
    useEffect(() => {
      if (dataUpdate?.city) {
        const city = data.find((city) => city.Name === dataUpdate.city);
        if (city) {
          setSelectedCity(city.Id);
          setDistricts(city.Districts || []);
    
          if (dataUpdate?.district) {
            const district = city.Districts.find(
              (district) => district.Name === dataUpdate.district
            );
            if (district) {
              setSelectedDistrict(district.Id);
              setWards(district.Wards || []);
    
              if (dataUpdate?.ward) {
                const ward = district.Wards.find(
                  (ward) => ward.Name === dataUpdate.ward
                );
                if (ward) {
                  setSelectedWard(ward.Id);
                }
              }
            }
          }
        }
      }
    }, [dataUpdate, data]);

    useEffect(() => {
      if (selectedCity) {
        const selectedCityData = cities.find((city) => city.Id === selectedCity);
        setDistricts(selectedCityData?.Districts || []);
        setSelectedDistrict(''); // Reset district when city changes
        setSelectedWard(''); // Reset ward when city changes
      }
    }, [selectedCity, cities]);
  
    useEffect(() => {
      if (selectedDistrict) {
        const selectedDistrictData = districts.find(
          (district) => district.Id === selectedDistrict
        );
        setWards(selectedDistrictData?.Wards || []);
        setSelectedWard(''); // Reset ward when district changes
      }
    }, [selectedDistrict, districts]);

  const handleCityChange = (event) => {
      const cityId = event.target.value;
      setSelectedCity(cityId);
      setPayload(prev => ({ ...prev, city: cityId, district: '', ward: '' }));
  };

  const handleDistrictChange = (event) => {
      const districtId = event.target.value;
      setSelectedDistrict(districtId);
      setPayload(prev => ({ ...prev, district: districtId, ward: '' }));
  };

  const handleWardChange = (event) => {
      const wardId = event.target.value;
      setSelectedWard(wardId);
      setPayload(prev => ({ ...prev, ward: wardId }));
  };


  useEffect(() => {
    const selectedCityData = cities.find((city) => city.Id === selectedCity);
    const selectedDistrictData = districts.find(
      (district) => district.Id === selectedDistrict
    );
    const selectedWardData = wards.find((ward) => ward.Id === selectedWard);
  
    setPayload((prev) => ({
      ...prev,
      address: `${selectedWardData ? selectedWardData.Name + ', ' : ''}${
        selectedDistrictData ? selectedDistrictData.Name + ', ' : ''
      }${selectedCityData ? selectedCityData.Name : ''}`,
      city: selectedCityData ? selectedCityData.Name : '',
      cityId: selectedCityData ? selectedCityData.Id : '', // Thêm cityId
      district: selectedDistrictData ? selectedDistrictData.Name : '',
      districtId: selectedDistrictData ? selectedDistrictData.Id : '', // Thêm districtId
      ward: selectedWardData ? selectedWardData.Name : '',
      wardId: selectedWardData ? selectedWardData.Id : '' // Thêm wardId
    }));
  }, [selectedCity, selectedDistrict, selectedWard, wards, districts, cities, setPayload]);



  return (
    <div>
      <h2 className='font-semibold text-xl py-4 '>Địa chỉ cho thuê</h2>
        <div className='flex items-center gap-4'>
        <Select
          value={selectedCity}
          setValue={setSelectedCity}
          label="Tỉnh/TP"
          options={cities || []}
          onChange={handleCityChange}
          name="city"
          invalidFields={invalidFields}
          setInvalidFields={setInvalidFields}
        />
        <Select
          value={selectedDistrict}
          setValue={setSelectedDistrict}
          label="Quận/Huyện"
          options={districts || []}
          onChange={handleDistrictChange}
          name="district"
          invalidFields={invalidFields}
          setInvalidFields={setInvalidFields}
        />
        <Select
          value={selectedWard}
          setValue={setSelectedWard}
          label="Phường/Xã"
          options={wards || []}
          onChange={handleWardChange}
          name="ward"
          invalidFields={invalidFields}
          setInvalidFields={setInvalidFields}
        />
      </div>
      
    </div>
  )
}

export default memo(Address)
