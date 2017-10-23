module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    },
    bogong: {
      host: "118.31.18.101", // Random IP for example purposes (do not use)
      port: 4045,
      network_id: "*",        // Ethereum public network
      // optional config values
      gas: 4.6e6,
      from: "0x3ae88fe370c39384fc16da2c9e768cf5d2495b48"
      // gasPrice
      // from - default address to use for any transaction Truffle makes during migrations
    }
  }
};
