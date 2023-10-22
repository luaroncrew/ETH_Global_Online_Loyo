# Loyo Mobile App

The Loyo mobile app is built using Expo React Native.

This version represents a significant improvement over the previous version of Loyo, which was only available on iOS devices.

## Client Application

Loyo is a cross-platform application accessible on both iOS and Android devices. It is connected to the blockchain, enabling clients to acquire, spend, and share tokens with other users at various shops.

Key technical decisions:

- The application communicates with a backend that interacts with the blockchain, resulting in a smaller and faster app for users.
- Client credentials consist of a public/private key pair securely stored on the device and used for interactions with the blockchain.

## Features

### Balance

- Users can view the shops for which they have tokens.
- Users can generate and share a QR code to receive shop tokens from other users.
- Users can check their loyalty status with each shop.

### Shop Tokens

- Users can purchase items from shops using their shop tokens.
- Users can send shop tokens to other Loyo users by scanning their QR codes.
