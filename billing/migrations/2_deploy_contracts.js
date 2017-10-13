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

module.exports = function(deployer) {

  deployer.deploy(Mathsol);
  deployer.deploy(Ownable);
  deployer.deploy(SafeMath);
  deployer.deploy(Util);
  deployer.deploy(BasicToken);
  deployer.deploy(StandardToken);

  deployer.deploy(SimpleToken).then(function() {
    return deployer.deploy(DbotBilling, SimpleToken.address, 1, 100, 3, );
  });
};
