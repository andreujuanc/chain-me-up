import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("ChainMeUp", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshopt in every test.
  async function deployMain() {
    const [owner, userA, userB] = await ethers.getSigners();

    const ChainMeUpProfiles = await ethers.getContractFactory("ChainMeUpProfiles");
    const chainMeUpProfiles = await ChainMeUpProfiles.deploy();

    return { profiles: chainMeUpProfiles, owner, userA, userB };
  }

  describe("Deployment", function () {
    it("Should deploy once", async function () {
      const { profiles, userA } = await loadFixture(deployMain);

      await profiles.createProfile()
      const deployedAddress = await profiles.getProfile()

      expect(deployedAddress).to.be.properAddress;
      expect(deployedAddress).to.not.be.equal(ethers.constants.AddressZero);

      await profiles.createProfile()
      const secondTime = await profiles.getProfile()
      expect(secondTime).to.be.equal(deployedAddress)

      await profiles.connect(userA).createProfile()
      const otherAccountProfile = await profiles.connect(userA).getProfile()
      expect(otherAccountProfile).to.be.not.equal(deployedAddress)
    });


    it("Should allow someone to mint a token to follow someone else", async function () {
      const { profiles, userA, userB } = await loadFixture(deployMain);
      
      await profiles.connect(userA).createProfile()
      const userA_tokenAddress = await profiles.connect(userA).getProfile()
      const userAProfile = await ethers.getContractAt("ChainMeUp", userA_tokenAddress)


      await userAProfile.connect(userB).mint([], {
        value: "1000",
      })
      expect(await userAProfile.balanceOf(userB.address, 0)).to.be.equal(1)

    })
  });
});
