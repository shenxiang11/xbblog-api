import Router from 'koa-router'
import { checkAdmin, checkLogin } from '../util/auth'
import CategoryController from '../controller/category'

const router = new Router()

router
  .get('/list', CategoryController.list)

export default router
