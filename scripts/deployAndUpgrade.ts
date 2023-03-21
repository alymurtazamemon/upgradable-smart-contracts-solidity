import {
    BigNumber,
    Contract,
    ContractFactory,
    ContractTransaction,
} from "ethers";
import { ethers, upgrades } from "hardhat";

async function deployAndUpgradeProxy() {
    const implementationV1: ContractFactory = await ethers.getContractFactory(
        "ImplementationV1"
    );
    console.log(
        `\n--------------------Deploying Implementation V1 Contract...--------------------\n`
    );
    const proxy: Contract = await upgrades.deployProxy(implementationV1);
    await proxy.deployed();

    console.log(
        `\n--------------------Deployed Implementation V1 Contract.--------------------\n`
    );

    const implementationV1Address =
        await upgrades.erc1967.getImplementationAddress(proxy.address);

    console.log("Proxy contract address: " + proxy.address);

    console.log(
        "ImplementationV1 contract address: " + implementationV1Address
    );

    let version: BigNumber = await proxy.version();
    console.log(`\nImplemenation Version is: ${version.toNumber()}`);

    const value: BigNumber = await proxy.retrieve();
    console.log(`\nInitial Value is: ${value.toNumber()}`);

    console.log(`\nStoring the value 40 using V1.`);
    const tx: ContractTransaction = await await proxy.store(40);
    await tx.wait(1);

    const updateValueUsingV1: BigNumber = await proxy.retrieve();
    console.log(
        `\nUpdated Value using V1 is: ${updateValueUsingV1.toNumber()}`
    );

    const implementationV2: ContractFactory = await ethers.getContractFactory(
        "ImplementationV2"
    );

    console.log(
        `\n--------------------Upgrading to Implementation V2...--------------------\n`
    );

    const upgraded: Contract = await upgrades.upgradeProxy(
        proxy.address,
        implementationV2
    );
    console.log(
        `\n--------------------Upgraded to Implementation V2.--------------------\n`
    );
    await upgraded.deployed();

    const implementationV2Address =
        await upgrades.erc1967.getImplementationAddress(upgraded.address);

    console.log(
        "ImplementationV2 contract address: " + implementationV2Address
    );

    version = await proxy.version();
    console.log(`\nImplemenation Version is: ${version.toNumber()}`);

    const valueInV2: BigNumber = await proxy.retrieve();
    console.log(`\nInitial Value in V2 is: ${valueInV2.toNumber()}`);
}

deployAndUpgradeProxy()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
