# deployer
An ehtereum contracts deployer built on top of solc.js & web3.js.
## Installation
~~~shell
npm install sol.d
~~~
## Usage
~~~javascript
const Deployer = require('sol.d')
const deployer = new Deployer({
  srcDir: 'your/contracts/path', // The path to your solidity source code, default to './contract'
  endpoint: 'http://{host}:{port}', // The address of your ethereum network node
  form: '0x50972503af9f842d36237b4d59e3195eb55ed6e9', // Account used to deploy contracts
  password: '123456', // Password used to unlock the above account
  gas: 4700000, // Gas sent with transactions for deploying
}) // Note all options set here will be used as default parameters on method call, Or you can pass them later when call a method
~~~
Before deploy, you need to compile the source code:
~~~javascript
deployer.compile([
  'a.sol',
  'b.sol',
  'c.sol'
  ], { srcDir: 'your/contracts/path' })
~~~
Here the array holds all solidity source files' name, in dependent order. On the above case, `c.sol` depends on `b.sol` and `'a.sol'`. All dependencies must be specified here in properly order. The second argument of `deployer.compile` is optional, `srcDir` is a directory where to find your contracts, use default set when initialization if absent. After compile return a `true`, now you can deploy a specific contract just compiled:
~~~javascript
deployer.deploy('c.sol:contractName', {
  endpoint: '{host}:{port}',
  from: '0x50972503af9f842d36237b4d59e3195eb55e1234',
  password: '642213',
  gas: 3200000,
}).then(console.log, console.log)
~~~
Take care of format of the first argument passed, should be `'{solidityFileName}:{contractName}'`, `contractName` is name of the contract to be deployed and `solidityFileName` is name of solidity source code file where the contract defined in. As state before, the second object passed to `deployer.deploy` use to overwrite default parameter set on initialization.
