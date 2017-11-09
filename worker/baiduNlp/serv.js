const NlpClient = require("baidu-aip-sdk").nlp

const config = {
  APP_ID: "10323662",
  API_KEY: "YkSr5Wv28BByGX3uVi4Wnb3w",
  SECRET_KEY: "5tyeWIw1PMCEBf5Glv3flWUbPcNG3Lb6"
}

const {
  APP_ID,
  API_KEY,
  SECRET_KEY
} = config

const client = new NlpClient(APP_ID, API_KEY, SECRET_KEY)

const methods = [
  'sentimentClassify',
]

module.exports = async ({
  method = 'sentimentClassify',
  text,
} = {}) => {
  if (!text) throw 'text to be processed required'
  if (methods.indexOf(method) === -1)
    throw `method must in ${JSON.stringify(methods)}`

  const result = await client[method](text)

  return result
}
