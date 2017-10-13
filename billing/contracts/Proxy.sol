pragma solidity ^0.4.11;

import "./lib/Ownable.sol";
import "./lib/Util.sol";
import "./AIRegister.sol";
import "./billing/BillingBasic.sol";

contract Proxy is Ownable, Util {

    // event Forwarded(address indexed destination, uint value, bytes data);
    AIRegister private AIREGISTER;
    BillingBasic private bill;
    uint callID = 1000;

    event NewCallAI(string indexed aiNameEn, uint call_id, uint ai_type);

    function Proxy(address _owner, address _register) {
        owner = _owner;
        AIREGISTER = new AIRegister(_register);
    }


    // function forward(address destination, uint value, bytes data) onlyOwner {
    //     if(!destination.call.value(value)(data)) {
    //        revert();
    //     }
    //     Forwarded(destination, value, data);
    // }

    function callAI(string aiNameEn) payable returns (uint) {
        callID = getCallID();
        AI ai = AI(AIREGISTER.getAI(aiNameEn));
        require(isContract(ai.getBillingContract()));
        bill = BillingBasic(ai.getBillingContract());
        bill.billling(callID, msg.sender, 1000);
        NewCallAI(aiNameEn, callID, ai.getAIType());
        bill.takeFee(callID);
    }

    function getCallID() returns (uint) {
        callID++;
    }

}