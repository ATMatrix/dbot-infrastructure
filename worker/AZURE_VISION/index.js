const qs = require('querystring')
const rp = require('request-promise')

module.exports = class AzureVision {
  constructor(config = {}) {
    this.KEY = config.KEY
  }

  query({
    url,
    attrs = [
      'Categories',
      'Description',
      'Color',
    ]
  } = {}) {
    if (!url) throw 'url of image required'

    const q = {
        'visualFeatures': attrs.join(','),
        'details': '',
        'language': 'en',
    }
    const qstr = qs.stringify(q)

    const opts = {
      method: 'POST',
      uri: `https://westcentralus.api.cognitive.microsoft.com/vision/v1.0/analyze?${qstr}`,
      headers: {
        'Ocp-Apim-Subscription-Key': this.KEY,
        'cache-control': 'no-cache',
        'content-type': 'application/json'
      },
      body: {
        url,
      },
      json: true
    }

    return rp(opts)
  }
}
