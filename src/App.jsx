import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { FOUNDERS_PASS_CONTRACT, WRLD_CONTRACT } from "./utils/constants/constants";
import FoundersPassContractAbi from "./utils/json/FoundersPassContractAbi.json";
import WRLDContractAbi from "./utils/json/WRLDContractAbi.json";
import Congratulations from "./views/Congratulations";
import ConnectWallet from "./views/ConnectWallet";
import Wave1 from "./views/Wave1";
import Wave1Holders from "./views/Wave1Holders";
import Wave2And3 from "./views/Wave2And3";


const App = () => {
  const [currentAccount, setCurrentAccount] = useState();

  const [currentWave, setCurrentWave] = useState(1);
  const [viewWave1Holders, setViewWave1Holders] = useState(false);

  const [totalMintedSoFar, setTotalMintedSoFar] = useState(0);
  const [totalMinted, setTotalMinted] = useState();

  const [viewContratulations, setViewCongratulations] = useState(false);

  const [inWhitelist, setInWhitelist] = useState(false);

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

  useEffect(() => {
    if (currentAccount) {
      getCurrentStage();
    }
  });

  useEffect(() => {
    console.log("Whitelist user: ", inWhitelist);
  }, [inWhitelist]);

  const getCurrentStage = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(FOUNDERS_PASS_CONTRACT, FoundersPassContractAbi.abi, signer);

        let currentStage = await connectedContract.stage();

        let stageNumber = currentStage.toNumber();

        if (stageNumber === 0) {
          setCurrentWave('2WL');
        } else if (stageNumber === 1) {
          setCurrentWave(2);
        } else if (stageNumber === 2) {
          setCurrentWave(3);
        }

        if (stageNumber === 0 || stageNumber === 1) {
          let tMinted = await connectedContract.totalSupply(0);
          setTotalMintedSoFar(tMinted.toNumber());
        } else if (stageNumber === 2) {
          let tMinted = await connectedContract.totalSupply(1);
          setTotalMintedSoFar(tMinted.toNumber());
        }

        if (stageNumber === 0) {
          let wl = await connectedContract.isWhiteListed(currentAccount);
          setInWhitelist(wl);
        }

        console.log("Successfully obtained the Wave and TotalMinted!");

      } else {
        alert('Man, go and install Metamask!');
      }
    } catch (error) {
      console.log(error);
    }
  }

  const mintWithEth = async (ethAmount, totalQuantity) => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(FOUNDERS_PASS_CONTRACT, FoundersPassContractAbi.abi, signer);

        let mintTxn;

        if (currentWave === '2WL') {
          mintTxn = await connectedContract.mintPresaleWithEth(totalQuantity, {value: ethers.utils.parseEther(`${ethAmount}`)});
        } else if (currentWave === 2) {
          mintTxn = await connectedContract.mintWave2WithEth(totalQuantity, {value: ethers.utils.parseEther(`${ethAmount}`)});
        } else if (currentWave === 3) {
          mintTxn = await connectedContract.mintWave3WithEth(totalQuantity, {value: ethers.utils.parseEther(`${ethAmount}`)});
        } else {
          throw Error("Not recognized stage value.");
        }

        await mintTxn.wait();

        setTotalMinted(totalQuantity);
        setViewCongratulations(true);
      } else {
        alert('Man, go and install Metamask!');
      }
    } catch (error) {
      console.log(error);
    }
  }

  const mintWithWrld = async (wrldAmount, totalQuantity) => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(FOUNDERS_PASS_CONTRACT, FoundersPassContractAbi.abi, signer);
        const connectedWrldContract = new ethers.Contract(WRLD_CONTRACT, WRLDContractAbi.abi, signer);

        let approveTxn = await connectedWrldContract.approve(FOUNDERS_PASS_CONTRACT, ethers.utils.parseEther(`${wrldAmount}`));
        
        console.log("Succesfully approved NFTWorlds contract to transfer the $WRLD amount set.")
        
        await approveTxn.wait();

        let mintTxn;

        if (currentWave === '2WL') {
          mintTxn = await connectedContract.mintPresaleWithWrld(totalQuantity);
        } else if (currentWave === 2) {
          mintTxn = await connectedContract.mintWave2WithWrld(totalQuantity);
        } else if (currentWave === 3) {
          mintTxn = await connectedContract.mintWave3WithWrld(totalQuantity);
        } else {
          throw Error("Not recognized stage value.");
        }

        await mintTxn.wait();

        setTotalMinted(totalQuantity);
        setViewCongratulations(true);
      } else {
        alert('Man, go and install Metamask!');
      }
    } catch (error) {
      console.log(error);
    }
  }

  if (viewContratulations) {
    return(
      <Congratulations
        wave={currentWave}
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
    if (!viewWave1Holders) {
      if (currentWave === 1) {
        return(
          <Wave1
            setViewWave1Holders={setViewWave1Holders}
          />
        );
      } else if (['2WL', 2, 3].includes(currentWave)) {
        return (
          <Wave2And3
            wave={currentWave}
            totalMinted={totalMintedSoFar}
            mintWithEth={mintWithEth}
            mintWithWrld={mintWithWrld}
          />
        );
      }
    } else {
      return(
        <Wave1Holders
          setViewWave1Holders={setViewWave1Holders}
        />
      );
    }
  }

}

export default App;