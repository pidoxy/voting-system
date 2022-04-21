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
  const { ethereum } = window;

  // Account Details
  const [currentAccount, setCurrentAccount] = useState("");
  const [chainId, setChainId] = useState("");
  const [networkId, setNetworkId] = useState("");
  const [contract, setContract] = useState("");
  const [admin, setAdmin] = useState("");

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

    // check role of user that logged in
    const checkRole = async () => {
      // Now you can call functions of the contract
      try {
        // loading alert to show transaction is being sent
        console.log("Loading...");
        // setAdmin(await contract.hasRole(ethers.utils.formatBytes32String("CHAIRMAN_BOD"), currentAccount))
        console.log(admin); // tx.wait();

        // alert success message
        console.log("Transaction Successful!");
      } catch (err) {
        console.log(err);
      }
      currentAccount === "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
        ? setAdmin(true)
        : setAdmin(false);
      console.log(
        currentAccount === "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266"
          ? `${true}...`
          : `${false}...`
      );
    };

    checkRole();
  })();

  // disconnect wallet function
  const disconnectWallet = async () => {
    await window.ethereum.request({
      method: "eth_requestAccounts",
      params: [{eth_accounts: {}}]
  })
  }

  const loadData = () => {
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

  useEffect(() => {
    loadData();
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
                disconnectWallet={disconnectWallet}
                admin={
                  currentAccount ===
                  "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266"
                    ? true
                    : false
                }
                // admin={admin}
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
