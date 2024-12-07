import React, { useEffect, useState } from "react";
import icons from "../untils/icon";
import data from "../untils/data.json";
import { categories } from "../untils/constant";
import { shortenMoneyAmount } from "../untils/moneyShorten";
import ReactSlider from "react-slider";

const { GrLinkPrevious } = icons;

const Popup = ({ setIsDisplayPopup, content, setFilters, filters }) => {
    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedCity, setSelectedCity] = useState(filters.city || ""); // Initialize with filters.city or empty string
    const [selectedDistrict, setSelectedDistrict] = useState(filters.district || "");
    const [selectedWard, setSelectedWard] = useState(filters.ward || "");
    const [selectedCategory, setSelectedCategory] = useState(filters.categoryCode || "");
    const [priceRange, setPriceRange] = useState(filters.priceRange || [0, 50000000]);
    const [sizeRange, setSizeRange] = useState(filters.sizeRange || [0, 1000]);

    useEffect(() => {
        if (selectedCity !== "") {
            setWards([]);
            const selectedCityData = cities.find(city => city.Name === selectedCity);
            setDistricts(selectedCityData ? selectedCityData.Districts : []);
        } else setDistricts([]);
    }, [selectedCity, cities]);
    useEffect(() => {
        if (selectedDistrict !== "") {
            setWards([]);
            const selectedDistrictData = districts.find(district => district.Name === selectedDistrict);
            setWards(selectedDistrictData ? selectedDistrictData.Wards : []);
        } else setWards([]);
    }, [selectedDistrict, districts]);
    useEffect(() => {
        // Set cities from data.json
        setCities(data);
    }, []);

    useEffect(() => {
        const newFilters = {};
        if (selectedCity) {
            newFilters.city = selectedCity;
            if (selectedDistrict) newFilters.district = selectedDistrict;
            else if (selectedWard) newFilters.ward = selectedWard;
        }
        if (selectedCategory) newFilters.categoryCode = selectedCategory;
        if (priceRange[0] !== 0 || priceRange[1] !== 50000000) newFilters.priceRange = priceRange;
        if (sizeRange[0] !== 0 || sizeRange[1] !== 1000) newFilters.sizeRange = sizeRange;

        setFilters(newFilters);
    }, [selectedCity, selectedDistrict, selectedWard, selectedCategory, priceRange, sizeRange, setFilters]);
    const handleCityChange = (event) => {
        const cityName = event.target.value;
        setSelectedCity(cityName);

    };

    const handleDistrictChange = (event) => {
        const districtName = event.target.value;
        setSelectedDistrict(districtName);

    };

    const handleWardChange = (event) => {
        setSelectedWard(event.target.value);
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const handlePriceChange = (values) => {
        // setPriceRange(values);
        console.log(values);
    };

    const handleSizeChange = (values) => {
        setSizeRange(values);
    };

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
                                <div key={''} className="mb-2">
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="category"
                                            value={''}
                                            checked={selectedCategory === '' || selectedCategory === undefined}
                                            onChange={handleCategoryChange}
                                            className="mr-2"
                                        />Tất cả
                                    </label>
                                </div>
                            </form>
                        </div>
                    )}
                    {content === 1 && (
                        <div>
                            <div className="mb-3 flex items-center justify-between mt-2">
                                <label className="block mb-2">Tỉnh/TP:</label>
                                <select
                                    className="form-select form-select-sm p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-48"
                                    id="city"
                                    aria-label=".form-select-sm"
                                    onChange={handleCityChange}
                                    value={selectedCity} // Set the value to selectedCity
                                >
                                    <option value="">Tất cả</option>
                                    {cities.map(city => (
                                        <option key={city.Name} value={city.Name}>{city.Name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3 flex items-center justify-between mt-2">
                                <label className="block mb-2">Quận/huyện:</label>
                                <select
                                    className="form-select form-select-sm p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-48"
                                    id="district"
                                    aria-label=".form-select-sm"
                                    onChange={handleDistrictChange}
                                    value={selectedDistrict} // Set the value to selectedDistrict
                                >
                                    <option value="">Tất cả</option>
                                    {districts.map(district => (
                                        <option key={district.Name} value={district.Name}>{district.Name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3 flex items-center justify-between mt-2">
                                <label className="block mb-2">Xã/phường/thị trấn:</label>
                                <select
                                    className="form-select form-select-sm p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-48"
                                    id="ward"
                                    aria-label=".form-select-sm"
                                    onChange={handleWardChange}
                                    value={selectedWard} // Set the value to selectedWard
                                >
                                    <option value="">Tất cả</option>
                                    {wards.map(ward => (
                                        <option key={ward.Name} value={ward.Name}>{ward.Name}</option>
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
                                defaultValue={[0, 1000]}
                                min={0}
                                max={1000}
                                step={5}
                                value={sizeRange}
                                onChange={handleSizeChange}
                                ariaLabel={['Lower thumb', 'Upper thumb']}
                                ariaValuetext={state => `Thumb value ${state.valueNow}`}
                            />
                            <div className="flex justify-between mt-2">
                                <span>{sizeRange[0].toLocaleString()} m²</span>
                                <span>{sizeRange[1].toLocaleString()} m²</span>
                            </div>
                        </div>
                    )}
                    {content === 2 && (
                        <div>
                            <label className="block mb-2">Chọn khoảng giá thuê theo tháng:</label>
                            <ReactSlider
                                className="horizontal-slider"
                                thumbClassName="example-thumb"
                                trackClassName="example-track"
                                defaultValue={[0, 2]}
                                min={0}
                                max={2}
                                step={0.1}
                                value={[Math.log10(priceRange[0] / 100000), Math.log10(priceRange[1] / 100000)]}
                                onChange={handlePriceChange}
                                ariaLabel={['Lower thumb', 'Upper thumb']}
                                ariaValuetext={state => `Thumb value ${state.valueNow}`}
                            />
                            <div className="flex justify-between mt-2">
                                {/* TODO:  Format number to currency */}
                                <span>{shortenMoneyAmount(priceRange[0])}</span>
                                <span>{shortenMoneyAmount(priceRange[1])}</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Popup;