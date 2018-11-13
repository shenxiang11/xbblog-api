import Router from 'koa-router'
import { checkAdmin, checkLogin } from '../util/auth'
import ArticleController from '../controller/article'

const router = new Router()

router
  .delete('/:_id', checkAdmin, ArticleController.remove)
  .patch('/:_id', checkAdmin, ArticleController.update)
  .post('/create', checkAdmin, ArticleController.create)
  .get('/list/:env', ArticleController.list)
  .get('/:env/:_id', ArticleController.detail)

export default router
