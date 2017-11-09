const CensorClient = require("baidu-aip-sdk").imageCensor

const config = {
  APP_ID: "10323606",
  API_KEY: "BKdiSFe4aIUrydYRdYYq0MPw",
  SECRET_KEY: "TOvuxNxB1Ga6ZOpN3ntGfhNjmtheVdR5"
}

const client = new CensorClient(APP_ID, API_KEY, SECRET_KEY)

const methods = [
  'antiPorn',
  'antiPornGif',
]

module.exports = async ({
  method = 'antiPorn',
  image,
} = {}) => {
  if (!image) throw 'image required'
  if (methods.indexOf(method) === -1)
    throw `method must in ${JSON.stringify(methods)}`

  const result = await client[method](image)

  return result
}
