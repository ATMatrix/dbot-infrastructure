var HDWalletProvider = require("truffle-hdwallet-provider");
var infura_apikey = "hDfusAJod3dkRnsLX5LY";
var mnemonic = "genre minor account boring throw blanket bird various hotel rotate rally whisper";

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      endpoint: 'http://localhost:8545',
      network_id: "*", // Match any network id
      from: "0x3ae88fe370c39384fc16da2c9e768cf5d2495b48",
      password: "542500611",    
      before_timeout: 30000000,             
      test_timeout: 30000000,
      gas: 4.6e6,
    },
    bogong: {
      host: "118.31.18.101", 
      port: 4045,
      endpoint: 'http://118.31.18.101:4045',
      network_id: "*",       
      gas: 4.6e6,
      from: "0xca9f427df31a1f5862968fad1fe98c0a9ee068c4",
      password: "123456",
    },
    ropsten: {
      endpoint: "https://ropsten.infura.io/" + infura_apikey,
      provider: new HDWalletProvider(mnemonic, "https://ropsten.infura.io/" + infura_apikey, 4),
      network_id: 3,
      gas: 4000000,
      from: '0xd8d8cab1a930cf68014b2da6cb0f932158377aa7'
    }
  }
};