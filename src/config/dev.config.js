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
  ADMIN: {
    username: '13800000000',
    password: 'dwyane3wade'
  }
}