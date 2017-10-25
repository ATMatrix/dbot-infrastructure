const Web3 = require('web3');
const fs = require('fs');
const config  = require('./config.json')
const d = require('./baiduImageClassify/index.js')
const CompileDeploy = require('./compile_deploy')


const { endpoint, account, cost } = config;

const web3 = new Web3(new Web3.providers.HttpProvider(endpoint));
web3.personal.unlockAccount(account.address, account.password);

//构造register contract token
// const registerContractsAbi = fs.readFileSync('../registry/build/Register.abi');
// const registerContract = web3.eth.contract(JSON.parse(registerContractsAbi));
// const registerAddress = fs.readFileSync('../registry/build/RegisterContractAddress.txt').toString();
// const registerToken = registerContract.at(registerAddress);
// registerToken.register("0x6d65000000000000000000000000000000000000000000000000000000000000", "0x1717d04e6218eccb40fff197da350d0b3107a218", {from: account.address, gas: cost.gas || 900000});

//构造business contract token


// const businessContractsAbi = fs.readFileSync('../registry/build/Register.abi');
// const contract = web3.eth.contract(JSON.parse(businessContractsAbi));
// const contractAddress = fs.readFileSync('../registry/build/RegisterContractAddress.txt').toString();
// const businessToken = contract.at(contractAddress);

//AIBusinessController 

let aiBusinessControllerAbi = fs.readFileSync('./build/AIBusinessController.abi');

const aiBusinessControllerContract = web3.eth.contract(JSON.parse(aiBusinessControllerAbi));
  
const aiBusinessController = aiBusinessControllerContract.at('0xde6430355bfabd038e93f6f5aa9ccbf18925fc84');

    //callFundsFrozen冻结ATT
    aiBusinessController.callFundsFrozen.sendTransaction("0x6d65000000000000000000000000000000000000000000000000000000000000", "0xca9f427df31a1f5862968fad1fe98c0a9ee068c4", {
        from: "0xca9f427df31a1f5862968fad1fe98c0a9ee068c4",
        gas: 3000000
    }, (err, res) => {
        if (err) {
            conosle.log(err);
        }
        console.log("res: ", res);
    });

    let eventFundsFrozen = aiBusinessController.EventFundsFrozen();

    let callId = "";
    eventFundsFrozen.watch(function (err, res) {
        if (!err) {
            // console.log("res: ", res);
            callId = parseInt(res.args._callID);
            console.log("callId: ", callId);
            aiBusinessController.status.call((err,res) => {
              console.log("status: ", res.toString());
            });
            
            console.log("eventFundsFrozen has been detected ");
            
            //开始调用AI
            try {
              d({method: 'animalDetect', url: 'http://t2.27270.com/uploads/tu/201612/357/7.png'}).then((res) => {
                //调用AI得到数据成功
                if(res != null) {
                  const dataResult = JSON.stringify(res);
                  console.log("dataResult: ", dataResult);
                  //调用AI结束

                  //调用business contract扣费
                  let result = aiBusinessController.callFundsDeduct.sendTransaction("0x6d65000000000000000000000000000000000000000000000000000000000000", callId, true, {
                    from: "0xca9f427df31a1f5862968fad1fe98c0a9ee068c4",
                    gas: 3000000
                  }, (err, res) => {
                      if (err) {
                        console.log("DEDUCT ERROR: ", err);
                      }
                      else console.log("Deduct success!");
                      // console.log(res);
                  });
                
                  let eventFundsDeduct = aiBusinessController.EventFundsDeduct();
                
                  //监听到扣费事件
                  eventFundsDeduct.watch(function (error, result) {
                      if (!error) {
                        console.log("eventFundsDeduct has been detected: ", result);

                        //构造savedata contract token
                        let dataContractAddress = "";
                        const path = './build/SaveDataContractAddress.txt';
                        if(fs.existsSync(path))
                          dataContractAddress = fs.readFileSync('./build/SaveDataContractAddress.txt').toString();
                        
                        if (dataContractAddress === "") {
                          console.log("Deploy contract now...");
                          CompileDeploy('SaveData').then((res) => {
                            dataContractAddress = fs.readFileSync('./build/SaveDataContractAddress.txt').toString();    
                          });
                        }
                        else console.log("SaveData Contract has been deployed");
                          
                        console.log("SaveData Contract Address: " + dataContractAddress);
                        
                        const dataContractsAbi = fs.readFileSync('./build/SaveData.abi');
                        const dataContractsBin = fs.readFileSync('./build/SaveData.bin');


                        let provider = new Web3.providers.HttpProvider(endpoint);
                        let contract = require("truffle-contract");

                        let dataContract = contract({
                          abi: JSON.parse(dataContractsAbi),
                          unlinked_binary: dataContractsBin      
                        })
                        dataContract.setProvider(provider);
                        
                        const dataToken = dataContract.at(dataContractAddress.toString());
                        // console.log("dataToken: ", dataToken);
                        
                        // const dataContract = web3.eth.contract(JSON.parse(dataContractsAbi));
                        // const dataToken = dataContract.at(dataContractAddress);

                        dataToken.getData().then((res) => {
                           console.log("Before set data: ", res);
                        });
                        // dataToken.getData({from: account.address}).then(function(r) {
                        //   console.log(r);
                        // })
                        //写入AI返回数据
                        dataToken.setData(dataResult, {from: account.address, gas: cost.gas || 900000}).then(function(res) {
                          if(err) {
                            console.log("SETDATA ERROR: ", err);
                          }
                          else {
                            // dataToken.getData((err, res) => {
                            //   console.log("Finally result: ", res);
                            //   eventFundsDeduct.stopWatching();
                            //   eventFundsFrozen.stopWatching();
                            // });
                            dataToken.getData().then((r) => {
                              console.log(r);
                              eventFundsDeduct.stopWatching();
                              eventFundsFrozen.stopWatching();
                            })
                          }
                        });
                        
                        
                  }
              });
                }
                //调用AI得到数据失败,将钱退回
                else {
                  let result = aiBusinessController.callFundsDeduct.sendTransaction("0x6d65000000000000000000000000000000000000000000000000000000000000", callId, false, {
                    from: "0xca9f427df31a1f5862968fad1fe98c0a9ee068c4",
                    gas: 3000000
                  }, (err, res) => {
                      if (err) {
                        console.log("DRAW BACK ERROR: ", err);
                      }
                      else console.log("Draw back success!");
                      // console.log(res);
                  });
                }
                     
            })
            }
            catch(e) {
              console.log(e);
            }
          }
    });