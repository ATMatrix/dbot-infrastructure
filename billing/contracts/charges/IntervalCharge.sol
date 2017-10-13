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
        uint start;
        uint end;
    } 

    uint amount;
    IntervalType intervalType;
    uint daysAfter = 0;
    mapping (address => Token) tokens;

    function IntervalCharge(uint _amount, uint _intervalType) {
        amount = _amount;
        intervalType = IntervalType(_intervalType);
        initDaysAfter();
    }

    function initDaysAfter() {
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

    function getPrice(uint, address _from) onlyOwner returns (uint) {
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