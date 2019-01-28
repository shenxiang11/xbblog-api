export default {
  SERVER: {
    port: '4000'
  },
  MONGOOSE: {
    uri: 'mongodb://127.0.0.1:12345/blog_dev'
  },
  JWT: {
    secret: 'test',
    expiresIn: 1000 * 60 * 60 * 24,
    clientPrefix: 'Bearer'
  },
  BAIDUSEO: {
    site: 'https://www.sweetsmartstrongshen.cc',
    token: 'keGmkiSRWlUyQvo1'
  },
  SMTP: {
    user: '863461783@qq.com',
    pass: 'idmfjlnbnvkqbbhg'
  },
  WECHAT: {
    appID: 'wx91edde313fdadab3',
    appsecret: '1f01cf092050b338069ab285b05ff89a',
    token: 'sx931210a1s2d3f4'
  }
}