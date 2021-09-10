import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

import * as dotenv from 'dotenv'

dotenv.config({ path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env' })

export default function isAuthenticated (
  request: Request,
  response: Response,
  next: NextFunction
):any {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    return response.status(401).json({ error: true, message: 'JWT Token is missing.' })
  }

  const token = authHeader.split(' ')[1]

  try {
    const decodedToken:any = verify(token, process.env.JWT)
    request.userId = decodedToken._id

    return next()
  } catch (error) {
    return response.status(401).json({ error: true, message: 'Invalid JWT Token.' })
  }
}
