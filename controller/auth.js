import { handleSuccess } from '../util/handle'
import jwt from 'jsonwebtoken'
import conf from '../config'

export default class {
  static async adminLogin(ctx) {
    try {
      const { username, password } = ctx.request.body

      if (!username) {
        throw new Error('用户名不能为空')
      }
      if (!password) {
        throw new Error('密码不能为空')
      }
      if (username !== conf.ADMIN.username || password !== conf.ADMIN.password) {
        throw new Error('用户名或密码错误')
      }

      const token = jwt.sign({ 
        username,
        iat: Date.now()
      }, conf.JWT.secret, { expiresIn: conf.JWT.expiresIn })

      handleSuccess({ ctx, message: '登录成功', result: { token, username } })
    } catch(err) {
      throw err
    }
  }

  static async test(ctx) {
    handleSuccess({ ctx, message: 'Oh!!!', result: ctx.decodedToken })
  }

  // // 后台用户登录
  // static async adminLogin(ctx) {
  //   try {
  //     const { username, password } = ctx.request.body

  //     const user = await User.findOne({ username })

  //     if (!user || user.password !== password) {
  //       throw new Error('用户名密码错误')
  //     }

  //     if (user.role !== 99) {
  //       throw new Error('权限不足')
  //     }

  //     user.password = null

  //     const token = jwt.sign({ user_id: user._id, role: user.role }, 'xxxxxxx', { expiresIn: '1h' })

  //     handleSuccess({ ctx, message: '登陆成功', result: { user, token } })
  //   } catch(err) {
  //     throw err
  //   }
  // }

  // // 按token获取用户信息
  // static async getAuthInfo(ctx) {
  //   try {
  //     const { user_id } = ctx.state

  //     const user = await User.findById(user_id)
  //     user.password = null

  //     handleSuccess({ ctx, message: '获取用户信息成功', result: user })
  //   } catch(err) {
  //     throw err
  //   }
  // }
}
