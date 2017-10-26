
pragma solidity ^0.4.11;

import "./usingAI.sol";

contract AIBusinessController {

    address public owner;
    address public registerAddr;
    address public billingAddr;
    uint8 public status = 3;
    mapping (uint256=>address) callbackAddrs;

    event EventTest(address _addr);
    event EventMessage(string _message);
    event EventFundsFrozen(bool _frozenFlag,uint256 _callID,bytes32 _id);
    event EventFundsDeduct(bool _deductFlag);
    event CallFundsFrozen(bytes32 id, address consumer, address proxy );
    
    function AIBusinessController(address _registerAddr) public 
    {
        owner = msg.sender;
        registerAddr = _registerAddr;
    }

    modifier onlyOwner() {
        if (msg.sender != owner) 
            revert();
        _;
    }

    function setRegisterAddr(address _addr) onlyOwner public {
        registerAddr = _addr;
    }

    function setBillingAddr(address _addr) onlyOwner public {
        billingAddr = _addr;
    }

    function callAI(bytes32 _id, address _consumer) public {
        callFundsFrozen(_id, _consumer, msg.sender);
        CallFundsFrozen(_id, _consumer, msg.sender);
    }
    
    function saveConsumer(uint256 _callID, address _proxy) {
        callbackAddrs[_callID] = _proxy;
    }

    function callbackAI(uint8 _status, uint256 _callID, string _result) {
        address proxy = callbackAddrs[_callID];
        usingAI(proxy).__callback(_callID, _result);
    }

    //"0x6d65000000000000000000000000000000000000000000000000000000000000","0x65330d2662b02d41e0cfc0d3928e133712508170"
    function callFundsFrozen(bytes32 _id, address _fromAddr, address _proxy) public returns (bool frozenFlag, uint256 callID) {
        bytes4 _sigrRegister = bytes4(keccak256("getBillingAddr(bytes32)"));
        bytes4 _sigBilling = bytes4(keccak256("billing(address)"));
        address _registerAddr = registerAddr;
        address _billingAddr;
        uint8 _status = 0;
        assembly {
            //get AI_Billing_addr
            mstore(0x0, _sigrRegister)
            mstore(0x4, _id)
            _status := call(3000000, _registerAddr, 0, 0x0, add(4,32), 0x0, 32)
            _billingAddr := mload(0x00)
            //FundsFrozen
            mstore(0x0, _sigBilling)
            mstore(0x4, _fromAddr)
            _status := call(3000000, _billingAddr, 0, 0x0, add(4,32), 0x0, 64)
            frozenFlag := mload(0x0)
            callID := mload(0x20)
        }
        status = _status;
        saveConsumer(callID, _proxy);
        EventFundsFrozen(frozenFlag,callID,_id);
    }

    //"0x6d65000000000000000000000000000000000000000000000000000000000000","1000",true
    function callFundsDeduct(bytes32 _id, uint256 _callID, bool _workerFlag, string _result) public returns (bool deductFlag) {
        bytes4 _sigRegister = bytes4(keccak256("getBillingAddr(bytes32)"));
        bytes4 _sigrDeduct = bytes4(keccak256("deductFee(uint256)"));
        bytes4 _sigUnDeduct = bytes4(keccak256("unfreezeToken(uint256)"));
        address _registerAddr = registerAddr;
        address _billingAddr;
        uint8 _status = 0;

        //deduct
        if (_workerFlag){
             assembly {
                //get AI_Billing_addr
                mstore(0x0, _sigRegister)
                mstore(0x4, _id)
                _status := call(3000000, _registerAddr, 0, 0x0, add(4,32), 0x0, 32)
                _billingAddr := mload(0x00)
                //FundsFrozen
                mstore(0x0, _sigrDeduct)
                mstore(0x4, _callID)
                _status := call(3000000, _billingAddr, 0, 0x0, add(4,32), 0x0, 32)
                deductFlag := mload(0x0)
            }
        //unDeduct
        } else {
            assembly {
                //get AI_Billing_addr
                mstore(0x0, _sigRegister)
                mstore(0x4, _id)
                _status := call(3000000, _registerAddr, 0, 0x0, add(4,32), 0x0, 32)
                _billingAddr := mload(0x00)
                //FundsFrozen
                mstore(0x0, _sigUnDeduct)
                mstore(0x4, _callID)
                _status := call(3000000, _billingAddr, 0, 0x0, add(4,32), 0x0, 32)
                deductFlag := mload(0x0)
            }
        }
        status = _status;
        callbackAI(status, _callID, _result);
        EventFundsDeduct(deductFlag);
    }

    //test start
    //"0x6d65000000000000000000000000000000000000000000000000000000000000","1000",true
    function callFundsDeductTest(bytes32 _id, uint256 _callID, bool _workerFlag) public returns (bool deductFlag) {
        bytes4 _sigrDeduct = bytes4(keccak256("deductFee(uint256)"));
        bytes4 _sigUnDeduct = bytes4(keccak256("unfreezeToken(uint256)"));
        address _billingAddr = billingAddr;
        uint8 _status = 0;

        //deduct
        if (_workerFlag){
             assembly {
                mstore(0x0, _sigrDeduct)
                mstore(0x4, _callID)
                _status := call(3000000, _billingAddr, 0, 0x0, add(4,32), 0x0, 32)
                deductFlag := mload(0x0)
            }
        //unDeduct
        } else {
            assembly {
                mstore(0x0, _sigUnDeduct)
                mstore(0x4, _callID)
                _status := call(3000000, _billingAddr, 0, 0x0, add(4,32), 0x0, 32)
                deductFlag := mload(0x0)
            }
        }
        status = _status;
        EventFundsDeduct(deductFlag);
    }

    function callFundsFrozenBillingTest(bytes32 _id, address _fromAddr) public returns (bool frozenFlag, uint256 callID) {
        bytes4 _sigBilling = bytes4(keccak256("billing(address)"));
        address _billingAddr = billingAddr;
        uint8 _status = 0;
        assembly {
            //FundsFrozen
            mstore(0x0, _sigBilling)
            mstore(0x4, _fromAddr)
            _status := call(3000000, _billingAddr, 0, 0x0, add(4,32), 0x0, 64)
            frozenFlag := mload(0x0)
            callID := mload(0x20)
        }
        status = _status;
        EventFundsFrozen(frozenFlag,callID,_id);
    }

    function callFundsFrozenRegisterTest(bytes32 _id, address _fromAddr) public returns (address addr) {
        bytes4 _sigRegister = bytes4(keccak256("getBillingAddr(bytes32)"));
        address _registerAddr = registerAddr;
        uint8 _status = 0;
        assembly {
            //FundsFrozen
            mstore(0x0, _sigRegister)
            mstore(0x4, _id)
            _status := call(3000000, _registerAddr, 0, 0x0, add(4,32), 0x0, 32)
            addr := mload(0x0)
        }
        status = _status;
        EventTest(addr);
    }
    //test end

}
