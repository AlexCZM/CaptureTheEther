const { assert } = require("chai");
const { ethers, getNamedAccounts } = require("hardhat");

describe("02-GuessTheNumberChallenge", function () {
    let guessTheSecretNumberContract, value, player;
    beforeEach(async function () {
        //make a snapshot by calling fixture
        await deployments.fixture("all");
        player = (await getNamedAccounts()).player;
        value = ethers.utils.parseEther("1");
        guessTheSecretNumberContract = await ethers.getContract("GuessTheSecretNumberChallenge");
    });

    describe("guess secret number", async function () {
        it("Find the secret number, empties the contract", async function () {
            const answerHash = await guessTheSecretNumberContract.answerHash();
            let requiredNo;
            //the number passed to guess() is an uint8 -> 256 values
            for (let i = 0; i < 256; i++) {
                if (ethers.utils.keccak256(i) == answerHash) {
                    requiredNo = i;
                }
            }
            await guessTheSecretNumberContract.guess(requiredNo, { value: value });
            const balanceZero = await guessTheSecretNumberContract.isComplete();
            const foundHashNo = await guessTheSecretNumberContract.getHashedNo();
            assert.equal(balanceZero == true, answerHash == foundHashNo);
        });
    });
});
