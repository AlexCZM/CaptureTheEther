const { assert } = require("chai");
const { ethers, getNamedAccounts } = require("hardhat");

describe("06-PredictTheBlockHashChallenge", function () {
    let predictTheBlockHashContract, value, player;
    beforeEach(async function () {
        //make a snapshot by calling fixture
        await deployments.fixture("6");
        player = (await getNamedAccounts()).player;

        value = ethers.utils.parseEther("1");
        predictTheBlockHashContract = await ethers.getContract(
            "PredictTheBlockHashChallenge",
            player
        );
        const zeroHash = ethers.utils.formatBytes32String(""); // this returns 0x00...00
        await predictTheBlockHashContract.lockInGuess(zeroHash, { value: value });
    });

    describe("settle function", async function () {
        it("wait for 257 blocks and  get the contract ether", async function () {
            /**blockhash(uint blockNumber) returns (bytes32): hash of the given block when
             *  blocknumber is one of the 256 most recent blocks; otherwise returns zero */
            const blocks = "0x101";
            const initialBlockNo = await ethers.provider.getBlockNumber();
            await hre.network.provider.send("hardhat_mine", [blocks]);
            const currentBlockNo = await ethers.provider.getBlockNumber();
            await predictTheBlockHashContract.settle();
            const isComplete = await predictTheBlockHashContract.isComplete();

            assert.equal(isComplete === true, currentBlockNo == initialBlockNo + Number(blocks));
        });
    });
});
