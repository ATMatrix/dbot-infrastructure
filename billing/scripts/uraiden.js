async function uraiden(){
  const fs = require('fs')
  const Web3 = require('web3')
  const contract = require("truffle-contract");
  const uraiden_artifacts = require('./RaidenMicroTransferChannels.json');
  const att_artifacts = require('./ERC223Token.json');
  let provider = new Web3.providers.HttpProvider("http://118.31.18.101:4045");
  let web3 =  new Web3(provider);
  console.log(web3.eth.accounts)
  console.log(web3.isConnected())
  // web3.personal.unlockAccount(config.account.address, config.account.password);
  let ATT = contract(att_artifacts);
  let URAIDEN = contract(uraiden_artifacts);
  ATT.setProvider(provider);
  URAIDEN.setProvider(provider);

  let att = await ATT.at("0x04c7f744a0c751d89e99ae79a39060ec6f3c4397");
  let uraiden = await URAIDEN.at("0xffa52825c7997dd2be80fb91080500a52abd6d5b");

  // att.allEvents('', function(error, log){console.log(log);});
  uraiden.allEvents('', function(error, log){console.log(log);});
}

uraiden();