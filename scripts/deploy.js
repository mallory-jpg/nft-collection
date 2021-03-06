/*
* This script compiles the smart contract
* deploys it to local blockchain
* then logs "NFT contract initialized" to the console
*/

const main = async () => {
    //const [deployer] = await ethers.getSigners();
    // compiles contract & generates necessary artifacts under 'artifacts'
    const nftContractFactory = await hre.ethers.getContractFactory('NFTCollection');
    // mine contract
    const nftContract = await nftContractFactory.deploy();
    // after contract is mined, deploy to local blockchain
    await nftContract.deployed();
    // after constructor runs -> fully deployed
    console.log("Contract deployed to:", nftContract.address);

    // Call the minting function.
    let txn = await nftContract.makeAnEpicNFT()
    // Wait for it to be mined.
    await txn.wait()
    console.log("There you go, minted your silly lil NFT :)")
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