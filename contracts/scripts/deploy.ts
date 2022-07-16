import { ethers } from "hardhat";

async function main() {
  const ChainMeUp = await ethers.getContractFactory("ChainMeUp");
  const chainMeUp = await ChainMeUp.deploy();

  await chainMeUp.deployed();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
