pragma solidity ^0.8.0;

contract EventContract {

    struct Event{
        address admin;
        string name;
        uint date;
        uint price;
        uint ticketcount;
        uint ticketRemaining;
    }

    mapping(uint => Event) public events;
    mapping(address => mapping(uint => uint))public tickets;

    uint public nextId;

    function createEvent(string calldata name, uint date , uint price, uint ticketCount) external {
        require(block.timestamp < date, 'event can only be organised in the future');
        require(ticketCount > 0 , 'can only create event only if ticket count is reater than 0');
        events[nextId] = Event(
            msg.sender,
            name,
            date,
            price,
            ticketCount,
            ticketCount
        );
        nextId++;
    }

    function BuyTicket(uint id, uint quantity) payable external eventExist(id) eventActive(id){
        
        require(events[id].date != 0 , 'Not Exists');
        require(events[id].date > block.timestamp,'Not Active event');
        require(msg.value == (events[id].price * quantity), "Not enough ether send");
        require(events[id].ticketRemaining >= quantity, 'Not enough ticket');
        events[id].ticketRemaining -= quantity;
        tickets[msg.sender][id] += quantity;
    }

    function transferTicket(uint eventId, uint quantity, address to) external eventExist(id) eventActive(id)
    {
        require(tickets[msg.sender][eventId] >= quantity,'not enough tickets');
        tickets[msg.sender][eventId] -=quantity;
        tickets[to][eventId] += quantity; 
        
    }

    modifier eventExist(uint id) {
        require(events[id].date != 0 , 'Not Exists');
        _;
    } 

    modifier eventActive(uint id) {
        require(events[id].date > block.timestamp,'Not Active event');
        _;
    } 


}