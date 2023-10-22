# LOYO: The Next-Generation Loyalty Program Infrastructure

**LOYO** is a cutting-edge loyalty program infrastructure that consists of two key applications connected to a blockchain-based system:

- **LOYO App**: A React Native application designed for clients.
- **LOYO Backend**: An Express service that interacts with the blockchain.

## Key Features of LOYO:

### For Clients:
- No personal data is required to obtain and redeem loyalty rewards.
- An easy-to-use application that centralizes all commercial promotions in one place.

### For Businesses:
- Significant infrastructure cost reduction, up to 500x less.
- Access to decentralized data regarding client transactions, offering endless insights.

# Check Out Our Pitch Deck and Demo!

## Technical Description

LOYO's smart contracts are written in Solidity and leverage account abstracts.

This repository encompasses all the services, applications, contracts, and documentation that we developed during the hackathon.

- `/mobile-app`: React Native application developed with Expo.
- `/pre-bundler-backend`: Express Backend.
- `/contracts`: Smart contracts for business logic implementation.

## Client Application

LOYO is seamlessly integrated with the blockchain, offering accessibility from both iOS and Android devices. Clients can easily obtain, spend, and share tokens with other users at various shops.

Key Technical Decisions:

- Gasless transactions (clients will not incur any costs).
- Users are not required to create accounts or share personal information with us or businesses.
- LOYO contracts are utilized to determine which tokens are held by each user.

## React Native Application Frontend
For more details, see `app/`.

## Smart Contracts for Business Logic Implementation
For more details, see `contracts/`.

## Express Backend
For more details, see `pre-bundler-backend/`.
