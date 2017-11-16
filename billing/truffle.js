var HDWalletProvider = require("truffle-hdwallet-provider");
var infura_apikey = "hDfusAJod3dkRnsLX5LY";
var mnemonic = "genre minor account boring throw blanket bird various hotel rotate rally whisper";

module.exports = {
  networks: {
    bogong: {
      host: "118.31.18.101",
      port: 4049,
      endpoint: 'http://118.31.18.101:4049',
      network_id: "*", // Match any network id
      from: "0xca9f427df31a1f5862968fad1fe98c0a9ee068c4",
      password: "123456",    
      before_timeout: 30000000,             
      test_timeout: 30000000,
      gas: 4707808,
    },
    kovan: {
      host: "118.31.18.101", 
      port: 4045,
      endpoint: 'http://118.31.18.101:4045',
      network_id: "*",       
      gas: 4.6e6,
      gasPrice: 0.02e12,
      from: "0x47d1ba802dca4c88871dc594249905c42b7d21b7",
      password: "123456",
    }
    
  }
};