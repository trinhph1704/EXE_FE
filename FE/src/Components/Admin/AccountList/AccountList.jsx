import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AccountList.css';

const AccountList = () => {
    const [accounts, setAccounts] = useState([
        { id: 1, name: 'Minh Lê', email: 'minhle@mail.com', location: 'VN', phone: '09 078 99 100' },
        { id: 2, name: 'An Nguyễn', email: 'annguyen@mail.com', location: 'VN', phone: '09 078 99 101' },
        { id: 3, name: 'Hải Trần', email: 'haitran@mail.com', location: 'VN', phone: '09 078 99 102' },
        { id: 4, name: 'Long Trần', email: 'longtran@mail.com', location: 'VN', phone: '09 078 99 102' },
        { id: 5, name: 'Minh Phúc', email: 'minhphuc@mail.com', location: 'VN', phone: '09 078 99 102' },
        { id: 6, name: 'Bảo Phúc', email: 'baophuc@mail.com', location: 'VN', phone: '09 078 99 102' },
        { id: 7, name: 'Gia Bảo', email: 'giabao@mail.com', location: 'VN', phone: '09 078 99 102' },
        { id: 8, name: 'Hoàng Trân', email: 'hoangtran@mail.com', location: 'VN', phone: '09 078 99 102' },
    ]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentAccount, setCurrentAccount] = useState(null);
    const [newAccount, setNewAccount] = useState({ name: '', email: '', location: '', phone: '' });
    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewAccount((prev) => ({ ...prev, [name]: value }));
    };

    const validateAccount = () => {
        const { name, email, phone } = newAccount;
        const nameRegex = /^[a-zA-ZÀ-ỹ\s]+$/;
        const phoneRegex = /^\+?\d{10,}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!nameRegex.test(name)) {
            toast.error('Tên không hợp lệ');
            return false;
        }

        if (!phoneRegex.test(phone)) {
            toast.error('Số điện thoại không hơp lệ');
            return false;
        }

        if (!emailRegex.test(email)) {
            toast.error('Email không hợp lệ');
            return false;
        }

        return true;
    };

    const handleAddAccount = () => {
        if (!validateAccount()) return;

        const newId = accounts.length ? accounts[accounts.length - 1].id + 1 : 1;
        setAccounts([...accounts, { ...newAccount, id: newId, locked: false }]);
        toast.success('Account added successfully!');
        resetForm();
    };

    const handleEditAccount = (account) => {
        setIsEditing(true);
        setCurrentAccount(account);
        setNewAccount(account);
        setIsModalOpen(true);
    };

    const handleUpdateAccount = () => {
        if (!validateAccount()) return;

        setAccounts(accounts.map(account =>
            account.id === currentAccount.id ? { ...newAccount, id: currentAccount.id } : account
        ));
        toast.success('Account updated successfully!');
        resetForm();
    };

    const handleDeleteAccount = (id) => {
        setAccounts(accounts.filter(account => account.id !== id));
        toast.success('Account deleted successfully!');
    };

    const handleLockAccount = (id) => {
        setAccounts(accounts.map(account => {
            if (account.id === id) {
                const newLockedStatus = !account.locked;
                toast.success(newLockedStatus ? 'Account banned successfully!' : 'Account unbanned successfully!');
                return { ...account, locked: newLockedStatus };
            }
            return account;
        }));
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const resetForm = () => {
        setIsModalOpen(false);
        setIsEditing(false);
        setNewAccount({ name: '', email: '', location: '', phone: '' });
        setCurrentAccount(null);
    };

    const filteredAccounts = accounts.filter(account =>
        account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        account.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        account.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        account.phone.includes(searchTerm)
    );

    return (
        <div id="AccountList" className="accounts-container">
            <div className="accounts-header">
                <h2>Accounts</h2>
                <div className="header-actions">
                    <button className="add-account-btn" onClick={() => setIsModalOpen(true)}>Add Account</button>
                    <input
                        type="text"
                        placeholder="Search Accounts"
                        className="search-input"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>
            </div>
            <table className="accounts-table">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Location</th>
                        <th>Phone</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredAccounts.map((account, index) => (
                        <tr key={account.id}>
                            <td>{index + 1}</td>
                            <td>{account.name}</td>
                            <td>{account.email}</td>
                            <td>{account.location}</td>
                            <td>{account.phone}</td>
                            <td>
                                <button className="edit-btn" onClick={() => handleEditAccount(account)}>Edit</button>
                                <button className="delete-btn" onClick={() => handleDeleteAccount(account.id)}>Delete</button>
                                <button className="lock-btn" onClick={() => handleLockAccount(account.id)}>
                                    {account.locked ? "Unban" : "Ban"}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>{isEditing ? "Edit Account" : "Add New Account"}</h3>
                        <div className="input-group">
                            <label className='name' htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Name"
                                value={newAccount.name}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="input-group">
                            <label className='email' htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Email"
                                value={newAccount.email}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="input-group">
                            <label className='location' htmlFor="location">Location</label>
                            <input
                                type="text"
                                id="location"
                                name="location"
                                placeholder="Location"
                                value={newAccount.location}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="input-group">
                            <label className='phone' htmlFor="phone">Phone</label>
                            <input
                                type="text"
                                id="phone"
                                name="phone"
                                placeholder="Phone"
                                value={newAccount.phone}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="button-container">
                            <button onClick={isEditing ? handleUpdateAccount : handleAddAccount}>
                                {isEditing ? "Update Account" : "Add Account"}
                            </button>
                            <button onClick={resetForm}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
            <ToastContainer />
        </div>
    );
};

export default AccountList;
