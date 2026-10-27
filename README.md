### Blockchain-Academic-Certificate-Verification
# Blockchain-Based Academic Certificate Verification System

## INTRODUCTION

The Blockchain-Based Academic Certificate Verification System is a secure web-based system designed to verify the authenticity of academic certificates. The system uses blockchain technology, IPFS, and SHA-256 hashing to maintain trusted certificate records and detect changes made to certificate documents.

The system allows an administrator to register trusted certificate records. Students can access their certificates and share a Certificate ID or QR code. Employers or other authorized verifiers can enter the Certificate ID, scan the QR code, or upload a certificate PDF to verify the certificate.

When a certificate is submitted for verification, the system generates its SHA-256 hash and compares it with the trusted certificate hash stored in the system. Based on the comparison, the system displays **VERIFIED**, **NOT VERIFIED / TAMPERED**, or **CERTIFICATE NOT FOUND**.

The project combines a React frontend, Node.js and Express backend, MySQL database, Ethereum-compatible blockchain, IPFS storage, Solidity smart contracts, and an ESP32-CAM for QR-based certificate verification.

## Technologies Used

- React.js
- Node.js
- Express.js
- MySQL
- Solidity
- Ethereum-compatible Blockchain
- Ethers.js
- IPFS
- SHA-256
- JWT & bcrypt
- ESP32-CAM
- QR Code

## Main Features

- Admin certificate registration
- Secure certificate record storage
- SHA-256 certificate integrity checking
- Blockchain-based trusted records
- IPFS certificate storage
- QR-based certificate identification
- Certificate ID verification
- PDF certificate verification
- ESP32-CAM QR scanning
- Verification logs
- Web-based verification results

## Verification Results

The system provides three verification outcomes:

- **VERIFIED** – Submitted certificate matches the trusted record.
- **NOT VERIFIED / TAMPERED** – Certificate hash does not match the trusted record.
- **CERTIFICATE NOT FOUND** – No trusted certificate record is available.

## Project Status

This project is being developed as an academic capstone project and includes a partial prototype for Review-2, including the web application, blockchain components, certificate verification process, and ESP32-CAM hardware integration.
