const ImmuLedger = artifacts.require("ImmuLedger");

module.exports = function(deployer) {
  deployer.deploy(ImmuLedger);
};