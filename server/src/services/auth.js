import db from '../models/index'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { v4 } from 'uuid'
require('dotenv').config()

const hashPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(12))

export const registerService = ({ phone, password, name }) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.User.findOrCreate({
            where: { phone },
            defaults: {
                phone,
                name,
                password: hashPassword(password),
                id: v4()
            }
        })
        const token = response[1] && jwt.sign({ id: response[0].id, phone: response[0].phone }, process.env.SECRET_KEY, { expiresIn: '2d' })
        resolve({
            err: token ? 0 : 2,
            msg: token ? 'Register is successfully !' : 'Phone number has been aldready used !',
            token: token || null
        })

    } catch (error) {
        reject(error)
    }
})

export const loginService = (phone, password) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.User.findOne({
            where: { phone: phone },
            raw: true
        })

        const isCorrectPassWord = response && bcrypt.compareSync(password, response.password)

        const token = isCorrectPassWord && jwt.sign({ id: response.id, phone: response.phone, isAdmin: response.isAdmin}, process.env.SECRET_KEY, { expiresIn: '2d' })
        resolve({
            err: token ? 0 : 2,
            msg: token ? 'Login is successfully' : response ? 'Password is wrong.' : 'Phone number not found .',
            token: token || null
        }
        )
    } catch (error) {
        reject(error)
    }
})