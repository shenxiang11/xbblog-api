import { handleSuccess } from '../util/handle'
import jwt from 'jsonwebtoken'
import conf from '../config'
import redisClient, { redisGet } from '../util/connect-redis'
import { sendMail } from '../util/transporter'
import User from '../model/user'

export default class {
  static async login(ctx) {
    try {
      const { mail, password } = ctx.request.body

      if (!mail) {
        throw new Error('邮箱不能为空')
      }
      if (!/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(mail)) {
        throw new Error('邮箱验证不通过')
      }
      if (!password) {
        throw new Error('密码不能为空')
      }

      let res = await User.findOne({ mail })

      if (!res || password !== res.password) {
        throw new Error('用户名或密码不正确')
      }

      res = JSON.parse(JSON.stringify(res))
      res.password = null
      delete res['password']

      const token = jwt.sign({ 
        mail,
        iat: Date.now()
      }, conf.JWT.secret, { expiresIn: conf.JWT.expiresIn })

      handleSuccess({ ctx, message: '登录成功', result: { token, mail } })
    } catch(err) {
      throw err
    }
  }

  static async register(ctx) {
    try {
      const { mail, password, repassword, captcha } = ctx.request.body
      
      if (!mail) {
        throw new Error('邮箱不能为空')
      }
      if (!/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(mail)) {
        throw new Error('邮箱验证不通过')
      }
      if (!password) {
        throw new Error('密码不能为空')
      }
      if (password !== repassword) {
        throw new Error('两次密码不一致')
      }
      if (!captcha) {
        throw new Error('验证码不能为空')
      }
      
      const code = await redisGet(`captcha:${mail}`)

      if (code !== captcha) {
        throw new Error('验证码不正确')
      }

      await User.create({ mail, password })

      handleSuccess({ ctx, message: '注册成功' })
    } catch(err) {
      throw err
    }
  }

  // 获取验证码
  static async captcha(ctx) {
    try {
      const { mail } = ctx.request.query

      if (!/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(mail)) {
        throw new Error('邮箱验证不通过')
      }

      const code = Math.random().toString().substr(2,6)

      await sendMail({
        from: conf.SMTP.user,
        to: mail,
        subject: '香饽饽博客注册码',
        text: 'text',
        html: `您的邀请码是:<b>${code}</b>,有效期1分钟,再次获取后失效`
      })

      redisClient.setex([`captcha:${mail}`, '60' , code])

      handleSuccess({ ctx, message: '邮件发送成功' })
    } catch(err) {
      throw err
    }
  }

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
