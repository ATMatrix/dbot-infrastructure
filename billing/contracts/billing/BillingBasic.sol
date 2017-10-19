pragma solidity ^0.4.11;

contract BillingBasic {

    function billing(
        address _from
    )
        public
        returns (bool isSucc, uint256 callID);

    function getPrice(
        uint256 _callID, 
        address _from
    ) 
        public
        returns (uint256);

    function freezeToken(
        uint256 _callID
    ) 
        returns (bool);

    function deductFee(
        uint256 _callID
    ) 
        returns (bool);

    function unfreezeToken(
        uint256 _callID
    ) 
        returns (bool);

}