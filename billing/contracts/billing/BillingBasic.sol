pragma solidity ^0.4.11;

contract BillingBasic {

    function billing(
        address _from
    )
        public
        returns (bool isSucc, uint callID);

    function getPrice(
        uint _callID, 
        address _from
    ) 
        public
        returns (uint);

    function freezeToken(
        uint _callID
    ) 
        returns (bool);

    function deductFee(
        uint _callID
    ) 
        returns (bool);

    function unfreezeToken(
        uint _callID
    ) 
        returns (bool);

}