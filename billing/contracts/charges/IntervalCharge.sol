pragma solidity ^0.4.11;

import "../lib/Ownable.sol";
import "./Charge.sol";

contract IntervalCharge is Charge, Ownable {

    enum IntervalType {
        day,
        month,
        quarter,
        year
    }

    struct Token {
        uint256 start;
        uint256 end;
    } 

    uint256 amount;
    IntervalType intervalType;
    uint256 daysAfter = 0;
    mapping (address => Token) tokens;

    function IntervalCharge(uint256 _amount, uint256 _intervalType) {
        amount = _amount;
        intervalType = IntervalType(_intervalType);
        initDaysAfter();
    }

    function initDaysAfter() onlyOwner {
        if (intervalType == IntervalType.day) {
            daysAfter = 1;
          } else if (intervalType == IntervalType.month) {
            daysAfter = 30;
          } else if (intervalType == IntervalType.quarter) {
            daysAfter = 30 * 3;
          } else if (intervalType == IntervalType.year) {
            daysAfter = 365;
          }
    }

    function getPrice(uint256, address _from) onlyOwner returns (uint256) {
        return isFree(_from) ? 0 : amount;
    }

    function isFree(address _from) onlyOwner private returns (bool) {
        Token storage token = tokens[_from];
        return now > token.end ? false : true;
    }

    function resetToken(address _from) onlyOwner {
        tokens[_from] = Token({
              start: now,
              end : now + daysAfter * 1 days
        }); 
    }

}