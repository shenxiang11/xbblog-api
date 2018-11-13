import Koa from 'koa'
import conf from '../config'
import { handleError, handleSuccess } from './util/handle'
import HttpError from '../middleware/httperror'
import router from '../route'
import bodyParser from 'koa-bodyparser'
import { connect } from './util/connect-mongodb'

const app = new Koa()

connect()

app.use(HttpError())
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(conf.SERVER.port)
