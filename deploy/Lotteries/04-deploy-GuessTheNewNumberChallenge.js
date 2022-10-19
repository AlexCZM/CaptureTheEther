const { ethers } = require("hardhat");

module.exports = async ({ deployments, getNamedAccounts }) => {
    const deployer = (await getNamedAccounts()).deployer;
    const { deploy, log } = deployments;
    const value = ethers.utils.parseEther("1");
    const attackerValue = ethers.utils.parseEther("1.2");
    console.log("Deploy GuessTheNewNumberChallenge contract...");

    const tx = await deploy("GuessTheNewNumberChallenge", {
        from: deployer,
        args: "",
        value: value,
        log: true,
    });
    console.log("Deploy the attacker contract...");
    //get contract address
    const args = [tx.address];
    await deploy("GuessTheNewNumberAttacker", {
        from: deployer,
        args: args,
        value: attackerValue, // cover gas
        log: true,
    });
};

module.exports.tags = ["all", "4", "GuessTheNewNumberChallenge"];
