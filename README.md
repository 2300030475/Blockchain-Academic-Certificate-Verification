# Blockchain-Based Academic Certificate Verification System

A secure, web-based academic certificate verification system that combines blockchain technology, cryptographic hashing, and IPFS-based storage to help verify the authenticity and integrity of academic certificates.

## Introduction

The **Blockchain-Based Academic Certificate Verification System** is an academic capstone project designed to simplify and strengthen the process of verifying academic certificates. It provides a web application through which universities can manage certificate records, students can access their certificates, and employers can verify certificate authenticity.

The system integrates a **React.js frontend**, **Spring Boot backend**, **MySQL database**, **Solidity smart contracts**, and **IPFS storage through Pinata**. Blockchain technology provides a foundation for maintaining trusted certificate records, while SHA-256 hashing can be used to check whether a submitted certificate matches its trusted record.

The application supports role-based access for administrators, universities, students, and employers, along with certificate management and verification history.

## Objectives

- Provide a reliable method for verifying academic certificates.
- Reduce the risk of certificate forgery and unauthorized modification.
- Maintain certificate records using blockchain technology.
- Use cryptographic hashing to check certificate integrity.
- Support decentralized file storage through IPFS.
- Provide role-based access to certificate management and verification features.
- Maintain verification logs for tracking certificate verification activity.

## Technologies Used

| Component | Technology |
|---|---|
| Frontend | React.js, Vite, JavaScript, CSS |
| Backend | Java, Spring Boot |
| Database | MySQL |
| Blockchain | Ethereum-compatible blockchain |
| Smart contracts | Solidity |
| Blockchain development tools | Hardhat |
| Decentralized storage | IPFS, Pinata |
| Certificate integrity | SHA-256 hashing |
| Authentication | JWT-based authentication |
| API communication | REST APIs |

## Main Features

### 1. Role-Based Authentication
- User registration and login.
- JWT-based authentication.
- Role-based access control for supported user roles.

### 2. University Certificate Management
- Manage academic certificate records.
- Register and upload certificate information through the application.
- Associate certificate records with their verification information.

### 3. Student Dashboard
- Access student-related certificate information.
- View available certificate records.
- Use certificate information for verification.

### 4. Employer Certificate Verification
- Verify certificates using the available verification workflow.
- View verification results.
- Access employer-specific verification history.

### 5. Blockchain Integration
- Use Solidity smart contracts for blockchain-related certificate operations.
- Support trusted certificate records through the blockchain component.
- Use Hardhat for smart contract development and deployment.

### 6. IPFS Storage
- Integrate IPFS through Pinata for decentralized certificate file storage.
- Support access to stored certificate content using the application's storage integration.

### 7. Verification Logs and Administration
- Provide administrative certificate management.
- Display verification activity and logs.
- Support administrator and employer views of verification history.

## System Architecture

The project consists of the following major components:

1. **React.js frontend:** Provides the user interface for authentication, certificate management, dashboards, and verification.
2. **Spring Boot backend:** Handles application APIs, authentication, business logic, and communication with supporting services.
3. **MySQL database:** Stores application data, user information, certificate records, and verification logs.
4. **Solidity smart contract:** Implements the blockchain-related certificate functionality.
5. **IPFS and Pinata:** Provide decentralized certificate file storage.
6. **SHA-256 hashing:** Supports certificate integrity checking by comparing hashes where implemented in the verification workflow.

## Certificate Verification Workflow

1. An authorized user registers or uploads certificate information.
2. The application stores the relevant certificate record and associated verification data.
3. The certificate is submitted through the available verification interface.
4. The system performs the applicable certificate lookup and integrity checks.
5. The verification result and relevant activity are displayed to the user.

The verification result depends on the certificate data and checks implemented in the application. A hash mismatch can indicate that the submitted document differs from the trusted record.

## Project Structure

```text
Certificate verification system/
├── blockchain/
│   ├── contracts/
│   │   └── CertificateVerification.sol
│   ├── scripts/
│   │   └── deploy.ts
│   ├── hardhat.config.ts
│   └── package.json
│
├── certificate-verification-backend/
│   └── certificate-verification-backend/
│       ├── src/
│       │   ├── main/
│       │   │   ├── java/
│       │   │   └── resources/
│       │   └── test/
│       ├── pom.xml
│       └── mvnw
│
├── certificate-verification-frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── services/
│   │   └── utils/
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

## Prerequisites

Install the following before running the project:

- Node.js and npm
- Java Development Kit (JDK) compatible with the Spring Boot project
- MySQL Server
- Maven, or use the included Maven wrapper
- Git
- A compatible Ethereum development network for blockchain operations

## Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/2300030475/Blockchain-Academic-Certificate-Verification.git
cd Blockchain-Academic-Certificate-Verification
```

### 2. Configure the MySQL Database

1. Start MySQL Server.
2. Create a database for the application.
3. Configure the database connection in the backend's `application.properties`.
4. Set the required database credentials using your local configuration.

Do not commit real passwords, private keys, API tokens, or other credentials to GitHub.

### 3. Run the Backend

Open a terminal and navigate to the backend project directory:

```bash
cd certificate-verification-backend/certificate-verification-backend
```

Run the application using the Maven wrapper on Windows:

```cmd
mvnw.cmd spring-boot:run
```

The backend is configured to run on port **8081** in the current development setup.

### 4. Run the Frontend

Open another terminal from the repository root:

```bash
cd certificate-verification-frontend
npm install
npm run dev
```

Open the frontend in your browser:

http://localhost:5173

### 5. Configure and Run the Blockchain Component

Open another terminal:

```bash
cd blockchain
npm install
```

Configure the blockchain network and deployment settings in `hardhat.config.ts` using your local environment configuration. Then use the deployment script and network settings appropriate to your development environment.

The smart contract deployment must be completed before blockchain-dependent functionality can be tested against that network.

### 6. Configure IPFS / Pinata

Configure the required Pinata credentials and storage settings using environment variables or local configuration. Keep all API keys and secrets out of the repository.

## Project Status

This project is an academic capstone project. The repository contains the React frontend, Spring Boot backend, Solidity smart contract, Hardhat configuration, and related project documentation.

Some functionality depends on the local database configuration, blockchain network, smart contract deployment, and IPFS/Pinata configuration. These components should be configured and tested in the intended environment before deployment.

## Future Enhancements

- Add automated certificate verification tests.
- Improve QR-code-based certificate access and verification.
- Extend document integrity validation.
- Improve monitoring and reporting for verification activity.
- Deploy the application and blockchain components to suitable production environments.

## Academic Project

**Project:** Blockchain-Based Academic Certificate Verification System

This project demonstrates the application of blockchain technology, cryptographic hashing, decentralized storage, and web development to academic certificate verification.
