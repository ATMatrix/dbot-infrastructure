pragma solidity ^0.4.11;

contract BillingBasic {

    function billing(
        uint _callID,
        address _from
    )
        public
        returns (bool);

    function getPrice(
        uint _callID, 
        address _from
    ) 
        public
        returns (uint);

    function lockToken(
        uint _callID
    ) 
        returns (bool);

    function takeFee(
        uint _callID
    ) 
        returns (bool);

    function unLockPrice(
        uint _callID
    ) 
        returns (bool);

}