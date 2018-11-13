import Router from 'koa-router'
import auth from './auth'
import tag from './tag'
import category from './category'
import article from './article'
import qiniu from './qiniu'

const router = new Router({
  prefix: '/api'
})

router
  .use('/auth', auth.routes())
  .use('/tag', tag.routes())
  .use('/category', category.routes())
  .use('/article', article.routes())
  .use('/qiniu', qiniu.routes())

export default router