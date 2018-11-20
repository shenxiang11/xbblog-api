import Router from 'koa-router'
import { checkAdmin, checkLogin } from '../util/auth'
import AuthController from '../controller/auth'

const router = new Router()

router
  .post('/login', AuthController.login)
  .get('/captcha', AuthController.captcha)
  .post('/register', AuthController.register)
  .post('/admin-login', AuthController.adminLogin)
  // .get('/test', checkLogin, AuthController.test)
  // .get('/info', checkLogin, AuthController.getAuthInfo)

export default router