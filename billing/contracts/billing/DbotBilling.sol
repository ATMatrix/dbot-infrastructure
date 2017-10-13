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

    address attToken;
    address charge;
    BillingType billingType = BillingType.Free;
    uint arg0;
    uint arg1;
    mapping(uint => Order) orders; 

    modifier notCalled(uint _callID) {
      if (orders[_callID].from != 0) 
          revert();
      _;
    }

    modifier called(uint _callID) {
      if (orders[_callID].from == 0) 
          revert();
      _;
    }
    
    function DbotBilling(address _ATT, uint _billingType, uint _arg0, uint _arg1) {
        attToken = _ATT;
        billingType = BillingType(_billingType);
        arg0 = _arg0;
        arg1 = _arg1;
        initCharge();
    }

    function initCharge() internal {
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

    function billing(uint _callID, address _from, uint _tokens)
        onlyOwner
        notCalled(_callID)
        public
        returns (bool isSucc) 
    {
        orders[_callID] = Order({
            from : _from,
            tokens : _tokens,
            fee : 0,
            isFrezon : false,
            isPaid : false
        });
        uint fee = getPrice(_callID);
        if (fee == 0) {
            return true;
        }
        orders[_callID].fee = fee;
        isSucc = lockPrice(_callID);
        if (!isSucc)
            revert();
        Billing(_callID, msg.gas, msg.sender);
        return isSucc;
    } 

    function getPrice(uint _callID)
        onlyOwner
        called(_callID)
        public
        returns (uint _fee)
    {
        require(isContract(charge));
        Order storage o = orders[_callID];
        _fee = Charge(charge).getPrice(_callID, o.from);
        require(o.tokens >= _fee);
        GetPrice(_callID, msg.gas, msg.sender, _fee);
    }

    function lockPrice(uint _callID)
        onlyOwner
        called(_callID)
        public
        returns (bool isSucc)
    {
        Order storage o = orders[_callID];
        address from = o.from;
        uint tokens = o.tokens;
        uint allowance = ERC20(attToken).allowance(from, owner);
        require(allowance >= tokens);
        isSucc = ERC20(attToken).transferFrom(from, owner, tokens);
        if (!isSucc) {
            revert();
        } else {
            o.isFrezon = true;
        }
        LockPrice(_callID, msg.gas, msg.sender);
        return isSucc;
    }

    function takeFee(uint _callID)
        onlyOwner
        called(_callID)
        public
        returns (bool isSucc)
    {
        Order storage o = orders[_callID];
        if (o.fee == 0) {
            TakeFee(_callID, o.fee, o.from);
            return true;
        }
        require(o.isFrezon == true);
        require(o.isPaid == false);
        address from = o.from;
        require(o.tokens >= o.fee);
        uint refund = o.tokens - o.fee;
        ERC20(attToken).approve(owner, refund);
        isSucc = ERC20(attToken).transferFrom(owner, from, refund);
        if (isSucc) {
            o.isFrezon = false;
            o.isPaid = true;
            Charge(charge).resetToken(o.from);
            TakeFee(_callID, o.fee, o.from);
        } else {
            revert();
        }
        return isSucc;
    }
    
    function unLockPrice(uint _callID)
        onlyOwner
        called(_callID)
        public
        returns (bool isSucc)
    {
        Order storage o = orders[_callID];
        if (o.tokens == 0) {
            return true;
        }
        require(o.isFrezon == true);
        require(o.isPaid == false);
        address from = o.from;
        uint tokens = o.tokens;
        ERC20(attToken).approve(owner, tokens);
        isSucc = ERC20(attToken).transferFrom(owner, from, tokens);
        if (isSucc) {
            o.isFrezon = false;
            o.isPaid = false;
            TakeFee(_callID, o.fee, o.from);
        } else {
            revert();
        }
        return isSucc;
    }
    
}