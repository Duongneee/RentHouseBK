import React, {useState, useEffect} from 'react'
import { Select, InputReadOnly, InputFormV2} from './'
import { useSelector } from 'react-redux'
import { categories } from "../untils/categories";


const Overview = ({payload, setPayload, invalidFields, setInvalidFields}) => {

  const {currentData} = useSelector(state => state.user)
  const { dataUpdate } = useSelector(state => state.post)
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    if (dataUpdate) {
      setSelectedCategory(dataUpdate.categoryCode || "");
    }
  }, [dataUpdate]);

  const handleCategoryChange = (event) => {
    const categoryCode = event.target.value;
    setSelectedCategory(categoryCode);
    setPayload(prev => ({
      ...prev,
      categoryCode
    }));
  };

  return (
    <div>
      <InputFormV2  
      value={payload.street} 
      setValue={setPayload} 
      name='street' 
      label='Địa chỉ cụ thể'
      invalidFields={invalidFields}
      setInvalidFields={setInvalidFields}/>
      <h2 className='font-semibold text-xl py-4'>Thông tin mô tả</h2>
      
      <div className='w-full flex flex-col gap-4'>
      <div className='w-1/2'>
        <Select 
        value={selectedCategory} 
        setValue={(value) => setSelectedCategory(value)}
        onChange={handleCategoryChange}
        name='categoryCode' 
        options={categories || []} 
        label='Loại chuyên mục' 
        invalidFields={invalidFields}
        setInvalidFields={setInvalidFields}
        /></div>
        <div className='flex flex-col gap-2'>
        <InputFormV2  
        value={payload.title} 
        setValue={setPayload} 
        name='title' 
        label='Tiêu đề' 
        invalidFields={invalidFields}
        setInvalidFields={setInvalidFields} 
        />
              <label htmlFor="desc">Nội dung mô tả</label>
              <textarea
                      id='desc' 
                      cols='30' 
                      rows='10'  
                      className='w-full rounded-md outline-none border border-gray-300 p-2'
                      value={payload.description}
                      onChange={(e) => setPayload(prev => ({...prev, description: e.target.value}))}
              ></textarea>
        </div>
        <div className='w-1/2 flex-col gap-4'>
        <InputReadOnly 
        label='Thông tin liên hệ' 
        value={currentData?.name || currentData?.username}
        />
        <InputReadOnly 
        label='Điện thoại' 
        value={currentData?.phone}/>
        <InputFormV2 
        value={payload.price} 
        setValue={setPayload} 
        small='Nhập đầy đủ số, ví dụ 1 triệu thì nhập là 1000000' label='Giá cho thuê' 
        unit='đồng' 
        name='price'
        setInvalidFields={setInvalidFields} 
        invalidFields={invalidFields}/>
        <InputFormV2 
        setInvalidFields={setInvalidFields} 
        invalidFields={invalidFields}
        value={payload.size} 
        setValue={setPayload} 
        label='Diện tích' 
        unit='m2' 
        name='size' 
        />
        </div>
        
      </div>
    </div>
  )
}

export default Overview
