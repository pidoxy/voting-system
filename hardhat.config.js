require("@nomiclabs/hardhat-waffle");
require("@openzeppelin/hardhat-upgrades");

// If you are using MetaMask, be sure to change the chainId to 1337
module.exports = {
  solidity: "0.8.0",
  defaultNetwork: "rinkeby",
  networks: {
    rinkeby: {
      url: "https://rinkeby.infura.io/v3/05024edc8c5d4dd68a293d22f4eda2bc",
      accounts: [
        "ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
    ],
  },
    localhost: {
      url: "http://127.0.0.1:8545"
    },
    hardhat: {
      // See its defaults
    }
  }
};