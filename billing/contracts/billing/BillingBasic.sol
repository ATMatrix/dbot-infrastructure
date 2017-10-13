pragma solidity ^0.4.11;

contract BillingBasic {

    event Billing(
        uint _callID,
        uint _gas,
        address _from
    );

    event GetPrice(
        uint _callID,
        uint _gas,
        address _from,
        uint _price
    );

    event LockPrice(
        uint _callID,
        uint _gas,
        address _from
    );

    event TakeFee(
        uint _callID,
        uint _gas,
        address _from
    );

    function billing(
        uint _callID,
        address _from,
        uint _tokens
    )
        public
        returns (bool);

    function getPrice(
        uint _callID
    ) 
        public
        returns (uint);

    function lockPrice(
        uint _callID
    ) 
        public
        returns (bool);

    function takeFee(
        uint _callID
    ) 
        public
        returns (bool);

    function unLockPrice(
      uint _callID
    ) 
      public
      returns (bool);

}