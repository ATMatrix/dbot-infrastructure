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

```Bash
cd /scripts && node dessert.js
```
