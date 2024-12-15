import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import data from '../untils/data.json'; // Assuming you have a data.json file with city, district, and ward information

const Address = ({ setPayload, invalidFields, payload, resetTrigger }) => {
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
                <div className='flex flex-col'>
                    <label htmlFor="city">Tỉnh/Thành phố</label>
                    <select id="city" value={selectedCity} onChange={handleCityChange} className='border p-2 rounded'>
                        <option value="">Chọn Tỉnh/Thành phố</option>
                        {cities.map(city => (
                            <option key={city.Id} value={city.Id}>{city.Name}</option>
                        ))}
                    </select>
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="district">Quận/Huyện</label>
                    <select id="district" value={selectedDistrict} onChange={handleDistrictChange} className='border p-2 rounded'>
                        <option value="">Chọn Quận/Huyện</option>
                        {districts.map(district => (
                            <option key={district.Id} value={district.Id}>{district.Name}</option>
                        ))}
                    </select>
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="ward">Phường/Xã</label>
                    <select id="ward" value={selectedWard} onChange={handleWardChange} className='border p-2 rounded'>
                        <option value="">Chọn Phường/Xã</option>
                        {wards.map(ward => (
                            <option key={ward.Id} value={ward.Id}>{ward.Name}</option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
};

export default Address;