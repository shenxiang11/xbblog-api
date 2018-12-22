import jwt from 'jsonwebtoken'
import conf from '../config'

export const checkAdmin = (ctx, next) => {
  try {
    const authorization = ctx.header.authorization
    const token = authToken(authorization)

    if (!token || !authIsVerified(authorization, ctx)) {
      ctx.throw(401, '未登录或Token失效')
    }

    const user = jwt.verify(token, conf.JWT.secret)
    if (user.identity !== 'admin') {
      ctx.throw(400, '非admin用户')
    }

    return next()
  } catch (err) {
    ctx.throw(400, err.message)
  }
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
