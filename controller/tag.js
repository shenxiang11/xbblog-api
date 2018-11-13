import { handleSuccess } from '../util/handle'
import Tag from '../model/tag'

const categories = ['code', 'think', 'fitness']

export default class {

  static async create(ctx) {
    try {
      const { name, description, category } = ctx.request.body

      if (!name) {
        throw new Error('标签名称不能为空')
      }
      if (!category) {
        throw new Error('标签所属分类不能为空')
      }
      if (!categories.includes(category)) {
        throw new Error('分类不符合规则')
      }

      const tag = await Tag.create({
        name,
        description,
        category
      })

      handleSuccess({ ctx, result: tag })
    } catch(err) {
      throw err
    }
  
  }

  static async remove(ctx) {
    try {
      const { _id } = ctx.params

      const tag = await Tag.findByIdAndRemove(_id)

      handleSuccess({ ctx, result: tag })
    } catch(err) {
      throw err
    }
  }

  static async update(ctx) {
    try {
      const { _id } = ctx.params
      const { name, description, category } = ctx.request.body
      
      if (!name) {
        throw new Error('标签名称不能为空')
      }
      if (!category) {
        throw new Error('标签所属分类不能为空')
      }
      // findByIdAndUpdate 不会做校验
      if (!categories.includes(category)) {
        throw new Error('分类不符合规则')
      }
      const tag = await Tag.findByIdAndUpdate(_id, { 
        name,
        description,
        category
      }, { new: true })

      handleSuccess({ ctx, result: tag })
    } catch(err) {
      throw err
    }
  }

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

      const list = await Tag
        .find(options)
        .limit(pageSize)
        .skip((currentPage - 1) * pageSize)

      const total = await Tag.countDocuments(options)

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
