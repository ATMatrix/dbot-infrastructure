const NlpClient = require("baidu-aip-sdk").nlp


const methods = [
  'sentimentClassify',
]

module.exports = class BaiduNlp {
  constructor(config = {}) {
    this.client = new NlpClient(
      config.APP_ID,
      config.API_KEY,
      config.SECRET_KEY
    )
  }

  async query({
    method = 'sentimentClassify',
    text,
  } = {}) {
    if (!text) throw 'text to be processed required'
    if (methods.indexOf(method) === -1)
      throw `method must in ${JSON.stringify(methods)}`

    const result = await this.client[method](text)

    return result
  }
}
