import Router from 'koa-router'
import { checkAdmin, checkLogin } from '../util/auth'
import AuthController from '../controller/auth'

const router = new Router()

router
  .get('/info', checkLogin, AuthController.info)
  .post('/login', AuthController.login)
  .get('/captcha', AuthController.captcha)
  .post('/register', AuthController.register)
  .patch('/update-info/:_id', checkLogin, AuthController.updateInfo)
  .post('/admin-login', AuthController.adminLogin)
  .get('/test', checkAdmin, AuthController.info)

export default router