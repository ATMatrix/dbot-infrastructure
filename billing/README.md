# billing Dbot的计费合约

The billing contract for Dbot<br/>

**Brain map**

![billing](https://github.com/ATMatrix/dbot-infrastructure/blob/master/billing/pic/billing.jpg)  


## Deploy
```Bash
truffle deploy --network bogong
```

## Test for billing
```Bash
truffle test --network development
```

## Dessert for full test
```Bash
npm i
geth                 //create at least two accouts and config deploy owner in truffle.js  
truffle deploy --network development
```
copy the contract address to truffle.js
```javascript
development: {
      host: "localhost",
      port: 8545,
      network_id: "*", // Match any network id
      from: "0x3ae88fe370c39384fc16da2c9e768cf5d2495b48",           //account[0]
      password: "542500611",        
      biz: "0xbcfabf7467b9b07d02069cbeb9b7f853a38c245d",            //AIBusinessController
      bill: "0xb2521dead511f2298d0e151b885d39e3c090bad9",           //DbotBilling
      att: "0xa36f97266211baf7f04fc762683d4f200d3eccc3",            //ATT
      proxy: "0x73a6ba65f1d9878337634b6a6cb4b520e52d6c23",          //xiaoi
      register: "0xd91be46ecaff8172e854efa58a955b31c2e7b1db",       //Register
      before_timeout: 30000000,             
      test_timeout: 30000000,
      gasLimit: 4.6e6,
    },
```

```Bash
cd /scripts && node dessert.js
```
