const ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3')

module.exports = class BaiduNlp {
  constructor(config = {}) {
		this.toneAnalyzer = new ToneAnalyzerV3(config)
  }

  async query({
    text,
  } = {}) {
    if (!text) throw 'text to be processed required'

    return new Promise((resolve, reject) => {
      this.toneAnalyzer.tone({ text }, (err, res) => {
        if (err) reject(err)
        resolve(JSON.stringify(res, null, 2))
      })
    })
  }
}
