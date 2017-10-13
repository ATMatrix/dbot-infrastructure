pragma solidity ^0.4.11;

contract Util {

  function stringToBytes32(string memory source) returns (bytes32 result) {
      assembly {
          result := mload(add(source, 32))
      }
  }

  function b32(string memory source) returns (bytes32) {
    return stringToBytes32(source);
  }

  function isContract(address _addr) constant internal returns (bool) {
        if (_addr == 0) 
            return false;
        uint256 size;
        assembly {
            size := extcodesize(_addr)
        }
        return (size > 0);
  }
  
}