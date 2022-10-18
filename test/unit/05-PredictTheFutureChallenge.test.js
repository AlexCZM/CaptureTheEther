const { assert } = require("chai");
const { parseEther } = require("ethers/lib/utils");

const { ethers, getNamedAccounts } = require("hardhat");

describe("05-PredictTheFutureChallenge ", function () {
    let predictTheFutureContract, value, player, guessNo, gasFee;

    beforeEach(async function () {
        // set the number you thing will unlock the challenge
        guessNo = 1;
        //make a snapshot by calling fixture
        await deployments.fixture("5");
        player = (await getNamedAccounts()).player;

        value = ethers.utils.parseEther("1");
        predictTheFutureContract = await ethers.getContract("PredictTheFutureChallenge", player);
        attacker = await ethers.getContract("PredictTheFutureAttacker", player);
        await hre.network.provider.send("hardhat_mine", ["0x2"]);

        await attacker.preAttack(guessNo, { value: value });
        await hre.network.provider.send("hardhat_mine", ["0x2"]);
    });

    describe("settle", async function () {
        it("brute force attack the contract and get the ether", async function () {
            let returned;

            await new Promise(async (resolve, reject) => {
                console.log("promise...: ");
                await attacker.once("numberFound", async () => {
                    try {
                        console.log("Number found...");
                        const isComplete = await predictTheFutureContract.isComplete();
                        assert.equal(isComplete, true);
                        resolve();
                    } catch (e) {
                        reject(e);
                    }
                });
                let numberFound = false;

                for (let i = 0; i < 40; i++) {
                    console.log("while: ", i);
                    numberFound = await attacker.attack();
                }
            });

            console.log("after while");
        });
    });
});
