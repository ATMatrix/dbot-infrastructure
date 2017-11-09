var Migrations = artifacts.require("./Migrations.sol");
const Web3 = require('web3');
const TruffleConfig = require('../truffle');

module.exports = function(deployer, network, accounts, addresses) {
  console.log(accounts);
  // const web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/hDfusAJod3dkRnsLX5LY"));

  // const config = TruffleConfig.networks[network];
  // const web3 = new Web3(config.provider);  
  // console.log("web3: ", web3);
  // const web3 = new Web3(new Web3.providers.HttpProvider('http://' + config.host + ':' + config.port));
  // console.log(web3.isConnected())
  // console.log('>> Unlocking account ' + config.from);
  // web3.personal.unlockAccount(config.from, config.password, 36000);
  deployer.deploy(Migrations);
};
