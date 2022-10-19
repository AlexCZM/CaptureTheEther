// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

contract GuessTheSecretNumberChallenge {
    bytes32 public answerHash = 0xdb81b4d58595fbbbb592d3661a34cdca14d7ab379441400cbfa1b78bc447c365;
    bytes32 private s_hashedNo;

    constructor() payable {
        require(msg.value == 1 ether);
    }

    function isComplete() public view returns (bool) {
        return address(this).balance == 0;
    }

    function guess(uint8 no) public payable {
        require(msg.value == 1 ether);

        s_hashedNo = keccak256(abi.encodePacked(no));
        if (keccak256(abi.encodePacked(no)) == answerHash) {
            payable(msg.sender).transfer(2 ether);
        }
    }

    function getHashedNo() public view returns (bytes32) {
        return s_hashedNo;
    }
}
