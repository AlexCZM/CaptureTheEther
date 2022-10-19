const { ethers } = require("hardhat");

module.exports = async ({ deployments, getNamedAccounts }) => {
    const deployer = (await getNamedAccounts()).deployer;
    const { deploy, log } = deployments;
    const value = ethers.utils.parseEther("3");
    const attackerValue = ethers.utils.parseEther("20");
    console.log("Deploy PredictTheFutureChallenge(5) contract...");

    const tx = await deploy("PredictTheFutureChallenge", {
        from: deployer,
        args: "",
        value: value,
        log: true,
    });
    console.log("Deploy the attacker contract...");
    //get contract address
    const args = [tx.address];
    await deploy("PredictTheFutureAttacker", {
        from: deployer,
        args: args,
        //value: attackerValue, // cover gas
        log: true,
    });
};

module.exports.tags = ["all", "5", "PredictTheFutureChallenge"];
