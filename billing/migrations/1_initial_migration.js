var Migrations = artifacts.require("./Migrations.sol");
const Web3 = require('web3');
const TruffleConfig = require('../truffle');

module.exports = function(deployer, network, accounts, addresses) {
  console.log(accounts);
  // const web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/hDfusAJod3dkRnsLX5LY"));

  const config = TruffleConfig.networks[network];
  // console.log(config)
  // const web3 = new Web3(config.provider);  
  // console.log("web3: ", web3);
  const web3 = new Web3(new Web3.providers.HttpProvider(config.endpoint));
  // const web3 = new Web3(config.provider);
  console.log(web3.isConnected())
  // console.log(web3);
  console.log('>> Unlocking account ' + config.from);
  // web3.personal.importRawKey('518715494f94d4b233930ed5ba6a0c238d5979d223e82875bc45bc97b0f005fc','123456');  
  web3.personal.unlockAccount(config.from, config.password);
  deployer.deploy(Migrations);
};
