// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.6;

contract BatchSender {
    address payable private owner;

    event EthTransferred(address receiver, uint amount);
    event Deposit(uint value);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    constructor () payable {
        owner = payable(msg.sender);
    }

    fallback() external payable {
        emit Deposit(msg.value);
    }

    receive() external payable {
        emit Deposit(msg.value);
    }

    function setOwner(address payable newOwner) public onlyOwner{
        require(newOwner != owner, "Same owner");

        owner = newOwner;
    }

    function sendEther(
        address receiver1, uint amount1,
        address receiver2, uint amount2
    ) public onlyOwner {
        (bool success, ) = receiver1.call{value: amount1}("");
        require(success, "Failed to send Ether");
        emit EthTransferred(receiver1, amount1);

        (success, ) = receiver2.call{value: amount2}("");
        require(success, "Failed to send Ether");
        emit EthTransferred(receiver2, amount2);
    }
}