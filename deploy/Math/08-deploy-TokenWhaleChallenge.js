const { ethers } = require("hardhat");

module.exports = async ({ deployments, getNamedAccounts }) => {
    const deployer = (await getNamedAccounts()).deployer;
    const { deploy, log } = deployments;
    const value = ethers.utils.parseEther("1");
    console.log("Deploy TokenWhaleChallenge contract...");

    const tx = await deploy("TokenWhaleChallenge", {
        from: deployer,
        args: "",
        log: true,
    });
};

module.exports.tags = ["all", "8", "TokenWhaleChallenge"];
