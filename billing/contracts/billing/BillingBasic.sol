pragma solidity ^0.4.11;

contract BillingBasic {

    function billing(address _from, uint256 _callID) public returns (bool);

    function getPrice(address _from) public returns (uint256);

    function freezeToken(uint256 _callID) public returns (bool);

    function deductFee(uint256 _callID) public returns (bool);

    function unfreezeToken(uint256 _callID) public returns (bool);

}