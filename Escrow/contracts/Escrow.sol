pragma solidity ^0.8.0;

contract Escrow {
    address public payer;
    address payable public payee;
    address public lawyer;
    uint public amount;


    constructor(address _payer, address payable _payee, uint _amount) {
        payer = _payer;
        payee = _payee;
        lawyer = msg.sender;
        amount = _amount;
    }

    function deposit() payable public {
        require(msg.sender == payer, "Sender must be Payer");
        require(address(this).balance <= amount, "Cant send more than escrow amount");
    }

    function release() public {
        require(address(this).balance == amount, "Cannot release funds");
        require(msg.sender == lawyer, "Only lawyer can release funds");
        payee.transfer(amount);
    }

    function balanceOf() view public returns(uint) {
        return address(this).balance;
    }
}


