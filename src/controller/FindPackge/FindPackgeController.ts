import { Request, Response } from 'express'

import Find from './FindPackge'

class FindPackgeController {
  public async find (req: Request, res: Response): Promise<Response> {
    const { data } = req.body
    try {
      const Result = await Find.finYourPackge(data)
      return res.status(200).json(Result)
    } catch (error) {
      return res.status(401).json({ message: error.message })
    }
  }
}
export default new FindPackgeController()
