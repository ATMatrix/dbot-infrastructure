pragma solidity ^0.4.8;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/charges/TimesCharge.sol";

contract TestTimesCharge {

    function testGetPriceWithNewTimesCharge() {
        TimesCharge timesCharge = new TimesCharge(99,1);
        uint expected = 0;
        address from = msg.sender;
        Assert.equal(timesCharge.getPrice(0, from), expected, "Price should be zero");
        timesCharge.resetToken(from);
        expected = 99;
        Assert.equal(timesCharge.getPrice(0, from), expected, "Price should be amout");
        timesCharge.resetToken(from);
    }

}
    