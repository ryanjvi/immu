const ImmuLedger = artifacts.require("ImmuLedger");

module.exports = function(deployer, network, accounts) {
  const publisherAddress = accounts[0];  // The first account from the list of available accounts
  const timestamp = Math.floor(Date.now() / 1000);  // The current time

  deployer.deploy(ImmuLedger, publisherAddress, timestamp);
};