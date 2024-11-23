// export các đường dẫn vào đây

export const path = {
    HOME: '/*',
    HOME__PAGE: ':page',
    LOGIN: 'login',
    FILTER: 'filter',
    CHO_THUE_CAN_HO: 'cho-thue-can-ho',
    CHO_THUE_MAT_BANG: 'cho-thue-mat-bang',
    NHA_CHO_THUE: 'nha-cho-thue',
    CHO_THUE_PHONG_TRO: 'cho-thue-phong-tro',

    DETAIL_POST__TITLE__POSTID: 'chi-tiet/:id',
    DETAIL: '/chi-tiet/',
    DETAIL_ALL: 'chi-tiet/*',
    SYSTEM: '/he-thong/*',
    CREATE_POST: 'tao-moi-bai-dang'

}

export const text = {
    HOME_TITLE: 'Tìm kiếm chỗ thuê ưng ý',
    HOME_DESCRIPTION: 'Kênh thông tin Phòng trọ số 1 Việt Nam - Website đăng tin cho thuê phòng trọ, nhà nguyên căn, căn hộ, ở ghép nhanh, hiệu quả với 100.000+ tin đăng và 2.500.000 lượt xem mỗi tháng.'


}

export const location = [
    {
        id: 'hcm',
        name: 'Phòng trọ Hồ Chí Minh',
        image: 'https://phongtro123.com/images/location_hcm.jpg'
    },
    {
        id: 'hn',
        name: 'Phòng trọ Hà Nội',
        image: 'https://phongtro123.com/images/location_hn.jpg'
    },
    {
        id: 'dn',
        name: 'Phòng trọ Đà Nẵng',
        image: 'https://phongtro123.com/images/location_dn.jpg'
    }
]

export const categories = [
    {
        id: 'NCT',
        name: 'Nhà cho thuê',
    },
    {
        id: 'CTCH',
        name: 'Căn hộ chung cư',
    },
    {
        id: 'CTMB',
        name: 'Cửa hàng, mặt bằng',
    },
    {
        id: 'CTPT',
        name: 'Cho thuê phòng trọ',
    }
]