import './App.css';
import keysAbi from "./keysAbi.json";
import { ethers, BigNumber } from "ethers";
import { useEffect, useState } from "react";

const keysAddress = "0xBdcf0246bFbf4c2e2C5fA4999bFC6f193C696251";

function App() {
  const [accounts, setAccounts] = useState([]);
  async function connectAccounts() {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts"
      });
      setAccounts(accounts);
    }
  }

  useEffect(() => {
    connectAccounts();
  }, []);

  // MINTING
  const [mintAmount, setMintAmount] = useState(1);
  async function handleMint() {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        keysAddress,
        keysAbi.abi,
        signer
      );
      try {
        const response = await contract.mintNFTs(BigNumber.from(mintAmount));
        console.log("response = ", response);
      } catch(err) {
        console.log("error = ", err);
      }
    }
  }

  return (
    <div className="App">
      Mint Button Testing
      {accounts.length && (
        <div>
          <button onClick={() => setMintAmount(mintAmount - 1)}>-</button>
            {mintAmount}
          <button onClick={() => setMintAmount(mintAmount + 1)}>+</button>
          <button onClick={handleMint}>Mint</button> 
        </div>
      )}
    </div>
  );
}

export default App;
