// SPDX-License-Identifier: MIT
/** This issue has been solved from solidity compiler ≥ 0.6.0.
 * https://docs.soliditylang.org/en/v0.8.17/060-breaking-changes.html */
pragma solidity 0.4.21;

contract MappingChallenge {
    bool public isComplete;
    uint256[] map;

    function set(uint256 key, uint256 value) public {
        // Expand dynamic array as needed
        if (map.length <= key) {
            map.length = key + 1;
        }
        map[key] = value;
    }

    function get(uint256 key) public view returns (uint256) {
        return map[key];
    }
}
