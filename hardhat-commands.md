# Compile & deploy 
npx hardhat compile
npx hardhat run scripts/sample-script.js --network ropsten

# Clean
npx hardhat compile --force
// or
npx hardhat clean

# Start node
npx hardhat node

# Deploy w/ node
node scripts/deployWithNode.js

# Create new project
npm init
npm install --save-dev hardhat
npx hardhat

# Install web3
npm install --save-dev @nomiclabs/hardhat-web3 web3

