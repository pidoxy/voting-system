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
        Vote[] votes;
        bool done;
        uint created;
        uint deadline;
        uint poll_id;
    }
mapping(address=>mapping(uint=>address)) voters;
// voter to mapping of poll_id to candidate voted for. Like a tree
    Poll[] polls;

    function createPoll(address[] memory candidates, uint deadline) public {
        Poll memory poll;
        poll.candidates=candidates;
        poll.done=false;
        poll.created=block.timestamp;
        poll.deadline=deadline;
        poll.poll_id=polls.length;
        polls.push(poll);

    }

    function vote(uint poll_id, address candidate) private{
        // check that user can vote 
        // check that time hasn't passed dedline
        // check that parameter candidate is in candiate list
        // Increment number of voters for poll
        Poll storage poll = polls[poll_id];
        // Vote storage _vote = poll.votes[poll.votes.length];
        poll.votes.push(Vote(candidate, msg.sender));
        //  _vote.candidate=candidate;
        // _vote.voter = msg.sender;
        // uint vote_index = poll.votes.length;
        // poll.votes[] = _vote;
        voters[msg.sender][poll_id] = candidate;
    
    }

    function getPollResults(uint poll_id) public {

    }
    
    function getPolls() public view returns(Poll[] memory){
        return polls;
    }


    
}