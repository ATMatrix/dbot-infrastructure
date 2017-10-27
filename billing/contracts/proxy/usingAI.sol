pragma solidity ^0.4.11;

import "./AIBusinessController.sol";

contract usingAI {

  address public bizAddr;

  function addrResolver(address _bizAddr) {
      bizAddr = _bizAddr;
  }

  function callAI(bytes32 _id, string _arg) public {
      AIBusinessController(bizAddr).callAI(_id, msg.sender, _arg);
  }  

  function __callback(uint _callID, string _result) {
        __callback(_callID, _result, new bytes(0));
  }
    
  function __callback(uint _callID, string result, bytes proof) {
    
  }
  
}