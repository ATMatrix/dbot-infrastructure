pragma solidity ^0.4.8;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/charges/TimesCharge.sol";

contract TestTimesCharge {

    function testGetPriceWithNewTimesCharge() {
        uint amount = 99;
        uint freeTimes = 100;
        TimesCharge timesCharge = new TimesCharge(amount, freeTimes);
        uint expected = 0;
        address from = msg.sender;
        for (var index = 0; index < freeTimes; index++) {
            Assert.equal(timesCharge.getPrice(0, from), expected, "Price should be zero");
            timesCharge.resetToken(from);
        }
        expected = amount;
        Assert.equal(timesCharge.getPrice(0, from), expected, "Price should be amout");
        timesCharge.resetToken(from);
    }

}
    