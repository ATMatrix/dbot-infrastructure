pragma solidity ^0.4.11;

contract Register {
    address public owner;
    mapping(bytes32 => address) ai;
    event EventRegister(bytes32 aiName, address billingAddr);
    event EventDelete(bytes32 aiName);
    event EventSet(bytes32 aiName, address billingAddr);

    function Register() public {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        if (msg.sender != owner) 
            revert();
        _;
    }

    function register(bytes32 aiName, address billingAddr) public onlyOwner {
        ai[aiName] = billingAddr;
        EventRegister(aiName, billingAddr);
    }

    function getBillingAddr(bytes32 aiName) public constant returns (address) {
        return ai[aiName];
    }

    function deleteAI(bytes32 aiName) public onlyOwner {
        delete ai[aiName];
        EventDelete(aiName);
    }

    function setBillingAddr(bytes32 aiName, address billingAddr) public onlyOwner {
        ai[aiName] = billingAddr;
        EventSet(aiName, billingAddr);
    }

    function isRegistered(bytes32 aiName) public constant returns (bool) {
        if (ai[aiName] == 0x0)
            return false;
        return true;
    }

}