// test.NFTCollection.js

// Load dependencies
const { expect } = require('chai');

// Start test block
describe('NFTCollection', function () {
    before(async function () {
        this.NFTCollection = await ethers.getContractFactory('NFTCollection');
    });

    beforeEach(async function () {
        this.nftContract = await this.NFTCollection.deploy();
        await this.nftContract.deployed();
    });

    // Test case #1
    it('deploys contract', async function () {
        expect((await this.nftContract.deployed()));
    });
    
    // Test case #2
    it('mints an NFT', async function () {
        let txn = await this.nftContract.makeAnEpicNFT();
        //await this.nftContract.makeAnEpicNFT();
        // test return value
        expect((await txn.wait()));
    });
});