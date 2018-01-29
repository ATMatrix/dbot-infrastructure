pragma solidity ^0.4.11;

import "./BillingBasic.sol";
import "../lib/Ownable.sol";
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
        uint256 fee;
        bool isFrezon;
        bool isPaid;
    }
    
    address public attToken;
    address public beneficiary;
    address public charge;
    address public controller;
    uint256 public profigTokens = 0;
    mapping(uint256 => Order) public orders; 
    BillingType billingType = BillingType.Free;
    uint256 arg0;
    uint256 arg1;

    event Billing(uint256 _callID, uint256 _gas, address _from);
    event GetPrice(address _from, uint256 _price);
    event FreezeToken(uint256 _callID, uint256 _gas, address _from, uint256 _tokens);
    event DeductFee(uint256 _callID, uint256 _gas,address _from, uint256 _fee);
    event UnfreezeToken(uint256 _callID, uint256 _gas,address _from, uint256 _fee);
    event Allowance(address _from, address _spender, uint256 _value);
    event WithdrawProfit(address _beneficiary, uint256 _amount);
    event ChangedController(address _oldController, address _newController);

    modifier onlyController() {
        require(msg.sender == controller);
        _;
    }

    modifier notCalled(uint256 _callID) {
      if (orders[_callID].from != 0) 
          revert();
      _;
    }

    modifier called(uint256 _callID) {
      if (orders[_callID].from == 0) 
          revert();
      _;
    }
    
    function DbotBilling(
        address _att, 
        address _beneficiary,  
        uint256 _billingType, 
        uint256 _arg0, 
        uint256 _arg1
    ) {
        attToken = _att;
        beneficiary = _beneficiary;
        billingType = BillingType(_billingType);
        arg0 = _arg0;
        arg1 = _arg1;
        controller = msg.sender;
        initCharge();
    }

    function initCharge() internal {
        if ( billingType == BillingType.Free ) {
            charge = new FreeCharge();
        } else if ( billingType == BillingType.Times ) {
            charge = new TimesCharge(arg0, arg1);               //arg0:每次消费ATN数量  arg1:免费次数
        } else if ( billingType == BillingType.Interval ) {
            charge = new IntervalCharge(arg0, arg1);            //arg0:每段时间消费ATN数量  arg1:分段类型
        } else if ( billingType == BillingType.Other ) {
            revert();
        } else {
            revert();
        }
    }

    function billing(address _from, uint256 _callID)
        onlyController
        notCalled(_callID)
        public
        returns (bool isSucc) 
    {
        isSucc = false;
        uint256 _fee = getPrice(_from);
        orders[_callID] = Order({
            from : _from,
            fee : _fee,
            isFrezon : false,
            isPaid : false
        });
        isSucc = freezeToken(_callID);
        if (!isSucc)
            revert();
        Billing(_callID, msg.gas, msg.sender);
        return isSucc;
    } 

    function getPrice(address _from)
        public
        returns (uint256 _fee)
    {
        _fee = Charge(charge).getPrice(_from);
        GetPrice(_from, _fee);
    }

    function freezeToken(uint256 _callID)
        onlyController
        called(_callID)
        public
        returns (bool isSucc)
    {
        Order storage o = orders[_callID];
        require(o.isFrezon == false);
        require(o.isPaid == false);
        isSucc = doPayment(o.from, o.fee);
        if (!isSucc) {
            revert();
        } else {
            if ( billingType == BillingType.Interval ) {
                o.isFrezon = false;
                o.isPaid = true;
                isSucc = withdrawProfit(o.fee);
                if (!isSucc)
                    revert();
                DeductFee(_callID, msg.gas, o.from, o.fee);
            } else {
                o.isFrezon = true;
                FreezeToken(_callID, msg.gas, msg.sender, o.fee);
            }
            Charge(charge).resetToken(o.from);
        }
        return isSucc;
    }

    function deductFee(uint256 _callID)
        onlyController
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
        isSucc = withdrawProfit(o.fee);
        if (isSucc) {
            o.isFrezon = false;
            o.isPaid = true;
            DeductFee(_callID, msg.gas, o.from, o.fee);
        } else {
            revert();
        }
        return isSucc;
    }
    
    function unfreezeToken(uint256 _callID)
        onlyController
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
        isSucc = ERC20(attToken).transfer(o.from, o.fee);
        if (isSucc) {
            o.isFrezon = false;
            o.isPaid = false;
            UnfreezeToken(_callID, msg.gas, o.from, o.fee);
        } else {
            revert();
        }
        return isSucc;
    }

    function onAllowance(address _from)
        internal
        returns (uint256) 
    {
        return ERC20(attToken).allowance(_from, address(this));
    }

    function doPayment(address _from, uint256 _amount) 
        internal
        returns(bool isSucc) 
    {
        uint256 tokens = onAllowance(_from);
        Allowance(_from, address(this), tokens);
        require(tokens >= _amount);
        isSucc = ERC20(attToken).transferFrom(_from, address(this), _amount);
        if (!isSucc)
            revert();
        return isSucc;
    }

    function withdrawProfit(uint256 _amount) 
        internal
        returns(bool isSucc) 
    {
        uint256 balance = ERC20(attToken).balanceOf(address(this));
        require(_amount <= balance);
        isSucc = ERC20(attToken).transfer(beneficiary, _amount);
        profigTokens = profigTokens.add(_amount);
        if (!isSucc)
            revert();
        WithdrawProfit(beneficiary,_amount);
        return isSucc;
    }
    
    function changeController(address _newController) onlyOwner {
        ChangedController(controller, _newController);
        controller = _newController;
    }
}