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

const BILLING_TYPE = {
    Free:0,
    Times:1,
    Interval:2,
    Other:3
}

let beneficiary = '';
const file = './scripts/blockchain.json'  

module.exports =  function(deployer, network, accounts) {
  beneficiary = accounts[0];
  const env = equivalent[network];    
  const config = TruffleConfig.networks[network];  
  fs.readJson(file)
  .then(blockchain => {
    beneficiary = blockchain[env].beneficiary;
    console.log(beneficiary)
    //billings
    let contracts = blockchain[env].contracts;
    let att = contracts.att;
    let billings = {};
    console.log(contracts)
    {
        let billingType = 0;
        let arg0 = 0;
        let arg1 = 0;
        deployer.deploy(DbotBilling,att,beneficiary,billingType,arg0,arg1).then(function(){
            billings.free = DbotBilling.address;
            billingType = 1;
            arg0 = 98;
            arg1 = 5;
            deployer.deploy(DbotBilling,att,beneficiary,billingType,arg0,arg1).then(function () {
                billings.times = DbotBilling.address;
                billingType = 2
                arg0 = 97;
                arg1 = 0;
                deployer.deploy(DbotBilling,att,beneficiary,billingType,arg0,arg1).then(function () {
                    billings.interval = DbotBilling.address;
                    blockchain[env].billings = billings;
                    fs.outputJsonSync(file, blockchain);
                })
            })
        });
    }
    
  })
};
