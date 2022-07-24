pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "./ChainMeUp.sol";

contract ChainMeUpProfiles is Ownable, Pausable {
    mapping(address => address) public profiles;

    constructor()  {}

    function createProfile() external returns (address) {
        address deployedAddress  = profiles[msg.sender];

        if(deployedAddress != address(0)) {
            return deployedAddress;
        }

        deployedAddress = address(new ChainMeUp());
        profiles[msg.sender] = deployedAddress;
        return deployedAddress;
    }

    function getProfile() external view returns (address) {
        return profiles[msg.sender];
    }
}