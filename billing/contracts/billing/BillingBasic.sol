pragma solidity ^0.4.11;

contract BillingBasic {

    event Billing(
        uint callID,
        uint gas,
        address from
    );

    event GetPrice(
        uint callID,
        uint gas,
        address from,
        uint price
    );

    event LockPrice(
        uint callID,
        uint gas,
        address from
    );

    event TakeFee(
        uint callID,
        uint gas,
        address from
    );

    function billing(
        uint callID,
        address from,
        uint tokens
    ) 
        
        public
        returns (bool);

    function getPrice(
        uint callID
    ) 
        
        public
        returns (uint);

    function lockPrice(
        uint callID
    ) 
        public
        returns (bool);

    function takeFee(
        uint callID
    ) 
        public
        returns (bool);

    function unLockPrice(
      uint callID
    ) 
      public
      returns (bool);

}