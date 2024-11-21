# Healthcare DApp

A decentralized application (DApp) for managing healthcare records securely and efficiently using blockchain technology. This project allows healthcare providers to add patient records, retrieve records, and authorize other providers.

---

## Features

- **Connect Wallet**: Connects to a blockchain wallet (e.g., MetaMask).
- **Add Patient Records**: Add patient-specific healthcare records (e.g., name, diagnosis, and treatment).
- **Fetch Patient Records**: Retrieve records for a specific patient by their ID.
- **Authorize Providers**: Contract owners can authorize additional healthcare providers to access or modify records.
- **Role-Based Authorization**: Only authorized users can perform specific actions.

---

## Prerequisites

- Node.js and npm installed on your computer.
- MetaMask or another Ethereum wallet installed in your browser.
- A deployed smart contract on an Ethereum-compatible network.

---

## Technologies Used

- **Frontend**: React.js
- **Blockchain Interaction**: ethers.js
- **Smart Contract**: Solidity
- **Styling**: CSS

---

## Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/mellassidhia/healthcare-dapp.git
cd healthcare-dapp
```
### 2. Install Dependencies
```bash
npm install
```
## 3. Configure the Contract

Before running the application, you need to configure the contract address and ABI.

1. Open the `Healthcare.js` file located in the `src/components` directory.
   
2. Update the `contractAddress` variable with the address of your deployed smart contract.

### 4. Run the Application

```bash
npm install
```
The app will be available at http://localhost:3000.

## Usage

### Connect Wallet

- Open the application in your browser.
- Click on the wallet icon to connect MetaMask (or another Ethereum wallet).

### Add Patient Record

- Fill in the **patient name**, **diagnosis**, and **treatment** fields.
- Click **Add Record** to save the data to the blockchain.

### Fetch Patient Records

- Enter the **patient ID** in the input field.
- Click **Fetch Records** to view the records associated with the patient.

### Authorize Provider

- Enter the **address** of the healthcare provider you wish to authorize.
- Click **Authorize Provider** (this action is only available to the contract owner).

## Project Structure

/src
├── components  
│   └── Healthcare.js       # Main React component
├── styles  
│   └── App.css             # Styling for the DApp
├── App.js                  # Entry point for the app
└── index.js                # Renders the React app

## Smart Contract

The DApp interacts with a Solidity contract that manages healthcare records on the blockchain. Below are the key functions of the smart contract:

- **addRecord(uint patientID, string patientName, string diagnosis, string treatment)**: Adds a new healthcare record for a patient, including the patient's ID, name, diagnosis, and treatment.
  
- **getPatientRecords(uint patientID)**: Retrieves all healthcare records associated with a specific patient using their unique patient ID.

- **authorizeProvider(address provider)**: Allows the contract owner to authorize a healthcare provider to access or modify records.

- **getOwner()**: Returns the address of the contract owner, who has the authority to perform certain actions like authorizing other providers.
## License

This project is licensed under the MIT License. See LICENSE for details.

## Acknowledgments

- ethers.js for blockchain interaction.
- MetaMask for wallet integration.
- React for building the frontend.
