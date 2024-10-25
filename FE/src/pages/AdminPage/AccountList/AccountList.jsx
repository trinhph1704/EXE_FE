// src/pages/AccountList.jsx
import React from "react";
import "./AccountList.css";
import Sidebar from "../Sidebar/Sidebar";

const accounts = [
  { name: "Alice Doe", joinDate: "2021-06-15", accountType: "Savings", status: "Active" },
  { name: "Bob Smith", joinDate: "2020-03-20", accountType: "Checking", status: "Inactive" },
  { name: "Charlie Johnson", joinDate: "2019-11-02", accountType: "Savings", status: "Active" },
  { name: "Diana Lee", joinDate: "2022-01-11", accountType: "Investment", status: "Pending" },
];

const AccountList = () => {
  return (
    <div className="container">
      <Sidebar />
      <div className="dashboard">
        <div className="dashboard-header">
          <h2>Accounts Overview</h2>
        </div>
        
        {/* Accounts List Section */}
        <div className="dashboard-cards">
          <div className="card account-card">
            <h3>All Accounts</h3>
            <table className="account-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Join Date</th>
                  <th>Account Type</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {accounts.map((account, index) => (
                  <tr key={index}>
                    <td>{account.name}</td>
                    <td>{account.joinDate}</td>
                    <td>{account.accountType}</td>
                    <td className={`status ${account.status.toLowerCase()}`}>{account.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountList;
