const crypto = require('crypto')
const rp = require('request-promise')
const config = require('./config')

module.exports = (question) => {
  const {
    APP_ID,
    APP_KEY,
  } = config

  const now = parseInt(Date.now() / 1000)

  const obj = {userid: 'aaa', scene: 'main'}
  const data1 = new Buffer(JSON.stringify(obj)).toString('base64')

  const text = new Buffer(question).toString('base64')
  const data2 = `text=${text}`

  const checkSumData = APP_KEY + now + data1 + data2

  const checkSum = crypto.createHash('md5').update(checkSumData).digest('hex')

  options = {
    method: 'POST',
    url: 'http://api.xfyun.cn/v1/aiui/v1/text_semantic',
    headers: {
      'cache-control': 'no-cache',
      'content-type': 'application/x-www-form-urlencoded; charset=utf-8',
      accept: 'text/html, image/gif, image/jpeg, *; q=.2, */*; q=.2',
      'x-checksum': checkSum,
      'x-appid': APP_ID,
      'x-param': data1,
      'x-curtime': now
    },
    form: { text }
  }

  return rp(options)
}
