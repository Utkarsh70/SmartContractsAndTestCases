const MultiPayout = artifacts.require("MultiPayout");

module.exports = function (deployer, _network, accounts) {
  deployer.deploy(MultiPayout, accounts[0], accounts[1], 1, {value: 100});
};
