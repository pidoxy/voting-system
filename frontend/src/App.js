import { useState } from "react";
import { ThemeProvider } from "./components/ThemeContext";
import LandingPage from "./pages/LandingPage";
import MetaMaskOnboarding from "@metamask/onboarding";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { ethers } from "ethers";
import CONSTANTS from "./utils/constants";
import { useEffect } from "react";

function App() {
  // Destructured Ethereum window object
  const { ethereum, web3 } = window;

  // Account Details
  const [currentAccount, setCurrentAccount] = useState("");
  const [chainId, setChainId] = useState("");
  const [networkId, setNetworkId] = useState("");
  const [contract, setContract] = useState("");

  const currentUrl = new URL(window.location.href);
  const forwarderOrigin =
    currentUrl.hostname === "localhost" ? "http://localhost:9010" : undefined;

  // connect wallet function
  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      console.log("MetaMask is installed!");
    } else {
      let onboarding = new MetaMaskOnboarding({ forwarderOrigin });
      onboarding.startOnboarding();
    }

    // alert("MetaMask is installed!");
  };

  // get connected wallet account details
  (async () => {
    if (ethereum !== "undefined") {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const chain = await ethereum.request({
        method: "eth_chainId",
      });
      const network = await ethereum.request({
        method: "net_version",
      });

      if (addressArray.length > 0) {
        setCurrentAccount(addressArray[0]);
        setChainId(chain);
        setNetworkId(network);
      }
    }
  })();

  const callFunc = () => {
    try {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const address = signer.getAddress();
      const contract = new ethers.Contract(
        CONSTANTS.CONTRACT_ADDRESS_ACCESSCONTROL,
        CONSTANTS.ACCESSCONTROL_ABI,
        signer
      );
      console.log(contract);
      console.log(address);
      setContract(contract);
    } catch (err) {
      console.log(err);
    }
  };

  // check role of user that logged in
  const checkRole = async (currentAccount) => {
    try {
      // loading alert to show transaction is being sent
      console.log("Loading...");
      const tx = await contract;
      tx.addRole()
      tx.wait();

      // alert success message
      console.log("Transaction Successful!");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    callFunc();
    checkRole();
  }, []);

  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            exact
            element={
              <LandingPage
                currentAccount={currentAccount}
                networkId={networkId}
                connectWallet={connectWallet}
                chainId={chainId}
              />
            }
          />
          <Route
            path="/dashboard/*"
            element={
              <Dashboard
                ethers={ethers}
                contract={contract}
                currentAccount={currentAccount}
              />
            }
          />
          <Route
            path="/*"
            element={
              <div className="py-10 px-4 flex flex-col items-center justify-center bg-slate-100 md:flex-row space-y-5 md:space-y-0 md:space-x-5 w-screen h-screen">
                <p>There's nothing here!</p>
              </div>
            }
          />
        </Routes>
        <Outlet />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
