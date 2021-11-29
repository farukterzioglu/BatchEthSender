import { task, subtask } from "hardhat/config";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-web3";
import {AbiItem} from 'web3-utils';

task("batch-send", "Send batch ETH transfers")
  .addParam("contact", "Contract address")
  .addParam("receiver", "The receiver's address")
  .addParam("amount", "Amount to send")
  .setAction(async (taskArgs, { web3 }) => {
      console.log(`Sending Eth...`);

      const accounts = await web3.eth.getAccounts();
      const senderAccount = accounts[0];

      const abi : AbiItem[]= [
        {
          "inputs": [],
          "stateMutability": "payable",
          "type": "constructor"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "value",
              "type": "uint256"
            }
          ],
          "name": "Deposit",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "receiver",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            }
          ],
          "name": "EthTransferred",
          "type": "event"
        },
        {
          "stateMutability": "payable",
          "type": "fallback"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "receiver1",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "amount1",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "receiver2",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "amount2",
              "type": "uint256"
            }
          ],
          "name": "sendEther",
          "outputs": [],
          "stateMutability": "payable",
          "type": "function"
        }
      ];

      let contract = new web3.eth.Contract(abi, taskArgs.contact);

      await contract.methods
        .sendEther(
          taskArgs.receiver, taskArgs.amount, 
          "0x57C88A506df612e485BD0bd414dCE5F3a529998a", "100000000000000")
        .send({ from: senderAccount }, function (err: any, res: any) {
          if (err) {
            console.log("An error occured", err)
            return
          }
          console.log("Hash of the transaction: " + res)
        })
      
    }
);

task("topoff", "Load Ethereum to the contract")
  .setAction(
    async (taskArgs, hre) => {
      console.log(`Loading Eth...`);
      await hre.run("sendeth-sub", { account: "0xc718b100269fd4bbfef5521bb0a973870c07744e", amount: "100000000000000" });
    }
);

task("sendeth", "Send Ethereum to the receiver")
  .addParam("account", "The receiver's address")
  .addParam("amount", "Amount to send")
  .setAction(
    async (taskArgs, hre) => {
      await hre.run("sendeth-sub", { account: taskArgs.account, amount: taskArgs.amount });
    }
);

// hh sendeth --account 0x8093555cBe3aDbB36B516590263C660F907BCAf7 --amount 100000000000000 --network ropsten
subtask("sendeth-sub", "Send Ethereum to the receiver")
  .addParam("account", "The receiver's address")
  .addParam("amount", "Amount to send")
  .setAction(async (taskArgs, { web3 }) => {
    const ethAmount = web3.utils.fromWei(taskArgs.amount, 'ether');
    console.log(`Sending ${ethAmount} Eth to ${taskArgs.account}...`);

    const receiver = web3.utils.toChecksumAddress(taskArgs.account);

    const transactionObject = {
        "from" : "0xFe0Cbd2526340F49Ce414a84e7F7E9621669063f",
        "to" : taskArgs.account,    // "0xc718b100269fd4bbfef5521bb0a973870c07744e"
        "value" : taskArgs.amount   // 1000000000000000
    };

    const result = await web3.eth.sendTransaction(transactionObject);
    console.log({ result : result});

    // console.log(web3.utils.fromWei(balance, "ether"), "ETH");
  });

