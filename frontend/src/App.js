import { useState } from "react";
import { ThemeProvider } from "./components/ThemeContext";
import LandingPage from "./pages/LandinPage";
import MetaMaskOnboarding from "@metamask/onboarding";

function App() {
  const [currentAccount, setCurrentAccount] = useState();

  const currentUrl = new URL(window.location.href);
  const forwarderOrigin =
    currentUrl.hostname === "localhost" ? "http://localhost:9010" : undefined;

  const { isMetaMaskInstalled } = MetaMaskOnboarding;

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      console.log("MetaMask is installed!");
    } else {
      let onboarding = new MetaMaskOnboarding({ forwarderOrigin });
      onboarding.startOnboarding();
    }

    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      if (addressArray.length > 0) {
        setCurrentAccount(addressArray[0]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ThemeProvider>
      <div className="">
        <LandingPage connectWallet={connectWallet} />
      </div>
    </ThemeProvider>
  );
}

export default App;
