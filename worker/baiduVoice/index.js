const SpeechClient = require("baidu-aip-sdk").speech


const config = require('./config')

const {
  APP_ID,
  API_KEY,
  SECRET_KEY
} = config

const client = new SpeechClient(APP_ID, API_KEY, SECRET_KEY)

module.exports = async ({
  text,
  options = {},
}) => {
  if (!text) throw 'text required'
  return client.text2audio(text, options)
}
