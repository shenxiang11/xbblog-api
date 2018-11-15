import config from '../config'
import consola from 'consola'
import request from 'request'

const postRequest = ({ urlKey, urls, msg }) => {
  if (process.env.NODE_ENV === 'development') {
    return
  }
	request.post({
		body: urls,
		headers: { 'Content-Type': 'text/plain' },
		url: `http://data.zz.baidu.com/${urlKey}?site=${config.BAIDU.site}&token=${config.BAIDU.token}`
	}, (error, response, body) => {
		consola.info(urls, msg, error, body)
	})
}

// 提交记录
exports.baiduSeoPush = urls => {
	postRequest({ urls, urlKey: 'urls', msg: '百度推送结果：' })
}

// 更新记录
exports.baiduSeoUpdate = urls => {
	postRequest({ urls, urlKey: 'update', msg: '百度更新结果：' })
}

// 删除记录
exports.baiduSeoDelete = urls => {
	postRequest({ urls, urlKey: 'del', msg: '百度删除结果：' })
}