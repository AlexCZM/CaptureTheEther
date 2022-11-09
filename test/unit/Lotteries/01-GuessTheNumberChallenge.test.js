const { assert } = require("chai");
const { ethers, getNamedAccounts } = require("hardhat");

describe("01-GuessTheNumberChallenge", function () {
    let guessContract, value, player;
    beforeEach(async function () {
        //make a snapshot by calling fixture
        await deployments.fixture("1");
        player = (await getNamedAccounts()).player;
        value = ethers.utils.parseEther("1");
        guessContract = await ethers.getContract("GuessTheNumberChallenge");
    });
    describe("guess function", function () {
        it("empties the contract", async function () {
            await guessContract.guess(42, { value: value });
            const balanceZero = await guessContract.isComplete();
            assert.equal(balanceZero, true);
        });
    });
});
