const rp = require('request-promise')
const config = require('./config')

module.exports = ({
  url,
  attrs = [
    'age',
    'smiling',
    'eyestatus',
    'emotion',
    'beauty'
  ]
} = {}) => {
  if (!url) throw 'url of image required'
  const {
    API_KEY,
    API_SECRET,
  } = config

  opts = {
    method: 'POST',
    url: 'https://api-cn.faceplusplus.com/facepp/v3/detect',
    headers: {
      'cache-control': 'no-cache',
      'content-type': 'application/x-www-form-urlencoded'
    },
    form: {
      api_key: API_KEY,
      api_secret: API_SECRET,
      image_url: url,
      return_attributes: attrs.join(',')
    }
  }

  return rp(opts)
}
