/*
* This script compiles the smart contract
* deploys it to local blockchain
* then logs "NFT contract initialized" to the console
*/

const main = async () => {
    // compiles contract & generates necessary artifacts under 'artifacts'
    const nftContractFactory = await hre.ethers.getContractFactory('NFTCollection');
    /* 
    * HardHat creates a local Ethereum network for this contract & destroys it after the run 
    * which creates a new, fresh blockchain each time
    */
    const nftContract = await nftContractFactory.deploy();
    // after contract is mined, deploy to local blockchain
    await nftContract.deployed();
    // after constructor runs -> fully deployed
    console.log("Contract deployed to:", nftContract.address);
};

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

runMain();