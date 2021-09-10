import request from 'supertest'
import app from '../../app'

describe('FindsTest', () => {
  // Create a new user Tests
  it('should be able Find one Packge with datacode', async () => {
    const response = await request(app).post('/find').send({ data: ['LE314514661SE'] })
    expect(response.status).toBe(200)
    expect(response.body).toHaveLength(1)
  })
  it('should not be able Find one Packge without datacode ', async () => {
    const response = await request(app).post('/find').send({ })
    expect(response.status).toBe(401)
    expect(response.body).toHaveProperty('message')
  })

  it('has error 404 ', async () => {
    const response = await request(app).post('/sda').send({ })
    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty('message')
  })
})
