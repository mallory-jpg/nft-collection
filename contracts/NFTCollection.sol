// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0; // version of solidity compiler we want to use

// import OpenZeppelin contracts
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

// inherit imported contract
contract NFTCollection is ERC721URIStorage { 
    // keep track of token ids
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    // constructor uses NFT token name & symbol - haha, 'femme' - to declare contract
    constructor() ERC721 ("EphemeraNFT", "PHEM") {
        console.log("NFT contract initialized.");
    }

    // User gets NFT
    function makeAnEpicNFT() public {
        // Get the current tokenId, starting at 0.
        uint256 newItemId = _tokenIds.current(); // token ID is a state variable tied to the NFT itself

        // Authenticate & mint NFT to sender with msg.sender
        _safeMint(msg.sender, newItemId);

        // Set the NFTs JSON metadata, hosted on jsonkeeper.com
        _setTokenURI(newItemId, "https://jsonkeeper.com/b/V0YI");
        console.log("An NFT w/ ID %s has been minted to %s", newItemId, msg.sender);
        // Increment the counter for the next NFT
        _tokenIds.increment();
    }
}

