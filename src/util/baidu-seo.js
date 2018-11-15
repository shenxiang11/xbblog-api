import conf from '../config'
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
    console.error(error)
    console.log('response:', response)
    console.log('body:', body)
    console.log('=======================')
	})
}

// 提交记录
exports.baiduSeoPush = urls => {
  console.log('百度推送：', urls)
	postRequest({ urls, urlKey: 'urls', msg: '百度推送结果：' })
}

// 更新记录
exports.baiduSeoUpdate = urls => {
  console.log('百度更新：', urls)
	postRequest({ urls, urlKey: 'update', msg: '百度更新结果：' })
}

// 删除记录
exports.baiduSeoDelete = urls => {
  console.log('百度删除：', urls)
	postRequest({ urls, urlKey: 'del', msg: '百度删除结果：' })
}