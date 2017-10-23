var Mathsol = artifacts.require("./lib/Math.sol");
var Ownable = artifacts.require("./lib/Ownable.sol");
var SafeMath = artifacts.require("./lib/SafeMath.sol");
var Util = artifacts.require("./lib/Util.sol");
var BasicToken = artifacts.require("./coin/BasicToken.sol");
var StandardToken = artifacts.require("./coin/StandardToken.sol");
var SimpleToken = artifacts.require("./coin/SimpleToken.sol");
var FreeCharge = artifacts.require("./charges/FreeCharge.sol");
var IntervalCharge = artifacts.require("./charges/IntervalCharge.sol");
var TimesCharge = artifacts.require("./charges/TimesCharge.sol");
var DbotBilling = artifacts.require("./billing/DbotBilling.sol");
var ATT = artifacts.require("./att/ATT.sol");
var ERC20Token = artifacts.require("./att/ERC20Token.sol");
var MiniMeToken = artifacts.require("./att/MiniMeToken.sol");


const beneficiary = "0xca9f427df31a1f5862968fad1fe98c0a9ee068c4";
const billingType = 1;
const arg0 = 100;
const arg1 = 0;

module.exports = function(deployer) {
  deployer.deploy(MiniMeToken);
  deployer.deploy(ATT).then(function () {
    deployer.deploy(DbotBilling,ATT.address,beneficiary,billingType,arg0,arg1);
  });
  
};
