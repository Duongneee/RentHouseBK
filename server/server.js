import express from 'express'
require('dotenv').config()
import cors from 'cors'
import connectDatabase from './src/config/connectDatabase'
import initRoutes from './src/routes/index'
const path = require('path');

const app = express()
app.use(cors({
    origin: process.env.REACT_APP_CLIENT_URL,
    methods: ["POST", 'GET', 'PUT', "DELETE"]
}))

// // Cấu hình để phục vụ các file tĩnh từ thư mục build của React
// app.use(express.static(path.join(__dirname, '../client/build')))

// // Đảm bảo tất cả các route không tìm thấy đều trả về file index.html của React
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../client/build', 'index.html'))
// })

app.get('*', (req, res) => {
    // Chuyển hướng tất cả yêu cầu tới ứng dụng React trên Render
    res.redirect('https://duongquach.id.vn');
});

// server có thể đọc được dữ liệu API từ client gửi lên
app.use(express.json())
app.use(express.urlencoded({ extends: true }))

initRoutes(app) 
connectDatabase()

const port = process.env.PORT || 8888
const listener = app.listen(port, () => {
    console.log(`Server is running on the port ${listener.address().port}`)

})