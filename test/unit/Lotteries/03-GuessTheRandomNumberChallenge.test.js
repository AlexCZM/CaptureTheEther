const { assert } = require("chai");

const { ethers, getNamedAccounts } = require("hardhat");

describe("03-GuessTheRandomNumberChallenge", function () {
    let guessTheRandomNumberContract, value, player;
    beforeEach(async function () {
        //make a snapshot by calling fixture
        await deployments.fixture("3");
        player = (await getNamedAccounts()).player;
        value = ethers.utils.parseEther("1");
        guessTheRandomNumberContract = await ethers.getContract("GuessTheRandomNumberChallenge");
    });

    describe("guess", async function () {
        it("Find the 'random' number, empties the contract", async function () {
            /**I was expecting to recreate the hashed answer by reading the   
            blockNo and block timestamp at deployment time. But there is no way to find this info 
            in a programmatically way. 
            You can go to a block explorer and read this data or to read directly from storage.*/
            const contractAddress = await guessTheRandomNumberContract.address;
            const storageData = await ethers.provider.getStorageAt(contractAddress, 0);
            const randomNo = Number(storageData);
            await guessTheRandomNumberContract.guess(randomNo, { value: value });
            const isComplete = await guessTheRandomNumberContract.isComplete();
            assert.equal(isComplete, true);
        });
    });
});
