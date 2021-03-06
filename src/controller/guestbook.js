import { handleSuccess } from '../util/handle'
import Guestbook from '../model/guestbook'
import xssFilters from 'xss-filters'

export default class {
  static async message(ctx) {
    try {
      const { message } = ctx.request.body
      const auth = ctx.decodedToken

      let res = await Guestbook.create({
        message: xssFilters.inHTMLData(message),
        user: auth._id
      })

      res = await Guestbook
        .findOne({ _id: res._id })
        .populate({
          path: 'user',
          select: '-password'
        })

      handleSuccess({ ctx, result: res })
    } catch(err) {
      throw err
    }
  }

  static async list(ctx) {
    try {
      let { 
        pageSize = 10, // 1页多少数据
        currentPage = 1 // 当前页码
      } = ctx.request.query

      pageSize = Number(pageSize)
      currentPage = Number(currentPage)

      const list = await Guestbook
        .find()
        .limit(pageSize)
        .skip((currentPage - 1) * pageSize)
        .populate({
          path: 'user',
          select: '-password'
        })

      const total = await Guestbook.countDocuments()

      handleSuccess({ 
        ctx, 
        result: { 
          list, 
          pagination: {
            pageSize,
            currentPage,
            total
          }
        }
      })
    } catch(err) {
      throw err
    }
  }
}
