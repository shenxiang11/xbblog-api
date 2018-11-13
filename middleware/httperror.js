import consola from 'consola'
import { handleError } from '../util/handle'

export default () => {
  return async (ctx, next) => {
    try {
      await next()
    } catch(err) {
      consola.error(err)
      handleError({ ctx, err })
    }
  }
}