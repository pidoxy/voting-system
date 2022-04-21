// This is a script for deploying your contracts. You can adapt it to deploy
// yours, or create new ones.
async function main() {

  // ethers is available in the global scope
  const [deployer] = await ethers.getSigners();
  // const chairMan = await deployer.getAddress()
  const chairMan = await deployer.getAddress()
  console.log(
    "Deploying the contracts with the account:",
    chairMan
  );
  // console.log(deployer)

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const Voting = await ethers.getContractFactory("Voting");
  const voting = await Voting.deploy();
  // await voting.deployed();

  console.log("Voting address:", voting.address);

  const School = await ethers.getContractFactory("SchoolAccessControl");
  const school = await School.deploy(chairMan, chairMan);
  // await school.deployed();

  console.log("School address:", school.address);

  // We also save the contract's artifacts and address in the frontend directory
  // saveFrontendFiles(token);
}



  

function saveFrontendFiles(token) {
  const fs = require("fs");
  const contractsDir = __dirname + "/../frontend/src/contracts";

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    contractsDir + "/contract-address.json",
    JSON.stringify({ Token: token.address }, undefined, 2)
  );

  const TokenArtifact = artifacts.readArtifactSync("Token");

  fs.writeFileSync(
    contractsDir + "/Token.json",
    JSON.stringify(TokenArtifact, null, 2)
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
