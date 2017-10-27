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
      biz: "0x95af2f96c08e9638d211e311f481a4244db5739c",
      bill: "0x8774df2541ab2d38145aee5399a6a6006fdbf845",
      att: "0x27a32873c4b21f7aef4c94480f377be6bb9da436",
      proxy: "0x760eadac72a0c1f3854a46aa6539d680aaaf51a6",
      register: "0xb037ce4ff025cd44d2eeb4b6e89f6e5a4e76c793",
      gasLimit: 4.6e6,
    }
  }
};
