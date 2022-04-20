import { useState } from "react";
import { ThemeProvider } from "./components/ThemeContext";
import LandingPage from "./pages/LandingPage";
import MetaMaskOnboarding from "@metamask/onboarding";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Dashboard from "./pages/Dashboard";

function App() {
  // Destructured Ethereum window object
  const { ethereum } = window;

  // Account Details
  const [currentAccount, setCurrentAccount] = useState("");
  const [chainId, setChainId] = useState("");
  const [networkId, setNetworkId] = useState("");

  
  const currentUrl = new URL(window.location.href);
  const forwarderOrigin =
    currentUrl.hostname === "localhost" ? "http://localhost:9010" : undefined;

    // connect wallet function
  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      console.log("MetaMask is installed!");
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      if (addressArray.length > 0) {
        setCurrentAccount(addressArray);
      }
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

      if (addressArray.length > 0) {
        setCurrentAccount(addressArray[0]);
      }

      const chain = await ethereum.request({
        method: "eth_chainId",
      });
      const network = await ethereum.request({
        method: "net_version",
      });
      setChainId(chain);
      setNetworkId(network);
    }
  })();

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
              />
            }
          />
          <Route
            path="/dashboard/*"
            element={<Dashboard currentAccount={currentAccount} />}
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
