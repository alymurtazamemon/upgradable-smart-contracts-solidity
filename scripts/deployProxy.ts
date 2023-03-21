import { Contract, ContractFactory } from "ethers";
import { ethers, upgrades } from "hardhat";

async function deployProxy() {
    const implementationV1: ContractFactory = await ethers.getContractFactory(
        "ImplementationV1"
    );
    const proxy: Contract = await upgrades.deployProxy(implementationV1);
    await proxy.deployed();

    const implementationV1Address =
        await upgrades.erc1967.getImplementationAddress(proxy.address);

    console.log("Proxy contract address: " + proxy.address);

    console.log(
        "ImplementationV1 contract address: " + implementationV1Address
    );
}

deployProxy()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
