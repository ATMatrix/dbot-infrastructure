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
      biz: "0x7c4594bca5b9050086d7735f7f74d56a260f4b55",
      bill: "0x0c7e3c26f63e31be79eeb1af84d9492b46af365e",
      att: "0x2cc193739b74c03bbb087e6a982e31ff82eb8f31",
      proxy: "0x9fee9bd10e2282d99c4e80d576012e157f9641bb",
      register: "0x80c2d746038d83173cabc2084f3b9d532c9590a1",
      gasLimit: 4.6e6,
    }
  }
};