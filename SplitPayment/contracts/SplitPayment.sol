pragma solidity ^0.8.0;

contract SplitPayment {

    address public owner;

    constructor (address _owner) {
        owner = _owner;
    }

    function send(address payable[] memory to, uint[] memory amount) payable onlyOwner public {
        require(to.length == amount.length, "to and amount array must have same length");
        for(uint i=0;i<to.length;i++) {
           to[i].transfer(amount[i]);
        }   
    }

    modifier onlyOwner() {
        require(msg.sender == owner,"Only owner can send ether");
        _;
    }
}