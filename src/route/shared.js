import Router from 'koa-router'
import { checkAdmin, checkLogin } from '../util/auth'
import SharedController from '../controller/shared'

const router = new Router()

router
  .delete('/:_id', checkAdmin, SharedController.remove)
  .patch('/:_id', checkAdmin, SharedController.update)
  .post('/create', checkAdmin, SharedController.create)
  .get('/list', SharedController.list)

export default router
