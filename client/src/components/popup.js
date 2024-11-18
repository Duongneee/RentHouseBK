import React, { useEffect, useState } from "react";
import ReactSlider from "react-slider";
import icons from "../untils/icon";
import data from "../untils/data.json";
import { categories } from "../untils/constant";

const { GrLinkPrevious } = icons;

const Popup = ({ setIsDisplayPopup, content }) => {
    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [selectedWard, setSelectedWard] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [priceRange, setPriceRange] = useState([1000, 5000000]);
    const [sizeRange, setSizeRange] = useState([10, 100]);

    useEffect(() => {
        // Set cities from data.json
        setCities(data);
    }, []);

    const handleCityChange = (event) => {
        const cityId = event.target.value;
        setSelectedCity(cityId);
        setDistricts([]);
        setWards([]);
        if (cityId) {
            const selectedCityData = cities.find(city => city.Id === cityId);
            setDistricts(selectedCityData.Districts);
        }
    };

    const handleDistrictChange = (event) => {
        const districtId = event.target.value;
        setSelectedDistrict(districtId);
        setWards([]);
        if (districtId) {
            const selectedDistrictData = districts.find(district => district.Id === districtId);
            setWards(selectedDistrictData.Wards);
        }
    };
    const handleWardChange = (event) => {
        setSelectedWard(event.target.value);
    };
    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };
    const handlePriceChange = (values) => {
        setPriceRange(values);
    }
    const handleSizeChange = (values) => {
        setSizeRange(values);
    }
    return (
        <div onClick={() => {
            setIsDisplayPopup(false);
        }}
            className="fixed top-0 left-0  right-0 bottom-0 bg-overlay-70 z-20 flex justify-center items-center">
            <div onClick={(e) => {
                e.stopPropagation();        // Exclude this child from onClick event of its parent
                setIsDisplayPopup(true);
            }} className="bg-white w-1/2 rounded-md">
                <div className="h-[45px] px-4 flex items-center border-b border-gray-100">
                    <span onClick={(e) => {
                        e.stopPropagation();
                        setIsDisplayPopup(false);
                    }}>
                        <GrLinkPrevious size={24} />
                    </span>
                </div>
                <div className="p-4">
                    {content === 0 && (
                        <div>
                            <form>
                                {categories.map((category) => (
                                    <div key={category.id} className="mb-2">
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                name="category"
                                                value={category.id}
                                                checked={selectedCategory === category.id}
                                                onChange={handleCategoryChange}
                                                className="mr-2"
                                            />
                                            {category.name}
                                        </label>
                                    </div>
                                ))}
                            </form>
                        </div>
                    )}
                    {content === 1 && (
                        <div>
                            <div className="mb-3 flex items-center justify-between mt-2">
                                <label className="block mb-2">Tỉnh/TP:</label>
                                <select className="form-select form-select-sm p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-48" id="city" aria-label=".form-select-sm" onChange={handleCityChange}>
                                    <option value="" selected>Tất cả</option>
                                    {cities.map(city => (
                                        <option key={city.Id} value={city.Id}>{city.Name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3 flex items-center justify-between mt-2">
                                <label className="block mb-2">Quận/huyện:</label>
                                <select className="form-select form-select-sm p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-48" id="district" aria-label=".form-select-sm" onChange={handleDistrictChange}>
                                    <option value="" selected>Tất cả</option>
                                    {districts.map(district => (
                                        <option key={district.Id} value={district.Id}>{district.Name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3 flex items-center justify-between mt-2">
                                <label className="block mb-2">Xã/phường/thị trấn:</label>
                                <select className="form-select form-select-sm p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-48" id="ward" aria-label=".form-select-sm" onChange={handleWardChange}>
                                    <option value="" selected>Tất cả</option>
                                    {wards.map(ward => (
                                        <option key={ward.Id} value={ward.Id}>{ward.Name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    )}
                    {content === 3 && (
                        <div>
                            <label className="block mb-2">Chọn diện tích:</label>
                            <ReactSlider
                                className="horizontal-slider"
                                thumbClassName="example-thumb"
                                trackClassName="example-track"
                                defaultValue={[10, 100]}
                                min={0}
                                max={200}
                                step={1}
                                value={sizeRange}
                                onChange={handleSizeChange}
                                ariaLabel={['Lower thumb', 'Upper thumb']}
                                ariaValuetext={state => `Thumb value ${state.valueNow}`}
                            />
                            <div className="flex justify-between mt-2">
                                <span>{sizeRange[0].toLocaleString()} </span>
                                <span>{sizeRange[1].toLocaleString()} </span>
                            </div>
                        </div>
                    )}
                    {content === 2 && (
                        <div>
                            <label className="block mb-2">Chọn khoảng giá:</label>
                            <ReactSlider
                                className="horizontal-slider"
                                thumbClassName="example-thumb"
                                trackClassName="example-track"
                                defaultValue={[1000, 5000000]}
                                min={0}
                                max={10000000}
                                step={1000}
                                value={priceRange}
                                onChange={handlePriceChange}
                                ariaLabel={['Lower thumb', 'Upper thumb']}
                                ariaValuetext={state => `Thumb value ${state.valueNow}`}
                            />
                            <div className="flex justify-between mt-2">
                                {/* TODO:  Format number to currency */}
                                <span>{priceRange[0].toLocaleString()} </span>
                                <span>{priceRange[1].toLocaleString()} </span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Popup;