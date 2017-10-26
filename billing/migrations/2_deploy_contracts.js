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
var Xiaoi = artifacts.require("./proxy/xiaoi.sol");
var UsingAI = artifacts.require("./proxy/usingAI.sol");


module.exports = function(deployer, network, accounts) {
  const beneficiary = accounts[1];
  const billingType = 1;
  const arg0 = 99;
  const arg1 = 0;

  deployer.deploy(Register).then(function (params) {
    deployer.deploy(AIBusinessController, Register.address).then(function () {
      deployer.deploy(Xiaoi, AIBusinessController.address);
    })
  })
  deployer.deploy(ATT).then(function () {
    deployer.deploy(DbotBilling,ATT.address,beneficiary,billingType,arg0,arg1);
  });
  
};
