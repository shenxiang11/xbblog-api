import conf from '../config'
import consola from 'consola'
import request from 'request'

const postRequest = ({ urlKey, urls, msg }) => {
  if (process.env.NODE_ENV === 'development') {
    return
  }
	request.post({
		body: urls,
		headers: { 'Content-Type': 'text/plain' },
		url: `http://data.zz.baidu.com/${urlKey}?site=${conf.BAIDUSEO.site}&token=${conf.BAIDUSEO.token}`
	}, (error, response, body) => {
    consola.error(error)
    consola.log('response:', response)
    consola.log('body:', body)
    consola.log('=======================')
	})
}

// 提交记录
exports.baiduSeoPush = urls => {
  consola.log('百度推送：', urls)
	postRequest({ urls, urlKey: 'urls', msg: '百度推送结果：' })
}

// 更新记录
exports.baiduSeoUpdate = urls => {
  consola.log('百度更新：', urls)
	postRequest({ urls, urlKey: 'update', msg: '百度更新结果：' })
}

// 删除记录
exports.baiduSeoDelete = urls => {
  consola.log('百度删除：', urls)
	postRequest({ urls, urlKey: 'del', msg: '百度删除结果：' })
}