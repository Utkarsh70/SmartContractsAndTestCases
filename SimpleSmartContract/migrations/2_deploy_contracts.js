const SimpleSmartContract = artifacts.require("SimpleSmartContract");

module.exports = async function(deployer, _network, accounts) {
  await deployer.deploy(SimpleSmartContract);
};