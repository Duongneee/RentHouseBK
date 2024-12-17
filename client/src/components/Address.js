import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import data from '../untils/data.json'; // Assuming you have a data.json file with city, district, and ward information
import { Select} from './';

const Address = ({ setPayload, invalidFields,setInvalidFields, payload, resetTrigger,  }) => {
    const { dataUpdate } = useSelector(state => state.post);
    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedWard, setSelectedWard] = useState('');

    useEffect(() => {
        setCities(data);
    }, []);

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
    }, [dataUpdate]);

    const handleCityChange = (event) => {
        const cityId = event.target.value;
        setSelectedCity(cityId);
        const city = data.find((city) => city.Id === cityId);
        setDistricts(city?.Districts || []);
        setSelectedDistrict('');
        setWards([]);
        setSelectedWard('');
        setPayload(prev => ({ ...prev, city: city?.Name || '', district: '', ward: '' }));
    };

    const handleDistrictChange = (event) => {
        const districtId = event.target.value;
        setSelectedDistrict(districtId);
        const district = districts.find((district) => district.Id === districtId);
        setWards(district?.Wards || []);
        setSelectedWard('');
        setPayload(prev => ({ ...prev, district: district?.Name || '', ward: '' }));
    };

    const handleWardChange = (event) => {
        const wardId = event.target.value;
        setSelectedWard(wardId);
        const ward = wards.find((ward) => ward.Id === wardId);
        setPayload(prev => ({ ...prev, ward: ward?.Name || '' }));
    };

    return (
        <div>
            <h2 className='font-semibold text-xl py-4'>Địa chỉ cho thuê</h2>
            <div className='flex items-center gap-4'>
                    <Select 
                            value={selectedCity} 
                            setValue={(value) => setSelectedCity(value)}
                            onChange={handleCityChange}
                            name='city' 
                            options={cities || []} 
                            label='Tỉnh/Thành phố' 
                            invalidFields={invalidFields}
                            setInvalidFields={setInvalidFields}
                            />
                <Select 
                            value={selectedDistrict} 
                            setValue={(value) => setSelectedDistrict(value)}
                            onChange={handleDistrictChange}
                            name='district' 
                            options={districts || []} 
                            label='Quận/Huyện' 
                            invalidFields={invalidFields}
                            setInvalidFields={setInvalidFields}
                            />
                <Select 
                            value={selectedWard} 
                            setValue={(value) => setSelectedWard(value)}
                            onChange={handleWardChange}
                            name='ward' 
                            options={wards || []} 
                            label='Phường/Xã' 
                            invalidFields={invalidFields}
                            setInvalidFields={setInvalidFields}
                            />
                      
            </div>
        </div>
    );
};

export default Address;