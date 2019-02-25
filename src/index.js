import Koa from 'koa'
import conf from './config'
import { handleError, handleSuccess } from './util/handle'
import HttpError from './middleware/httperror'
import router from './route'
// import bodyParser from 'koa-bodyparser'
import koaBody from 'koa-body'
import { connect } from './util/connect-mongodb'
import serve from 'koa-static'
import path from 'path'
import helmet from "koa-helmet";
import Wechat from './util/wechat-lib'

const app = new Koa()

connect()

app
  .use(HttpError())
  // .use(bodyParser())
  .use(serve(path.join(__dirname, '../public')))
  .use(koaBody({
    multipart: true
  }))
  .use(helmet())
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(conf.SERVER.port)
