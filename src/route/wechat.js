import Router from 'koa-router'
import WechatController from '../controller/wechat'

const router = new Router()

router
  .get('/hear', WechatController.getHear)
  .post('/hear', WechatController.postHear)
  .get('/params', WechatController.params)

export default router
