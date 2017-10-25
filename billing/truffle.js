module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*", // Match any network id
      from: "0x3ae88fe370c39384fc16da2c9e768cf5d2495b48",
      password: "542500611",    
      proxy: "",
      bill: "0x5a58182f201e709945bdc5996e09ac7db7078605",
      att: "0x02a5ea454c2abc79411490b8c4a865e0f990162b",
      before_timeout: 30000000,             
      test_timeout: 30000000  
    },
    bogong: {
      host: "118.31.18.101", 
      port: 4045,
      network_id: "*",        // Ethereum public network
      // optional config values
      gas: 4.6e6,
      from: "0xca9f427df31a1f5862968fad1fe98c0a9ee068c4",
      password: "123456",
      proxy: "0xb4c00fef51c1ebe1142919ad51f6bd5c5a2acfc1",
      bill: "0x1717d04e6218eccb40fff197da350d0b3107a218",
      att: "0x3a6e07925cf6a1543b9591efd86c6d1e5b7a5c4e",
    }
  }
};
