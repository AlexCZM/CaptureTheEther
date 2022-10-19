const { ethers } = require("hardhat");

module.exports = async ({ deployments, getNamedAccounts }) => {
    const deployer = (await getNamedAccounts()).deployer;
    const { deploy, log } = deployments;
    const value = ethers.utils.parseEther("1");
    console.log("Deploy TokenSaleChallenge contract...");

    const tx = await deploy("TokenSaleChallenge", {
        from: deployer,
        args: "",
        value: value,
        log: true,
    });
};

module.exports.tags = ["all", "7", "TokenSaleChallenge"];
