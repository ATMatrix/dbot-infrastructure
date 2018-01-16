var ECVerify = artifacts.require("./uraiden/ECVerify.sol");
var RaidenMicroTransferChannels = artifacts.require("./uraiden/RaidenMicroTransferChannels.sol");

const fs = require('fs-extra')
const TruffleConfig = require('../truffle');

const equivalent = {
  'bogong': 'development',
  'kovan': 'test',
  'prod': 'production'
}

const file = './scripts/blockchain.json'  

module.exports =  function(deployer, network, accounts) {
  // const env = equivalent[network];    
  // const config = TruffleConfig.networks[network];  
  // fs.readJson(file)
  // .then(blockchain => {
  //   let att = blockchain[env].contracts.att;
  //   let challenge_period = 30;
  //   {
  //       deployer.deploy(RaidenMicroTransferChannels, att, challenge_period).then(function(){
  //           blockchain[env].contracts.uraiden = RaidenMicroTransferChannels.address;          
  //           fs.outputJsonSync(file, blockchain);
  //       });
  //   }
    
  // })
};
