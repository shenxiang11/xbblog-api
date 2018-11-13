import Router from 'koa-router'
import { checkAdmin, checkLogin } from '../util/auth'
import TagController from '../controller/tag'

const router = new Router()

router
  .post('/create', checkAdmin, TagController.create)
  .delete('/:_id', checkAdmin, TagController.remove)
  .patch('/:_id', checkAdmin, TagController.update)
  .get('/list', TagController.list)

export default router
