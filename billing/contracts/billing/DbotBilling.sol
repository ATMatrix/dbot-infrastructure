pragma solidity ^0.4.11;

import "./BillingBasic.sol";
import "../lib/Ownable.sol";
import "../lib/Util.sol";
import "../lib/ERC20.sol";
import "../charges/Charge.sol";
import "../charges/FreeCharge.sol";
import "../charges/TimesCharge.sol";
import "../charges/IntervalCharge.sol";


contract DbotBilling is BillingBasic, Ownable, Util {

    enum BillingType {
        Free,
        Times,
        Interval,
        Other
    }

    struct Order {
        address from;
        uint tokens;
        uint fee;
        bool isFrezon;
        bool isPaid;
    }

    ERC20 attToken;
    Charge charge;
    BillingType billingType = BillingType.Free;
    uint arg0;
    uint arg1;
    mapping(uint => Order) orders; 

    modifier notCalled(uint callID) {
      if (orders[callID].from != 0) 
          revert();
      _;
    }

    modifier called(uint callID) {
      if (orders[callID].from == 0) 
          revert();
      _;
    }
    
    function DbotBilling(address _ATT, uint _billingType, uint _arg0, uint _arg1) {
        attToken = ERC20(_ATT);
        billingType = BillingType(_billingType);
        arg0 = _arg0;
        arg1 = _arg1;
        initCharge();
    }

    function initCharge() {
        if ( billingType == BillingType.Free ) {
            charge = new FreeCharge();
        } else if ( billingType == BillingType.Times ) {
            //arg0:每次消费ATT数量
            //arg1:免费次数
            charge = new TimesCharge(arg0, arg1);
        } else if ( billingType == BillingType.Interval ) {
            //arg0:每段时间消费ATT数量
            //arg1:分段类型
            charge = new IntervalCharge(arg0, arg1);
        } else if ( billingType == BillingType.Other ) {
            revert();
        } else {
            revert();
        }
    }

    function billing(uint callID, address from, uint tokens)
        onlyOwner
        notCalled(callID)
        public
        returns (bool isSucc) 
    {
        orders[callID] = Order({
            from : from,
            tokens : tokens,
            fee : 0,
            isFrezon : false,
            isPaid : false
        });
        uint fee = getPrice(callID);
        if (fee == 0) {
            return true;
        }
        orders[callID].fee = fee;
        isSucc = lockPrice(callID);
        if (!isSucc)
            revert();
        Billing(callID, msg.gas, msg.sender);
        return isSucc;
    } 

    function getPrice(uint callID)
        onlyOwner
        called(callID)
        public
        returns (uint fee)
    {
        require(isContract(charge));
        Order storage o = orders[callID];
        fee = charge.getPrice(callID, o.from);
        require(o.tokens >= fee);
        GetPrice(callID, msg.gas, msg.sender, fee);
        return fee;
    }

    function lockPrice(uint callID)
        onlyOwner
        called(callID)
        public
        returns (bool isSucc)
    {
        Order storage o = orders[callID];
        address from = o.from;
        uint tokens = o.tokens;
        isSucc = attToken.transferFrom(from, owner, tokens);
        if (!isSucc) {
            revert();
        } else {
            o.isFrezon = true;
        }
        LockPrice(callID, msg.gas, msg.sender);
        return isSucc;
    }

    function takeFee(uint callID)
        onlyOwner
        called(callID)
        public
        returns (bool isSucc)
    {
        Order storage o = orders[callID];
        if (o.fee == 0) {
            TakeFee(callID, o.fee, o.from);
            return true;
        }
        require(o.isFrezon == true);
        require(o.isPaid == false);
        address from = o.from;
        require(o.tokens >= o.fee);
        uint refund = o.tokens - o.fee;
        isSucc = attToken.transferFrom(owner, from, refund);
        if (isSucc) {
            o.isFrezon = false;
            o.isPaid = true;
            charge.resetToken(o.from);
            TakeFee(callID, o.fee, o.from);
        } else {
            revert();
        }
        return isSucc;
    }
    
    function unLockPrice(uint callID)
        onlyOwner
        called(callID)
        public
        returns (bool isSucc)
    {
        Order storage o = orders[callID];
        if (o.tokens == 0) {
            return true;
        }
        require(o.isFrezon == true);
        require(o.isPaid == false);
        address from = o.from;
        uint tokens = o.tokens;
        isSucc = attToken.transferFrom(owner, from, tokens);
        if (isSucc) {
            o.isFrezon = false;
            o.isPaid = false;
            charge.resetToken(o.from);
            TakeFee(callID, o.fee, o.from);
        } else {
            revert();
        }
        return isSucc;
    }
    

    function () public payable {

    }

}