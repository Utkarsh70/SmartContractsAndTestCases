pragma solidity ^0.8.0;

contract deed {
    address public lawyer;
    address payable public beneficier;
    uint public  earliest;

    constructor( address _lawyer, 
                 address payable _beneficier, 
                 uint fromNow) payable {
         lawyer = _lawyer;
         beneficier = _beneficier;
         earliest = block.timestamp +  fromNow;              

    }  

    function withDraw() public {
        require(msg.sender == lawyer,"Lawyer Only");
        require(block.timestamp >=earliest, "Too Early");
        beneficier.transfer(address(this).balance);
    }
}