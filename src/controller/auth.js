import { handleSuccess } from '../util/handle'
import jwt from 'jsonwebtoken'
import conf from '../config'
import redisClient, { redisGet } from '../util/connect-redis'
import { sendMail } from '../util/transporter'
import User from '../model/user'
import fs from 'fs'
import path from 'path'

export default class {

  static async updateInfo(ctx) {
    try {
      const auth = ctx.decodedToken
      const { _id } = ctx.params
      const portrait = ctx.request.files ? ctx.request.files.portrait : null

      const {
        website,
        nickname
      } = ctx.request.body

      if (auth._id !== _id) {
        throw new Error('只能修改自己的信息')
      }

      // 图片上传
      let filePath = ''
      if (portrait) {
        const reader = fs.createReadStream(portrait.path);
        filePath = path.join(__dirname, '../../public/portraits') + `/${Date.now()}${path.extname(portrait.name)}`
        const upStream = fs.createWriteStream(filePath)
        reader.pipe(upStream)
      }
      filePath = filePath.split('/public')[1]

      const options = {}
      if (portrait) {
        options.portrait = filePath
      }

      const info = await User.findByIdAndUpdate(_id, { 
        website,
        nickname,
        ...options
      }, { new: true })

      handleSuccess({ ctx, result: info })
    } catch(err) {
      throw err
    }
  }

  static async info(ctx) {
    try {
      const auth = ctx.decodedToken
      
      let user = await User.findOne({ _id: auth._id })
      user = JSON.parse(JSON.stringify(user))
      delete user['password']

      handleSuccess({ ctx, result: user })
    } catch(err) {
      throw err
    }
  }

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
        ...res,
        iat: Date.now()
      }, conf.JWT.secret, { expiresIn: conf.JWT.expiresIn })

      handleSuccess({ ctx, message: '登录成功', result: { token, user: res } })
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
      console.log('code', code)

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

      let admin = await User.findOne({ identity: 'admin' })

      if (!admin) {
        throw new Error('用户名或密码错误')
      } else if (admin.mail !== username && admin.phone !== username) {
        throw new Error('用户名或密码错误') 
      } else if (admin.password !== password) {
        throw new Error('用户名或密码错误') 
      }

      admin = JSON.parse(JSON.stringify(admin))
      delete admin['password']

      const token = jwt.sign({ 
        admin,
        iat: Date.now()
      }, conf.JWT.secret, { expiresIn: conf.JWT.expiresIn })

      handleSuccess({ ctx, message: '登录成功', result: { token, user: admin } })
    } catch(err) {
      throw err
    }
  }
}
