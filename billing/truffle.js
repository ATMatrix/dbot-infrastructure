var HDWalletProvider = require("truffle-hdwallet-provider");
var infura_apikey = "hDfusAJod3dkRnsLX5LY";
var mnemonic = "genre minor account boring throw blanket bird various hotel rotate rally whisper";

module.exports = {
  networks: {
    development: {
      host: "106.14.207.120",
      port: 8545,
      endpoint: 'http://106.14.207.120:8545',
      network_id: "3", // Match any network id
      from: "0x00eb5ca24922a29e25e748025c28e8a654339aea",
      password: "123456",    
      before_timeout: 30000000,             
      test_timeout: 30000000,
      gas: 4707808,
    },
    bogong: {
      host: "118.31.18.101", 
      port: 8545,
      endpoint: 'http://118.31.18.101:8545',
      network_id: "3",       
      gas: 4.6e6,
      from: "0xD8D8cAB1a930cf68014B2da6CB0F932158377aA7",
      password: "123456",
    },
    ropsten: {
      host: "118.31.18.101", 
      port: 4045,
      endpoint: 'http://118.31.18.101:4045',
      network_id: "3",       
      gas: 4.6e6,
      from: "0xD8D8cAB1a930cf68014B2da6CB0F932158377aA7",
      password: "123456",
    }
    
  }
};