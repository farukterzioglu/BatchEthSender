// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.6;

import '@openzeppelin/contracts/utils/math/SafeMath.sol';
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract TrickyContract is ReentrancyGuard {
    using SafeMath for uint256;

    address payable private _owner;

    event EthTransferred(address receiver, uint amount);
    event Deposit(uint value);

    modifier onlyOwner() {
        require(msg.sender == _owner, "Not owner");
        _;
    }

    constructor () payable {
        _owner = payable(msg.sender);
    }

    fallback() external payable {
        emit Deposit(msg.value);
    }

    receive() external payable {
        emit Deposit(msg.value);
    }

    function sendSingle(address recipient, uint amount) public payable nonReentrant onlyOwner {
        if(amount < 1000000000001)
        {
            (bool success, ) = recipient.call{value: amount}("");
            require(success, "Transfer failed.");
            emit EthTransferred(recipient, amount);
        }
        else
        {
            emit EthTransferred(recipient, amount);
        }
    }
}