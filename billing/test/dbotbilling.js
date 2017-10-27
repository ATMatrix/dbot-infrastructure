var ATT = artifacts.require("./att/ATT.sol");
var DbotBilling = artifacts.require("./billing/DbotBilling.sol");

contract('DbotBilling', function(accounts) {
  it("should put 0 ATT in the first account", function() {
    return ATT.deployed().then(function(instance) {
      return instance.balanceOf.call(accounts[0]);
    }).then(function(balance) {
      assert.equal(balance.valueOf(), 0, "0 wasn't in the first account");
    });
  });
  it("should put 100 ATT in the first account", function() {
    var att;
    var beforeTokens;
    var generateTokens = 100;

    return ATT.deployed().then(function(instance) {
      att = instance;
      return att.balanceOf.call(accounts[0]);
    }).then(function(tokens) {
        beforeTokens = tokens.toNumber();
      return att.generateTokens(accounts[0], generateTokens, {from: accounts[0]});
    }).then(function(isSucc) {
        return att.balanceOf.call(accounts[0])
    }).then(function(afterTokens) {
      assert.equal(beforeTokens.valueOf(), 0, "0 wasn't in the first account before generate");        
      assert.equal(afterTokens.valueOf(), generateTokens, "1000000 generate int the firstt account");
    });
  });
  it("should approve attAddress 100 correctly", async function() {
    var att = await ATT.deployed();
    var bill = await DbotBilling.deployed();
    var approveTokens = 100;
    var beforeApproveTokens = await att.allowance.call(accounts[0], bill.address);
    assert.equal(beforeApproveTokens.valueOf(), 0, "0 allowance in bill.address before the first account approve");            
    att.approve(bill.address, approveTokens, {from: accounts[0]}).then(function(isApproved) {
        assert.ok(isApproved);                    
        return att.allowance.call(accounts[0], bill.address).then(function(approvedTokens){
           assert.equal(approvedTokens.valueOf(), approveTokens, "100 allowance in bill.address after the first account approve");                        
        });
    });
  });
  it("should bill work correctly with deployed contract", async function() {
    var att = await ATT.deployed();
    var bill = await DbotBilling.deployed();
    await bill.billing(accounts[0], {from:accounts[0]});
    var callId = await bill.callID();
    await bill.deductFee(callId--);
    var balances0 = await att.balanceOf(accounts[0]);
    var balances1 = await att.balanceOf(accounts[1]);
    assert.equal(balances0.valueOf(), 1, "1 allowances in account[0] after bill");                          
    assert.equal(balances1.valueOf(), 99, "99 allowances in account[1] after bill");                          
  });
});
