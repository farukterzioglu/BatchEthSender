import { task, subtask } from "hardhat/config";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-web3";
import {AbiItem} from 'web3-utils';
import HDWalletProvider from "@truffle/hdwallet-provider";
import { TransactionReceipt } from "web3-eth";
import Web3 from "web3";
import { HardhatRuntimeEnvironment, TaskArguments } from "hardhat/types/runtime";

async function getTxFee(web3 : Web3, hash : string) : Promise<number> {
    const receipt = await web3.eth.getTransactionReceipt(hash);
    const tx = await web3.eth.getTransaction(hash);
    
    const fee = receipt.gasUsed * +web3.utils.fromWei(tx.gasPrice, 'ether') ;
    return fee;
}

task("get-tx", "Get tx")
  .addParam("hash", "Transaction hash")
  .setAction(async (taskArgs, { web3 }) => {
    const fee = await getTxFee(web3, taskArgs.hash );
    console.log(`Tx fee: ${fee}`);
  });

function getAddresses (addressCount: number, subAccount: number = 0) : string[] {
  const walletMnemonic = 'rib odor chase panther tag hill nose symptom aisle together vacuum short appear plug genius';
  const walletAPIUrl = 'https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161';

  const provider = new HDWalletProvider(
      walletMnemonic,
      walletAPIUrl,
      0, addressCount, true, 
      `m/44'/60'/0'/${subAccount}/`
  );

  const addresses = provider.getAddresses();
  provider.engine.stop();
  return addresses;

  // let receiverList : string[] = [
  //   '0x5caecc53d3640ebd9d10c73462e760032804baee',
  //   '0x4ce2992294fd9ff13a0913c8411a47dec5809e0c',
  //   '0x6a9b88763f662abfcfd656646187f02c3efad57a',
  //   '0x2956b23e6e247bce5f6a4a3e8b4e80124a2516a6',
  //   '0x9e19ebe84e21010bff95ca96b4a70647e4520f22',
  //   '0x862a022df7005ffc23f059ea2537c463b708213e',
  //   '0x61646777647274a49f5c469460fb874864608684',
  //   '0x467678512cde2cb624c14c3651370778a48a560c',
  //   '0xaa745ecc1425efe0cdf5131686b2047a80f03632',
  //   '0xbd295e281ea25437c4942d869fddf6a0450f6e52',
  //   '0xac869228d16a8d67872385cf712895b9ee518fe0',
  //   '0x6f6ec962f3fa3631e1afa1f8f98f055bb55a0ba7',
  //   '0x19d6dec1ce9998499107fb4db5066581804d0f4e',
  //   '0x34ba8891f3610d98faf7ec8a53c3d2f5537698b2',
  //   '0x307c225fd184770ba965f5c468183165f9eb540f'
  // ];
}

// hh batch-send-automated --contact 0xca13d69EaDbF984a6D9AF85Fe61EFEd29424b0a4 --network ropsten
task("batch-send-automated", "Send batch ETH transfers")
  .addParam("contact", "Contract address")
  .setAction(
    async (taskArgs, hre) => {
      await hre.run("batch-send-sub", { 
        contact: taskArgs.contact, 
        amount: "1000000000000",
        subaccount : "0",
        paymentcount : "1"
      }); 

      for (let i = 5; i <= 51; i += 5) {
        await hre.run("batch-send-sub", { 
          contact: taskArgs.contact, 
          amount: "1000000000000",
          subaccount : "0",
          paymentcount : i.toString()
        }); 
      }
    }
  );

task("batch-send", "Send batch ETH transfers")
  .addParam("contact", "Contract address")
  .addParam("amount", "Amount to send")
  .addParam("subaccount", "Sub account")
  .addParam("paymentcount", "Payment count")
  .setAction(
    async (taskArgs, hre) => {
      await hre.run("batch-send-sub", { 
        contact: taskArgs.contact, 
        amount: taskArgs.amount,
        subaccount : taskArgs.subaccount,
        paymentcount : taskArgs.paymentcount
      });
    }
  );

subtask("batch-send-sub", "Send batch ETH transfers")
  .addParam("contact", "Contract address")
  .addParam("amount", "Amount to send")
  .addParam("subaccount", "Sub account")
  .addParam("paymentcount", "Payment count")
  .setAction(async (taskArgs: TaskArguments, hre : HardhatRuntimeEnvironment) => {
      const web3 = hre.web3;

      const accounts = await web3.eth.getAccounts();
      const senderAccount = accounts[0]; // console.trace(`Sender :${senderAccount}`);

      const amountToPay: number = +taskArgs.amount;

      const artifact = await hre.artifacts.readArtifact("BatchSender");
      const abi : AbiItem[] = artifact.abi;

      let contract = new web3.eth.Contract(abi, taskArgs.contact);

      var paymentCount :number = +taskArgs.paymentcount;
      var totalAmount: number = 0;

      let receiverList = getAddresses(paymentCount, taskArgs.subaccount);

      let amountList : string[] = new Array(paymentCount);
      for (let i = 0; i < paymentCount; i++) {
        amountList[i] = taskArgs.amount;
        // console.log(`Sending ${web3.utils.fromWei(amountList[i], 'ether')} ETH to ${receiverList[i]}`);

        totalAmount += +web3.utils.fromWei(amountList[i], 'ether')
      }
      // console.log(`Total Eth to send    : ${totalAmount}`);
      // console.log(`Total Eth to attach  : ${web3.utils.fromWei( (amountToPay * paymentCount).toString(), 'ether')}`);

      // TODO: set gas limit 21000 * nUsers
      await contract.methods
        .multiSend(receiverList, amountList)
        .send({ 
          from: senderAccount, 
          value: (amountToPay * paymentCount).toString()
          }, 
          async function (err: any, txhash: any) {
            if (err) {
              console.log("An error occured", err)
              return
            }
            console.log(`Count: ${paymentCount} \tTx: ${txhash}`);
            // const fee = await getTxFee(web3, txhash );
          }
        )
    }
);

task("single-send", "Send single ETH transfers")
  .addParam("contact", "Contract address")
  .addParam("amount", "Amount to send")
  .addParam("receiver", "Receiver")
  // .addParam("txtype", "Tx type")
  .setAction(async (taskArgs, hre) => {
      console.log(`Sending Eth...`);

      const web3 = hre.web3;

      const accounts = await web3.eth.getAccounts();
      const senderAccount = accounts[0];

      const amountToPay: number = +taskArgs.amount;

      const artifact = await hre.artifacts.readArtifact("BatchSender");
      let contract = new web3.eth.Contract(artifact.abi, taskArgs.contact);

      await contract.methods
        .sendSingle(taskArgs.receiver, amountToPay) //, taskArgs.txtype)
        .send({ 
          from: senderAccount, 
          value: (amountToPay + amountToPay).toString()
          }, 
          function (err: any, res: any) {
            if (err) {
              console.log("An error occured", err)
              return
            }
            console.log("Hash of the transaction: " + res)
          }
        );
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

