const fs = require('fs')
const Web3 = require('web3')

const {endpoint, account, cost} = require('./config.json')

const attAdd = "0x204aea11fa34a0ca807d2692899650416bf8e0df";
const contractAddress = "0x832fc6b937d9b3f4617bc47ee5931161196c5825";
const owner = "0x3ae88fe370c39384fc16da2c9e768cf5d2495b48";
const beneficiary = "0xca9f427df31a1f5862968fad1fe98c0a9ee068c4";
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
console.log(this.att);
// this.att.generateTokens.sendTransaction(owner,33,{from:owner,gas:3000000});
// this.att.approve.sendTransaction(contractAddress, 1000,{from:owner,gas:3000000});
// console.log(this.att.allowance(owner,contractAddress,{from:owner,gas:3000000}))
// console.log(this.att.balanceOf(owner))
// this.bill.billing(owner,{from:owner,gas:3000000});
// this.bill.deductFee(1002,{from:owner,gas:3000000});

//过滤log1 "weige"的事件
// let hex = '0x' + Buffer.from("weige", 'utf8').toString("hex");
// for(let i = hex.length; i < 66; i++) {
//     hex += '0';
// }
// const filter = web3.eth.filter({topics: [hex]});
// filter.watch(function (error, log) {
//     console.log(log);  
//     filter.stopWatching();      
// });
