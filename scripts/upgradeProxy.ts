import { Contract, ContractFactory } from "ethers";
import { ethers, upgrades } from "hardhat";

/**
 * * Run the deployProxy.ts file on the localhost to get the address for `PROXY_CONTRACT_ADDRESS`
 */

const PROXY_CONTRACT_ADDRESS = "YOUR-PROXY-CONTRACT-ADDRESS-HERE";

async function upgradeProxy() {
    const implementationV2: ContractFactory = await ethers.getContractFactory(
        "ImplementationV2"
    );
    const upgraded: Contract = await upgrades.upgradeProxy(
        PROXY_CONTRACT_ADDRESS,
        implementationV2
    );
    await upgraded.deployed();

    const implementationV2Address =
        await upgrades.erc1967.getImplementationAddress(upgraded.address);

    console.log("Proxy contract address: " + upgraded.address);

    console.log(
        "ImplementationV2 contract address: " + implementationV2Address
    );
}

upgradeProxy()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
