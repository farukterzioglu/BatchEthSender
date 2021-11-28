import { task, subtask } from "hardhat/config";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-web3";

task("topoff", "Load Ethereum to the contract")
  .setAction(
    async (taskArgs, hre) => {
      console.log(`Loading Eth...`);
      await hre.run("sendeth-sub", { account: "0xc718b100269fd4bbfef5521bb0a973870c07744e", amount: "100000000000000" });
    }
);

// sendeth --account 0xc718b100269fd4bbfef5521bb0a973870c07744e --network ropsten
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

