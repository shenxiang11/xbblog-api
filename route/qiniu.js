import Router from 'koa-router'
import { checkAdmin, checkLogin } from '../util/auth'
import QiNiuController from '../controller/qiniu'

const router = new Router()

router
  .get('/token', QiNiuController.token)

export default router
