import { ethers, network, upgrades } from "hardhat";
import { developmentChains } from "../helper-hardhat-config";
import { Contract, ContractFactory, ContractTransaction } from "ethers";
import { expect } from "chai";

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("UUPS Proxy Pattern - Unit Tests", function () {
          let BoxV1: ContractFactory;
          let BoxV2: ContractFactory;
          let proxy: Contract;
          let upgradedProxy: Contract;
          let version: number;

          beforeEach(async () => {
              BoxV1 = await ethers.getContractFactory("BoxV1");
              proxy = await upgrades.deployProxy(BoxV1, { kind: "uups" });
          });

          describe("store", () => {
              it("should store the value from BoxV1.", async () => {
                  const tx: ContractTransaction = await proxy.store(40);
                  await tx.wait(1);

                  const value = await proxy.retrieve();
                  expect(value).to.be.equal(40);
              });

              it("should emit an ValueChanged event.", async () => {
                  expect(proxy.store(40)).to.emit(proxy, "ValueChanged");
              });
          });

          describe("retrieve", () => {
              it("should read the value from BoxV1.", async () => {
                  const initialValue = await proxy.retrieve();
                  expect(initialValue).to.be.equal(0);
              });
          });

          describe("version", () => {
              it("should read the version no from implementation V1.", async () => {
                  version = await proxy.version();
                  expect(version).to.be.equal(1);
              });
          });

          describe("After Updating to Implementation V2.", () => {
              beforeEach(async () => {
                  const tx: ContractTransaction = await proxy.store(40);
                  await tx.wait(1);

                  BoxV2 = await ethers.getContractFactory("BoxV2");

                  upgradedProxy = await upgrades.upgradeProxy(
                      proxy.address,
                      BoxV2
                  );
              });

              describe("retrieve", () => {
                  it("should read the value from BoxV2.", async () => {
                      const value = await upgradedProxy.retrieve();
                      expect(value).to.be.equal(40);
                  });
              });

              describe("version", () => {
                  it("should read the value and version no from BoxV2.", async () => {
                      version = await upgradedProxy.version();
                      expect(version).to.be.equal(2);
                  });
              });

              describe("increment", () => {
                  it("should increment the value from BoxV2 and emit an ValueChanged event.", async () => {
                      const tx: ContractTransaction =
                          await upgradedProxy.increment();
                      await tx.wait(1);

                      const value = await upgradedProxy.retrieve();
                      expect(value).to.be.equal(41);

                      expect(upgradedProxy.increment()).to.emit(
                          upgradedProxy,
                          "ValueChanged"
                      );
                  });
              });

              describe("store", () => {
                  it("should store the value from BoxV2.", async () => {
                      const tx: ContractTransaction = await upgradedProxy.store(
                          786
                      );
                      await tx.wait(1);

                      const value = await upgradedProxy.retrieve();
                      expect(value).to.be.equal(786);
                  });

                  it("should emit an ValueChanged event.", async () => {
                      expect(upgradedProxy.store(786)).to.emit(
                          upgradedProxy,
                          "ValueChanged"
                      );
                  });
              });
          });
      });
