    async function run() {
      const Web3 = require('web3');
      const fs = require('fs');
      const config  = require('./config.json')
      const contract = require("truffle-contract");
      const TruffleConfig = require('../billing/truffle');
      const business_artifacts = require('../billing/build/contracts/AIBusinessController.json');   
      const att_artifacts = require('../billing/build/contracts/ATT.json');
      
  
      const { endpoint, account, cost } = config;
      
      const network = 'bogong';
      const contractAddress = TruffleConfig.networks[network];
  
      const web3 = new Web3(new Web3.providers.HttpProvider(endpoint));
      web3.personal.unlockAccount(account.address, account.password);
      let provider = new Web3.providers.HttpProvider(endpoint);
      
      const d = require('./baiduImageClassify') 
      const xiaoi = require('./xiaoi')   
      // let res = await d({method: 'animalDetect', url: 'http://t2.27270.com/uploads/tu/201612/357/7.png'});
      // const dataResult = JSON.stringify(res);
      // console.log("dataResult: ", dataResult);
  
      let BusinessContract = contract(business_artifacts);
      let ATT = contract(att_artifacts);
      BusinessContract.setProvider(provider);
      ATT.setProvider(provider);
  
      let businessToken = await BusinessContract.at(contractAddress.biz);
      let att = await ATT.at(contractAddress.att);
  
      let eventFundsFrozen = businessToken.EventFundsFrozen();
      let eventFundsDeduct = businessToken.EventFundsDeduct();
      
      let aiName = 'hhe';
      let hex = '0x' + Buffer.from(aiName, 'utf8').toString("hex");
      for(let i = hex.length; i < 66; i++) {
          hex += '0';
      }
      aiName = hex;
      console.log("aiName: ",aiName);
      const owner = contractAddress.from;
      const beneficiary = web3.eth.accounts[1];
  
      eventFundsFrozen.watch(function (err, res) {
        if (!err) {
          console.log("res: ", res);
          let args = res.args.arg;
          console.log(args)
          // const aiId = JSON.parse(res.args._id);
           // console.log("res: ", res);
           const aiId = res.args._id;
           console.log("aiId: ", aiId);
           if(aiId === aiName) {
            callId = parseInt(res.args._callID);
            console.log("callId: ", callId);
            
            console.log("eventFundsFrozen has been detected ");
 
            try {
              //调用AI得到数据成功
              xiaoi(args).then((res) => {
               console.log("res: ", res);
              //调用AI结束
               if(res != null) {
                 const dataResult = JSON.stringify(res);
                 console.log("dataResult: ", dataResult);
                 
                businessToken.callFundsDeduct(aiName, callId, true, dataResult.toString(), {from: owner,gas: cost.gas}).then(async function(r){
                 await att.balanceOf(owner, {from:owner,gas:cost.gas}).then(function(r) {
                   console.log("owner balance: ", r.toString());
                 });
                 await att.balanceOf(beneficiary, {from:owner,gas:cost.gas}).then(function(r) {
                   console.log("beneficiary balance:", r.toString());
                 });
                });
               }
               else {
                businessToken.callFundsDeduct(aiName, callId, false, dataResult.toString(), {from: owner,gas: cost.gas});
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
    
    run()