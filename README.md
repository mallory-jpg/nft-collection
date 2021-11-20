# NFT Collection Web3 App

Built with @buildspace 🦄

## Setup
1. Startup a sample HardHat project: `npx hardhat` 
2. Install project dependencies: `npm install --save-dev @nomiclabs/hardhat-waffle ethereum-waffle chai @nomiclabs/hardhat-ethers ethers`
3. Install OpenZeppelin library: `npm install @openzeppelin/contracts`
4. Test setup by deploying to local blockchain: `npx hardhat run scripts/sample-script.js` results in 👇

<img width="408" alt="Screen Shot 2021-11-20 at 1 13 21 PM" src="https://user-images.githubusercontent.com/65197541/142738337-d1d5b93a-cd19-40e1-a72f-db82e2b975e6.png">

### Bugs & Oddities
If using VSCode: 
* make sure ethers are not auto-imported into solidity contract
* imports might be unresolved if the compiler isn't globally installed on your system

### HardHat

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```
