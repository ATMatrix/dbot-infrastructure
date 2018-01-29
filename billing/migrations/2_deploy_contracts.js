var Ownable = artifacts.require("./lib/Ownable.sol");
var SafeMath = artifacts.require("./lib/SafeMath.sol");
var FreeCharge = artifacts.require("./charges/FreeCharge.sol");
var IntervalCharge = artifacts.require("./charges/IntervalCharge.sol");
var TimesCharge = artifacts.require("./charges/TimesCharge.sol");
var DbotBilling = artifacts.require("./billing/DbotBilling.sol");
var ATT = artifacts.require("./att/ATT.sol");
var ERC20Token = artifacts.require("./att/ERC20Token.sol");
var MiniMeToken = artifacts.require("./att/MiniMeToken.sol");

var Register = artifacts.require("./register/Register.sol");
var AIBusinessController = artifacts.require("./proxy/AIBusinessController.sol");
var Consumer = artifacts.require("./proxy/Consumer.sol");
var UsingAI = artifacts.require("./proxy/usingAI.sol");

const fs = require('fs-extra')
const TruffleConfig = require('../truffle');

const equivalent = {
  'bogong': 'development',
  'kovan': 'test',
  'prod': 'production'
}

let beneficiary = '';
const billingType = 1;
const arg0 = 1;
const arg1 = 0;
const file = './scripts/blockchain.json'  

module.exports =  function(deployer, network, accounts) {
  // beneficiary = accounts[0];
  // const env = equivalent[network];    
  // const config = TruffleConfig.networks[network];  
  // fs.readJson(file)
  // .then(blockchain => {
  //   blockchain[env].endpoint = config.endpoint;
  //   blockchain[env].account = {
  //     address: config.from,
  //     password: config.password
  //   }
  //   blockchain[env].gas = config.gas;
  //   blockchain[env].beneficiary = beneficiary;

  //   //all
  //   let contracts = {};
  //   deployer.deploy(Register).then(function () {
  //     contracts.register = Register.address;
  //     deployer.deploy(AIBusinessController, Register.address).then(function () {
  //       contracts.biz = AIBusinessController.address;
  //       deployer.deploy(Consumer, AIBusinessController.address).then(function () {
  //         contracts.consumer = Consumer.address;
  //         // deployer.deploy(ATT).then(function () {
  //           // contracts.att = ATT.address;
  //           contracts.att = '0xa649c2ba1fbf6984e934cea9dc6c7c2a7af379f7';
  //           deployer.deploy(DbotBilling,contracts.att,beneficiary,billingType,arg0,arg1).then(function(){
  //             contracts.bill = DbotBilling.address;
  //             blockchain[env].contracts = contracts;
  //             fs.outputJsonSync(file, blockchain);
  //           });
  //         // });
  //       });
  //     })
  //   })
  // })
};
