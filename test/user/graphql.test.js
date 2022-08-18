import request from '../../config/common.js'
import { expect } from 'chai'
import { it } from 'mocha'
import {} from 'dotenv/config'

const TOKEN = process.env.TOKEN

describe.only('GET METHOD', () => {
    // Use return to handle async condition
    it('Get all users', () => {
        return request
        .get("users")
        .set("Authorization",`Bearer ${TOKEN}`)
        // .get(`users?access-token=${TOKEN}`)
        .then(response => {
            //expect(response.body).to.not.be.empty
            console.log(response.body)
            expect(response.statusCode).to.equal(200)
        }) 
    })
})

