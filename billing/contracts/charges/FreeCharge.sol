pragma solidity ^0.4.11;

import "../lib/Ownable.sol";
import "./Charge.sol";

contract FreeCharge is Charge, Ownable {

    function getPrice(uint, address) onlyOwner returns (uint) {
      return 0;
    }

    function resetToken(address) {
        
    }

}