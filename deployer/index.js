const fs = require('fs')
const path = require('path')
const Web3 = require('web3')
const solc = require('solc')

module.exports = class Deployer {
  constructor({
    srcDir = './contracts/',
    endpoint = 'http://localhost:8080',
    from,
    password,
    gas = 4700000,
  } = {}) {
    this.srcDir = srcDir
    this.endpoint = endpoint
    this.from = from
    this.password = password
    this.gas = gas
  }

  compile(srcs, { srcDir = this.srcDir } = {}) {
    if (srcs.length === 0) return true

    const sources = srcs
      .reduce((ret, src) => {
        ret[src] = fs.readFileSync(path.join(srcDir, src), 'utf8')
        return ret
      }, {})

    const { contracts } = solc
      .compile({ sources }, 1)

    Object.entries(contracts).forEach(([name, contract]) => {
      contracts[name] = {
        bytecode: contract.bytecode,
        interface: JSON.parse(contract.interface),
      }
    })

    this.abstraction = contracts
    return true
  }

  deploy(name, {
    endpoint = this.endpoint,
    from = this.from,
    password = this.password,
    gas = this.gas,
  } = {}) {
    if (!name || (typeof name !== 'string')) return
    const contract = this.abstraction[name]

    return new Promise((resolve, reject) => {
      const provider = new Web3
        .providers
        .HttpProvider(endpoint)
      const web3 = new Web3(provider)

      const options = {
        data: '0x' + contract.bytecode,
        from,
        gas,
      }

      web3.personal.unlockAccount(from, password)

      web3.eth.contract(contract.interface)
        .new(options, (err, res) => {
          if (err) reject(err)

          const addr = res.address
          if (addr) {
            contract.address = addr
            resolve(contract)
          }
        })
    })
  }
}
