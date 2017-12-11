const rp = require('request-promise')

module.exports = class AliFace {
  constructor(config = {}) {
    this.API_KEY = config.API_KEY
    this.API_SECRET = config.API_SECRET
  }

  query({
    url,
    attrs = [
      'age',
      'smiling',
      'eyestatus',
      'emotion',
      'beauty'
    ]
  } = {}) {
    if (!url) throw 'url of image required'

    const opts = {
      method: 'POST',
      url: 'https://api-cn.faceplusplus.com/facepp/v3/detect',
      headers: {
        'cache-control': 'no-cache',
        'content-type': 'application/x-www-form-urlencoded'
      },
      form: {
        api_key: this.API_KEY,
        api_secret: this.API_SECRET,
        image_url: url,
        return_attributes: attrs.join(',')
      }
    }

    return rp(opts)
  }
}
