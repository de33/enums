pragma solidity 0.8.15;

contract RBACSolidity {
    enum Roles {
        ADMIN,
        MINTER,
        USER,
        GUEST
    }

    mapping(address => Roles) public roles;

    function addAdmin() external {
        roles[msg.sender] = Roles.ADMIN;
    }

    function addMinter() external {
        roles[msg.sender] = Roles.MINTER;
    }

    function addUser() external {
        roles[msg.sender] = Roles.USER;
    }

    function addGuest() external {
        roles[msg.sender] = Roles.GUEST;
    }
}
