import Router from 'koa-router'
import { checkAdmin, checkLogin } from '../util/auth'
import GuestbookController from '../controller/guestbook'

const router = new Router()

router
  .post('/message', checkLogin, GuestbookController.message)
  .get('/list', GuestbookController.list)

export default router
