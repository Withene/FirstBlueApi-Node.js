import { Model, Document } from 'mongoose'
export interface UserInterface extends Document {
    name: string
    email: string
    password: string
    active: string
    about:string
    skills: Array<string>
    comparePassword(password: string): boolean

  }
export type IUser = UserInterface
export type IUserModel = Model<IUser>
