import { run, ethers } from "hardhat";

async function main() {
    await run("compile");

    const contract = await ethers.getContractFactory("ApprovalTests");
    const batchSender = await contract.deploy("1000000000000000000000");

    await batchSender.deployed();

    console.log("ApprovalTests deployed to:", batchSender.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  