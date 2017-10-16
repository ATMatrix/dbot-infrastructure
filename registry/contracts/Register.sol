pragma solidity ^0.4.0;


contract Register {

    address public owner;
    mapping(bytes32 => address) ai;

    event EventRegister(bytes32 aiName, address billingAddr);
    event EventDelete(bytes32 aiName);
    event EventSet(bytes32 aiName, address billingAddr);

    function Register(){
        owner = msg.sender;
    }

    modifier onlyOwner() {
        if(msg.sender != owner) throw;
        _;
    }

    function register(bytes32 aiName, address billingAddr) onlyOwner {
        ai[aiName] = billingAddr;
        EventRegister(aiName, billingAddr);
    }

    function getBillingAddr(bytes32 aiName) constant returns (address) {
        return ai[aiName];
    }

    function deleteAI(bytes32 aiName) onlyOwner {
        delete ai[aiName];
        EventDelete(aiName);
    }

    function setBillingAddr(bytes32 aiName, address billingAddr) onlyOwner {
        ai[aiName] = billingAddr;
        EventSet(aiName, billingAddr);
    }

    function isRegistered(bytes32 aiName) constant returns (bool){
        if(ai[aiName] == 0x0)return false;
        return true;
    }

}
