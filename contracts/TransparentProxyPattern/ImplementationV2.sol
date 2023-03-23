// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract ImplementationV2 is OwnableUpgradeable {
    uint256 private _value;

    // * Emitted when the stored value changes
    event ValueChanged(uint256 value);

    // * Stores a new value in the contract
    function store(uint256 value) public {
        _value = value;
        emit ValueChanged(value);
    }

    // * Reads the last stored value
    function retrieve() public view returns (uint256) {
        return _value;
    }

    // * get the implementation version.
    function version() public pure returns (uint256) {
        return 2;
    }

    // Increments the stored value by 1
    function increment() public onlyOwner {
        _value = _value + 1;
        emit ValueChanged(_value);
    }
}
