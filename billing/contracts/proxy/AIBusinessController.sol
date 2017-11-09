
pragma solidity ^0.4.11;

import "./usingAI.sol";
import "../billing/BillingBasic.sol";

contract AIBusinessController {

    address public owner;
    address public registerAddr;
    address public billingAddr;
    uint8 public status = 3;
    uint256 public callAIID = 1000;
    mapping (uint256=>address) callbackAddrs;

    event EventTest(address _addr);
    event EventMessage(string _message);
    event EventFundsFrozen(bool _frozenFlag,uint256 _callID,bytes32 _id, string arg);
    event EventFundsDeduct(bytes32 _id, uint256 _callID, bool _deductFlag);
    event EventCallFundsFrozen(bytes32 id, address consumer, address proxy, uint _callAIID);
    event EventWorker(bytes32 _id, uint256 _callID, bool _workerFlag);

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

    function callAI(bytes32 _id, address _consumer, string _arg) public {
        uint256 _callAIID = callAIID;
        saveConsumer(_callAIID, msg.sender);
        callFundsFrozen(_id, _consumer, _callAIID, _arg);
        EventCallFundsFrozen(_id, _consumer, msg.sender, _callAIID);
        callAIID++;
    }
    
    function saveConsumer(uint256 _callID, address _proxy) {
        callbackAddrs[_callID] = _proxy;
    }

    function callbackAI(uint8 _status, uint256 _callID, string _result) {
        address proxy = callbackAddrs[_callID];
        usingAI(proxy).__callback(_callID, _result);
    }

    //"0x6d65000000000000000000000000000000000000000000000000000000000000","0x65330d2662b02d41e0cfc0d3928e133712508170"
    function callFundsFrozen(bytes32 _id, address _fromAddr, uint256 _callAIID, string _arg) public returns (bool frozenFlag, uint256 callID) {
        bytes4 _sigrRegister = bytes4(keccak256("getBillingAddr(bytes32)"));
        bytes4 _sigBilling = bytes4(keccak256("billing(address,uint256)"));
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
            // mstore(0x0, _sigBilling)
            // mstore(0x4, _fromAddr)
            // mstore(0x24, _callAIID)
            // _status := call(3000000, _billingAddr, 0, 0x0, add(4,64), 0x0, 32)
            // frozenFlag := mload(0x0)
        }
        frozenFlag = BillingBasic(_billingAddr).billing(_fromAddr, _callAIID);
        status = _status;
        callID = _callAIID;
        EventFundsFrozen(frozenFlag, callID, _id, _arg);
    }

    //"0x6d65000000000000000000000000000000000000000000000000000000000000","1000",true
    function callFundsDeduct(bytes32 _id, uint256 _callID, bool _workerFlag, string _result) public returns (bool deductFlag) {
        EventWorker(_id, _callID, _workerFlag);
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
        EventFundsDeduct(_id, _callID, deductFlag);
        callbackAI(status, _callID, _result);
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
        EventFundsDeduct(_id, _callID, deductFlag);
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
        EventFundsFrozen(frozenFlag,callID,_id,"");
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
