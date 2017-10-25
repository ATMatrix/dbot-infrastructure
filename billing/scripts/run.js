const fs = require('fs')
const Web3 = require('web3')
// var contract = require("truffle-contract");

const TruffleConfig = require('../truffle');

const attAdd = "0x3a6e07925cf6a1543b9591efd86c6d1e5b7a5c4e";
const contractAddress = "0x1717d04e6218eccb40fff197da350d0b3107a218";
const owner = "0xca9f427df31a1f5862968fad1fe98c0a9ee068c4";
const beneficiary = "0xbd2d69e3e68e1ab3944a865b3e566ca5c48740da";
const proxy = "0xde6430355bfabd038e93f6f5aa9ccbf18925fc84";

const network = 'bogong';
const config = TruffleConfig.networks[network];
this.web3 = new Web3(new Web3.providers.HttpProvider('http://' + config.host + ':' + config.port));
this.web3.personal.unlockAccount(config.from, config.password);
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
// this.att.approve.sendTransaction(contractAddress, 333333333,{from:owner,gas:3000000});         //2.approve
// console.log(this.att.allowance(owner,contractAddress,{from:owner,gas:3000000}))
console.log(this.att.balanceOf(beneficiary))
// this.bill.changeController(proxy, {from:owner,gas:3000000});                               //3.change controller                              
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
