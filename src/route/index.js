import Router from 'koa-router'
import auth from './auth'
import tag from './tag'
import category from './category'
import article from './article'
import guestbook from './guestbook'

const router = new Router({
  prefix: '/api'
})

router
  .use('/auth', auth.routes())
  .use('/tag', tag.routes())
  .use('/category', category.routes())
  .use('/article', article.routes())
  .use('/guestbook', guestbook.routes())

export default router