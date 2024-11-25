const validate = (payload, setInvalidFields) => {
    let invalids = 0
    let fields = Object.entries(payload)
    fields.forEach(item => {
      if (item[1] === '') {
        setInvalidFields(prev => [...prev, {
          name: item[0],
          message: 'Bạn không được bỏ trống trường này.'
        }])
        invalids++
      }
    })
    fields.forEach(item => {
      switch (item[0]) {
        case 'password':
          if (item[1].length < 6) {
            setInvalidFields(prev => [...prev, {
              name: item[0],
              message: 'Mật khẩu phải có tối thiểu 6 kí tự.'
            }])
            invalids++
          }
          break;
        case 'phone':
          if (!/^\d{10}$/.test(item[1])) {
            setInvalidFields(prev => [...prev, {
              name: item[0],
              message: 'Số điện thoại không hợp lệ.'
            }])
            invalids++
          }
          break
          // case 'price':
          //   if (+item[1] === 0) {
          //     setInvalidFields(prev => [...prev, {
          //       name: item[0],
          //       message: 'Chưa đặt giá trị.'
          //     }])
          //     invalids++
          //   }
          //     if (!+item[1]) {
          //       setInvalidFields(prev => [...prev, {
          //         name: item[0],
          //         message: 'Giá trị phải là số.'
          //       }])
          //     invalids++
          //   }
          //   break

        default:
          break;
      }
    })
    return invalids
  }

export default validate