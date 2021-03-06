/** 
 *  SourceUnit: /Users/pidoxy/voting-system/contracts/Administer.sol
*/

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/access/AccessControl.sol";

/**
 * @title Administer
 * @author Pidoxy Emmanuel Idoko
 * @notice Implements Principal, Teachers and User roles.
 */
contract SchoolAccessControl is AccessControl {
    bytes32 public constant CHAIRMAN_BOD = keccak256("CHAIRMAN_BOD");
    bytes32 public constant BOD_MEMBER = keccak256("BOD_MEMBER");
    bytes32 public constant PRINCIPAL = keccak256("PRINCIPAL");
    bytes32 public constant TEACHER = keccak256("TEACHER");
    bytes32 public constant STUDENT = keccak256("STUDENT");

    /// @dev Add `principal and chairman` to the admin role as a member.
    constructor(address chairman, address principal){
        // grant the chairman and principal roles as passed in to the constructor
        _setupRole(CHAIRMAN_BOD, chairman);
        _setupRole(PRINCIPAL, principal);
    }

    /// @dev Restricted to the chairman role.
    modifier onlyChairman() {
        require(isChairman(msg.sender), "Restricted to the chairman.");
        _;
    }
    /// @dev Restricted to the BOD role.
    modifier onlyBoardOfDirectors() {
        require(
            isBoardOfDirector(msg.sender),
            "Restricted to the Board of Directors."
        );
        _;
    }
    /// @dev Restricted to the principal role.
    modifier onlyPrincipal() {
        require(isPrincipal(msg.sender), "Restricted to the principal.");
        _;
    }
    /// @dev Restricted to members of the teacher role.
    modifier onlyTeacher() {
        require(isTeacher(msg.sender), "Restricted to teachers.");
        _;
    }
    /// @dev Restricted to members of the principal and teacher role.
    modifier onlyPrincipalOrTeacher() {
        require(
            isPrincipal(msg.sender) || isTeacher(msg.sender),
            "Restricted to the principal or teachers."
        );
        _;
    }
    /// @dev Restricted to members of the students role.
    modifier onlyStudent() {
        require(isStudent(msg.sender), "Restricted to students.");
        _;
    }

    /// @dev Return `true` if the account belongs to the chairman role.
    function isChairman(address account) public view virtual returns (bool) {
        return hasRole(CHAIRMAN_BOD, account);
    }

    /// @dev Return `true` if the account belongs to the Board of Directors role.
    function isBoardOfDirector(address account) public view virtual returns (bool) {
        return hasRole(BOD_MEMBER, account);
    }

    /// @dev Return `true` if the account belongs to the principal role.
    function isPrincipal(address account) public view virtual returns (bool) {
        return hasRole(PRINCIPAL, account);
    }

    /// @dev Return `true` if the account belongs to the teacher role.
    function isTeacher(address account) public view virtual returns (bool) {
        return hasRole(TEACHER, account);
    }

    /// @dev Return `true` if the account belongs to the student role.
    function isStudent(address account) public view virtual returns (bool) {
        return hasRole(STUDENT, account);
    }

    /// @dev Add an account to the teacher role. Restricted to chairman.
    function addBoardOfDirectorMember(address account)
        public
        virtual
        onlyChairman
    {
        grantRole(BOD_MEMBER, account);
    }

    /// @dev Remove an account from the student role. Restricted to chairman.
    function removeBoardOfDirectorMember(address account)
        public
        virtual
        onlyChairman
    {
        revokeRole(BOD_MEMBER, account);
    }
/// @dev Remove principal. Restricted to chairman.
    function removePrincipal(address account)
        public
        virtual
        onlyChairman
    {
        revokeRole(PRINCIPAL, account);
    }
    /// @dev Add an account to the teacher role. Restricted to principal.
    function addTeacher(address[] memory accounts) public virtual onlyPrincipal {
        for(uint i=0; i<accounts.length; i++){
            address account = accounts[i];
            grantRole(TEACHER, account);
        }
        
    }

    /// @dev Remove an account from the student role. Restricted to principal.
    function removeTeacher(address account) public virtual onlyPrincipal {
        revokeRole(TEACHER, account);
    }

    /// @dev Add an account to the user role. Restricted to teachers and principal.
    function addStudent(address[] memory accounts) public virtual onlyPrincipalOrTeacher {
        for(uint i=0; i<accounts.length; i++){
            address account = accounts[i];
            grantRole(STUDENT, account);
        }
    }

    /// @dev Remove an account from the student role. Restricted to principal and teachers.
    function removeStudent(address account)
        public
        virtual
        onlyPrincipalOrTeacher
    {
        revokeRole(STUDENT, account);
    }

    event AdminRoleSet(bytes32 roleId, bytes32 adminRoleId);

    modifier onlyMember(bytes32 roleId) {
        require(
            hasRole(roleId, msg.sender),
            "Restricted to members." 
        );
        _;
    }

    /// @dev Create a new role with the specified admin role.
    function addRole(bytes32 roleId, bytes32 adminRoleId)
        public
        onlyMember(adminRoleId)
    {
        _setRoleAdmin(roleId, adminRoleId);
    }

    /// @dev Remove oneself from the chairman role.
    function renounceChairman() public virtual {
        renounceRole(CHAIRMAN_BOD, msg.sender);
    }
    // struct Vote{
    //     address voter;
    //     address candidate;
    // }

    // struct Poll{
    //     address[] candidates;
    //     address[] voters;
    //     // candidate winner;
    //     mapping(address=>address) votes;
    //     bool done;
    //     uint created;
    //     uint deadline;
    //     uint poll_id;
    //     uint number_of_voters;
    // }

    // Poll[] polls;

    // function createPoll(address[] memory candidates, address[] memory voters, uint deadline) public {
    //     // mapping(uint=>Vote) memory votes;
    //     Poll memory poll = (candidates, voters, votes, false, now, deadline, polls.length, 0);
    //     polls.push(poll);

    // }

    // function vote(uint poll_id, address candidate) private{
    //     // check that user can vote 
    //     // check that time hasn't passed dedline
    //     // check that parameter candidate is in candiate list
    //     // Increment number of voters for poll
    //     Vote memory _vote = (msg.sender, candidate);
    //     Poll memory poll = polls[poll_id];
    //     poll.votes[poll.number_of_voters] = _vote;
    //     poll.number_of_voters+=1;
    //     polls[poll_id] = poll;
    
    // }

    // function getPollResults(uint poll_id) public {

    // }
    
    // function getPolls() public view returns(Poll[] memory){
    //     return polls;
    // }

}
