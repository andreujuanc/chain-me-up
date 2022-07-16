import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("ChainMeUp", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshopt in every test.
  async function deployMain() {
    const [owner, otherAccount] = await ethers.getSigners();

    const ChainMeUp = await ethers.getContractFactory("ChainMeUp");
    const chainMeUp = await ChainMeUp.deploy();

    return { chainMeUp, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should deploy", async function () {
      const { chainMeUp } = await loadFixture(deployMain);

      expect(chainMeUp.address).to.be.properAddress;
    });
  });
});
