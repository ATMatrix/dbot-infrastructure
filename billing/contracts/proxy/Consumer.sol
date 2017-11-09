
pragma solidity ^0.4.11;

import "./usingAI.sol";

contract Consumer is usingAI {

  event newCallback(uint _callID, string _result);

  function Consumer(address bizAddr) {
      addrResolver(bizAddr);
  }

  function __callback(uint _callID, string _result) {
      newCallback(_callID, _result);
  }
  
}
