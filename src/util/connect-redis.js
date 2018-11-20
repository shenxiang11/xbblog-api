import redis from 'redis'
import consola from 'consola'

const client = redis.createClient()

client.on('error', err => {
  consola.warn('redis连接失败', err)
})

export function redisGet(key) {
  return new Promise((resolve, reject) => {
    client.get(key, (err, info) => {
      if (err) {
        reject(err)
      }

      resolve(info)
    })
  })
}

export default client
