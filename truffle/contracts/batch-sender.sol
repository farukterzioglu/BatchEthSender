// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.6;

import '@openzeppelin/contracts/math/SafeMath.sol';
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract BatchSender is PullPayment {
    using SafeMath for uint256;
    using EnumerableMap for EnumerableMap.UintToAddressMap;

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

    function sendEther(
        address receiver1, uint amount1,
        address receiver2, uint amount2,
        EnumerableMap.UintToAddressMap balanceMap
    ) public payable nonReentrant onlyOwner {
        require(msg.sender.isContract == false, "Contract receivers are not supported");

        // Sum the amounts to pay
        // for (uint256 i = 0; i < balanceMap.length; i++) {
        //     totalAmountToTransfer += EnumerableMap.UintToAddressMap.at(balanceMap, i);
        // }
        totalAmountToTransfer = amount1 + amount2; // TODO: remove 

        // Send to all recipients
        {
            // TODO: Check balance 
            // require(balances[msg.sender] >= totalAmountToTransfer, "Not enough balance");

            (bool success, ) = receiver1.call{value: amount1}("");
            require(success, "Failed to send Ether");
            emit EthTransferred(receiver1, amount1);
        }
    }
}