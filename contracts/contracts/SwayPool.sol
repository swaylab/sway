// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title SwayPool
/// @notice One contract per pool. Buyers deposit pricePerUnit AVAX to join.
///         Creator releases funds to the winning seller, or refunds all buyers.
contract SwayPool {
    address public immutable creator;
    uint256 public immutable pricePerUnit; // in wei
    uint256 public immutable minParticipants;

    address[] private _participants;
    mapping(address => bool) public hasJoined;

    bool public released;
    bool public refunded;

    event Joined(address indexed participant);
    event Released(address indexed seller, uint256 amount);
    event Refunded(uint256 count);

    error AlreadySettled();
    error AlreadyJoined();
    error WrongAmount();
    error NotCreator();
    error MinNotReached();

    constructor(uint256 _pricePerUnit, uint256 _minParticipants) {
        creator = msg.sender;
        pricePerUnit = _pricePerUnit;
        minParticipants = _minParticipants;
    }

    /// @notice Join the pool by sending exactly pricePerUnit AVAX
    function join() external payable {
        if (released || refunded) revert AlreadySettled();
        if (hasJoined[msg.sender]) revert AlreadyJoined();
        if (msg.value != pricePerUnit) revert WrongAmount();

        _participants.push(msg.sender);
        hasJoined[msg.sender] = true;

        emit Joined(msg.sender);
    }

    /// @notice Number of buyers who have joined
    function participantCount() external view returns (uint256) {
        return _participants.length;
    }

    /// @notice Total AVAX locked in this contract
    function totalLocked() external view returns (uint256) {
        return address(this).balance;
    }

    /// @notice List all participant wallet addresses
    function getParticipants() external view returns (address[] memory) {
        return _participants;
    }

    /// @notice Creator releases all locked funds to the winning seller
    function release(address payable seller) external {
        if (msg.sender != creator) revert NotCreator();
        if (released || refunded) revert AlreadySettled();
        if (_participants.length < minParticipants) revert MinNotReached();

        released = true;
        uint256 amount = address(this).balance;
        emit Released(seller, amount);
        seller.transfer(amount);
    }

    /// @notice Creator refunds all buyers (e.g. pool expired or cancelled)
    function refundAll() external {
        if (msg.sender != creator) revert NotCreator();
        if (released || refunded) revert AlreadySettled();

        refunded = true;
        uint256 count = _participants.length;
        emit Refunded(count);
        for (uint256 i = 0; i < count; i++) {
            payable(_participants[i]).transfer(pricePerUnit);
        }
    }
}
