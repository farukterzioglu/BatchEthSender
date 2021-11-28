import { task, subtask } from "hardhat/config";
import { EthereumProvider } from "hardhat/types";
import { run, ethers } from "hardhat";
import { Signer } from "ethers";

import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-web3";
import "@typechain/hardhat";

require("hardhat/config") 

task("balance", "Prints an account's balance")
  .addParam("account", "The account's address")
  .setAction(async (taskArgs, { web3 }) => {
    const account = web3.utils.toChecksumAddress(taskArgs.account);
    const balance = await web3.eth.getBalance(account);

    console.log(web3.utils.fromWei(balance, "ether"), "ETH");
  });

task(
    "hello",
    "Prints 'Hello, World!'",
    async function (taskArguments, hre, runSuper) {
      console.log("Hello, World!");
    }
  );

task("hello2", "Prints a greeting'")
  .addOptionalParam("greeting", "The greeting to print", "Hello, World!")
  .setAction(async ({ greeting }) => console.log(greeting));

task("hello-world", "Prints a hello world message").setAction(
    async (taskArgs, hre) => {
      await hre.run("print", { message: "Hello, World!" });
    }
  );
  
subtask("print", "Prints a message")
  .addParam("message", "The message to print")
  .setAction(async (taskArgs) => {
    console.log(taskArgs.message);
  });

task(
    "blockNumber",
    "Prints the current block number",
    async (_, { ethers }) => {
      await ethers.provider.getBlockNumber().then((blockNumber) => {
        console.log("Current block number: " + blockNumber);
      });
    }
  );