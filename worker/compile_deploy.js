const Web3 = require('web3')
const fs = require('fs')
const config  = require('./config.json')

module.exports = (solFile) => {

  const {endpoint, account, cost} = config;

  //compile start
  const code = require('fs')
    .readFileSync(`./contracts/${solFile}.sol`)
    .toString()
  
  const compiledCode = require('solc')
    .compile(code)

  // console.log(compiledCode);

  const contractName = Object.getOwnPropertyNames(compiledCode.contracts)[0];

  const abiDefinition = compiledCode
    .contracts[contractName]
    .interface

  const byteCode = compiledCode
    .contracts[contractName]
    .bytecode

  const contractDefinition = {
    abis: abiDefinition,
    bin: `0x${byteCode}`,
  }


  const web3 = new Web3(new Web3.providers.HttpProvider(endpoint));

  const tokenContractsAbi = contractDefinition.abis;
  const tokenContractsBin = contractDefinition.bin;

  if(!fs.existsSync('./build'))fs.mkdirSync('./build');
  fs.writeFileSync(`./build/${solFile}.bin`, tokenContractsBin , (err) => {
    if(err) console.log(err);
  })

  fs.writeFileSync(`./build/${solFile}.abi`, tokenContractsAbi , (err) => {
    if(err) console.log(err);
  })

  console.log(`${solFile}.sol compile complete`)
  //complete complete

  //deploy start
  // web3.personal.unlockAccount(account.address, account.password);
console.log("account.address: " + account.address);
  return new Promise((resolve) => {
    web3.eth.contract(JSON.parse(tokenContractsAbi))
      .new({
        data: tokenContractsBin,
        from: account.address,
        gas: cost.gas || 4700000
      }, (err, res) => {
        // console.log(err);
        // console.log(res);
        if (res.address) {
          fs.writeFileSync(`./build/${solFile}ContractAddress.txt`, res.address)
          console.log('Contract address: ' + res.address);
          console.log(`${solFile}.sol deploy complete`)
          resolve("")
        }
      })
  })
  //deploy complete
}
