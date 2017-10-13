pragma solidity ^0.4.11;

import "./lib/Ownable.sol";
import "./lib/Util.sol";

contract AI {

      uint public aiID;
      string public nameCn;
      string public nameEn;
      string public industryType;
      uint public aiType;
      string public company;
      string public billingType;
      string public billingExpression;
      string public isConsensus;
      string public QPS;
      string public apiUrl;
      string public methedHash;
      address public billingContract;
      string public dbotIP;

  function AI(
      uint _aiID,
      string _nameCn,
      string _nameEn,
      string _industryType,
      uint _aiType,
      string _company,
      string _billingType,
      string _billingExpression,
      string _isConsensus,
      string _QPS,
      string _apiUrl,
      string _methedHash,
      address _billingContract,
      string _dbotIP
  ) {
      aiID = _aiID;
      nameCn = _nameCn;
      nameEn = _nameEn;
      industryType = _industryType;
      aiType = _aiType;
      company = _company;
      billingType = _billingType;
      billingExpression = _billingExpression;
      isConsensus = _isConsensus;
      QPS = _QPS;
      apiUrl = _apiUrl;
      methedHash = _methedHash;
      billingContract = _billingContract;
      dbotIP = _dbotIP;
  }

  function getBillingContract() public returns (address) {
      return billingContract;
  }

  function getAIType() public returns (uint) {
      return aiType;
  }

}

contract AIRegister is Ownable, Util {

  AI[] ais;

  mapping (bytes32 => uint) ainameToIDMap;

  function AIRegister(address _owner) {
      owner = _owner;
      ais.length = 1;
  }

  function register(string aiNameEn, AI ai) onlyOwner internal {
      uint aiID = ais.length;
      ainameToIDMap[b32(aiNameEn)] = aiID;
      ais.push(ai);
  }

  function getAI(string aiNameEn) public returns (address) {
      uint aiID = ainameToIDMap[b32(aiNameEn)];
      return ais[aiID];
  }

//   function unregister(uint aiId) onlyOwner internal {
      
//   }

//   function isRegistered(uint aiId) internal {

//   }

//   function changeContrcatAddress(uint aiId, AI ai) onlyOwner internal {

//   }

}