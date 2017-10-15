const fs = require('fs')
const Web3 = require('web3')
const rp = require('request-promise')
const ImageClassifyClient = require("baidu-aip-sdk").imageClassify

const config = require('./config')

const {
  APP_ID,
  API_KEY,
  SECRET_KEY
} = config.customer.AI

const client = new ImageClassifyClient(APP_ID, API_KEY, SECRET_KEY)

const methods = [
  'dishDetect',
  'carDetect',
  'logoSearch',
  'animalDetect',
  'plantDetect',
  'objectDetect'
]

module.exports = async () => {
  const {
    scheduler,
    customer
  } = config

  const provider = new Web3.providers
    .HttpProvider(scheduler.endpoint)
  const web3 = new Web3(provider)

  const { contract } = scheduler
  const instance = web3.eth
    .contract(contract.abi)
    .at(contract.address)

  const questionEvent = instance.NewQuestion()
  questionEvent.watch(async (err, msg) => {
    const {
      method,
      params
    } = JSON.parse(msg.args.question)

    const image = await fetchImage(params.image)
    const result = await query(method, image, params.options)

    const { account } = customer
    web3.personal
      .unlockAccount(account.address, account.password)

    instance.reply(JSON.stringify(result), {
      from: account.address,
      gas: customer.cost.gas
    })
  })
}

async function fetchImage(url) {
  const opts = {
    url,
    encoding: null
  }

  return rp.get(opts)
    .then(img => Buffer.from(img, 'utf8').toString('base64'))
}

async function query(method, image, options) {
  if (methods.indexOf(method) === -1) return false
  const result = await client[method](image, options)
  return result
}

module.exports()
