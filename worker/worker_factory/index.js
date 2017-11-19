const blockchain = require("../util").blockchain
console.log(blockchain)

module.exports = class monitor {

  constructor(aiName, config) {
    console.log(config);
    this.aiName = aiName;
    this.config = config;
  }

  async run() {
    const Web3 = require('web3');
    const fs = require('fs');
    const contract = require("truffle-contract");
    const business_artifacts = require('../../billing/build/contracts/AIBusinessController.json');   
    const att_artifacts = require('../../billing/build/contracts/ATT.json');
     
    let endpoint = blockchain.endpoint;

    const web3 = new Web3(new Web3.providers.HttpProvider(endpoint));
    web3.personal.unlockAccount(blockchain.account.address, blockchain.account.password);
    let provider = new Web3.providers.HttpProvider(endpoint);
    
    console.log("aiName: ", this.aiName)
    let aiNameTemp = this.aiName
    const Api = require('../' + aiNameTemp);   
    // let res = await d({method: 'animalDetect', url: 'http://t2.27270.com/uploads/tu/201612/357/7.png'});
    // const dataResult = JSON.stringify(res);
    // console.log("dataResult: ", dataResult);
  
    let BusinessContract = contract(business_artifacts);
    let ATT = contract(att_artifacts);
    BusinessContract.setProvider(provider);
    ATT.setProvider(provider);
  
    let deployedAddress = blockchain.contracts;
    let businessToken = await BusinessContract.at(deployedAddress.biz);
    let att = await ATT.at(deployedAddress.att);
  
    // att.generateTokens(account.address, 2000, {from: account.address, gas: 700000});
  
    // console.log("att: ", deployedAddress.att);
  
    let eventFundsFrozen = businessToken.EventFundsFrozen();
    let eventFundsDeduct = businessToken.EventFundsDeduct();
    
    let hex = '0x' + Buffer.from(aiNameTemp, 'utf8').toString("hex");
    for(let i = hex.length; i < 66; i++) {
        hex += '0';
    }
    aiNameTemp = hex;
    console.log("aiName: ",aiNameTemp);
    const owner = blockchain.account.address;
    const gas = blockchain.gas;      
    // const beneficiary = web3.eth.accounts[1];
    // const beneficiary = "0xE83c90a780507B84cF08065DDA3Cc1976b172c25";
    const beneficiary = blockchain.beneficiary;
    console.log("beneficiary", beneficiary);
    await att.balanceOf(owner, {from:owner,gas:gas}).then(function(r) {
      console.log("owner balance: ", r.toString());
    });
    await att.balanceOf(beneficiary, {from:owner,gas:gas}).then(function(r) {
      console.log("beneficiary balance:", r.toString());
    });
    // att.balanceOf(owner).then(function(res) {
    //   console.log("balance1: ", res.toString());
    // })
    // att.balanceOf(beneficiary).then(function(res) {
    //   console.log("balance2: ", res.toString());
    // })
    // att.transfer(beneficiary, 200, {from: owner, gas: gas}).then(function(res) {
    //   console.log("transfer success:", res);
    //   att.balanceOf(owner).then(function(res) {
    //     console.log("balance1: ", res.toString());
    //   })
    //   att.balanceOf(beneficiary).then(function(res) {
    //     console.log("balance2: ", res.toString());
    //   })
    // })
    let config = this.config
    eventFundsFrozen.watch(function (err, res) {
      if (!err) {
        console.log("res: ", res);
        let args = JSON.parse(res.args.arg);
        console.log(args)
        const api = new Api(config);
        console.log("api: ", api);
        // const aiId = JSON.parse(res.args._id);
         // console.log("res: ", res);pwd
         const aiId = res.args._id;
         console.log("aiId: ", aiId);
         if(aiId === aiNameTemp) {
          let callId = parseInt(res.args._callID);
          console.log("callId: ", callId);
          
          console.log("eventFundsFrozen has been detected ");
  
          try {
            //调用AI得到数据成功
            api.query(args).then((res) => {
             console.log("res: ", res);
            //调用AI结束
             if(res != null) {
               const dataResult = JSON.stringify(res);
               console.log("dataResult: ", dataResult);
               
              businessToken.callFundsDeduct(aiNameTemp, callId, true, dataResult.toString(), {from: owner,gas: gas}).then(async function(r){
               await att.balanceOf(owner, {from:owner,gas:gas}).then(function(r) {
                 console.log("owner balance: ", r.toString());
               });
               await att.balanceOf(beneficiary, {from:owner,gas:gas}).then(function(r) {
                 console.log("beneficiary balance:", r.toString());
               });
              });
             }
             else {
              businessToken.callFundsDeduct(aiNameTemp, callId, false, dataResult.toString(), {from: owner,gas: gas});
             }
           })
         }
         catch(e) {
           console.log(e);
         }
         
       }
         }
  
  })
  }

}
