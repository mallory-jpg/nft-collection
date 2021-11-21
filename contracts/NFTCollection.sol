// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0; // version of solidity compiler we want to use

// import OpenZeppelin contracts
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

import { Base64 } from "./libraries/Base64.sol";

// inherit imported contract
contract NFTCollection is ERC721URIStorage { 
    // keep track of token ids
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    // SVG code builder
    string baseSvg = "<svg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='xMinYMin meet' viewBox='0 0 350 350'><style>.base { fill: white; font-family: serif; font-size: 24px; }</style><rect width='100%' height='100%' fill='black' /><text x='50%' y='50%' class='base' dominant-baseline='middle' text-anchor='middle'>";

    // funny array words
    string[] firstWords = ["Scuba", "Dirty", "Uncle", "Mister", "Electric", "Special", "Buttery", "Liquid", "Mrs.", "South", "Baby", "Quirky", "The", "Big", "Only"];
    string[] secondWords = ["Donkey", "Shirty", "Female", "Duck", "Pump", "Fries", "Ointment", "Parole", "Noodle", "Butter", "Me", "Chicken", "Elbow", "Cheese", "Fudge"];
    string[] thirdWords = ["Socks", "Matters", "Lumps", "Ham", "Fruit", "Church", "Frogspit", "Booty", "Love", "Mischief", "Queasy", "Chowder", "Chowder", "Patrol", "Squirrel"];

    event NewEpicNFTMinted(address sender, uint256 tokenId);

    // constructor uses NFT token name & symbol - haha, 'femme' - to declare contract
    constructor() ERC721 ("EphemeraNFT", "PHEM") {
        console.log("NFT contract initialized.");
    }

    // I create a function to randomly pick a word from each array.
    function pickRandomFirstWord(uint256 tokenId) public view returns (string memory) {
        // Random generator - as random as possible right now in the blockchain
        uint256 rand = random(string(abi.encodePacked("FIRST_WORD", Strings.toString(tokenId))));
        // Squash the # between 0 and the length of the array to avoid going out of bounds.
        rand = rand % firstWords.length;
        return firstWords[rand];
    }

    function pickRandomSecondWord(uint256 tokenId) public view returns (string memory) {
        uint256 rand = random(string(abi.encodePacked("SECOND_WORD", Strings.toString(tokenId))));
        rand = rand % secondWords.length;
        return secondWords[rand];
    }

    function pickRandomThirdWord(uint256 tokenId) public view returns (string memory) {
        uint256 rand = random(string(abi.encodePacked("THIRD_WORD", Strings.toString(tokenId))));
        rand = rand % thirdWords.length;
        return thirdWords[rand];
    }

    function random(string memory input) internal pure returns (uint256) {
        return uint256(keccak256(abi.encodePacked(input)));
    }

    // User gets NFT
    function makeAnEpicNFT() public {
        // Get the current tokenId, starting at 0.
        uint256 newItemId = _tokenIds.current(); // token ID is a state variable tied to the NFT itself

        string memory first = pickRandomFirstWord(newItemId);
        string memory second = pickRandomSecondWord(newItemId);
        string memory third = pickRandomThirdWord(newItemId);
        string memory combinedWord = string(abi.encodePacked(first, second, third));

        // use baseSVG for the combination
        string memory finalSvg = string(abi.encodePacked(baseSvg, first, second, third, "</text></svg>"));

        // Get all the JSON metadata in place and base64 encode it.
        string memory json = Base64.encode(
            bytes(
                string(
                    abi.encodePacked(
                        '{"name": "',
                        // Set NFT title as the generated word
                        combinedWord,
                        '", "description": "A highly acclaimed collection of squares.", "image": "data:image/svg+xml;base64,',
                        // We add data:image/svg+xml;base64 and then append our base64 encode our svg.
                        Base64.encode(bytes(finalSvg)),
                        '"}'
                    )
                )
            )
        );

        // Just like before, we prepend data:application/json;base64, to our data.
        string memory finalTokenUri = string(
            abi.encodePacked("data:application/json;base64,", json)
        );

        console.log("\n--------------------");
        console.log(finalSvg);
        console.log(
            string(
                abi.encodePacked(
                    "https://nftpreview.0xdev.codes/?code=", // NFT preview 
                    finalTokenUri
                )
            )
        );
        console.log("--------------------\n");

        // Authenticate & mint NFT to sender with msg.sender
        _safeMint(msg.sender, newItemId);

        // Set the NFTs JSON metadata, hosted on jsonkeeper.com
        _setTokenURI(newItemId, finalTokenUri);

        console.log("An NFT w/ ID %s has been minted to %s", newItemId, msg.sender);
        // Increment the counter for the next NFT
        _tokenIds.increment();

        // emit event that is captured on the frontend
        emit NewEpicNFTMinted(msg.sender, newItemId);
    }
}

