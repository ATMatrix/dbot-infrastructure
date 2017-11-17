const crypto = require('crypto')
const rp = require('request-promise')

module.exports = class XiaoI {
  constructor(config = {}) {
    this.APP_SECRET = config.APP_SECRET
    this.APP_KEY = config.APP_KEY
  }

  async query({ question }) {
    const host = 'xiaoi.com'
    const method = 'POST'
    const path = '/ask.do'

    const A1 = [this.APP_KEY, host, this.APP_SECRET].join(':')
    const A2 = [method, path].join(':')

    const HA1 = crypto.createHash('sha1').update(A1).digest('hex')
    const HA2 = crypto.createHash('sha1').update(A2).digest('hex')
    const nonce = crypto.randomBytes(20).toString('hex')

    const signData = [HA1, nonce, HA2].join(':')
    const sign = crypto.createHash('sha1').update(signData).digest('hex')

    const auth = `app_key="${this.APP_KEY}",nonce="${nonce}",signature="${sign}"`

    const options = {
      method,
      url: 'http://nlp.xiaoi.com/ask.do',
      headers: {
        'cache-control': 'no-cache',
        'x-auth': auth,
      },
      form: {
        user_id: 'user_id',
        question,
        platform: 'custom',
        format: 'xml'
      }
    }

    const result = await rp(options)
    return result
  }
}
