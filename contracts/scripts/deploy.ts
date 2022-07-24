import { ethers } from "hardhat";

async function main() {
  const ChainMeUpProfiles = await ethers.getContractFactory("ChainMeUpProfiles");
  const chainMeUpProfiles = await ChainMeUpProfiles.deploy();

  await chainMeUpProfiles.deployed();
  console.log('address', chainMeUpProfiles.address)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
