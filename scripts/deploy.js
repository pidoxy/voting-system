const { ethers, upgrades } = require("hardhat");

const main = async () => {
  const [deployer] = await ethers.getSigners();
  const principal = "0x7F4cA4B78d555D5Fb1f91abfBb91A1365e0e8802"
  const chairman = await deployer.getAddress()
  
  const SchoolAccessControl = await ethers.getContractFactory("SchoolAccessControl");
  const schoolAccessControl = await SchoolAccessControl.deploy(chairman, principal);

  await schoolAccessControl.deployed();
  console.log("Your contract has been deployed 🤓", schoolAccessControl.address);
};

const runMain = async () => {
  try {
      await main();
      process.exit(0);
  } catch (error) {
      console.error(error);
      process.exit(1);
  }
};


runMain();
