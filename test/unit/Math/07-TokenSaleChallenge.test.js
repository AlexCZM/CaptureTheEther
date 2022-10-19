const { assert } = require("chai");
const { ethers, getNamedAccounts } = require("hardhat");

describe("07-TokenSaleChallenge", function () {
    let predictTheBlockHashContract, value, player;
    beforeEach(async function () {
        //make a snapshot by calling fixture
        await deployments.fixture("6");
        player = (await getNamedAccounts()).player;

        value = ethers.utils.parseEther("1");
        tokenSaleContract = await ethers.getContract("TokenSaleChallenge", player);
    });

    describe("", async function () {
        it("", async function () {});
    });
});
