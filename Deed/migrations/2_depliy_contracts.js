const deed = artifacts.require("deed");

module.exports = function (deployer, _network, accounts) {
  deployer.deploy(deed, accounts[0], accounts[1], 5, {value: 100});
};
