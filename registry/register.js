const Web3 = require('web3');
const fs = require('fs');
const config  = require('./config.json')

const {endpoint, account, cost} = config;


module.exports = class Register {

  initialize(contractAddress) {
    return new Promise(resolve => {
      this.web3 =  new Web3(new Web3.providers.HttpProvider(endpoint));

      this.web3.personal.unlockAccount(account.address, account.password);

      this.tokenContractsAbi = fs.readFileSync('./build/Register.abi');
      const contract = this.web3.eth.contract(JSON.parse(this.tokenContractsAbi));
      this.token = contract.at(contractAddress);
      this.account = account.address;
      this.eventRegister = this.token.EventRegister();
      this.eventDelete = this.token.EventDelete();
      this.eventSet = this.token.EventSet();

      resolve("")
    })

  }

  registerAI(AI_Id, address) {
    return new Promise(resolve => {
      this.token.register(AI_Id, address, {from: this.account, gas: cost.gas || 900000});
      console.log("Register AI ...");
      this.eventRegister.watch((err, res) => {
        if(!err) {
          console.log("Register event triggered: " + JSON.stringify(res));
          resolve("");
        }
      })

    })
  }

  getAIAddr(AI_Id) {
    this.token.get_price_addr(AI_Id, (err, res) => {
      console.log("getAIAddr: ", res);
    });
  }

  setAIAddr(AI_Id, address) {
    return new Promise(resolve => {
      this.token.set_price_addr(AI_Id, address, {from: this.account, gas: cost.gas || 900000});
      console.log("Set AI ...");
      this.eventSet.watch((err, res) => {
        if(!err) {
          console.log("Set event triggered: " + JSON.stringify(res));
          resolve("");
      }
    })
   })
  }

  deleteAIByName(AI_Id) {
    return new Promise(resolve => {
      this.token.deleteAI(AI_Id, {from: this.account, gas: cost.gas || 900000});
      console.log("Delete AI ...");
      this.eventDelete.watch((err, res) => {
        if(!err) {
          console.log("Delete event triggered: " + JSON.stringify(res));
          resolve("");
        }
      })

    })
  }

  isRegistered(AI_Id) {
    return this.token.isRegistered(AI_Id);
  }


}