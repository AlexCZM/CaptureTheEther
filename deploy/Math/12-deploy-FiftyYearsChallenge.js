const { ethers } = require("hardhat");

module.exports = async ({ deployments, getNamedAccounts }) => {
    const deployer = (await getNamedAccounts()).deployer;
    const player = (await getNamedAccounts()).player;
    const { deploy, log } = deployments;
    const value = ethers.utils.parseEther("1");
    console.log("Deploy FiftyYearsChallenge contract...");
    const args = [player];
    const tx = await deploy("FiftyYearsChallenge", {
        from: deployer,
        args: args,
        value: value,
        log: true,
    });
};

module.exports.tags = ["all", "12", "FiftyYearsChallenge"];
