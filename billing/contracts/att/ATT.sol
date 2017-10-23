pragma solidity ^0.4.11;

import "./MiniMeToken.sol";


contract ATT is MiniMeToken {

    function ATT(address _tokenFactory)
            MiniMeToken(
                _tokenFactory,
                0x0,                     // no parent token
                0,                       // no snapshot block number from parent
                "Atmatrix Token",        // Token name
                18,                      // Decimals
                "ATT",                   // Symbol
                true                     // Enable transfers
            ) {}
}
