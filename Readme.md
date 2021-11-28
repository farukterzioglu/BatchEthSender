### Commands
truffle compile
truffle migrate
truffle migrate --reset --compile-all

### TODO
Send batch ETH 
Deposit X n -> ApproveAll X 1-> TransformFrom X 1
Send ETH on behalf of EOA

5 X userAddress (sing a message) -> 5 X signed message 
client (send 5 signed messages) -> relayer contract (has eth in it)
relayer -> blockchain

relayer contract -> 
white list the caller


https://medium.com/@paulina.blaszk/how-to-write-and-deploy-first-smart-contract-in-solidity-0-5-x-and-truffle-5-x-x-3054ec5328ad

https://blog.openzeppelin.com/reentrancy-after-istanbul/

https://ethernaut.openzeppelin.com/level/0x848fb2124071146990c7abE8511f851C7f527aF4
https://faucets.chain.link/rinkeby

https://docs.soliditylang.org/en/v0.5.11/security-considerations.html#use-the-checks-effects-interactions-pattern

https://www.kingoftheether.com/contract-safety-checklist.html

1 ETH 1000000000000000000
receiver1 0xeDaa1D0cbf0053788BdD93A8DA57336808B75eF5
receiver2 0x57C88A506df612e485BD0bd414dCE5F3a529998a

Sample contract
0x52d924C463254d4bAC0ab2C6f13525C447f82C0e

Defender notes
https://defender.openzeppelin.com/#/admin/addContract
https://blog.openzeppelin.com/gasless-metatransactions-with-openzeppelin-defender/

Paymaster
the transaction costs will be charged from a balance of a special contract, called Paymaster.

Samples;
https://github.com/opengsn/gsn-paymasters/tree/master/contracts
Whitelist paymaster
https://github.com/opengsn/gsn-paymasters/blob/master/contracts/WhitelistPaymaster.sol


Meta-Transactions Forwarder Contract
https://github.com/ethereum/EIPs/pull/2770/files
(recopient contract must be aware of forwarded data, 
sender comes from different data, not from msg.sender)


### Notes
Native Meta Transactions
https://github.com/ethereum/EIPs/issues/1776
Understanding Ethereum ERC-20 Meta-Transactions
https://betterprogramming.pub/ethereum-erc-20-meta-transactions-4cacbb3630ee
Erc20 Batched Meta Transactions
https://awesomeopensource.com/project/defifuture/erc20-batched-meta-transactions
Relayer Smart Contract
https://awesomeopensource.com/project/defifuture/relayer-smart-contract
Ethereum Gas Station Network (GSN)
https://docs.opengsn.org/#the-problem