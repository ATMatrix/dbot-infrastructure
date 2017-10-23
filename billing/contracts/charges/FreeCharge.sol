pragma solidity ^0.4.11;

import "../lib/Ownable.sol";
import "./Charge.sol";

contract FreeCharge is Charge, Ownable {

    function getPrice(uint256, address) onlyOwner returns (uint256) {
       return 0;
    }

    function resetToken(address) onlyOwner {
        
    }

}