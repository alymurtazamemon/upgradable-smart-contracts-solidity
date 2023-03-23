// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract BoxV1 is Initializable, UUPSUpgradeable, OwnableUpgradeable {
    uint256 private _value;

    // * Emitted when the stored value changes
    event ValueChanged(uint256 value);

    function initialize() public initializer {
        __Ownable_init();
        __UUPSUpgradeable_init();
        _value = 0;
    }

    function _authorizeUpgrade(address) internal override onlyOwner {}

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
        return 1;
    }
}
