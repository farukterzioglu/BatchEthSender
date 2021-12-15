// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ApprovalTests is ERC20 {
    constructor(uint256 initialSupply) public ERC20("Appr", "APR") {
        _mint(msg.sender, initialSupply);
    }
}
