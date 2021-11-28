import { run, ethers } from "hardhat";

async function main() {
    await run("compile");

    const BatchSender = await ethers.getContractFactory("BatchSender");
    const batchSender = await BatchSender.deploy();

    await batchSender.deployed();
  
    console.log("Batch sender deployed to:", batchSender.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  