var batchSender = artifacts.require ("batch-sender.sol");

module.exports = function (deployer) {
    deployer.deploy (batchSender);
};
