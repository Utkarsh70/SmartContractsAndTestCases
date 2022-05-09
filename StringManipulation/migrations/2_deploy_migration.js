const Migrations = artifacts.require("StringManipulation");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
};
