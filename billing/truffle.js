module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*", // Match any network id
      from: "0xdf08f82de32b8d460adbe8d72043e3a7e25a3b39",
      password: "2bdd21761a483f71054e14f5b827213567971c676928d9a1808cbfa4b7501200"
    },
    bogong: {
      host: "118.31.18.101", 
      port: 4045,
      network_id: "*",        // Ethereum public network
      // optional config values
      gas: 4.6e6,
      from: "0xca9f427df31a1f5862968fad1fe98c0a9ee068c4",
      password: "123456"
    }
  }
};
