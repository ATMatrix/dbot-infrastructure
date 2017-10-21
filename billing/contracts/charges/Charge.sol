pragma solidity ^0.4.11;

contract Charge {
  
  function getPrice(uint256 _callID, address _from) public returns (uint256);

  function resetToken(address _from) public;

}