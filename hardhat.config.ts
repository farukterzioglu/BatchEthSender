import { task } from "hardhat/config";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import "./my-tasks.ts";
import { HardhatUserConfig } from "hardhat/config";

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
    },
    rinkeby: {
      url: "https://eth-rinkeby.alchemyapi.io/v2/123abc123abc123abc123abc123abcde",
      accounts: ["128654788e36b7fad56f13281bb6a0145cb30080f986664152c0af60761f66c7"]
    },
    ropsten: {
      url: "https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
      accounts: ["128654788e36b7fad56f13281bb6a0145cb30080f986664152c0af60761f66c7"],
      chainId: 3
    },
    ropstenHd: {
      url: "https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
      accounts: {
        "mnemonic": ""
      }
    }
  },
  solidity: "0.8.6"
};

export default config;
