pragma solidity ^0.8.0;

contract MultiPayout {

    address public lawyer;
    address payable public beneficier;
    uint public  earliest;
    uint public amount;
    uint constant public PAYOUTS = 10;
    uint constant public INTERVAL = 10;
    uint public paidPayouts; 


    constructor( address _lawyer, 
                 address payable _beneficier, 
                 uint fromNow) payable {
         lawyer = _lawyer;
         beneficier = _beneficier;
         earliest = block.timestamp +  fromNow;              
         amount = msg.value / PAYOUTS;

    }  

    function withDraw() public {
        require(msg.sender == beneficier,"beneficier Only");
        require(block.timestamp >=earliest, "Too Early");
        require(paidPayouts < PAYOUTS, "No Payouts Left");

        uint elligiblePayouts = (block.timestamp - earliest) / INTERVAL;
        uint duePayouts = elligiblePayouts - paidPayouts;
        duePayouts = duePayouts + paidPayouts > PAYOUTS ? PAYOUTS - paidPayouts : duePayouts;
        paidPayouts += duePayouts;
        beneficier.transfer(duePayouts * amount);
    }
}


