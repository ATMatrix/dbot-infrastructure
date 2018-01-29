const crypto = require('crypto')
const rp = require('request-promise')

module.exports = class XunFei {
  constructor(config = {}) {
    this.APP_ID = config.APP_ID
    this.APP_KEY = config.APP_KEY
  }

  query({ question }) {
    if (!question) throw 'question required'

    const now = parseInt(Date.now() / 1000)

    const obj = {userid: 'aaa', scene: 'main'}
    const data1 = new Buffer(JSON.stringify(obj)).toString('base64')

    const text = new Buffer(question).toString('base64')
    const data2 = `text=${text}`

    const checkSumData = this.APP_KEY + now + data1 + data2

    const checkSum = crypto.createHash('md5').update(checkSumData).digest('hex')

    const options = {
      method: 'POST',
      url: 'http://api.xfyun.cn/v1/aiui/v1/text_semantic',
      headers: {
        'cache-control': 'no-cache',
        'content-type': 'application/x-www-form-urlencoded; charset=utf-8',
        accept: 'text/html, image/gif, image/jpeg, *; q=.2, */*; q=.2',
        'x-checksum': checkSum,
        'x-appid': this.APP_ID,
        'x-param': data1,
        'x-curtime': now
      },
      form: { text }
    }

    return rp(options)
  }
}
