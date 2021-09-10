
import { Request, Response } from 'express'

import User from './User'

class UserController {
  async FindUserProfile (req:Request, res:Response):Promise<Response> {
    const _id = req.userId
    const UserFind = await User.findUser(_id)

    if (UserFind.error !== true) {
      return res.status(200).json(UserFind)
    }
  }

  async createU (req:Request, res:Response):Promise<Response> {
    const { name, email, password } = req.body
    const UserR = await User.create(name, email, password)
    if (UserR.error !== true) {
      return res.status(200).json(UserR)
    } else {
      return res.status(401).json(UserR)
    }
  }

  async EditU (req:Request, res:Response):Promise<Response> {
    const _id = req.userId
    const { name, email } = req.body
    const data = { name, email }
    const UserEditU = await User.userEdit(_id, data)
    if (UserEditU.error !== true) {
      return res.status(200).json(UserEditU)
    } else {
      return res.status(400).json(UserEditU)
    }
  }

  async deleteU (req:Request, res:Response):Promise<Response> {
    const _id = req.userId
    const UserDelet = await User.userDelet(_id)
    if (UserDelet.error !== true) {
      return res.status(200).json(UserDelet)
    } else {
      return res.status(406).json(UserDelet)
    }
  }

  async login (req:Request, res:Response):Promise<Response> {
    const { email, password } = req.body
    const Userlogin = await User.Login(email, password)
    if (Userlogin.error !== true) {
      return res.status(200).json(Userlogin)
    } else {
      return res.status(401).json(Userlogin)
    }
  }
}
export default new UserController()
