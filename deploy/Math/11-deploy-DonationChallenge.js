const { ethers } = require("hardhat");

module.exports = async ({ deployments, getNamedAccounts }) => {
    const deployer = (await getNamedAccounts()).deployer;
    const { deploy, log } = deployments;
    const value = ethers.utils.parseEther("1");
    console.log("Deploy DonationChallenge contract...");

    const tx = await deploy("DonationChallenge", {
        from: deployer,
        args: "",
        value: value,
        log: true,
    });
};

module.exports.tags = ["all", "11", "DonationChallenge"];
