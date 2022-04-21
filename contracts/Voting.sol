// "SPDX-License-Identifier: MIT"

pragma solidity ^0.8.0;


contract Voting{

    struct Vote{
        address voter;
        address candidate;
    }

    struct Poll{
        address[] candidates;
        address[] voters;
        // candidate winner;
        mapping(address=>address) votes;
        bool done;
        uint created;
        uint deadline;
        uint poll_id;
        uint number_of_voters;
    }

    Poll[] polls;

    function createPoll(address[] memory candidates, address[] memory voters, uint deadline) public {
        mapping(uint=>Vote) memory votes;
        Poll memory poll = (candidates, voters, votes, false, now, deadline, polls.length, 0);
        polls.push(poll);

    }

    function vote(uint poll_id, address candidate) private{
        // check that user can vote 
        // check that time hasn't passed dedline
        // check that parameter candidate is in candiate list
        // Increment number of voters for poll
        Vote memory _vote = (msg.sender, candidate);
        Poll memory poll = polls[poll_id];
        poll.votes[poll.number_of_voters] = _vote;
        poll.number_of_voters+=1;
        polls[poll_id] = poll;
    
    }

    function getPollResults(uint poll_id) public {

    }
    
    function getPolls() public view returns(Poll[] memory){
        return polls;
    }


    
}