async function dessert(){
    const fs = require('fs')
    const Web3 = require('web3')
    const contract = require("truffle-contract");
    const TruffleConfig = require('../truffle');
    const bill_artifacts = require('../build/contracts/DbotBilling.json');
    const att_artifacts = require('../build/contracts/ATT.json');
    const register_artifacts = require('../build/contracts/Register.json');
    const biz_artifacts = require('../build/contracts/AIBusinessController.json');
    const xiaoi_artifacts = require('../build/contracts/xiaoi.json');
    
    const network = 'bogong';
    const config = TruffleConfig.networks[network];
    let endpoint = 'http://' + config.host + ':' + config.port;
    console.log(endpoint)
    let provider = new Web3.providers.HttpProvider(endpoint);
    let web3 =  new Web3(provider);
    web3.personal.unlockAccount(config.from, config.password);
    console.log(web3.isConnected())

    let Bill = contract(bill_artifacts);
    let ATT = contract(att_artifacts);
    let Register = contract(register_artifacts);
    let Biz = contract(biz_artifacts);
    let Xiaoi = contract(xiaoi_artifacts);
    Bill.setProvider(provider);
    ATT.setProvider(provider);
    Register.setProvider(provider);
    Biz.setProvider(provider);
    Xiaoi.setProvider(provider);

    let bill = await Bill.at(config.bill);
    let att = await ATT.at(config.att);
    let register = await Register.at(config.register);
    let biz = await Biz.at(config.biz);
    let xiaoi = await Xiaoi.at(config.proxy);

    const owner = config.from;
    let accounts = web3.eth.accounts;
    const beneficiary = accounts[1];
    const gasLimit = config.gasLimit;
    const aiName = 'hhe';

    bill.allEvents('', function(error, log){console.log(log);});
    att.allEvents('', function(error, log){console.log(log);});
    register.allEvents('', function(error, log){console.log(log);});
    biz.allEvents('', function(error, log){console.log(log);});
    xiaoi.allEvents('', function(error, log){console.log(log);});

    await bill.changeController(biz.address, {from:owner,gas:gasLimit})    
    await register.register(aiName, bill.address,{from:owner,gas:gasLimit});

    await att.generateTokens(owner,100,{from:owner,gas:gasLimit});

    var a = await att.balanceOf(owner,{from:owner,gas:gasLimit});
    console.log(a);
    await att.approve(bill.address, 1000000,{from:owner,gas:gasLimit});
    var b = await att.allowance(owner, bill.address, {from:owner,gas:gasLimit});
    console.log(b);
    let arg = {method: 'animalDetect', url: 'http://t2.27270.com/uploads/tu/201612/357/7.png'};
    await xiaoi.callAI(aiName, JSON.stringify(arg), {from:owner,gas:gasLimit});
    let callID = await biz.callAIID();
    console.log(callID);
    biz.EventFundsFrozen('', async function(error, result){
        console.log(result)
        if(!error){
            let args = JSON.parse(result.args.arg);
            console.log(args)
            const d = require('../../worker/baiduImageClassify')    
            var res = await d(args);
            const dataResult = JSON.stringify(res);
            console.log("dataResult: ", dataResult);
            await biz.callFundsDeduct(aiName, --callID, true, dataResult.toString(), {from: owner,gas: gasLimit});
            let ba = await att.balanceOf(owner,{from:owner,gas:gasLimit});
            let be = await att.balanceOf(beneficiary,{from:owner,gas:gasLimit});
            console.log(ba);
            console.log(be);
        }
    })

}

dessert();