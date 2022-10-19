const { ethers } = require("hardhat");

module.exports = async ({ deployments, getNamedAccounts }) => {
    const deployer = (await getNamedAccounts()).deployer;
    const { deploy, log } = deployments;
    const value = ethers.utils.parseEther("1");
    console.log("Deploy PredictTheBlockHashChallenge contract...");

    const tx = await deploy("PredictTheBlockHashChallenge", {
        from: deployer,
        args: "",
        value: value,
        log: true,
    });
    console.log("Deploy the attacker contract...");
    //get contract address
    const args = [tx.address];
    await deploy("PredictTheBlockHashAttacker", {
        from: deployer,
        args: args,
        log: true,
    });
};

module.exports.tags = ["all", "6", "PredictTheBlockHashChallenge"];
