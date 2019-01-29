import { handleSuccess } from '../util/handle'
import conf from '../config'
import sha1 from 'sha1'
import Wechat from '../util/wechat-lib'

export default class {

  static async params(ctx) {
    try {
      const { url } = ctx.request.query
      const ticket = await Wechat.getJSApiTicket()

      handleSuccess({ ctx, result: sign(ticket, url) })
    } catch(err) {
      throw err
    }
  }

  static async getHear(ctx) {
    try {
      const token = conf.WECHAT.token
      const { signature, nonce, timestamp, echostr } = ctx.query
    
      const str = [token, timestamp, nonce].sort().join('')
      const sha = sha1(str)

      if (sha === signature) {
        ctx.body = echostr
      } else {
        ctx.body = 'Failed'
      }

    } catch(err) {
      throw err
    }
  }

  static async postHear(ctx) {
    try {
      
    } catch(err) {
      throw err
    }
  }
  
}

function sign(ticket, url) {
  const nonce = createNonce()
  const timestamp = createTimestamp()
  const signature = signIt(nonce, ticket, timestamp, url)

  return {
    appId: conf.WECHAT.appID,
    noncestr: nonce,
    timestamp,
    signature,
    ticket,
    url
  }
}

function signIt(nonce, ticket, timestamp, url) {
  const ret = {
    jsapi_ticket: ticket,
    nonceStr: nonce,
    timestamp,
    url
  }

  const string = raw(ret)
  const sha = sha1(string)

  return sha
}

function createNonce() {
  return Math.random().toString(36).substr(2, 15)
}

function createTimestamp() {
  return parseInt(new Date().getTime() / 1000, 0) + ''
}

function raw(args) {
  let keys = Object.keys(args)

  keys = keys.sort()

  let newArgs = {}

  keys.forEach(key => {
    newArgs[key.toLocaleLowerCase()] = args[key]
  })

  let str = ''

  for (let k in newArgs) {
    str += '&' + k + '=' + newArgs[k]
  }

  return str.substr(1)
}
