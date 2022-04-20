// "SPDX-License-Identifier: MIT"

pragma solidity ^0.8.0;


contract Voting{
    struct candidate{
        address canditate;
        address[] votes; 
    }

    struct poll{
        candidate[] candidates;
        candidate winner;
        bool done;
        uint created;
        uint deadline;
        uint poll_id;

    }

    poll[] polls;

    function createPoll(address[] memory candidates, uint deadline) public {


    }

    function vote(uint poll_id) public{
    
    }
    


    
}