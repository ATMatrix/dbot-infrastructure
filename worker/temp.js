//AIBusinessController 
    var aiBusinessControllerAbi = fs.readFileSync('./build/AIBusinessController.abi');

    const aiBusinessControllerContract = web3.eth.contract(JSON.parse(aiBusinessControllerAbi));

    const aiBusinessController = aiBusinessControllerContract.at('0xde6430355bfabd038e93f6f5aa9ccbf18925fc84');

//callFundsFrozen冻结
    // var result = await aiBusinessController.callFundsFrozen.sendTransaction("0x6d65000000000000000000000000000000000000000000000000000000000000", "0xca9f427df31a1f5862968fad1fe98c0a9ee068c4", {
    //     from: "0xca9f427df31a1f5862968fad1fe98c0a9ee068c4",
    //     gas: 3000000
    // }, (err, res) => {
    //     if (err) {
    //         conosle.log(err);
    //     }
    //     console.log(res);
    // });

    // var eventFundsFrozen = aiBusinessController.EventFundsFrozen();

    // eventFundsFrozen.watch(function (error, result) {
    //     if (!error)
    //         console.log(result);
    // });

    //callFundsDeduct扣费
