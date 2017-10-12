pragma solidity ^0.4.0;


contract Register {

    address public owner;
    mapping(bytes32 => address) ai;

    event EventRegister(bytes32 AI_id, address price_addr);
    event EventDelete(bytes32 AI_id);
    event EventSet(bytes32 AI_id, address price_addr);

    function Register(){
        owner = msg.sender;
    }

    modifier onlyOwner() {
        if(msg.sender != owner) throw;
        _;
    }

    function register(bytes32 AI_id, address price_addr) onlyOwner {
        ai[AI_id] = price_addr;
        EventRegister(AI_id, price_addr);
    }

    function get_price_addr(bytes32 AI_id) constant returns (address) {
        return ai[AI_id];
    }

    function deleteAI(bytes32 AI_id) onlyOwner {
        delete ai[AI_id];
        EventDelete(AI_id);
    }

    function set_price_addr(bytes32 AI_id, address price_addr) onlyOwner {
        ai[AI_id] = price_addr;
        EventSet(AI_id, price_addr);
    }

    function isRegistered(bytes32 AI_id) constant returns (bool){
        if(ai[AI_id] == 0x0)return false;
        return true;
    }

}
