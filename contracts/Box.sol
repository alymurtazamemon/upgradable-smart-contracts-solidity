// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract Box is Initializable {
    uint256 private _value;

    // * Emitted when the stored value changes
    event ValueChanged(uint256 value);

    function initialize() public initializer {
        _value = 0;
    }

    // * Stores a new value in the contract
    function store(uint256 value) public {
        _value = value;
        emit ValueChanged(value);
    }

    // * Reads the last stored value
    function retrieve() public view returns (uint256) {
        return _value;
    }
}
