const rp = require('request-promise')
const Rekognition = require('aws-sdk/clients/rekognition')

module.exports = class BaiduOrc {
  constructor(config = {}) {
    this.client = new Rekognition(config)
  }

  async query({
    url,
  } = {}) {
    if (!url) throw 'url of image required'
    const image = await fetchImage(url)

    const params = {
      Image: {
        Bytes: image,
      }
    }

    return new Promise((resolve, reject) => {
      this.client.recognizeCelebrities(params, (err, res) => {
        if (err) reject(err)
        resolve(JSON.stringify(res, null, 2))
      })
    })
  }
}

async function fetchImage(url) {
  const opts = {
    url,
    encoding: null
  }

  let image = null
  try {
    image = await rp.get(opts)
      .then(img => Buffer.from(img, 'utf8'))
  } catch (err) {
      throw 'can not get image'
  }

  return image
}
