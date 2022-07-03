pragma solidity ^0.8.0;

contract Lottery {

    enum State{
        IDLE, BETTING
    }

    State public currentState;
    address payable[] public players;
    uint public betCount;
    uint public betSize;
    uint public houseFees;
    address public admin;

    constructor(uint fee) public {
        require(fee> 1 && fee < 99, 'Fee should between 1 to 99');
        houseFees = fee;
        admin = msg.sender;       
    }

    function createBat(uint count, uint size) external payable inState(State.IDLE) onlyAdmin {
        betCount = count; 
        betSize = size;
        currentState = State.BETTING;
        
    }

    function bet() external payable inState(State.BETTING)  {
        require(msg.value == betSize, 'Can only bat on exactly bet size');
        players.push(payable(msg.sender));
        if(players.length == betCount) {
            //pick winner
            uint winner = _randomModulo(betCount);
            players[winner].transfer((betSize * betCount) * (100-houseFees) / 100);
            currentState = State.IDLE;
            delete players;
        }
    }

    function cancel() external inState(State.BETTING) onlyAdmin() {
        for(uint i=0; i< players.length ;i++) {
            players[i].transfer(betSize);
        }
        delete players;
        currentState = State.IDLE;
    }

    function _randomModulo(uint modulo) view internal returns(uint){
        return uint(keccak256(abi.encodePacked(block.timestamp, block.difficulty))) % modulo;
    }

    modifier inState(State state) {
        require(currentState == state, 'current state does not allow this');
        _;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, 'Only admin can allow');
        _;
    }

}
