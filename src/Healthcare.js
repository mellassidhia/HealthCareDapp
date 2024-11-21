import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

const Healthcare = () => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [isOwner, setIsOwner] = useState(null);
  const [patientID, setPatientID] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [treatment, setTreatment] = useState("");
  const [patientRecords, setPatientRecords] = useState([]);
  const [providerAddress, setProviderAddress] = useState("");
  const [patientName, setPatientName] = useState('');

  const contractAddress = "0x7565911616daf301f6ef407b60e13136ba649073";
  const contractABI = [
    {
      inputs: [
        { internalType: "uint256", name: "patientID", type: "uint256" },
        { internalType: "string", name: "patientName", type: "string" },
        { internalType: "string", name: "diagnosis", type: "string" },
        { internalType: "string", name: "treatment", type: "string" },
      ],
      name: "addRecord",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "provider", type: "address" }],
      name: "authorizeProvider",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      inputs: [],
      name: "getOwner",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "patientID", type: "uint256" }],
      name: "getPatientRecords",
      outputs: [
        {
          components: [
            { internalType: "uint256", name: "recordID", type: "uint256" },
            { internalType: "string", name: "patientName", type: "string" },
            { internalType: "string", name: "diagnosis", type: "string" },
            { internalType: "string", name: "treatment", type: "string" },
            { internalType: "uint256", name: "timestamp", type: "uint256" },
          ],
          internalType: "struct HealthcareRecords.Record[]",
          name: "",
          type: "tuple[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ];

  useEffect(() => {
    const connectWallet = async () => {
      if (!window.ethereum) {
        console.error("MetaMask not installed!");
        return;
      }

      try {
        const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
        await web3Provider.send("eth_requestAccounts", []);
        const web3Signer = web3Provider.getSigner();

        setProvider(web3Provider);
        setSigner(web3Signer);

        const accountAddress = await web3Signer.getAddress();
        setAccount(accountAddress);

        const deployedContract = new ethers.Contract(contractAddress, contractABI, web3Signer);
        setContract(deployedContract);

        const ownerAddress = await deployedContract.getOwner();
        setIsOwner(accountAddress.toLowerCase() === ownerAddress.toLowerCase());
      } catch (error) {
        console.error("Error connecting to the wallet:", error);
      }
    };

    connectWallet();
  }, []);

  const fetchPatientRecords = async () => {
    if (!patientID) {
      alert("Please enter a valid Patient ID.");
      return;
    }
    try {
      if (!contract) {
        console.error("Contract not initialized!");
        return;
      }
      const records = await contract.getPatientRecords(patientID);
      console.log(records);
      setPatientRecords(records);
    } catch (error) {
      console.error("Error fetching patient records:", error);
    }
  };

  const addRecord = async () => {
    if (!isOwner) {
        alert("You are not authorized to add patient records.");
        return;
    }
    try {
        const tx = await contract.addRecord(patientID, patientName, diagnosis, treatment);
        await tx.wait();
        fetchPatientRecords();
        alert("Record added successfully.");
    } catch (error) {
        console.error("Error adding record:", error);
    }
};

  const authorizeProvider = async () => {
    if (isOwner) {
      try {
        if (!contract) {
          console.error("Contract not initialized!");
          return;
        }
        const tx = await contract.authorizeProvider(providerAddress);
        await tx.wait();
        alert(`Provider ${providerAddress} authorized successfully`);
      } catch (error) {
        console.error("Error authorizing provider:", error);
      }
    } else {
      alert("Only the contract owner can authorize providers.");
    }
  };

  return (
    <div className="container">
      <h1 className="title">Healthcare Application</h1>
      {account && <p className="account-info">Connected Account: {account}</p>}
      {isOwner && <p className="owner-info">You are the contract owner</p>}

      <div className="form-section">
        <h2>Fetch Patient Records</h2>
        <input
          className="input-field"
          type="text"
          placeholder="Enter Patient ID"
          value={patientID}
          onChange={(e) => setPatientID(e.target.value)}
        />
        <button className="action-button" onClick={fetchPatientRecords}>
          Fetch Records
        </button>
      </div>

      <div className="form-section">
    <h2>Add Patient Record</h2>
    <input
        className="input-field"
        type="text"
        placeholder="Patient Name"
        value={patientName}
        onChange={(e) => setPatientName(e.target.value)}
    />
    <input
        className="input-field"
        type="text"
        placeholder="Diagnosis"
        value={diagnosis}
        onChange={(e) => setDiagnosis(e.target.value)}
    />
    <input
        className="input-field"
        type="text"
        placeholder="Treatment"
        value={treatment}
        onChange={(e) => setTreatment(e.target.value)}
    />
    <button className="action-button" onClick={addRecord}>
        Add Record
    </button>
</div>

      <div className="form-section">
        <h2>Authorize Healthcare Provider</h2>
        <input
          className="input-field"
          type="text"
          placeholder="Provider Address"
          value={providerAddress}
          onChange={(e) => setProviderAddress(e.target.value)}
        />
        <button className="action-button" onClick={authorizeProvider}>
          Authorize Provider
        </button>
      </div>

      <div className='records-section'>
    <h2>Patient Records</h2>
    {patientRecords.map((record, index) => (
        <React.Fragment key={index}>
            <div className='record-card'>
                <p><strong>Record ID:</strong> {record.recordID.toNumber()}</p>
                <p><strong>Patient Name:</strong> {record.patientName}</p>
                <p><strong>Diagnosis:</strong> {record.diagnosis}</p>
                <p><strong>Treatment:</strong> {record.treatment}</p>
                <p><strong>Timestamp:</strong> {new Date(record.timestamp.toNumber() * 1000).toLocaleString()}</p>
            </div>
            {index < patientRecords.length - 1 && <hr />} {/* Add <hr> except after the last record */}
        </React.Fragment>
    ))}
</div>

    </div>
  );
};

export default Healthcare;
