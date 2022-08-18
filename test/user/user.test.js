import request from '../../config/common.js'
import { expect } from 'chai'
import { it } from 'mocha'
import { faker } from '@faker-js/faker'
import {} from 'dotenv/config'

const TOKEN = process.env.TOKEN

describe('Test User API', () => {
    let userID
    let userName
    let userEmail
    let userGender
    let userStatus
    
    const user_post_data = {
        "email": faker.internet.email(),
        "name": faker.internet.userName(),
        "gender": "female",
        "status": "inactive"
    }
    const user_put_data = {
        "name": faker.internet.userName(),
        "gender": "male"
    }

    describe('POST METHOD', () => {
        it('Create a new user', () => {
            return request
            .post("users")
            .set("Authorization",`Bearer ${TOKEN}`)
            .send(user_post_data)
            .then(response => {
                expect(response.body).to.not.be.empty
                expect(response.body.code).to.equal(201)
                expect(response.statusCode).to.equal(200)
                expect(response.body.data).to.deep.include(user_post_data)
                userID = response.body.data.id
                userName = response.body.data.name
                userEmail = response.body.data.email
                userGender = response.body.data.gender
                userStatus = response.body.data.status
                // expect(response.body.data.name).to.equal(user_post_data.name)
                // expect(response.body.data.email).to.equal(user_post_data.email)
                // expect(response.body.data.gender).to.equal(user_post_data.gender)
                // expect(response.body.data.status).to.equal(user_post_data.status)
            })
        })
    })
    
    describe('GET METHOD', () => {
        // Use done callback to handle async condition
        // it('Get all users', (done) => {
        //     request
        //     .get("users")
        //     .set("Authorization", `Bearer ${TOKEN}`)
        //     .end((error, response) => {
        //         expect(response.body).to.not.be.empty
        //         //expect(error).to.be.null
        //         //expect(response.statusCode).to.equal(201)
        //         done()
        //     })
        // })
    
        
        // Use return to handle async condition
        it('Get all users', () => {
            return request
            .get("users")
            .set("Authorization",`Bearer ${TOKEN}`)
            // .get(`users?access-token=${TOKEN}`)
            .then(response => {
                expect(response.body).to.not.be.empty
                expect(response.body.code).to.equal(200)
                expect(response.statusCode).to.equal(200)
            }) 
        })
    
        it('Get the newly created user', () => {
            return request
            .get(`users/${userID}`)
            .set("Authorization",`Bearer ${TOKEN}`)
            .then(response => {
                expect(response.body.data.id).to.equal(userID)
                expect(response.body).to.not.be.empty
                expect(response.statusCode).to.equal(200)
                expect(response.body.data).to.deep.include(user_post_data)
            })
        })
    
        it('Verify the info of the user_id', () => {
            return request
            .get(`users/${userID}`)
            .set("Authorization",`Bearer ${TOKEN}`)
            .then(response => {
                expect(response.body).to.not.be.empty
                expect(response.body.data.id).to.equal(userID)
                expect(response.body.data.name).to.equal(userName)
                expect(response.body.data.email).to.equal(userEmail)
                expect(response.body.data.gender).to.equal(userGender)
                expect(response.body.data.status).to.equal(userStatus)
                
                // TO GET ALL THE PROPERTY NAMES(KEY NAMES) AND VAUE NAMES with for in loop
                // for (const key in response.body.data) {
                //     console.log(`property: ${key}, value: ${response.body.data[key]}`)
                // }
    
                // TO GET ALL THE PROPERTY NAMES(KEY NAMES) AND VAUE NAMES with for each loop
                // Object.entries(response.body.data).forEach(entry => {
                //     const [key, value] = entry
                //     console.log(`key: ${key}, value: ${value}`)
                // })
            })
        })
    
        it('Get users with query parameters(page: 6, gender: female, status: active)', () => {
            return request
            .get(`users?page=6&gender=female&status=active`)
            .set("Authorization",`Bearer ${TOKEN}`)
            .then(response => {
                expect(response.body).to.not.be.empty
                expect(response.body.meta.pagination.page).to.equal(6)
                // TO FETCH SPECIFIC DATA FROM OBJECT ARRAY with for each loop
                response.body.data.forEach(data => {
                    expect(data.gender).to.equal("female")
                    expect(data.status).to.equal("active")
                })
    
                // TO FETCH SPECIFIC DATA FROM OBJECT ARRAY with regular for loop
                // for(let i = 0; i < response.body.data.length; i++){
                //     expect(response.body.data[i].gender).to.equal("female")
                //     expect(response.body.data[i].status).to.equal("active")
                // }
    
                // TO FETCH SPECIFIC DATA FROM OBJECT ARRAY with for of then for in loop
                // for (const data of response.body.data) {
                //     // console.log(`for_of_data: ${data}`)
                //     for (const key in data) {
                //         console.log(`key: ${key}, value: ${data[key]}`)
                //     } 
                // }
            })
        })
    })
    
    describe('PUT METHOD', () => {
        it('Update the newly created user', () => {
            return request
            .put(`users/${userID}`)
            .set("Authorization",`Bearer ${TOKEN}`)
            .send(user_put_data)
            .then(response => {
                expect(response.statusCode).to.equal(200)
                expect(response.body.code).to.equal(200)
                expect(response.body.data).to.deep.include(user_put_data)
                expect(response.body.data.name).to.equal(user_put_data.name)
                expect(response.body.data.gender).to.equal(user_put_data.gender)
            })
        })
    })
    
    describe('DELETE METHOD', () => {
        it('Delete the newly created user', () => {
            return request
            .delete(`users/${userID}`)
            .set("Authorization",`Bearer ${TOKEN}`)
            .then(response => {
                expect(response.statusCode).to.equal(200)
                expect(response.body.code).to.equal(204)
                expect(response.body.data).to.be.null
            })
        })
    })
})


