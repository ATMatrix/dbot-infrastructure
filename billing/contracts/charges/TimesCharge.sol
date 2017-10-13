pragma solidity ^0.4.11;

import "../lib/Ownable.sol";
import "./Charge.sol";

contract TimesCharge is Charge, Ownable {
    
    struct Token {
      uint256 callTimes;
    }

    uint256 amount;
    uint256 freeTimes;

    mapping (address => Token) tokens;

    function TimesCharge(uint256 _amount, uint256 _freeTimes) onlyOwner {
        amount = _amount;
        freeTimes = _freeTimes;
    }

    function getPrice(uint256 callID, address from) onlyOwner returns (uint256) {
        if (freeTimes <= 0) {
          return amount;
        } else {
          return isFree(from) ? 0 : amount;
        }
    }

    function isFree(address from) onlyOwner returns (bool) {
        Token storage token = tokens[from];
        return token.callTimes++ >= freeTimes ? false : true;
    }

    function resetToken(address) {
       
    }

}