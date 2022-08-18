import qa_env from './qa_env.js'
import supertest from 'supertest'


const request = supertest(qa_env.baseUrl)

export default request