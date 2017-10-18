pragma solidity ^0.4.11;

import "./BillingBasic.sol";
import "../lib/Ownable.sol";
import "../lib/Util.sol";
import "../lib/ERC20.sol";
import "../charges/Charge.sol";
import "../charges/FreeCharge.sol";
import "../charges/TimesCharge.sol";
import "../charges/IntervalCharge.sol";
import "../lib/SafeMath.sol";

contract DbotBilling is BillingBasic, Ownable {
    using SafeMath for uint256;

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
    address beneficiary;
    address charge;
    BillingType billingType = BillingType.Free;
    uint arg0;
    uint arg1;
    uint profitTokens = 0;
    uint callID = 1000;
    mapping(uint => Order) orders; 

    event Billing(uint _callID, uint _gas, address _from);
    event GetPrice(uint _callID, uint _gas, address _from, uint _price);
    event FreezeToken(uint _callID, uint _gas, address _from, uint _tokens);
    event DeductFee(uint _callID, uint _gas,address _from, uint _fee);
    event UnfreezeToken(uint _callID, uint _gas,address _from, uint _fee);
    event Allowance(address _from, address _spender, uint _value);
    event ProfitTokensWithdrawn(address indexed _beneficiary, uint256 _amount);

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
    
    function DbotBilling(address _att, address _beneficiary,  uint _billingType, uint _arg0, uint _arg1) {
        attToken = _att;
        beneficiary = _beneficiary;
        billingType = BillingType(_billingType);
        arg0 = _arg0;
        arg1 = _arg1;
        initCharge();
    }

    function initCharge() internal {
        if ( billingType == BillingType.Free ) {
            charge = new FreeCharge();
        } else if ( billingType == BillingType.Times ) {
            charge = new TimesCharge(arg0, arg1);               //arg0:每次消费ATT数量  arg1:免费次数
        } else if ( billingType == BillingType.Interval ) {
            charge = new IntervalCharge(arg0, arg1);            //arg0:每段时间消费ATT数量  arg1:分段类型
        } else if ( billingType == BillingType.Other ) {
            revert();
        } else {
            revert();
        }
    }

    function billing(address _from)
        onlyOwner
        public
        returns (bool isSucc, uint _callID) 
    {
        callID++;
        getPrice(callID, _from);
        isSucc = freezeToken(callID);
        if (!isSucc)
            revert();
        Billing(callID, msg.gas, msg.sender);
        _callID = callID;
        return (isSucc, _callID);
    } 

    function getPrice(uint _callID, address _from)
        onlyOwner
        notCalled(_callID)
        public
        returns (uint _fee)
    {
        orders[_callID] = Order({
            from : _from,
            tokens : 0,
            fee : 0,
            isFrezon : false,
            isPaid : false
        });
        Order storage o = orders[_callID];
        _fee = Charge(charge).getPrice(_callID, o.from);
        o.fee = _fee;
        GetPrice(_callID, msg.gas, msg.sender, _fee);
    }

    function freezeToken(uint _callID)
        onlyOwner
        called(_callID)
        public
        returns (bool isSucc)
    {
        Order storage o = orders[_callID];
        require(o.isFrezon == false);
        require(o.isPaid == false);
        address from = o.from;
        uint fee = o.fee;
        uint tokens = onAllowance(from);
        Allowance(from, address(this), tokens);
        require(tokens >= fee);
        o.tokens = tokens;
        if ( billingType == BillingType.Interval ) {
            tokens = fee;
        }
        isSucc = ERC20(attToken).transferFrom(from, address(this), tokens);
        if (!isSucc) {
            revert();
        } else {
            if ( billingType == BillingType.Interval ) {
                o.isFrezon = false;
                o.isPaid = true;
                profitTokens = profitTokens.add(tokens);
                DeductFee(_callID, msg.gas, o.from, tokens);
            } else {
                o.isFrezon = true;
            }
            Charge(charge).resetToken(o.from);
        }
        FreezeToken(_callID, msg.gas, msg.sender, tokens);
        return isSucc;
    }

    function deductFee(uint _callID)
        onlyOwner
        called(_callID)
        public
        returns (bool isSucc)
    {
        Order storage o = orders[_callID];
        if (billingType == BillingType.Interval) {
            if (o.isPaid) {
                return true;
            } else {
                return false;
            }
        } 
        require(o.isFrezon == true);
        require(o.isPaid == false);
        address from = o.from;
        require(o.tokens >= o.fee);
        uint refund = o.tokens - o.fee;
        isSucc = ERC20(attToken).transfer(from, refund);
        if (isSucc) {
            o.isFrezon = false;
            o.isPaid = true;
            profitTokens = profitTokens.add(o.fee);
            DeductFee(_callID, msg.gas, o.from, o.fee);
        } else {
            revert();
        }
        return isSucc;
    }
    
    function unfreezeToken(uint _callID)
        onlyOwner
        called(_callID)
        public
        returns (bool isSucc)
    {
        Order storage o = orders[_callID];
        if (billingType == BillingType.Interval) {
            if (!o.isFrezon) {
                return true;
            } else {
                return false;
            }
        }
        require(o.isFrezon == true);
        require(o.isPaid == false);
        address from = o.from;
        uint tokens = o.tokens;
        isSucc = ERC20(attToken).transfer(from, tokens);
        if (isSucc) {
            o.isFrezon = false;
            o.isPaid = false;
            UnfreezeToken(_callID, msg.gas, o.from, tokens);
        } else {
            revert();
        }
        return isSucc;
    }

    function onAllowance(address _from)
        onlyOwner
        public
        returns (uint) 
    {
        return ERC20(attToken).allowance(_from, address(this));
    }

    function withdrawProfit(uint _amount) 
        onlyOwner
        public
        returns(bool isSucc) 
    {
        require(_amount <= profitTokens);
        uint256 balance = ERC20(attToken).balanceOf(address(this));
        require(profitTokens <= balance);
        isSucc = ERC20(attToken).transfer(beneficiary, _amount);
        if (isSucc) {
            profitTokens = profitTokens.sub(_amount);
        }else {
            revert();
        }
        ProfitTokensWithdrawn(beneficiary, _amount);
        return isSucc;
    }
    
}