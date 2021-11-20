# NFT Collection Web3 App

Built with @buildspace 🦄

## A vocabulary refresher
* **Transaction**: an action that changes the blockchain, like deploying a smart contract or minting an NFT
* **Deployment**:
* **On-Chain Data**: data stored on the contract itself, rather than via a third party
* **SVG**: image built with code
* **base64**: encoding format 

## Overview
* NFT metadata format:
  ```
  {
    "name":"Yeet Love",
    "description":"Some boomers are alright.",
    "image":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaW5ZTWluIG1lZXQiIHZpZXdCb3g9IjAgMCAzNTAgMzUwIj4KICAgIDxzdHlsZT4uYmFzZSB7IGZpbGw6IHdoaXRlOyBmb250LWZhbWlseTogc2VyaWY7IGZvbnQtc2l6ZTogMTRweDsgfTwvc3R5bGU+CiAgICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJibGFjayIgLz4KICAgIDx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBjbGFzcz0iYmFzZSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+RXBpY0xvcmRIYW1idXJnZXI8L3RleHQ+Cjwvc3ZnPg=="
  }
  ```
* 

## Setup 🛠️
1. Startup a sample HardHat project: `npx hardhat` 
2. Install project dependencies: `npm install --save-dev @nomiclabs/hardhat-waffle ethereum-waffle chai @nomiclabs/hardhat-ethers ethers`
3. Install OpenZeppelin library: `npm install @openzeppelin/contracts`
4. Test setup by deploying to local blockchain: `npx hardhat run scripts/sample-script.js` results in 👇

<img width="408" alt="Screen Shot 2021-11-20 at 1 13 21 PM" src="https://user-images.githubusercontent.com/65197541/142738337-d1d5b93a-cd19-40e1-a72f-db82e2b975e6.png">
### Tools
* [Alchemy.io](https://dashboard.alchemyapi.io/)
* [JSON Keeper](https://jsonkeeper.com/) ➡️ the metadata's `image` URL has this format: `data:image/svg+xml;base64,<base64_encoded_SVG>`

### Bugs & Oddities 🐛
If using VSCode: 
* make sure ethers are not auto-imported into solidity contract
* imports might be unresolved if the compiler isn't globally installed on your system

### HardHat 🎩

"This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts.

Try running some of the following tasks:"

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```

## Testing
1. Deploy contract (using command line) to Rinkeby Testnet to validate: `npx hardhat run scripts/deploy.js --network rinkeby`
2. Check contract address on [Etherscan](https://rinkeby.etherscan.io/) 
3. Search [OpenSea's TestNet](https://testnets.opensea.io/) site using the contract address 


### Tools
* Rinkeby testnet
* Metamask wallet

# How to Use

