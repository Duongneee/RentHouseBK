import icons from './icon'

const { ImPencil2, MdOutlineLibraryBooks, BiUserPin, LiaMoneyBillWaveSolid, GiMoneyStack, BsBookmarkStarFill } = icons

const menuManage = [
    {
        id: 1,
        text: 'Thống kê',
        path: '/admin/thong-ke',
        icon: <ImPencil2 />
    },
    {
        id: 2,
        text: 'Quản lý tin đăng',
        path: '/admin/quan-ly-bai-dang',
        icon: <MdOutlineLibraryBooks />
    },
    {
        id: 3,
        text: 'Quản lí người dùng',
        path: '/admin/quan-ly-nguoi-dung',
        icon: <BsBookmarkStarFill />
    }
]

export default menuManage