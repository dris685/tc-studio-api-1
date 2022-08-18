import { faker } from "@faker-js/faker"
import request from "../config/common.js"
import {} from 'dotenv/config'


const TOKEN = process.env.TOKEN


export const createRandomUser = async() => {
    const user_post_data = {
        "email": faker.internet.email(),
        "name": faker.internet.userName(),
        "gender": "female",
        "status": "inactive"
    }
    const res = await request
    .post("users")
    .set("Authorization",`Bearer ${TOKEN}`)
    .send(user_post_data)
    return res.body.data.id
}