import { Router } from 'express'
import userController from './controllers/userController'

const routes = Router()

routes.get('/', userController.getAll)
routes.get('/:id', userController.getOne)
routes.put('/update/:id', userController.update)
routes.delete('/delete/:id', userController.remove)
routes.post('/register', userController.register)

export default routes
