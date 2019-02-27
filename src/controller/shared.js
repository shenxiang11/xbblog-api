import { handleSuccess } from '../util/handle'
import Shared from '../model/shared'
import conf from '../config'

const categories = ['code', 'think', 'fitness']

export default class {

  static async list(ctx) {
    try {
      let { 
        pageSize = 10, // 1页多少数据
        currentPage = 1, // 当前页码
        category, // 所属分类
      } = ctx.request.query

      pageSize = Number(pageSize)
      currentPage = Number(currentPage)

      const options = {}

      if (category) {
        options.category = category
      }

      const list = await Shared
        .find(options)
        .sort({ create_at: -1 })
        .limit(pageSize)
        .skip((currentPage - 1) * pageSize)

      const total = await Shared.countDocuments(options)

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

  static async remove(ctx) {
    try {
      const { _id } = ctx.params

      const shared = await Shared.findByIdAndRemove(_id)

      handleSuccess({ ctx, result: shared })
    } catch(err) {
      throw err
    }
  }

  static async update(ctx) {
    try {
      const { _id } = ctx.params

      const {
        category,
        url,
        title,
        thumb,
        description
      } = ctx.request.body
      
      if (!url) {
        throw new Error('分享文章地址不能为空')
      }
      if (!categories.includes(category)) {
        throw new Error('分类不符合规则')
      }

      const shared = await Shared.findByIdAndUpdate(_id, { 
        category,
        url,
        title,
        thumb,
        description
      }, { new: true })

      handleSuccess({ ctx, result: shared })
    } catch(err) {
      throw err
    }
  }

  static async create(ctx) {
    try {
      const {
        category,
        url,
        title,
        thumb,
        description
      } = ctx.request.body
      
      if (!url) {
        throw new Error('分享文章地址不能为空')
      }
      if (!categories.includes(category)) {
        throw new Error('分类不符合规则')
      }

      const shared = await Shared.create({
        category,
        url,
        title,
        thumb,
        description
      })

      handleSuccess({ ctx, result: shared })
    } catch(err) {
      throw err
    }
  }  
}
