import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("ChainMeUp", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshopt in every test.
  async function deployMain() {
    const [owner, otherAccount] = await ethers.getSigners();

    const ChainMeUpDeployer = await ethers.getContractFactory("ChainMeUpProfiles");
    const chainMeUpDeployer = await ChainMeUpDeployer.deploy();

    return { deployer: chainMeUpDeployer, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should deploy", async function () {
      const { deployer, otherAccount } = await loadFixture(deployMain);
      
      await deployer.createProfile()
      const deployedAddress = await deployer.getProfile()

      expect(deployedAddress).to.be.properAddress;
      expect(deployedAddress).to.not.be.equal(ethers.constants.AddressZero);

      await deployer.createProfile()
      const secondTime = await deployer.getProfile()
      expect(secondTime).to.be.equal(deployedAddress)

      await deployer.connect(otherAccount).createProfile()
      const otherAccountProfile = await deployer.connect(otherAccount).getProfile()
      expect(otherAccountProfile).to.be.not.equal(deployedAddress)
    });
  });
});
