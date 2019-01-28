import axios from 'axios'
import conf from '../../config'
import redisClient, { redisGet } from '../../util/connect-redis'

export default class Wechat {
  constructor() {}

  static async getAccessToken() {
    // 先从redis里取，没有重新获取存入redis
    let access_token = await redisGet('wechat:access_token')

    if (!access_token) {
      const { data } = await axios.get(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${conf.WECHAT.appID}&secret=${conf.WECHAT.appsecret}`)
      access_token = data.access_token
      redisClient.setex(['wechat:access_token', '7100' , access_token])
    }
    // console.log('access_token:', access_token)
    return access_token
  }

  static async getJSApiTicket() {
    let jsapi_ticket = await redisGet('wechat:jsapi_ticket')

    if (!jsapi_ticket) {
      const access_token = await this.getAccessToken()
      const { data } = await axios.get(`https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${access_token}&type=jsapi`)
      jsapi_ticket = data.ticket
      redisClient.setex(['wechat:jsapi_ticket', '7100' , jsapi_ticket])
    }
    // console.log('jsapi_ticket:', jsapi_ticket)
    return jsapi_ticket
  }
}
