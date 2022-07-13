const {
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");

describe("RBACSolidity", function () {
  async function deployRBACs() {
    const RBACVyper = await ethers.getContractFactory("RBACVyper");
    const rbacVyper = await RBACVyper.deploy();

    const RBACSolidity = await ethers.getContractFactory("RBACSolidity");
    const rbacSolidity = await RBACSolidity.deploy();

    const [account1, account2] = await ethers.getSigners();

    return {rbacVyper, rbacSolidity, account1, account2};
  }

  describe("Roles", function () {
    it("Should return '0' before any role is set", async function () {
      const { rbacVyper, rbacSolidity, account1 } = await loadFixture(deployRBACs);

      expect(await rbacSolidity.roles(account1.address)).to.equal(0);
      expect(await rbacVyper.roles(account1.address)).to.equal(0);
    });

    it("Should set the right role", async function () {
      const { rbacVyper, rbacSolidity, account1 } = await loadFixture(deployRBACs);

      await rbacSolidity.addAdmin()
      await rbacVyper.addAdmin()

      //Solidity still returns 0
      expect(await rbacSolidity.roles(account1.address)).to.equal(0);
      expect(await rbacVyper.roles(account1.address)).to.equal(1);

    });

    it("Should set a role and add an additional role", async function () {
      const { rbacVyper, rbacSolidity, account1 } = await loadFixture(deployRBACs);

      await rbacSolidity.addAdmin()
      await rbacVyper.addAdmin()

      //Solidity still returns 0
      expect(await rbacSolidity.roles(account1.address)).to.equal(0);
      expect(await rbacVyper.roles(account1.address)).to.equal(1);

      await rbacSolidity.addMinter()
      await rbacVyper.addMinter()

      //Storage slot overwritten to only represent value of last added role
      expect(await rbacSolidity.roles(account1.address)).to.equal(1);

      await rbacSolidity.addUser()
      
      //Storage slot overwritten to only represent value of last added role
      expect(await rbacSolidity.roles(account1.address)).to.equal(2);

      await rbacSolidity.addGuest()

      //Storage slot overwritten to only represent value of last added role
      expect(await rbacSolidity.roles(account1.address)).to.equal(3);


      //bin(3) = 11, indicating both roles set for address 
      expect(await rbacVyper.roles(account1.address)).to.equal(3);
      
      await rbacVyper.addUser()
      //bin(7) = 111, indicating 3 roles set for address 
      expect(await rbacVyper.roles(account1.address)).to.equal(7);

      await rbacVyper.addGuest()
      //bin(15) = 1111, indicating 4 roles set for address 
      expect(await rbacVyper.roles(account1.address)).to.equal(15);
    });

  });
});
