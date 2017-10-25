pragma solidity ^0.4.11;

contract SaveData {
    string aiData;
    address public owner;

    function SaveData() {
      aiData = '';
      owner = msg.sender;
    }

    modifier onlyOwner() {
        if (msg.sender != owner) 
            revert();
        _;
    }

    function setData(string data) public {
      aiData = data;
    }

    function getData() public constant returns (string) {
      return aiData;
    }
}