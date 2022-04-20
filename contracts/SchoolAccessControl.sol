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
    bytes32 public constant CHAIRMAN_BOD_ROLE = keccak256("CHAIRMAN_BOD");
    bytes32 public constant BOD_MEMBER_ROLE = keccak256("BOD_MEMBER");
    bytes32 public constant PRINCIPAL_ROLE = keccak256("PRINCIPAL");
    bytes32 public constant TEACHER_ROLE = keccak256("TEACHER");
    bytes32 public constant STUDENT_ROLE = keccak256("STUDENT");

    /// @dev Add `principal and chairman` to the admin role as a member.
    constructor(address chairman, address principal){
        // grant the chairman and principal roles as passed in to the constructor
        _setupRole(CHAIRMAN_BOD_ROLE, chairman);
        _setupRole(PRINCIPAL_ROLE, principal);
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
        return hasRole(CHAIRMAN_BOD_ROLE, account);
    }

    /// @dev Return `true` if the account belongs to the Board of Directors role.
    function isBoardOfDirector(address account) public view virtual returns (bool) {
        return hasRole(BOD_MEMBER_ROLE, account);
    }

    /// @dev Return `true` if the account belongs to the principal role.
    function isPrincipal(address account) public view virtual returns (bool) {
        return hasRole(PRINCIPAL_ROLE, account);
    }

    /// @dev Return `true` if the account belongs to the teacher role.
    function isTeacher(address account) public view virtual returns (bool) {
        return hasRole(TEACHER_ROLE, account);
    }

    /// @dev Return `true` if the account belongs to the student role.
    function isStudent(address account) public view virtual returns (bool) {
        return hasRole(STUDENT_ROLE, account);
    }

    /// @dev Add an account to the teacher role. Restricted to chairman.
    function addBoardOfDirectorMember(address account)
        public
        virtual
        onlyChairman
    {
        grantRole(BOD_MEMBER_ROLE, account);
    }

    /// @dev Remove an account from the student role. Restricted to chairman.
    function removeBoardOfDirectorMember(address account)
        public
        virtual
        onlyChairman
    {
        revokeRole(BOD_MEMBER_ROLE, account);
    }
/// @dev Remove principal. Restricted to chairman.
    function removePrincipal(address account)
        public
        virtual
        onlyChairman
    {
        revokeRole(PRINCIPAL_ROLE, account);
    }
    /// @dev Add an account to the teacher role. Restricted to principal.
    function addTeacher(address account) public virtual onlyPrincipal {
        grantRole(TEACHER_ROLE, account);
    }

    /// @dev Remove an account from the student role. Restricted to principal.
    function removeTeacher(address account) public virtual onlyPrincipal {
        revokeRole(TEACHER_ROLE, account);
    }

    /// @dev Add an account to the user role. Restricted to teachers and principal.
    function addStudent(address account) public virtual onlyPrincipalOrTeacher {
        grantRole(STUDENT_ROLE, account);
    }

    /// @dev Remove an account from the student role. Restricted to principal and teachers.
    function removeStudent(address account)
        public
        virtual
        onlyPrincipalOrTeacher
    {
        revokeRole(STUDENT_ROLE, account);
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
        renounceRole(CHAIRMAN_BOD_ROLE, msg.sender);
    }
}
