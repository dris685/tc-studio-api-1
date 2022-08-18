import request from '../../config/common.js'
import { expect } from 'chai'
import { it } from 'mocha'
import { createRandomUser } from '../../helper/user_helper.js'
import { faker } from '@faker-js/faker'
import {} from 'dotenv/config'


const TOKEN = process.env.TOKEN

describe('Test UserPost API', () => {
    let postID
    let userID
    let post_post_data
    let post_put_data

    before(async () => {
        userID = await createRandomUser()
    })

    describe('POST METHOD', () => {
        it('Create a new post for a specific user', () => {
            post_post_data = {
                "user_id": userID,
                "title": faker.lorem.sentence(),
                "body": faker.lorem.paragraph()
            }

            return request
            .post("posts")
            .set("Authorization", `Bearer ${TOKEN}`)
            .send(post_post_data)
            .then(response => {
                expect(response.body).to.not.be.empty
                expect(response.statusCode).to.equal(200)
                expect(response.body.code).to.equal(201)
                expect(response.body.data).to.deep.include(post_post_data)
                postID = response.body.data.id
            })    
        })
    })

    describe('GET METHOD', () => {
        it('Get the newly created post', () => {
            return request
            .get(`posts/${postID}`)
            .set("Authorization",`Bearer ${TOKEN}`)
            .then(response => {
                expect(response.body.data.id).to.equal(postID)
                expect(response.body).to.not.be.empty
                expect(response.statusCode).to.equal(200)
                expect(response.body.code).to.equal(200)
                expect(response.body.data).to.deep.include(post_post_data)
            })
        })
    })

    describe('PUT METHOD', () => {
        it('Update the newly created post', () => {
            post_put_data = {
                "user_id": userID,
                //"title": `new_title_${Math.floor(Math.random() * 1000)}`,
                "body": faker.lorem.paragraph()
            }
            return request
            .put(`posts/${postID}`)
            .set("Authorization",`Bearer ${TOKEN}`)
            .send(post_put_data)
            .then(response => {
                expect(response.statusCode).to.equal(200)
                expect(response.body.code).to.equal(200)
                expect(response.body).to.not.be.null
                expect(response.body.data).to.deep.include(post_put_data)
            })
        })
    })

    describe('DELETE METHOD', () => {
        it('Delete the newly created post', () => {
            return request
            .delete(`posts/${postID}`)
            .set("Authorization",`Bearer ${TOKEN}`)
            .then(response => {
                expect(response.statusCode).to.equal(200)
                expect(response.body.code).to.equal(204)
                expect(response.body.data).to.be.null
            })
        })
    })
})

