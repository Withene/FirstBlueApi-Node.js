import { Schema, model } from 'mongoose'
import { IUser, IUserModel } from './TypesUser'
import { hash, genSalt, compareSync } from 'bcrypt'
import isEmail from 'validator/lib/isEmail'

export const UserSchema: Schema<IUser> = new Schema({
  email: {
    type: String,
    unique: true,
    validate: [isEmail, 'Please enter a valid email'],
    minlength: [8, 'Minimum password length is 3 characters']
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: [6, 'Minimum password length is 6 characters']
  },
  name: {
    type: String,
    required: [true, 'Please enter Your Name'],
    minlength: [3, 'Minimum name length is 3 characters']
  },
  about: {
    type: String,
    default: 'Escreva Um Pouco Mais Sobre Você aqui'
  },
  skills: [{
    tags: { type: String, default: 'Tags' }
  }],
  active: Boolean
}, {
  timestamps: true
})

UserSchema.pre<IUser>('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this
  if (!user.isModified('password')) return next()

  const salt = await genSalt(12)
  this.password = await hash(this.password, salt)
  next()
})

UserSchema.method('comparePassword', function (password: string): boolean {
  if (compareSync(password, this.password)) { return true } else {
    return false
  }
})

export const UserModel: IUserModel = model<IUser, IUserModel>('User', UserSchema)
