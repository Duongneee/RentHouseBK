import icons from './icon'

const { ImPencil2, MdOutlineLibraryBooks, BiUserPin,LiaMoneyBillWaveSolid, GiMoneyStack } = icons

const menuSidebar = [
    {
        id: 1,
        text: 'Đăng tin cho thuê',
        path: '/he-thong/tao-moi-bai-dang',
        icon: <ImPencil2 />
    },
    {
        id: 2,
        text: 'Quản lý tin đăng',
        path: '/he-thong/quan-ly-bai-dang',
        icon: <MdOutlineLibraryBooks />
    },
    {
        id: 3,
        text: 'Nạp tiền',
        path: '/he-thong/nap-tien',
        icon: <LiaMoneyBillWaveSolid />
    },
    {
        id: 4,
        text: 'Lịch sử nạp tiền',
        path: '/he-thong/lich-su-nap-tien',
        icon: <GiMoneyStack />
    },
    {
        id: 5,
        text: 'Sửa thông tin cá nhân',
        path: '/he-thong/sua-thong-tin-ca-nhan',
        icon: <BiUserPin />
    },
    {
        id: 6,
        text: 'Liên hệ',
        path: '/he-thong/lien-he',
        icon: <BiUserPin />
    }
]

export default menuSidebar