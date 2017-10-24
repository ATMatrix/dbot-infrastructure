pragma solidity ^0.4.8;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/charges/FreeCharge.sol";

contract TestFreeCharge {

    function testGetPriceWithNewFreeCharge() {
        FreeCharge freeCharge = new FreeCharge();
        
        uint expected = 0;

        Assert.equal(freeCharge.getPrice(0, 0), expected, "Price should be zero");
    }

}