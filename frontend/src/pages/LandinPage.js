import { useEffect } from "react";
import { useState } from "react";

const LandingPage = (props) => {
    // state 
    const [isMetaMaskInstalled, setMetaMaskInstalled] = useState();
    // props
    const { connectWallet } = props;

    useEffect(() => {
    // check if metamask is installed
    if (typeof window.ethereum !== "undefined") {
        setMetaMaskInstalled(true);
      } else {
          setMetaMaskInstalled(false);
      }
    }, []);
    
  return (
    <div className="py-10 px-4 flex flex-col items-center justify-center bg-slate-100 md:flex-row space-y-5 md:space-y-0 md:space-x-5 w-screen h-screen">
      <div className="basis-1/2 text-center ">
        <div>
          <h1 className="text-2xl">School Voting Dapp</h1>
          <p>
            A platform that gives you access to secure polling system. Developed
            using blockchain technology.
          </p>
        </div>
      </div>
      <div className="basis-1/2 text-center ">
        <div className="bg-white py-10 px-5 rounded-md">
          <h1 className="text-2xl">School Votechain</h1>
          <button onClick={connectWallet} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-5 rounded">
            {isMetaMaskInstalled ? "Connect to metamask wallet" : "Install MetaMask"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
