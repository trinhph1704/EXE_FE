import React, { useState } from "react"
import "./../ListItem/ListItem.css"
import { IoCartOutline } from "react-icons/io5";

import { Link } from "react-router-dom";

import P1 from '/SWD392_FE/fe/src/assets/Product/1.jpg';
import P2 from '/SWD392_FE/fe/src/assets/Product/2.jpg';
import P3 from '/SWD392_FE/fe/src/assets/Product/3.jpg';
import P4 from '/SWD392_FE/fe/src/assets/Product/4.jpg';
import P5 from '/SWD392_FE/fe/src/assets/Product/5.jpg';
import P6 from '/SWD392_FE/fe/src/assets/Product/6.jpg';
import P7 from '/SWD392_FE/fe/src/assets/Product/7.jpg';
import P8 from '/SWD392_FE/fe/src/assets/Product/8.jpg';
import P9 from '/SWD392_FE/fe/src/assets/Product/9.jpg';
import P10 from '/SWD392_FE/fe/src/assets/Product/10.jpg';
import P11 from '/SWD392_FE/fe/src/assets/Product/11.jpg';
import P12 from '/SWD392_FE/fe/src/assets/Product/12.jpg';
import P13 from '/SWD392_FE/fe/src/assets/Product/13.jpg';
import P14 from '/SWD392_FE/fe/src/assets/Product/14.jpg';
import P15 from '/SWD392_FE/fe/src/assets/Product/15.jpg';
import P16 from '/SWD392_FE/fe/src/assets/Product/16.jpg';
import P17 from '/SWD392_FE/fe/src/assets/Product/17.jpg';
import P18 from '/SWD392_FE/fe/src/assets/Product/18.jpg';
import P19 from '/SWD392_FE/fe/src/assets/Product/19.jpg';
import P20 from '/SWD392_FE/fe/src/assets/Product/20.jpg';
import P21 from '/SWD392_FE/fe/src/assets/Product/21.jpg';

export default function ListItem() {
    const [currentPage, setCurrentPage] = useState(1)
    const [searchTerm, setSearchTerm] = useState("")
    const [cartCount] = useState(10); // Giả sử số lượng sản phẩm trong giỏ là 3
    const itemsPerPage = 16

    const fakeData = [
        { title: 'Combo xe điều khiển từ xa có camera giám sát', description: 'DIY', price: '560.000', currency: '₫', image: P21 },

        { title: 'Mạch đảo chiều động cơ từ xa', description: 'Sử dụng 6 - 24VDC', price: '235.000', currency: '₫', image: P1 },
        { title: 'Mạch sạc và bảo vệ pin', description: 'Pin 3S Lithium-ion 15A', price: '50.000', currency: '₫', image: P2 },
        { title: 'Mạch sạc pin lithium 12V', description: 'Dùng cho ắc quy xe đạp điện', price: '75.000', currency: '₫', image: P3 },
        { title: 'Nguồn tổ ong 12V 5A', description: 'Nguồn ổn định cho các thiết bị điện tử', price: '169.000', currency: '₫', image: P4 },
        { title: 'Mạch sạc và bảo vệ pin 3S 20A', description: 'Bảo vệ pin Lithium-ion', price: '58.000', currency: '₫', image: P5 },
        { title: 'Module nguồn AC-DC 100W', description: 'Ngõ ra 24V 4A và 5V 1A', price: '154.000', currency: '₫', image: P6 },
        { title: 'Bộ điều khiển LM8-RRD', description: 'Điều khiển số đọc cảm biến', price: '2.021.000', currency: '₫', image: P7 },
        { title: 'Mạch tăng áp 1500W', description: 'Module BOOST 1500W', price: '359.000', currency: '₫', image: P8 },
        { title: 'Thẻ RFID Mifare Sao', description: 'Chép 13.56MHz', price: '11.000', currency: '₫', image: P9 },
        { title: 'USB tester điện áp', description: 'Đo điện áp, dung lượng pin', price: '65.000', currency: '₫', image: P10 },
        { title: 'Nguồn tổ ong 30A', description: 'Nguồn ổn định cho thiết bị', price: '390.000', currency: '₫', image: P11 },
        { title: 'Mạch sạc 3S 15A', description: 'Pin Lithium-ion HXY 3S-15A', price: '50.000', currency: '₫', image: P12 },
        { title: 'Mạch sạc pin lithium 8.4V', description: 'Mạch sạc cho pin 8.4V', price: '15.000', currency: '₫', image: P13 },
        { title: 'Mạch bảo vệ pin 3S 30A', description: 'Pin Lithium-ion HXY 3S-30A', price: '75.000', currency: '₫', image: P14 },
        { title: 'Mạch sạc pin 2S 8.4V', description: 'Mạch bảo vệ pin 2S', price: '15.000', currency: '₫', image: P15 },
        { title: 'Antena Wifi Bluetooth', description: 'ZigBee 2.4GHz 6dBi', price: '29.000', currency: '₫', image: P16 },
        { title: 'Bộ nguồn AC-DC', description: 'Nguồn điện 12V 5A', price: '169.000', currency: '₫', image: P17 },

        // Các sản phẩm mới
        { title: 'Mạch điều khiển DC Motor', description: 'Điều khiển tốc độ động cơ DC', price: '120.000', currency: '₫', image: P18 },
        { title: 'Mạch LED RGB', description: 'Mạch điều khiển LED RGB', price: '85.000', currency: '₫', image: P19 },
        { title: 'Cảm biến nhiệt độ và độ ẩm', description: 'DHT11', price: '45.000', currency: '₫', image: P20 },
        { title: 'Mạch phát sóng Bluetooth', description: 'HC-05', price: '150.000', currency: '₫', image: P1 },
        { title: 'Mạch Raspberry Pi 4', description: 'Raspberry Pi 4 Model B', price: '1.000.000', currency: '₫', image: P2 },
        { title: 'Mạch Arduino Nano', description: 'Mạch điều khiển Arduino Nano', price: '80.000', currency: '₫', image: P3 },
        { title: 'Mạch cảm biến siêu âm', description: 'HC-SR04', price: '40.000', currency: '₫', image: P4 },
        { title: 'Cảm biến ánh sáng', description: 'LDR', price: '15.000', currency: '₫', image: P5 },
        { title: 'Mạch nguồn điều chỉnh', description: 'LM317', price: '20.000', currency: '₫', image: P6 },
        { title: 'Mạch thu phát RF', description: '433MHz', price: '70.000', currency: '₫', image: P7 },
        { title: 'Mạch LED 7 đoạn', description: 'Mạch LED 7 đoạn hiển thị số', price: '25.000', currency: '₫', image: P8 },
        { title: 'Mạch cảm biến nhiệt độ', description: 'LM35', price: '30.000', currency: '₫', image: P9 },
        { title: 'Mạch cảm biến gia tốc', description: 'ADXL345', price: '150.000', currency: '₫', image: P10 },
        { title: 'Mạch lọc nhiễu', description: 'Bộ lọc tín hiệu', price: '55.000', currency: '₫', image: P11 },
        { title: 'Mạch phân tích tín hiệu', description: 'Tín hiệu Analog', price: '100.000', currency: '₫', image: P12 },
        { title: 'Mạch LED 5050 RGB', description: 'Đèn LED RGB', price: '95.000', currency: '₫', image: P13 },
        { title: 'Mạch quản lý pin', description: 'Quản lý sạc và xả pin', price: '150.000', currency: '₫', image: P14 },
        { title: 'Mạch chuyển đổi AC-DC', description: 'AC-DC 5V 2A', price: '85.000', currency: '₫', image: P15 },
        { title: 'Bộ mạch phát Wifi', description: 'ESP8266', price: '120.000', currency: '₫', image: P16 },
        { title: 'Mạch điều khiển động cơ servo', description: 'SG90', price: '40.000', currency: '₫', image: P17 },
        { title: 'Mạch cảm biến từ', description: 'Cảm biến từ trường', price: '50.000', currency: '₫', image: P18 },

    ];
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const filteredData = fakeData.filter(item => {
        const searchLower = searchTerm.toLowerCase();
        return (
            item.title.toLowerCase().startsWith(searchLower) ||
            item.description.toLowerCase().startsWith(searchLower)
        );
    });

    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Reset to first page on search
    };

    return (
        <div id="ListItem">
            {/* Search Filter */}
            <div className="filter-container">
                <input
                    id="search"
                    type="text"
                    className="filter-input"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <button className="filter-button">Search</button>
            </div>

            {/* Product Listing */}
            <div className="ListItemPage-Container">
                <div className="products-container">
                    {filteredData.length === 0 ? (
                        <p>No products found.</p>
                    ) : (
                        currentItems.map((item, index) => (
                            <div className="list-item" key={index}>
                                <Link to={`/Product/Details/${item.title}`} className="list-item-link">
                                    <img src={item.image} alt={item.title} className="product-image" />
                                    <div className="product-details">
                                        <h3 className="product-title">{item.title}</h3>
                                        <p className="product-description">{item.description}</p>
                                        <div className="product-price">
                                            {item.price} {item.currency}
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))
                    )}
                </div>
            </div>

            <div className="cart-icon-container">
                <IoCartOutline className="cart-icon" />
                <span className="cart-count">{cartCount}</span>
            </div>

            {/* Pagination */}
            <div className="pagination">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button key={index} onClick={() => handlePageChange(index + 1)} className={currentPage === index + 1 ? 'active' : ''}>
                        {index + 1}
                    </button>
                ))}
            </div>

        </div>
    );
}