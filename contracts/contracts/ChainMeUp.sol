pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";

contract ChainMeUp is ERC1155, Ownable, Pausable, ERC1155Supply {
    constructor() ERC1155("") {}

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function mint(bytes memory data)
        public
        payable
    {
        require(msg.value > 0, "You must to pay for your subscription.");
        _mint(msg.sender, 0, 1, data);
    }

    function withdraw() external onlyOwner returns (uint) {
        uint balance = address(this).balance;
        require(balance > 0, "No tokens to withdraw");
        address to = owner();
        // payable(to).transfer(balance);
        return balance;
    }

    function _beforeTokenTransfer(address operator, address from, address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        internal
        whenNotPaused
        override(ERC1155, ERC1155Supply)
    {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }
}