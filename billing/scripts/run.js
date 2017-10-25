const fs = require('fs')
const Web3 = require('web3')
// var contract = require("truffle-contract");

const {endpoint, account, cost} = require('./config.json')

const attAdd = "0x0c47d75a65bb06b7f610c2d9e814919a21b88fab";
const contractAddress = "0x3b6bbb892002b1169a74ab5bf1ea4c1af8b232fe";
const owner = "0xca9f427df31a1f5862968fad1fe98c0a9ee068c4";
const beneficiary = "0x3ae88fe370c39384fc16da2c9e768cf5d2495b48";
const proxy = "0xb42604a3d14407f495e0c95bf9040e9c787a73f8";
this.web3 =  new Web3(new Web3.providers.HttpProvider(endpoint));

this.web3.personal.unlockAccount(account.address, account.password);
const abiFile = fs.readFileSync('../build/contracts/DbotBilling.json');
const attAbi = fs.readFileSync('../build/contracts/ATT.json');
const jsonString = JSON.parse(abiFile);
const jsonString2 = JSON.parse(attAbi);
this.billContractsAbi = jsonString.abi;
this.attContractsAbi = jsonString2.abi;
const contract = this.web3.eth.contract(this.billContractsAbi);
this.bill = contract.at(contractAddress);
const attContract = this.web3.eth.contract(this.attContractsAbi);
this.att = attContract.at(attAdd);
// console.log(this.att);
// this.att.generateTokens.sendTransaction(owner,333333333,{from:owner,gas:3000000});        //1.造币
// this.att.approve.sendTransaction(contractAddress, 1000,{from:owner,gas:3000000});         //2.approve
// console.log(this.att.allowance(owner,contractAddress,{from:owner,gas:3000000}))
// console.log(this.att.balanceOf(owner))
// this.bill.changeController(proxy,{from:owner,gas:3000000});                               //3.change controller                              
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
