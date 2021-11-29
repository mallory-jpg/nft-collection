import React, { useEffect, useState } from "react";
import './styles/App.css';
import './styles/Card.css';
import { ethers } from "ethers";
// const { ethers } = require("ethers");
import twitterLogo from './assets/twitter-logo.svg';
import NFTCollection from './utils/NFTCollection.json';
import LoadingIndicator from './Components/LoadingIndicator';


// Constants
const MY_TWITTER_HANDLE = 'culbert_mallory';
const BS_TWITTER_HANDLE = '_buildspace';
const BS_TWITTER_LINK = `https://twitter.com/${BS_TWITTER_HANDLE}`;
const MY_TWITTER_LINK = `https://twitter.com/${MY_TWITTER_HANDLE}`;
const OPENSEA_LINK = '';
const TOTAL_MINT_COUNT = 50;
const CONTRACT_ADDRESS = "0x0B39f1408e5948754f02611f80E988B403288d05";

const App = () => {

    const [currentAccount, setCurrentAccount] = useState("");
    //loading indicator
    const [isLoading, setIsLoading] = useState(false);
    
    const checkIfWalletIsConnected = async () => {
      setIsLoading(true);
      const { ethereum } = window;

      if (!ethereum) {
          console.log("Make sure you have metamask!");
          return;
      } else {
          console.log("We have the ethereum object", ethereum);
      }

      const accounts = await ethereum.request({ method: 'eth_accounts' });
      const rinkebyChainId = "0x4";
      
      // alert user on wrong network
      let chainId = await ethereum.request({ method: "eth_chainId" });
      console.log("Connected to chain " + chainId);
      if (chainId !== rinkebyChainId) {
        alert("You are not connected to the Rinkeby Test Network!");
      }

      if (accounts.length !== 0) {
          const account = accounts[0];
          console.log("Found an authorized account:", account);
          setCurrentAccount(account)
          setupEventListener()
          // setIsLoading(false);
      } else {
          console.log("No authorized account found")
      }
      setIsLoading(false);
  }

  const connectWallet = async () => {
    setIsLoading(true);
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        setIsLoading(false);
        return;
      }

      // request access to account
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      // print public address
      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]); 
      setupEventListener()
      setIsLoading(false);
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false);
  }
    // Setup event listener.
  const setupEventListener = async () => {
    // v similar to contract setup function
    try {
      setIsLoading(true);
      const { ethereum } = window;

      if (ethereum) {
        // Same stuff again
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, NFTCollection.abi, signer);

        // capture contract events
        connectedContract.on("NewEpicNFTMinted", (from, tokenId) => {
          console.log(from, tokenId.toNumber())
          alert(`Hey there! Your NFT is minted and on its way to your wallet. Right now it might be blank–it can take up to 10 min to show up on OpenSea. Here's the link: https://testnets.opensea.io/assets/${CONTRACT_ADDRESS}/${tokenId.toNumber()}`)
        });

        console.log("Setup event listener!")

      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error)
    }
  }

  const askContractToMintNft = async () => {

    try {
      setIsLoading(true);
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, NFTCollection.abi, signer);

        console.log("Going to pop wallet now to pay gas...")
        let nftTxn = await connectedContract.makeAnEpicNFT();

        console.log("Mining...please wait.")
        await nftTxn.wait();
        
        console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`);
        setIsLoading(false);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false);
}

  useEffect(() => {
    checkIfWalletIsConnected();
    setIsLoading(true);
  }, [])

  // Render Methods
  {/*const renderNotConnectedContainer = () => { // these used to be parenthesis
    if (isLoading) {
      return <LoadingIndicator />;
    } else {
      return 
    <button onClick={connectWallet} className="cta-button connect-wallet-button">
      Connect to Wallet
    </button>
    }
  }

  const renderMintUI = () => {
    if (isLoading) {
      return <LoadingIndicator />;
    } // else {
      return <button onClick={askContractToMintNft} className="cta-button connect-wallet-button">
      Mint NFT
    </button>
    //}
  }*/}

  const renderContent = () => {
    if (isLoading) {
      return <LoadingIndicator />;
    }
    if (currentAccount === "") {
      return (
        <button onClick={connectWallet} className="cta-button connect-wallet-button">
        Connect to Wallet
        </button>
      );
    } else {
      {/*return (
        <button onClick={askContractToMintNft} className="cta-button connect-wallet-button">
        Mint NFT
        </button>
      );*/}
      return (
        <div className="card" onClick={askContractToMintNft}>
        <p>Mint NFT</p>
        </div>
      );
    }
  }

  {/*const renderOpenSea = () => {
    return (
      <div>
      <button onClick={askContractToMintNft} className="cta-button connect-wallet-button">

      </button>
      </div>
    )
  }*/}


  return (
     <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header gradient-text">L'éphémère: An NFT Collection </p>
          <p className="sub-text">
            Unique. Ephemeral. Yours. ⚡ 
          </p>
        </div>
        {/*currentAccount === "" ? (renderNotConnectedContainer()) : (
          renderMintUI())*/}
        {renderContent()}
        {/*renderOpenSea()*/}
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={MY_TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built by @${MY_TWITTER_HANDLE} on @${BS_TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
    );
  }


export default App;