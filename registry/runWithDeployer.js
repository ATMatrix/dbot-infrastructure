const Register = require('./register');
const CompileDeploy = require('./compile_deploy')
const fs = require('fs')
const Deployer = require('sol.d')

async function run() {

    
    const deployer = new Deployer({
      srcDir: './contracts', // The path to your solidity source code, default to './contract'
      endpoint: 'https://bogong.atmatrix.org', // The address of your ethereum network node, default to 'http://localhost:8080'
      from: '0xcA9f427df31A1F5862968fad1fE98c0a9eE068c4', // Account used to deploy contracts
      password: '123456', // Password used to unlock the above account
      gas: 4700000, // Gas sent with transactions for deploying, default to 4700000
    }) // Note all options set here will be used as default parameters on method call, Or you can pass them later when call a method

    deployer.compile([
        'Register.sol'
        ], { srcDir: './contracts' })

    deployer.deploy('Register.sol:Register', {
        endpoint: 'https://bogong.atmatrix.org',
        from: '0xcA9f427df31A1F5862968fad1fE98c0a9eE068c4',
        password: '123456',
        gas: 3200000,
    }).then(console.log, console.log)

    // const contractAddress = "0xec458864cd7346e162bd4f1fde771166032c6c57";
    // const register = new Register();

    // await register.initialize(contractAddress);
    // register.getAIAddr('ImageIdentification')
    // console.log("ImageIdentification is registered? " + register.isRegistered('ImageIdentification'));

    // //判断AI是否已经注册
    // if (!register.isRegistered('ImageIdentification')){

    //   register.registerAI('ImageIdentification', '0x12345678901234567890123456789').then(function(){
    //     register.getAIAddr('ImageIdentification');
    //   });

    // }
    // else {

        // register.setAIAddr('ImageIdentification', '0x987654321987654321987654321').then(function(){
        //   register.getAIAddr('ImageIdentification');
        // });

    //   register.deleteAIByName('ImageIdentification').then(function(){
    //     register.getAIAddr('ImageIdentification');
    // });

    // }
}

run()