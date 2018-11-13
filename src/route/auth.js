import Router from 'koa-router'
import { checkAdmin, checkLogin } from '../util/auth'
import AuthController from '../controller/auth'

const router = new Router()

router
  .get('/test', checkLogin, AuthController.test)
  .post('/admin-login', AuthController.adminLogin)
  // .post('/login', AuthController.login)
  // .get('/info', checkLogin, AuthController.getAuthInfo)

export default router