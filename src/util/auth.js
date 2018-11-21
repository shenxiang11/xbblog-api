import jwt from 'jsonwebtoken'
import conf from '../config'

export const checkAdmin = (ctx, next) => {
  const authorization = ctx.header.authorization
  const token = authToken(authorization)

  if (!token || !authIsVerified(authorization, ctx)) {
    ctx.throw(401, '未登录或Token失效')
  }

  // 现在只有一个admin用户,checkAdmin和checkLogin意义暂时相同

  return next()
}

export const checkLogin = (ctx, next) => {
  const authorization = ctx.header.authorization
  const token = authToken(authorization)

  if (!token || !authIsVerified(authorization, ctx)) {
    ctx.throw(401, '未登录或Token失效')
  }

  return next()
}

export const authToken = authorization => {
	if (authorization) {
		const parts = authorization.split(' ')
		if (Object.is(parts.length, 2) && Object.is(parts[0], conf.JWT.clientPrefix)) {
			return parts[1]
		}
	}
	return false
}

export const authIsVerified = (authorization, ctx) => {
  const token = authToken(authorization)

  if (token) {
		try {
      const decodedToken = jwt.verify(token, conf.JWT.secret)

      if (decodedToken.exp > Date.now()) {
        ctx.decodedToken = decodedToken
        return true
			}
		} catch (err) {
      // token 畸形等一切错误视为token失效
      return false
    }
	}
	return false
}
