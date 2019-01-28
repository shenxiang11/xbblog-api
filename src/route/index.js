import Router from 'koa-router'
import auth from './auth'
import tag from './tag'
import category from './category'
import article from './article'
import guestbook from './guestbook'
import wechat from './wechat'

const router = new Router({
  prefix: '/api'
})

router
  .use('/auth', auth.routes())
  .use('/tag', tag.routes())
  .use('/category', category.routes())
  .use('/article', article.routes())
  .use('/guestbook', guestbook.routes())
  .use('/wechat', wechat.routes())

export default router