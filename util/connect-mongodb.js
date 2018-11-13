import consola from 'consola'
import conf from '../config'
import mongoose from 'mongoose'

mongoose.Promise = Promise
mongoose.set('useCreateIndex', true)
mongoose.set('useFindAndModify', false)

export const connect = () => {
  mongoose.connect(conf.MONGOOSE.uri, {
    useNewUrlParser: true,
		promiseLibrary: Promise
	})

	mongoose.connection.on('error', error => {
		consola.warn('数据库连接失败!', error)
	})

	mongoose.connection.once('open', () => {
		consola.success('数据库连接成功!')
	})
}

export default mongoose
