var wallet = artifacts.require("tokenmarketnet-ico/MultiSigWallet");
var token = artifacts.require("tokenmarketnet-ico/CrowdsaleToken");
var mathLib = artifacts.require("tokenmarketnet-ico/SafeMathLib");
var mathLib = artifacts.require("zeppelin/token/ERC20/");
var pricing = artifacts.require("FlatFiatPricing");


module.exports = function(deployer, network, accounts) {
    deployer.deploy(wallet, [accounts[0]], 1);
    deployer.deploy(mathLib)
        .then(() => {
            deployer.link(mathLib, token);
            return deployer.deploy(token, "TestCoin", "TST", 0, 18, true);
        })
        .then(() => {
            deployer.link(mathLib, pricing);
            return deployer.deploy(pricing, 1);
        });
};
