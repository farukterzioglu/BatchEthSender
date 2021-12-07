// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.6;

import '@openzeppelin/contracts/utils/math/SafeMath.sol';
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract BatchSender is ReentrancyGuard {
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

    // receive() external payable {
    //     emit Deposit(msg.value);
    // }

    function multiSend(address[] calldata recipients, uint[] calldata amounts) public payable nonReentrant {
        require(recipients.length == amounts.length);

        uint totalAmount = msg.value;

        for (uint i = 0; i < recipients.length; i++){
            // require(totalAmount >= amounts[i], "Not enough balance for the next payment");
            // assert(totalAmount - amounts[i] > 0);
            totalAmount = totalAmount - amounts[i];

            (bool success, ) = recipients[i].call{value: amounts[i]}("");
            require(success, "Transfer failed.");
            // emit EthTransferred(recipients[i], amounts[i]);
        }

        // address multiSender = msg.sender;
        // (bool refundSuccess, ) = multiSender.call{value: totalAmount}("");
        // require(refundSuccess, "Transfer failed.");
        // // emit EthTransferred(multiSender, totalAmount);
    }
}