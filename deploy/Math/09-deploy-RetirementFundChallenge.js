const { ethers } = require("hardhat");

module.exports = async ({ deployments, getNamedAccounts }) => {
    const deployer = (await getNamedAccounts()).deployer;
    const player = (await getNamedAccounts()).player;
    const { deploy, log } = deployments;
    const value = ethers.utils.parseEther("1");
    console.log("Deploy RetirementFundChallenge contract...");
    let args = [player];

    const tx = await deploy("RetirementFundChallenge", {
        from: deployer,
        args: args,
        value: value,
        log: true,
    });

    args = [tx.address];
    console.log("Deploy RetirementFundForceEther contract...");
    await deploy("RetirementFundForceEther", {
        from: deployer,
        args: args,
        value: value,
        log: true,
    });
};

module.exports.tags = ["all", "9", "RetirementFundChallenge"];
