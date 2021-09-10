
import faker from 'faker'
interface UserTest {
    name:string
    email:string
    password:string
    phone:string
}
export const UserLog: UserTest = {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  phone: faker.phone.phoneNumber()
}
export const UserLogTwo: UserTest = {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  phone: faker.phone.phoneNumber()
}
