import { handleSuccess } from '../util/handle'
import qiniu from 'qiniu'
import conf from '../config'

export default class {

  static async token(ctx) {
    try {
      const mac = new qiniu.auth.digest.Mac(conf.QINIU.accessKey, conf.QINIU.secretKey)

      const options = {
        scope: conf.QINIU.bucketName,
        expires: conf.QINIU.expires
      }

      const putPolicy = new qiniu.rs.PutPolicy(options)
      const uploadToken = putPolicy.uploadToken(mac)

      handleSuccess({ ctx, result: uploadToken })
    } catch(err) {
      throw err
    }
  }
  
}
