module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*", // Match any network id
      from: "0x3ae88fe370c39384fc16da2c9e768cf5d2495b48",
      password: "542500611",    
      biz: "0x9d388fa88efcf0caf7e20705366ae47401d00bfa",
      bill: "0xdbebbf88814614edd4d107d38018c480bb30b78a",
      att: "0x7c761d953c29778356695040beca305fe1dcc9cc",
      proxy: "0x9f1317ccadf789c599a5d0f2c9bcb439081c076b",
      register: "0xed215f7a6676d714130f107b88753f6d39fbf4bc",
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
      proxy: "0xf3407e4a09c86f423d07235138e29636391716a9",
      register: "0x6363002ed476f63724787e2d0b91492d4112684b",
      gasLimit: 4.6e6,
    }
  }
};
