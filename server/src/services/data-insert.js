import db from '../models';
// import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import chothuecanho from '../../../data-scrape/chothuecanho.json'
import chothuematbang from '../../../data-scrape/chothuematbang.json'
import nhachothue from '../../../data-scrape/nhachothue.json'
import chothuephongtro from '../../../data-scrape/chothuephongtro.json'

require('dotenv').config();

const dataBody = [
    {
        body: chothuecanho.body,
        code: 'CTCH'
    },
    {
        body: chothuematbang.body,
        code: 'CTMB'
    },
    {
        body: nhachothue.body,
        code: 'NCT'
    },
    {
        body: chothuephongtro.body,
        code: 'CTPT'
    }
];
export const insertService = () => new Promise( async (resolve, reject) => {
    try {
        for (const item of dataBody) {
            let postId = uuidv4();
            let userId = uuidv4();
            let imageId = uuidv4();
            // important: labelCode is decrapted from project beacause it din't exist.
            let attributesId = uuidv4();
            await db.Post.create({
                id: postId,
                title: item?.header?.title,
                star: item?.header?.star,
                // labelCode,
                categoryCode: 'CTCH', 

                // createdAt: new Date(),
                // updatedAt: new Date()
            });
        }

        resolve();
    } catch (error) {
        reject(error);
    }});