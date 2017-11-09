pragma solidity ^0.4.11;

import "../lib/Ownable.sol";
import "./Charge.sol";

contract TimesCharge is Charge, Ownable {
    
    struct Token {
      uint256 callTimes;
    }

    uint256 amount;
    uint256 freeTimes;

    mapping (address => Token) public tokens;

    function TimesCharge(uint256 _amount, uint256 _freeTimes) {
        amount = _amount;
        freeTimes = _freeTimes;
    }

    function getPrice(uint256, address _from) onlyOwner public returns (uint256) {
        if (freeTimes <= 0) {
          return amount;
        } else {
          return isFree(_from) ? 0 : amount;
        }
    }

    function isFree(address _from) onlyOwner public returns (bool) {
        Token storage token = tokens[_from];
        return token.callTimes >= freeTimes ? false : true;
    }

    function resetToken(address _from) onlyOwner public {
        tokens[_from].callTimes++;
    }
    
}