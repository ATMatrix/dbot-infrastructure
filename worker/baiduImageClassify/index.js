const rp = require('request-promise')
const ImageClassifyClient = require("baidu-aip-sdk").imageClassify

const config = require('./config')

const {
  APP_ID,
  API_KEY,
  SECRET_KEY
} = config

const client = new ImageClassifyClient(APP_ID, API_KEY, SECRET_KEY)

const methods = [
  'dishDetect',
  'carDetect',
  'logoSearch',
  'animalDetect',
  'plantDetect',
  'objectDetect'
]

module.exports = async ({
  method = 'objectDetect',
  url,
  options,
} = {}) => {
  if (!url) throw 'url of image required'
  if (methods.indexOf(method) === -1)
    throw `method must in ${JSON.stringify(methods)}`

  const image = await fetchImage(url)
  const result = await client[method](image, options)

  return result
}

async function fetchImage(url) {
  const opts = {
    url,
    encoding: null
  }

  let image = null
  try {
    image = await rp.get(opts)
      .then(img => Buffer.from(img, 'utf8').toString('base64'))
  } catch (err) {
      throw 'can not get image'
  }

  return image
}
