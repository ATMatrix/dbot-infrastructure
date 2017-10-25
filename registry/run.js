const Register = require('./register')
const CompileDeploy = require('./compile_deploy')
const fs = require('fs')

async function run() {


  const register = new Register();

  let contractAddress = "";
  const path = './build/RegisterContractAddress.txt';

  if(fs.existsSync(path))
    contractAddress = fs.readFileSync('./build/RegisterContractAddress.txt').toString();

  //判断合约是否已被部署，如果没被部署则先部署
  if (contractAddress === "") {
    console.log("Deploy contract now...");
    await CompileDeploy('Register');
    contractAddress = fs.readFileSync('./build/RegisterContractAddress.txt').toString();
  }
  else console.log("Contract has been deployed");

  console.log("Contract Address: " + contractAddress);

  await register.initialize(contractAddress);
  register.getAIAddr('ImageIdentification2');
  console.log("ImageIdentification2 is registered? " + register.isRegistered('ImageIdentification2'));

  //判断AI是否已经注册
  if (!register.isRegistered('ImageIdentification2')){

    register.registerAI('ImageIdentification2', '0x12345678901234567890123456789').then(function(){
      register.getAIAddr('ImageIdentification2');
    });

  }
  else {

      // register.setAIAddr('ImageIdentification', '0x987654321987654321987654321').then(function(){
      //   register.getAIAddr('ImageIdentification');
      // });

    await register.deleteAIByName('ImageIdentification2').then(function(){
      register.getAIAddr('ImageIdentification2');
  })

  }
  return 0;
}

run().then(console.log())