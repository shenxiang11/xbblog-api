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
  QINIU: {
    accessKey: 'vatLY77qxBYd0SyeqNuDANZT2SL_PnePyLlLefrL',
    secretKey: 'DUxsP7JCdynq7VakoTzyYH3AH2DsTjOKu2r1sfwe',
    bucketName: 'xbb-blog-test',
    expires: 7200
  },
  ADMIN: {
    username: '13800000000',
    password: 'dwyane3wade'
  }
}