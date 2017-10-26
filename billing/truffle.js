module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*", // Match any network id
      from: "0x3ae88fe370c39384fc16da2c9e768cf5d2495b48",
      password: "542500611",    
      biz: "0xbcfabf7467b9b07d02069cbeb9b7f853a38c245d",
      bill: "0xb2521dead511f2298d0e151b885d39e3c090bad9",
      att: "0xa36f97266211baf7f04fc762683d4f200d3eccc3",
      proxy: "0x73a6ba65f1d9878337634b6a6cb4b520e52d6c23",
      register: "0xd91be46ecaff8172e854efa58a955b31c2e7b1db",
      before_timeout: 30000000,             
      test_timeout: 30000000,
      gasLimit: 4.6e6,
    },
    bogong: {
      host: "118.31.18.101", 
      port: 4045,
      network_id: "*",        // Ethereum public network
      // optional config values
      gas: 4.6e6,
      from: "0xca9f427df31a1f5862968fad1fe98c0a9ee068c4",
      password: "123456",
      biz: "0x0b5b2d4680a0af2a58d281dd9f1af2b1eef09a55",
      bill: "0xc3ab6941ce8727848ed6427355820f757d2636fd",
      att: "0x9a1dbfea14453fd829c5a63d8999bf63461a69bd",
      proxy: "0x675780eb957c4c9ef95f1548f0acbcc48674dfef",
      register: "0x6363002ed476f63724787e2d0b91492d4112684b",
      gasLimit: 4.6e6,
    }
  }
};
