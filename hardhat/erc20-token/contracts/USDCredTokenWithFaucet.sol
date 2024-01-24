
// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract USDCredTokenWithFaucet is ERC20 {
    constructor(uint256 initialSupply) ERC20("USD Credit Token", "USD") {
        _mint(msg.sender, initialSupply);
    }

    // Faucet function to distribute tokens
    function faucet(address recipient, uint256 amount) public {
        _mint(recipient, amount);
    }
}