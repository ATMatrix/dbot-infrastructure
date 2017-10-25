const fs = require('fs')
const Web3 = require('web3')
const contract = require("truffle-contract");
const TruffleConfig = require('../truffle');
const bill_artifacts = require('../build/contracts/DbotBilling.json');
const att_artifacts = require('../build/contracts/ATT.json');

const network = 'development';
const config = TruffleConfig.networks[network];
var endpoint = 'http://' + config.host + ':' + config.port;
console.log(endpoint)
var provider = new Web3.providers.HttpProvider(endpoint);
var web3 =  new Web3(provider);
web3.personal.unlockAccount(config.from, config.password);

var Bill = contract(bill_artifacts);
var ATT = contract(att_artifacts);

Bill.setProvider(provider);
ATT.setProvider(provider);

const owner = config.from;
var accounts = web3.eth.accounts;
const beneficiary = accounts[1];

var att;
ATT.at(config.att).then(function (instance) {
    att = instance;
    var events = att.allEvents('', function(error, log){
        console.log(log);
    });
    console.log('attAddress: ' + att.address);
    return att.generateTokens(owner,100,{from:owner,gas:3000000});      //1.造币
}).then(function (params) {
    return att.balanceOf(owner,{from:owner,gas:3000000});
}).then(function (balances) {
    console.log("owner balances: " + balances);
    return att.approve(config.bill, 1000,{from:owner,gas:3000000});     //2.approve
}).then(function (params) {
    return att.allowance(owner, config.bill, {from:owner,gas:3000000});
}).then(function (res) {
    console.log("allowance billAddress : " + res);
    callBill();
}).catch(function (error) {
    console.log(error);
});

function callBill() {
    var bill;
    Bill.at(config.bill).then(function(instance) {
        bill = instance;
        console.log('billAddress: ' + bill.address)
        var events = bill.allEvents('', function(error, log){
              console.log(log);
        });
        return bill.billing(owner,{from:owner,gas:3000000})             //4.bill
    }).then(function (params) {
        console.log(params.tx)
        return bill.callID()
    }).then(function (callID) {
        console.log(callID)        
        callID--;
        return bill.deductFee(callID,{from:owner,gas:3000000});          //5.deduct
    }).then(function (params) {
        console.log(params.tx)   
        return att.balanceOf(owner);             
    }).then(function (params) {
        console.log("owner after bill balances:" + params);   
        return att.balanceOf(beneficiary);            
    }).then(function (params) {
        console.log("beneficiary after bill balances:" + params);               
    }).catch(function (error) {
        console.log(error);
    });
}
