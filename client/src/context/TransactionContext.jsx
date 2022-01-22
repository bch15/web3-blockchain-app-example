import React, { useState, useEffect, createContext } from "react";
import { ethers } from "ethers";

import { contractABI, contractAddress } from "./../utils/constants";

export const TransactionContext = createContext();

const { ethereum } = window;

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );

  return transactionContract;
};

export const TransactionProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState();
  const [formData, setFormData] = useState({
    addressTo: "",
    amount: "",
    keyword: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [transactionCount, setTreansactionCount] = useState(
    localStorage.getItem("transactionCount")
  );
  const [transactions, setTransactions] = useState([]);

  const handleChange = (e, name) => {
    setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  const getAllTransactions = async () => {
    try {
      if (!ethereum) return alert("Please install metamask");
      const transactionContract = getEthereumContract();

      const availabelTransactions =
        await transactionContract.getAllTransactions();

      const structuredTransactions = availabelTransactions.map(
        (transaction) => ({
          addressTo: transaction.receiver,
          addressFrom: transaction.sender,
          timestamp: new Date(
            transaction.timestamp.toNumber() * 1000
          ).toLocaleString(),
          message: transaction.message,
          keyword: transaction.keyword,
          //10 be tavak 18 ke ethereum hast miresoonim bara khandan behtar
          amount: parseInt(transaction.amount._hex) / 10 ** 18,
        })
      );

      console.log(structuredTransactions);

      setTransactions(structuredTransactions);
    } catch (error) {
      console.error(error);
    }
  };

  //check kardan acc ba vorod be app
  const checkIfWalletConnected = async () => {
    try {
      if (!ethereum) return alert("Please install metamask");

      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        getAllTransactions();
      } else console.log("No accounts found");
    } catch (error) {
      console.error(error);

      throw new Error("No ethereum object.");
    }
  };

  const checkIfTransactionExist = async () => {
    try {
      const transactionContract = getEthereumContract();
      const transactionCount = await transactionContract.getTransactionCount();

      window.localStorage.setItem("transactionCount", transactionCount);
    } catch (error) {
      console.error(error);

      throw new Error("No ethereum object.");
    }
  };

  //ba zadan btn darkhaste vared kardan acc anjam mishe
  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install metamask");

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.error(error);

      throw new Error("No ethereum object.");
    }
  };

  const sendTransaction = async () => {
    try {
      if (!ethereum) return alert("Please install metamask");

      const { addressTo, amount, keyword, message } = formData;

      //yek nemone az smartcontract ke sakhtim az tarigh contractAddress,contractABI,signer ijad kardim
      const transactionContract = getEthereumContract();
      const parsedAmount = ethers.utils.parseEther(amount);

      // metamask req
      await ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: currentAccount,
            to: addressTo,
            //dar ethereum hame chi ba hexadecimal hast ya GWEI(sub unit)
            gas: "0x5208", //21000 GWEI
            value: parsedAmount._hex, // 0.00001
          },
        ],
      });

      const transactionHash = await transactionContract.addToBlockchain(
        addressTo,
        parsedAmount,
        message,
        keyword
      );

      setIsLoading(true);
      console.log(`Loading - ${transactionHash.hash}`);
      await transactionHash.wait();

      // bad az anjam transaction:
      setIsLoading(false);
      console.log(`Success - ${transactionHash.hash}`);

      const transactionCount = await transactionContract.getTransactionCount();
      setTreansactionCount(transactionCount.toNumber());

      window.reload()
    } catch (error) {
      console.error(error);

      throw new Error("No ethereum object.");
    }
  };

  useEffect(() => {
    checkIfWalletConnected();
    checkIfTransactionExist();
  }, []);

  return (
    //key & value is similar so => write just key.

    <TransactionContext.Provider
      value={{
        connectWallet,
        currentAccount,
        handleChange,
        formData,
        setFormData,
        sendTransaction,
        transactions,
        isLoading,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
