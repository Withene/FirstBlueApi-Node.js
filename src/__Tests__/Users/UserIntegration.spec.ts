import request from 'supertest'
import app from '../../app'
import mongoose from 'mongoose'
import { UserLog, UserLogTwo } from '../factory'
describe('Authentication', () => {
  let tokenForTest = ''

  // Create a new user Tests
  it('should be able to create a user With router', async () => {
    const response = await request(app).post('/user').send({
      name: UserLog.name,
      email: UserLog.email,
      password: '264645454'
    })
    expect(response.status).toBe(200)

    expect(response.body).toHaveProperty('User._id')
  })

  it('should not able to create a new User, when have a same Email', async () => {
    const response = await request(app).post('/user').send({
      name: UserLog.name,
      email: UserLog.email,
      password: '264645454'
    })
    expect(response.status).toBe(401)
    expect(response.body).toHaveProperty('message')
  })

  it('should not able to create a new User, when dont Have Minimun password Lenght', async () => {
    const response = await request(app).post('/user').send({
      name: UserLog.name,
      email: UserLogTwo.email,
      password: '26'
    })
    expect(response.status).toBe(401)
    expect(response.body).toHaveProperty('message')
  })

  it('should not able to create a new User, when dont Email or Password', async () => {
    const response = await request(app).post('/user').send({
      name: UserLog.name
    })
    expect(response.status).toBe(401)
    expect(response.body).toHaveProperty('message')
  })
  // finish the test About Create User

  // test for login with a existing user
  it('should  able to login if your have a credentials correct', async () => {
    const response = await request(app).post('/login').send({
      email: UserLog.email,
      password: '264645454'
    })
    tokenForTest = response.body.Token
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('message')
  })

  it('should not able login if your no have credentials correct', async () => {
    const response = await request(app).post('/login').send({
      email: UserLog.email,
      password: '2646454'
    })
    expect(response.status).toBe(401)
    expect(response.body).toHaveProperty('message')
  })

  it('should not able login without email', async () => {
    const response = await request(app).post('/login').send({
      password: '2646454'
    })
    expect(response.status).toBe(401)
    expect(response.body).toHaveProperty('message')
  })

  it('should not able login without password', async () => {
    const response = await request(app).post('/login').send({
      email: UserLog.email
    })
    expect(response.status).toBe(401)
    expect(response.body).toHaveProperty('message')
  })

  // finish the test with login

  // test for request with JWT information about the user
  it('should  able get information of user with JWT tOKEN', async () => {
    const response = await request(app)
      .get('/users')
      .set('Authorization', 'bearertoken ' + tokenForTest)

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('message')
  })

  it('should not able get information of user with invalid JWT TOKEN', async () => {
    const response = await request(app)
      .get('/users')
      .set('Authorization', tokenForTest)

    expect(response.status).toBe(401)
    expect(response.body).toHaveProperty('message')
  })

  // finish the test about request User With JWT

  // test for Edit one User
  it('should  able edit if your have JWT valid and inputs valid', async () => {
    const responseEdit = await request(app).put('/user').send({
      name: 'testasdasda'
    }).set('Authorization', 'bearertoken ' + tokenForTest)

    expect(responseEdit.status).toBe(200)
    expect(responseEdit.body).toHaveProperty('message')
  })
  it('should not able get information of user with invalid JWT tOKEN', async () => {
    const response = await request(app)
      .get('/users')
      .set('Authorization', 'bearertoken' + tokenForTest)

    expect(response.status).toBe(401)
    expect(response.body).toHaveProperty('message')
  })

  it('should not able edit if data no have specs', async () => {
    const responseEdit = await request(app).put('/user').send({
      name: 'as'
    }).set('Authorization', 'bearertoken ' + tokenForTest)

    expect(responseEdit.status).toBe(400)
    expect(responseEdit.body).toHaveProperty('message')
  })

  // this only test middleware
  it('should not able edit if data no have specs', async () => {
    const responseEdit = await request(app).put('/user').send({
      name: 'asdadadsads'
    })

    expect(responseEdit.status).toBe(401)
    expect(responseEdit.body).toHaveProperty('message')
  })
  // finish the test about user edit

  // test if able to Delete user

  it('should  able to dele one User', async () => {
    const response = await request(app).delete('/user').send({
    }).set('Authorization', 'bearertoken ' + tokenForTest)
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('message')
  })

  // finish the test about deleting one user
  afterAll(async () => {
    await mongoose.connection.dropCollection('users')
    mongoose.connection.close(true)
  })
  // this script only to delete dabase when test is finished
})
