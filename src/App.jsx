import { ethers } from "ethers";
import { useEffect, useState } from "react";
import MainLayout from "./components/MainLayout";
import Congratulations from "./views/Congratulations";
import ConnectWallet from "./views/ConnectWallet";
import SoldOut from "./views/SoldOut";
import minus from "./assets/minus.png";
import plus from "./assets/plus.png";
import { IMMIGRANT_CONTRACT, IMMIGRANT_CONTRACT_ABI } from "./utils/constants/constants";

const App = (props) => {
  const [currentAccount, setCurrentAccount] = useState();

  const [totalMinted, setTotalMinted] = useState();

  const [viewContratulations, setViewCongratulations] = useState(false);

  const [soldOut, setSoldOut] = useState(false);

  const [mintQuantity, setMintQuantity] = useState(1);
  const [isMinting, setIsMinting] = useState(false);

  const [totalMintedSoFar, setTotalMintedSoFar] = useState(0);



  const checkIfWalletIsConnected = async () => {
    const {ethereum} = window;

    if (!ethereum) {
      alert('Man, go and install Metamask!');
      return;
    }

    const accounts = await ethereum.request({method: 'eth_accounts'});

    if (accounts.length !== 0) {
      const account = accounts[0];
      setCurrentAccount(account);

      let chainId = await ethereum.request({method: 'eth_chainId'});
      if (chainId !== "0x1") {
        alert("You are connected to another network. Please switch your Metamask to Ethereum Mainnet and update the page.");
      }
    }
  }

  const connectWallet = async () => {
    try {
      const {ethereum} = window;

      if (!ethereum) {
        alert('Man, go and install Metamask!');
        return;
      }

      const accounts = await ethereum.request({method: 'eth_requestAccounts'});

      setCurrentAccount(accounts[0]);

      let chainId = await ethereum.request({method: 'eth_chainId'});
      if (chainId !== "0x1") {
        alert("You are connected to another network. Please switch your Metamask to Ethereum Mainnet and update the page.");
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected();
  });

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on(
        'accountsChanged', () => {
          window.location.reload();
        }
      );
    }
  });

  const handleMinusMintingQuantity = () => {
    if (mintQuantity > 1) {
        setMintQuantity(mintQuantity - 1);
    }
  }

  const handlePlusMintingQuantity = () => {
    if (mintQuantity < 6) {
        setMintQuantity(mintQuantity + 1);
    }
  }

  const getDisabled = () => {
    if  (isMinting) {
        return true;
    }
    if (props.wave === '2WL' && !props.inWhitelist) {
        return true;
    }
    if (totalMinted + mintQuantity > 700) {
        return true;
    }
  }

  useEffect(() => {
    if (currentAccount) {
      getTotalMintedSoFar();
    }
  })

  const getTotalMintedSoFar = async () => {
    try {
        const { ethereum } = window;

        if (ethereum) {

            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const iContract = new ethers.Contract(IMMIGRANT_CONTRACT, IMMIGRANT_CONTRACT_ABI, signer);

            let totalSupply = await iContract.totalSupply();
            let tsNumber = totalSupply.toNumber();

            if (tsNumber >= 700) {
              setSoldOut(true);
            }
            setTotalMintedSoFar(totalSupply.toNumber());
        
        } else {
            alert("Man, go and get Metamask!");
        }
    } catch (error) {
        alert("An error has ocurred, refresh the page and try again.");
        console.error(error);
    }
  }

  const mint = async () => {
    setIsMinting(true);
    try {
        const { ethereum } = window;

        if (ethereum) {

            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const iContract = new ethers.Contract(IMMIGRANT_CONTRACT, IMMIGRANT_CONTRACT_ABI, signer);

            let mintTxn = await iContract.presaleMint(mintQuantity, {value: ethers.utils.parseEther(`${0.015 * mintQuantity}`)});
        
            await mintTxn.wait();
            setViewCongratulations(true);
            setTotalMinted(mintQuantity);

        } else {
            alert("Man, go and get Metamask!");
        }
    } catch (error) {
        alert(error.message);
        console.error(error);
    }
    setIsMinting(false);
  }

  if (soldOut) {
    return(
      <SoldOut/>
    );
  }

  if (viewContratulations) {
    return(
      <Congratulations
        mintQuantity={totalMinted}
      />
    );
  }

  if (!currentAccount) {
    return(
      <ConnectWallet
        connectWallet={connectWallet}
      />
    );
  } else {
    return (
      <MainLayout>
        <div className="flex-m c">
            <h2 className="subtitle">
                Mint Your Inmigrant
            </h2>
            <p className="wave-info">
                The Immigrant a collection of 4,000 NFT's with visual art that supports a social cause and has incredible utility. Sale will be open from 12/05/2022 to 17/05/2022.
            </p>
            <p className="mint-counter">
                {totalMintedSoFar} / 700 minted
            </p>
            <div className="form">
                <div className="input-quantity">
                    <img className="quantity-mod" src={minus} alt="" onClick={handleMinusMintingQuantity}/>
                    <p>{mintQuantity}</p>
                    <img className="quantity-mod" src={plus} alt="" onClick={handlePlusMintingQuantity}/>
                </div>
                <div className="button-container">
                    <button className="mint-button" disabled={getDisabled()} onClick={mint}>
                        {
                            isMinting ?
                            <div className="lds-circle"><div></div></div> :
                            totalMintedSoFar + mintQuantity > 700 ?
                            'WOULD EXCEED' :
                            `MINT ${(0.015*mintQuantity).toFixed(3)} $ETH`
                        }  
                    </button>
                </div>
            </div>
        </div>
      </MainLayout>
    );
  }
}

export default App;