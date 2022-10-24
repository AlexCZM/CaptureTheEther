const { ethers } = require("hardhat");

module.exports = async ({ deployments, getNamedAccounts }) => {
    const deployer = (await getNamedAccounts()).deployer;
    const { deploy, log } = deployments;
    console.log("Deploy MappingChallenge contract...");

    const tx = await deploy("MappingChallenge", {
        from: deployer,
        args: "",
        log: true,
    });
};

module.exports.tags = ["all", "10", "MappingChallenge"];
