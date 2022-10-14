const { assert } = require("chai");

const { ethers, getNamedAccounts } = require("hardhat");

describe("04-GuessTheNewNumberChallenge", function () {
    let guessTheRandomNumberContract, attacker, value, player;
    beforeEach(async function () {
        //make a snapshot by calling fixture
        await deployments.fixture("4");
        player = (await getNamedAccounts()).player;
        value = ethers.utils.parseEther("1");
        guessTheNewNumberContract = await ethers.getContract("GuessTheNewNumberChallenge");
        attacker = await ethers.getContract("GuessTheNewNumberAttacker");
    });

    describe("guess", async function () {
        it("Find the 'new' number and get the contract's ether", async function () {
            //the most sensitive thing from this challenge from my pov is block.timestamp
            //block timestamp is set by the miner so it is easier to attack this contract with another contract
            // calculate desired answer within attacking contract and pass it to target contract
            await attacker.attack();
            isComplete = await guessTheNewNumberContract.isComplete();
            assert.equal(isComplete, true);
        });
    });
});
