
pragma solidity ^0.4.11;

import "./usingAI.sol";

contract consumer is usingAI {

  event newCallback(uint _callID, string _result);

  function consumer(address bizAddr) {
      addrResolver(bizAddr);
  }

  function __callback(uint _callID, string _result) {
      newCallback(_callID, _result);
  }
  
}
