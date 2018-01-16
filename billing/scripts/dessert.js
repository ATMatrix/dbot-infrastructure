async function dessert(){
    const fs = require('fs')
    const Web3 = require('web3')
    const contract = require("truffle-contract");
    const TruffleConfig = require('../truffle');
    const bill_artifacts = require('../build/contracts/DbotBilling.json');
    const atn_artifacts = require('../build/contracts/ATN.json');
    const register_artifacts = require('../build/contracts/Register.json');
    const biz_artifacts = require('../build/contracts/AIBusinessController.json');
    const xiaoi_artifacts = require('../build/contracts/Consumer.json');
    const bc = require('./blockchain.json');
    const network = 'test';
    const config = bc[network];
    let endpoint = config.endpoint;
    console.log(endpoint)
    let provider = new Web3.providers.HttpProvider(endpoint);
    let web3 =  new Web3(provider);
    console.log(web3.eth.accounts)
    console.log(web3.isConnected())
    web3.personal.unlockAccount(config.account.address, config.account.password);
    
    // var rtt_token_abi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"mint","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"supply","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"version","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"mint","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"},{"name":"target","type":"address"}],"name":"mintFor","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"},{"name":"_extraData","type":"bytes"}],"name":"approveAndCall","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[{"name":"_tokenName","type":"string"},{"name":"_tokenSymbol","type":"string"}],"payable":false,"type":"constructor"},{"payable":false,"type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}];
    // var rtt_token_address = "0x0f114a1e9db192502e7856309cc899952b3db1ed";
    // var rtt_token = web3.eth.contract(rtt_token_abi).at(rtt_token_address);
    // console.log(rtt_token.mint({from: config.account.address}));
    // console.log(rtt_token.balanceOf(config.account.address).toString());

    let Bill = contract(bill_artifacts);
    let ATN = contract(atn_artifacts);
    let Register = contract(register_artifacts);
    let Biz = contract(biz_artifacts);
    let Xiaoi = contract(xiaoi_artifacts);
    Bill.setProvider(provider);
    ATN.setProvider(provider);
    Register.setProvider(provider);
    Biz.setProvider(provider);
    Xiaoi.setProvider(provider);

    let bill = await Bill.at(config.contracts.bill);
    // let billFree = await Bill.at(config.billings.free);
    // let billTimes = await Bill.at(config.billings.times);
    // let billInterval = await Bill.at(config.billings.interval);
    let atn = await ATN.at(config.contracts.att);
    let register = await Register.at(config.contracts.register);
    let biz = await Biz.at(config.contracts.biz);
    let xiaoi = await Xiaoi.at(config.contracts.consumer);

    const owner = config.account.address;
    let accounts = web3.eth.accounts;
    const beneficiary = config.beneficiary;
    console.log("beneficiary: ", beneficiary);
    // const beneficiary = accounts[1];
    const gas = config.gas;
    const aiName = 'XIAO_I';

    bill.allEvents('', function(error, log){console.log(log);});
    // billFree.allEvents('', function(error, log){console.log(log);});
    // billTimes.allEvents('', function(error, log){console.log(log);});
    // billInterval.allEvents('', function(error, log){console.log(log);});
    atn.allEvents('', function(error, log){console.log(log);});
    register.allEvents('', function(error, log){console.log(log);});
    biz.allEvents('', function(error, log){console.log(log);});
    xiaoi.allEvents('', function(error, log){console.log(log);});
    web3.eth.filter('', function(error, log){console.log(log);})

    await bill.changeController(biz.address, {from:owner,gas:gas});    
    // await billFree.changeController(biz.address, {from:owner,gas:gas});    
    // await billTimes.changeController(biz.address, {from:owner,gas:gas});    
    // await billInterval.changeController(biz.address, {from:owner,gas:gas});    
    await register.register('XIAO_I', bill.address,{from:owner,gas:gas});
    // await register.register('ALI_FACE', billFree.address,{from:owner,gas:gas});
    // await register.register('BAIDU_OCR', billTimes.address,{from:owner,gas:gas});
    // await register.register('XUN_FEI', billInterval.address,{from:owner,gas:gas});
    // await register.register('BAIDU_NLP', billTimes.address,{from:owner,gas:gas});
    // await register.register('AWS_REKOGNITION', billInterval.address,{from:owner,gas:gas});
    // await register.register('AZURE_VISION', billTimes.address,{from:owner,gas:gas});
    // await register.register('GOOGLE_LANGUAGE', bill.address,{from:owner,gas:gas});
    // await register.register('IBM_TONE_ANALYZER', billTimes.address,{from:owner,gas:gas});

    await atn.mint(owner,1000000,{from:owner,gas:gas});
    var a = await atn.balanceOf(owner,{from:owner,gas:gas});
    console.log(a);
    await atn.approve(bill.address, 100000,{from:owner,gas:gas});
    var b = await atn.allowance(owner, bill.address, {from:owner,gas:gas});
    console.log(b)
    // await att.approve(billFree.address, 100000,{from:owner,gas:gas});
    // b = await att.allowance(owner, billFree.address, {from:owner,gas:gas});
    // console.log(b)
    // await att.approve(billTimes.address, 100000,{from:owner,gas:gas});
    // b = await att.allowance(owner, billTimes.address, {from:owner,gas:gas});
    // console.log(b)
    // await att.approve(billInterval.address, 100000,{from:owner,gas:gas});
    // b = await att.allowance(owner, billInterval.address, {from:owner,gas:gas});
    // console.log(b)
    // console.log(b);
    // // let arg = {method: 'animalDetect', url: 'http://t2.27270.com/uploads/tu/201612/357/7.png'};
    let arg = {
        question:"你好!"
    }
    let receipt = await xiaoi.callAI(aiName, JSON.stringify(arg), {from:owner,gas:gas});
    console.log("receipt", receipt)
    let callID = await biz.callAIID();
    console.log(callID);

    let fee = await biz.getPrice.call(aiName, owner,{from: owner,gas: gas});
    console.log("fee", fee);
    biz.EventFundsFrozen('', async function(error, result){
        console.log(result)
        if(!error){
            let args = JSON.parse(result.args.arg);
            console.log(args)
            const Q = require('../../worker/XIAO_I')  
            const conf = require('../../worker/XIAO_I/config.json')  
            const q = new Q(conf)
            var res = await q.query(args);
            const dataResult = JSON.stringify(res);
            console.log("dataResult: ", dataResult);
            await biz.callFundsDeduct(aiName, --callID, true, dataResult.toString(), {from: owner,gas: gas});
            let ba = await atn.balanceOf(owner,{from:owner,gas:gas});
            let be = await atn.balanceOf(beneficiary,{from:owner,gas:gas});
            console.log(ba);
            console.log(be);
        }
    })
}

dessert();