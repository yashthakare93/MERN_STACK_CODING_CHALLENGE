import React, { useState, useEffect } from 'react';
import axiosInstance from '../axios';

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const { data } = await axiosInstance.get('/transactions');
        setTransactions(data);
      } catch (err) {
        setError('Failed to fetch transactions');
        console.error(err);
      }
    };

    fetchTransactions();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  if (transactions.length === 0) {
    return <p>No transactions available</p>;
  }

  return (
    <div>
      <h1>Transactions</h1>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction._id}>
            <h2>{transaction.title}</h2>
            <p>{transaction.description}</p>
            <p>${transaction.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
