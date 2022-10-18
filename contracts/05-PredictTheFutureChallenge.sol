// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

contract PredictTheFutureChallenge {
    address public guesser;
    uint8 guess;
    uint256 settlementBlockNumber;

    constructor() payable {
        require(msg.value >= 1 ether);
    }

    function isComplete() public view returns (bool) {
        return address(this).balance == 0;
    }

    function lockInGuess(uint8 n) public payable {
        require(guesser == address(0), "one player at a time");
        require(msg.value == 1 ether, "Not enough ether");

        guesser = msg.sender;
        guess = n;
        settlementBlockNumber = block.number + 1;
    }

    function settle() public {
        require(msg.sender == guesser, "Sender not the guesser");
        require(block.number > settlementBlockNumber, "Block number too small");
        uint8 answer = uint8(
            uint256(keccak256(abi.encodePacked(blockhash(block.number - 1), block.timestamp))) % 10
        );

        // uint8 answer = uint8(uint256(keccak256(abi.encodePacked(uint256(2)))) % 2);
        //guesser = address(0);
        if (guess == answer) {
            payable(msg.sender).transfer(2 ether);
        }
    }
}
