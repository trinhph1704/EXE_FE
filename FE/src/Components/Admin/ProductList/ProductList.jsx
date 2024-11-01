import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ProductList.css';
import P1 from '../../../assets/Product/1.jpg';
import P2 from '../../../assets/Product/2.jpg';
import P3 from '../../../assets/Product/3.jpg';
import P4 from '../../../assets/Product/4.jpg';
import P5 from '../../../assets/Product/5.jpg';
import P6 from '../../../assets/Product/6.jpg';
import P7 from '../../../assets/Product/7.jpg';
import P8 from '../../../assets/Product/8.jpg';

const ProductList = () => {
    const [items, setItems] = useState([
        { id: 1, image: P1, name: 'Mạch đảo chiều động cơ từ xa', quantity: 10, price: 560000, description: "Combo xe điều khiển từ xa có camera giám sát là combo do chính NSHOP biên soạn, thường được sử dụng để học tập, nghiên cứu, giải trí…v…v. Kết hợp với module ESP32-Camera, chúng ta có thể điều khiển thông qua wifi đang sử dụng bằng website thông qua địa chỉ IP và không cần phải theo dõi khi điều khiển như combo dùng bluetooth vì đã được tích hợp thêm camera có thể giám sát qua màn hình và điều khiển đi bất kì đâu. Lưu ý: combo này là tự ráp, quý khách chỉ cần đấu nối và nạp code theo đúng sơ đồ là chạy, quý khách có thể chỉnh sửa lại code để tối ưu hơn." },
        { id: 2, image: P2, name: 'Mạch Raspberry Pi 4', quantity: 12, price: 1000000, description: "Raspberry Pi 4 Model B." },
        { id: 3, image: P3, name: 'Mạch sạc pin lithium 12V', quantity: 20, price: 75000, description: "Dùng cho ắc quy xe đạp điện" },
        { id: 4, image: P4, name: 'Mạch Arduino Nano', quantity: 10, price: 80000, description: "Mạch điều khiển Arduino Nano" },
        { id: 5, image: P5, name: 'Mạch sạc và bảo vệ pin 3S 20A', quantity: 13, price: 58000, description: "Bảo vệ pin Lithium-ion" },
        { id: 6, image: P6, name: 'Module nguồn AC-DC 100W', quantity: 10, price: 154000, description: "Ngõ ra 24V 4A và 5V 1A" },
        { id: 7, image: P7, name: 'Bộ điều khiển LM8-RRD', quantity: 27, price: 2021000, description: "Điều khiển số đọc cảm biến" },
        { id: 8, image: P8, name: 'Mạch tăng áp 1500W', quantity: 10, price: 359000, description: "Module BOOST 1500W" },
    ]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [newItem, setNewItem] = useState({ image: '', name: '', quantity: '', price: '', description: '' });
    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewItem((prev) => ({ ...prev, [name]: value }));
    };

    const validateItem = () => {
        const { name, quantity, price } = newItem;
        const nameRegex = /^[a-zA-ZÀ-ỹ\s]+$/;
        const quantityRegex = /^[0-9]+$/;
        const priceRegex = /^[0-9]+(\.[0-9]{1,2})?$/;

        if (!nameRegex.test(name)) {
            toast.error('Invalid please try again');
            return false;
        }

        if (!quantityRegex.test(quantity)) {
            toast.error('Invalid please try again');
            return false;
        }

        if (!priceRegex.test(price)) {
            toast.error('Invalid please try again');
            return false;
        }

        return true;
    };

    const handleAddItem = () => {
        if (!validateItem()) return;

        const newId = items.length ? items[items.length - 1].id + 1 : 1;
        setItems([...items, { ...newItem, id: newId, locked: false, price: Number(newItem.price) }]);
        toast.success('Item added successfully!');
        resetForm();
    };

    const handleEditItem = (item) => {
        setIsEditing(true);
        setCurrentItem(item);
        setNewItem(item);
        setIsModalOpen(true);
    };

    const handleUpdateItem = () => {
        if (!validateItem()) return;

        setItems(items.map(item =>
            item.id === currentItem.id ? { ...newItem, id: currentItem.id, price: Number(newItem.price) } : item
        ));
        toast.success('Item updated successfully!');
        resetForm();
    };

    const handleDeleteItem = (id) => {
        setItems(items.filter(item => item.id !== id));
        toast.success('Item deleted successfully!');
    };

    const handleDetailsItem = (item) => {
        setCurrentItem(item);
        setIsDetailModalOpen(true);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const resetForm = () => {
        setIsModalOpen(false);
        setIsEditing(false);
        setNewItem({ image: '', name: '', quantity: '', price: '', description: '' });
        setCurrentItem(null);
        setIsDetailModalOpen(false);
    };

    const filteredItems = items.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div id="ProductList" className="items-container">
            <div className="items-header">
                <h2>Item List</h2>
                <div className="header-actions">
                    <button className="add-item-btn" onClick={() => setIsModalOpen(true)}>Add Item</button>
                    <input
                        type="text"
                        placeholder="Search items"
                        className="search-input"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>
            </div>
            <table className="items-table">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredItems.map((item, index) => (
                        <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td><img src={item.image} alt={item.name} style={{ width: '50px', height: '50px' }} /></td>
                            <td>{item.name}</td>
                            <td>{item.quantity}</td>
                            <td>{item.price.toLocaleString('vi-VN')} VNĐ</td>
                            <td>
                                <button className="details-btn" onClick={() => handleDetailsItem(item)}>Details</button>
                                <button className="edit-btn" onClick={() => handleEditItem(item)}>Edit</button>
                                <button className="delete-btn" onClick={() => handleDeleteItem(item.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>{isEditing ? "Edit item" : "Add New Item"}</h3>
                        <div className="input-group">
                            <label className='image-title' htmlFor="image">Image URL</label>
                            <input
                                type="text"
                                id="image"
                                name="image"
                                placeholder="Image URL"
                                value={newItem.image}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="input-group">
                            <label className='name-title' htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Name"
                                value={newItem.name}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="input-group">
                            <label className='quantity-title' htmlFor="quantity">Quantity</label>
                            <input
                                type="number"
                                id="quantity"
                                name="quantity"
                                placeholder="Quantity"
                                value={newItem.quantity}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="input-group">
                            <label className='price-title' htmlFor="price">Price</label>
                            <input
                                type="text"
                                id="price"
                                name="price"
                                placeholder="Price"
                                value={newItem.price}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="input-group">
                            <label className='description-title' htmlFor="description">Description</label>
                            <textarea
                                className='description-text'
                                id="description"
                                name="description"
                                placeholder="Description"
                                value={newItem.description}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="button-container">
                            <button onClick={isEditing ? handleUpdateItem : handleAddItem}>
                                {isEditing ? "Update item" : "Add item"}
                            </button>
                            <button className='btn-cancel' onClick={resetForm}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            {isDetailModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>{currentItem?.name}</h3>
                        <img className='img' src={currentItem?.image} alt={currentItem?.name} style={{ width: '30%', height: '30%' }} />
                        <p><strong>Price:</strong> {currentItem?.price.toLocaleString('vi-VN')} VNĐ</p>
                        <p><strong>Quantity:</strong> {currentItem?.quantity}</p>
                        <p><strong>Description:</strong><br />{currentItem?.description}</p>
                        <button onClick={resetForm}>Close</button>
                    </div>
                </div>
            )}

            <ToastContainer />
        </div>
    );
};

export default ProductList;
