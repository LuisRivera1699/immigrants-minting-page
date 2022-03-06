import { useEffect, useRef, useState } from "react";
import ConnectWallet from "./views/ConnectWallet";
import Wave1 from "./views/Wave1";
import Wave1Holders from "./views/Wave1Holders";
import Wave2And3 from "./views/Wave2And3";

const App = () => {
  const [currentAccount, setCurrentAccount] = useState();

  const [currentWave, setCurrentWave] = useState(1);
  const [viewWave1Holders, setViewWave1Holders] = useState(false);

  const [totalMinted, setTotalMinted] = useState(0);

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
  }, []);

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

  })

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
            totalMinted={totalMinted}
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