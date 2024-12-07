// import db from '../models';
// import bcrypt from 'bcryptjs';
// require('dotenv').config();
// import { v4 as uuidv4 } from 'uuid';
// const addressIndex = require('../../../data-scrape/DiaGioiHanhChinhVN/data.json');
// const chothuecanho = require('../../../data-scrape/chothuecanho.json');
// const chothuematbang = require('../../../data-scrape/chothuematbang.json');
// const nhachothue = require('../../../data-scrape/nhachothue.json');
// const chothuephongtro = require('../../../data-scrape/chothuephongtro.json');

// const hashPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(12));
// const demoPwdHash = hashPassword("demo_password_m3r9fw");   // using same password for all users to reduce computing power

// const dataBody = [
//     {
//         body: chothuecanho.body,
//         code: 'CTCH'
//     },
//     {
//         body: chothuematbang.body,
//         code: 'CTMB'
//     },
//     {
//         body: nhachothue.body,
//         code: 'NCT'
//     },
//     {
//         body: chothuephongtro.body,
//         code: 'CTPT'
//     }
// ];

// const splitAddress = (address) => {
//     const addressArr = address.replace("Địa chỉ: ", "").split(", ");
//     const city = addressArr.pop();
//     const district = addressArr.pop();
//     const ward = addressArr.pop();
//     return { city, district, ward, street: addressArr[0] };
// }

// const findAddrId = (name, findIn) => {
//     let id = findIn.find(addr => addr.Name.includes(name));
//     if (id === undefined) {
//         id = findIn[0];     // default to first element
//     }
//     return id;
// }

export const insertService = () => new Promise(async (resolve, reject) => {
    try {
        //     for (const category of dataBody) {
        //         for (const post of category.body) {
        //             let postId = uuidv4();
        //             let userId = uuidv4();

        //             let cityObject, districtObject, wardObject;
        //             let splitedAddresss = splitAddress(post?.header?.address);
        //             cityObject = findAddrId(splitedAddresss.city, addressIndex);
        //             // console.log(cityObject);
        //             if (cityObject !== undefined) {
        //                 districtObject = findAddrId(splitedAddresss.district, cityObject.Districts);
        //                 // console.log(districtObject);
        //                 if (districtObject !== undefined) {
        //                     wardObject = findAddrId(splitedAddresss.ward, districtObject.Wards);
        //                     // console.log(wardObject);
        //                     if (wardObject === undefined) {
        //                         console.log("Ward not found: " + splitedAddresss.ward);
        //                     }
        //                 } else {
        //                     console.log("District not found:" + splitedAddresss.district);
        //                 }
        //             } else {
        //                 console.log("City not found: " + splitedAddresss.city);
        //             }

        //             const size = parseInt(post?.header?.attributes?.acreage.replace(' m2', ''));
        //             const price = parseInt(parseFloat(post?.header?.attributes?.price.replace(' triệu/tháng', '')) * 1000000);
        //             await db.Post.create({
        //                 id: postId,
        //                 star: post?.header?.star,
        //                 title: post?.header?.title,
        //                 userId: userId,
        //                 images: JSON.stringify(post?.images),
        //                 categoryCode: category.code,
        //                 city: cityObject?.Name,
        //                 district: districtObject?.Name,
        //                 ward: wardObject?.Name,
        //                 street: splitedAddresss.street,
        //                 price: price,
        //                 description: post?.mainContent?.content?.join('\n'),
        //                 size: size,
        //                 expiryDate: new Date(new Date().setDate(new Date().getDate() + 90)),
        //             });
        //             await db.User.create({
        //                 id: userId,
        //                 name: post?.contact?.content[0].content,
        //                 password: demoPwdHash,
        //                 phone: post?.contact?.content[1].content,
        //                 balance: 0
        //             });
        //         }
        //     }

        resolve();
    } catch (error) {
        reject(error);
    }
});