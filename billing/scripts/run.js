const fs = require('fs')
const Web3 = require('web3')
// var contract = require("truffle-contract");
const bc = require('./blockchain.json');

const beneficiary = '0xE83c90a780507B84cF08065DDA3Cc1976b172c25';
const network = 'test';
const config = bc[network];
let endpoint = config.endpoint;

const owner = config.account.address;
this.web3 = new Web3(new Web3.providers.HttpProvider(endpoint));
// this.web3.personal.unlockAccount(config.account.address, config.account.password);
let accounts = this.web3.eth.accounts;
console.log(accounts)
console.log(this.web3.isConnected())
const abiFile = fs.readFileSync('../build/contracts/DbotBilling.json');
const attAbi = fs.readFileSync('../build/contracts/ATT.json');
const jsonString = JSON.parse(abiFile);
const jsonString2 = JSON.parse(attAbi);
this.billContractsAbi = jsonString.abi;
this.attContractsAbi = jsonString2.abi;
const contract = this.web3.eth.contract(this.billContractsAbi);
this.bill = contract.at(config.contracts.bill);
const attContract = this.web3.eth.contract(this.attContractsAbi);
this.att = attContract.at(config.contracts.att);
// console.log(this.att);
this.att.generateTokens.sendTransaction(owner,333333333,{from:owner,gas:3000000});        //1.造币
// this.att.approve.sendTransaction(contractAddress, 333333333,{from:owner,gas:3000000});         //2.approve
// console.log(this.att.allowance(owner,contractAddress,{from:owner,gas:3000000}))
console.log(this.att.balanceOf(owner))
// this.bill.changeController(consumer, {from:owner,gas:3000000});                               //3.change controller                              
// this.bill.billing(owner,{from:owner,gas:3000000});                                        //4.bill
// this.bill.deductFee(1002,{from:owner,gas:3000000});                                       //5.deduct

//过滤log1 "weige"的事件
// let hex = '0x' + Buffer.from("weige", 'utf8').toString("hex");
// for(let i = hex.length; i < 66; i++) {   
//     hex += '0';
// }
// const filter = web3.eth.filter({topics: [hex]});
const filter = this.web3.eth.filter();
filter.watch(function (error, log) {
    console.log(log);  
    // filter.stopWatching();      
});
