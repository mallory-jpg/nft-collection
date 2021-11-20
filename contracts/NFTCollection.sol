// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0; // version of solidity compiler we want to use

// import OpenZeppelin contracts
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

// inherit imported contract
contract NFTCollection is ERC721URIStorage { 
    constructor() {
        console.log("NFT contract initialized."); // line will print when contract initialized first time
    }
}

