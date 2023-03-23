# Upgradable Smart Contracts - Solidity

This repository contains the basic implementation of Transparent & UUPS proxy patterns using Openzeppelin Upgrades Plugin.

## Instructions

### Install Dependencies

```bash
npm install --force
```

### Environment Variables

1. Create a `.env` file at the root level of this project.
2. Add these variables inside it;

```.env
SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/your-api-key
PRIVATE_KEY=your-wallet-private-key
COINMARKETCAP_API_KEY=https://eth-mainnet.g.alchemy.com/v2/your-api-key
ETHERSCAN_API_KEY=your-api-key
```

### Compile Contracts

```bash
npx hardhat compile
```

### Run Scripts

```bash
npx hardhat run scripts/deployAndUpgrade.ts
```

use the same command for others.

### Run Tests

```bash
npx hardhat test
```

### Check Tests Coverage

```bash
npx hardhat coverage
```