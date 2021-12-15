import { task, subtask } from "hardhat/config";
import { run, ethers } from "hardhat";

import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-web3";
import "@typechain/hardhat";
import { BigNumber } from "ethers";

const callback = function (err: any, res: any) {
	if (err) { console.log("An error occured", err); return; }
	console.log("Hash of the transaction: " + res)
};

task("Approve", "")
	.addParam("contact", "Contract address")
	.setAction(async (taskArgs, hre) => {
		const web3 = hre.web3;

		const accounts = await web3.eth.getAccounts();
      	const hotAccount = accounts[0];
		const depositAccount = accounts[1];

		const artifact = await hre.artifacts.readArtifact("ApprovalTests");
		const contract = new web3.eth.Contract(artifact.abi, taskArgs.contact);

		// Deposit some tokens
		const depositAmountStr = "10000000000000000000";
		const depositAmount = Number(web3.utils.fromWei( depositAmountStr ));
		for (let i = 0; i < 3; i++) {
			await contract.methods
				.transfer(depositAccount, depositAmountStr)
				.send({ from: hotAccount }, function (err: any, res: any) { if (!err) console.log(`New ${depositAmount} token deposited. Tx hash: ${res}` )	 });
		}

		// Balance of deposit address
		const balanceOfDepositStr = await contract.methods.balanceOf(depositAccount).call();
		const balanceOfDeposit = Number(web3.utils.fromWei( balanceOfDepositStr));
		console.log(`Balance of deposit: ${ balanceOfDeposit }`);

		if(balanceOfDeposit == 0) {
			console.log("No balance to transfer");
			return;
		}

		// Allowence of hot address
		let allowanceStr = await contract.methods.allowance(depositAccount, hotAccount).call();
		let allowance = Number(web3.utils.fromWei( allowanceStr));
		console.log(`Allowance of hot: ${ allowance}`);

		// Not enought allowance
		if(allowance < balanceOfDeposit)
		{
			// TODO: Load ETH if necessary 

			// Approve hot address
			await contract.methods
				.approve(hotAccount, "1000000000000000000000000")
				.send({ from: depositAccount }, function (err: any, res: any) {
					if (err) { console.log("An error occured", err); return; }
					console.log("approve: " + res)
				});
			console.log(`Approved ${hotAccount} for 1000000000000000000000000`);
		}

		// Transfer from deposit to hot (by hot)
		await contract.methods
			.transferFrom(depositAccount, hotAccount, balanceOfDepositStr)
			.send({ from: hotAccount }, 
				function (err: any, res: any) {
					if (err) { console.log("An error occured", err); return; }
					console.log(`Transfered ${balanceOfDeposit} from ${depositAccount} to ${hotAccount} (by ${hotAccount}). Tx hash: ${res}`)
				});

		allowanceStr = await contract.methods.allowance(depositAccount, hotAccount).call();
		allowance = Number(web3.utils.fromWei( allowanceStr));
		console.log(`Remaining allowance of hot: ${ allowance}`);

	});