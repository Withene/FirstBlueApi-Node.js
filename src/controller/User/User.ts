import isEmail from 'validator/lib/isEmail'
import { sign } from 'jsonwebtoken'
import { UserModel } from '../../models/UserSchema'
import { ReturnRequests, EditInterface } from './TypesUsers'

class User {
  public async findUser (_id: string): Promise<ReturnRequests> {
    if (_id === undefined || _id === null || _id === '') { return { error: true, message: '_id Inexistente' } }
    const OneUser = await UserModel.findById({ _id }, {
      password: 0
    })
    return { error: false, message: 'Sucessful!', User: OneUser }
  }

  public async create (name: string, email: string, password: string): Promise<ReturnRequests> {
    const CheckDates = await this.validator(name, email, password)
    if (CheckDates !== false) {
      const checkEmailExist = await this.FindEmail(email)
      if (checkEmailExist !== false) {
        try {
          const skillsz = [{
            tags: 'test'
          }]
          const UserCreate = await UserModel.create({ name, email, password, active: true, skills: skillsz })
          const UserSucessful = { _id: UserCreate.id, name: UserCreate.name, email: UserCreate.email, active: UserCreate.active }
          return { error: false, message: 'Sucessful!', User: UserSucessful }
        } catch (error) {
          return { error: true, message: error.message }
        }
      } else {
        return { error: true, message: 'Este email já existe!' }
      }
    } else {
      return { error: true, message: 'Falta de Dados!' }
    }
  }

  private async validator (name: string, email: string, password: string): Promise<boolean> {
    if (name === undefined || name === null || name === '') { return false }
    if (email === undefined || email === null || email === '') { return false }
    if (password === undefined || password === null || password === '') { return false }
    return true
  }

  private async FindEmail (searchEmail: string): Promise<boolean> {
    const user = await UserModel.findOne({ email: searchEmail })
    if (user !== null && user.email.length > 0) { return false }
    return true
  }

  public async userDelet (_id: string): Promise<ReturnRequests> {
    if (_id === undefined || _id === null || _id === '') { return { error: true, message: 'Falta de Dados!' } }
    // eslint-disable-next-line @typescript-eslint/ban-types
    const update: object = { active: false }
    try {
      const userUpdate = await UserModel.findByIdAndUpdate(_id, update)
      const UserSucessful = { _id: userUpdate.id, name: userUpdate.name, email: userUpdate.email, active: userUpdate.active }
      return { error: false, message: 'Inactive Sucessful!', User: UserSucessful }
    } catch (error) {
      return { error: true, message: error.message }
    }
  }

  public async userEdit (_id: string, data: EditInterface): Promise<ReturnRequests> {
    try {
      const UserFind = await UserModel.findById(_id)
      UserFind.name = data.name || UserFind.name
      UserFind.email = data.email || UserFind.email
      await UserFind.save()
      return { error: false, message: 'Update Sucessful', User: UserFind }
    } catch (error) {
      return { error: true, message: error.message }
    }
  }

  public async Login (email: string, password: string): Promise<ReturnRequests> {
    if (email !== undefined && isEmail(email) === true) {
      if (password !== undefined && password !== '') {
        const userLogin = await UserModel.findOne({ email })
        try {
          const Passok = await userLogin.comparePassword(password)
          const token = sign({ _id: userLogin._id }, process.env.JWT, { expiresIn: '1day' })
          if (Passok) {
            const UserSucessful = { _id: userLogin.id, name: userLogin.name, email: userLogin.email, active: userLogin.active }
            return { error: false, User: UserSucessful, message: 'Token Gerado Com Sucesso', Token: token }
          } else {
            return { error: true, message: 'Senha incorreta!' }
          }
        } catch (error) {
          return { error: true, message: 'Dados Incorretos' }
        }
      } else {
        return { error: true, message: 'Senha Ausente' }
      }
    } else {
      return { error: true, message: 'Email Ausente' }
    }
  }
}
export default new User()
