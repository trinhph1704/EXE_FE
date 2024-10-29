import React, { useState } from 'react';
import './AccountList.css';

const AccountList = () => {
    const [accounts, setAccounts] = useState([
        { id: 1, name: 'Minh Lê', email: 'minhle@mail.com', location: 'VN', phone: '+84 078 99 100' },
        { id: 2, name: 'An Nguyễn', email: 'annguyen@mail.com', location: 'VN', phone: '+84 078 99 101' },
        { id: 3, name: 'Hải Trần', email: 'haitran@mail.com', location: 'VN', phone: '+84 078 99 102' },
        { id: 4, name: 'Long Trần', email: 'longtran@mail.com', location: 'VN', phone: '+84 078 99 102' },
        { id: 5, name: 'Minh Phúc', email: 'minhphuc@mail.com', location: 'VN', phone: '+84 078 99 102' },
        { id: 6, name: 'Bảo Phúc', email: 'baophuc@mail.com', location: 'VN', phone: '+84 078 99 102' },
        { id: 7, name: 'Gia Bảo', email: 'giabao@mail.com', location: 'VN', phone: '+84 078 99 102' },
        { id: 8, name: 'Hoàng Trân', email: 'hoangtran@mail.com', location: 'VN', phone: '+84 078 99 102' },
    ]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentAccount, setCurrentAccount] = useState(null);
    const [newAccount, setNewAccount] = useState({ name: '', email: '', location: '', phone: '' });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewAccount((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddAccount = () => {
        const newId = accounts.length ? accounts[accounts.length - 1].id + 1 : 1;
        setAccounts([...accounts, { ...newAccount, id: newId }]);
        resetForm();
    };

    const handleEditAccount = (account) => {
        setIsEditing(true);
        setCurrentAccount(account);
        setNewAccount(account);
        setIsModalOpen(true);
    };

    const handleUpdateAccount = () => {
        setAccounts(accounts.map(account =>
            account.id === currentAccount.id ? { ...newAccount, id: currentAccount.id } : account
        ));
        resetForm();
    };

    const handleDeleteAccount = (id) => {
        setAccounts(accounts.filter(account => account.id !== id));
    };

    const resetForm = () => {
        setIsModalOpen(false);
        setIsEditing(false);
        setNewAccount({ name: '', email: '', location: '', phone: '' });
        setCurrentAccount(null);
    };

    return (
        <div id="AccountList" className="accounts-container">
            <div className="accounts-header">
                <h2>Accounts</h2>
                <div className="header-actions">
                    <button className="add-account-btn" onClick={() => setIsModalOpen(true)}>Add Account</button>
                    <button className="view-toggle-btn">&#9776;</button>
                </div>
            </div>
            <table className="accounts-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Location</th>
                        <th>Phone</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {accounts.map((account) => (
                        <tr key={account.id}>
                            <td>{account.name}</td>
                            <td>{account.email}</td>
                            <td>{account.location}</td>
                            <td>{account.phone}</td>
                            <td>
                                <button className="edit-btn" onClick={() => handleEditAccount(account)}>Edit</button>
                                <button className="delete-btn" onClick={() => handleDeleteAccount(account.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>{isEditing ? "Edit Account" : "Add New Account"}</h3>
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={newAccount.name}
                            onChange={handleInputChange}
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={newAccount.email}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="location"
                            placeholder="Location"
                            value={newAccount.location}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="phone"
                            placeholder="Phone"
                            value={newAccount.phone}
                            onChange={handleInputChange}
                        />
                        <button onClick={isEditing ? handleUpdateAccount : handleAddAccount}>
                            {isEditing ? "Update Account" : "Add Account"}
                        </button>
                        <button onClick={resetForm}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AccountList;
