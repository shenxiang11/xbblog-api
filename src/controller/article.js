import { handleSuccess } from '../util/handle'
import Article from '../model/article'
import { baiduSeoPush, baiduSeoUpdate, baiduSeoDelete } from '../util/baidu-seo'
import conf from '../config'

const categories = ['code', 'think', 'fitness']
const states = ['draft', 'published']

export default class {

  static async list(ctx) {
    try {
      const { env } = ctx.params
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
      if (env !== 'admin') {
        options.state = 'published'
      }

      const list = await Article
        .find(options)
        .sort({ create_at: -1 })
        .limit(pageSize)
        .skip((currentPage - 1) * pageSize)
        .populate('tag')
        .select('-content')

      const total = await Article.countDocuments(options)

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

      const article = await Article.findByIdAndRemove(_id)

      baiduSeoDelete(`${conf.BAIDUSEO.site}/article/detail/${_id}`)
      handleSuccess({ ctx, result: article })
    } catch(err) {
      throw err
    }
  }

  static async update(ctx) {
    try {
      const { _id } = ctx.params
      const {
        title,
        description,
        content,
        thumb,
        state,
        tag,
        category,
        style,
        script
      } = ctx.request.body

      if (!title) {
        throw new Error('标题不能为空')
      }
      if (!content) {
        throw new Error('内容不能为空')
      }
      if (!states.includes(state)) {
        throw new Error('状态不符合规则')
      }
      if (!categories.includes(category)) {
        throw new Error('分类不符合规则')
      }

      const article = await Article.findByIdAndUpdate(_id, { 
        title,
        description,
        content,
        thumb,
        state,
        tag,
        category,
        style,
        script
      }, { new: true })

      baiduSeoUpdate(`${conf.BAIDUSEO.site}/article/detail/${article._id}`)
      handleSuccess({ ctx, result: article })
    } catch(err) {
      throw err
    }
  }

  static async create(ctx) {
    try {
      const {
        title,
        description,
        content,
        thumb,
        state,
        tag,
        category,
        style,
        script
      } = ctx.request.body

      if (!title) {
        throw new Error('标题不能为空')
      }
      if (!content) {
        throw new Error('内容不能为空')
      }
      if (!states.includes(state)) {
        throw new Error('状态不符合规则')
      }
      if (!categories.includes(category)) {
        throw new Error('分类不符合规则')
      }

      const article = await Article.create({
        title,
        description,
        content,
        thumb,
        state,
        tag,
        category,
        style,
        script
      })

      baiduSeoPush(`${conf.BAIDUSEO.site}/article/detail/${article._id}`)
      handleSuccess({ ctx, result: article })
    } catch(err) {
      throw err
    }
  }

  static async detail(ctx) {
    try {
      const { env, _id } = ctx.params

      const article = await Article.findById(_id).populate('tag')


      if (env !== 'admin') {
        article.view += 1
        article.save()
      }

      handleSuccess({
        ctx,
        result: article
      })
    } catch(err) {
      throw err
    }
  }
  
}
