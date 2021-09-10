import { Router } from 'express'

import UserController from '../controller/User/UserController'
import isAuthenticated from '../middleware/auth'
import FindController from '../controller/FindPackge/FindPackgeController'

const routes = Router()

routes.post('/user', UserController.createU)
routes.post('/login', UserController.login)

routes.get('/users', isAuthenticated, UserController.FindUserProfile) // testar na hora com jwt apos ou antes essa validação
routes.put('/user', isAuthenticated, UserController.EditU)
routes.delete('/user', isAuthenticated, UserController.deleteU)

routes.post('/find', FindController.find)

routes.use((req, res) => {
  res.status(404).json({ error: 'true', message: 'router not found' })
})
export default routes
