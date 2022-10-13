// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

contract GuessTheNumberChallenge {
    uint8 answer = 42;

    // in an earlier solidity version the 'constructor' function had the contract name
    // replace it to work with latest version
    constructor() public payable {
        require(msg.value == 1 ether);
    }

    function isComplete() public view returns (bool) {
        return address(this).balance == 0;
    }

    function guess(uint8 n) public payable {
        require(msg.value == 1 ether);

        if (n == answer) {
            // 'call' is the recomanded method to send ether but keep the original implementation
            payable(msg.sender).transfer(2 ether);
        }
    }
}
