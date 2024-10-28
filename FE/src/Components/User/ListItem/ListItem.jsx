import React, { useState } from "react"
import "./../ListItem/ListItem.css"
import { IoCartOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

import P1 from '/src/assets/Product/1.jpg';
import P2 from '/src/assets/Product/2.jpg';
import P3 from '/src/assets/Product/3.jpg';
import P4 from '/src/assets/Product/4.jpg';
import P5 from '/src/assets/Product/5.jpg';
import P6 from '/src/assets/Product/6.jpg';
import P7 from '/src/assets/Product/7.jpg';
import P8 from '/src/assets/Product/8.jpg';
import P9 from '/src/assets/Product/9.jpg';
import P10 from '/src/assets/Product/10.jpg';
import P11 from '/src/assets/Product/11.jpg';
import P12 from '/src/assets/Product/12.jpg';
import P13 from '/src/assets/Product/13.jpg';
import P14 from '/src/assets/Product/14.jpg';
import P15 from '/src/assets/Product/15.jpg';
import P16 from '/src/assets/Product/16.jpg';
import P17 from '/src/assets/Product/17.jpg';
import P18 from '/src/assets/Product/18.jpg';
import P19 from '/src/assets/Product/19.jpg';
import P20 from '/src/assets/Product/20.jpg';
import P21 from '/src/assets/Product/21.jpg';

export default function ListItem() {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [cartCount] = useState(10); // Giả sử số lượng sản phẩm trong giỏ là 10
    const [sortOption, setSortOption] = useState(""); // Tùy chọn sắp xếp
    const [productType, setProductType] = useState(""); // Tùy chọn loại sản phẩm
    const [priceRange, setPriceRange] = useState(""); // Phạm vi giá
    const itemsPerPage = 16; // Số sản phẩm hiển thị mỗi trang

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

    // Tính toán chỉ số sản phẩm hiện tại
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    // Lọc dữ liệu dựa trên từ khóa tìm kiếm, loại sản phẩm và phạm vi giá
    const filteredData = fakeData.filter(item => {
        // Chuyển đổi giá thành số
        const itemPrice = parseFloat(item.price.replace(/\./g, '').replace('₫', '').trim());

        // Xác định khoảng giá
        let minPrice = 0;
        let maxPrice = Infinity;

        if (priceRange === "0-200") {
            maxPrice = 200000; // Điều chỉnh giá tối đa
        } else if (priceRange === "200-500") {
            minPrice = 200000;
            maxPrice = 500000;
        } else if (priceRange === "500-1000") {
            minPrice = 500000;
            maxPrice = 1000000;
        } else if (priceRange === "1000-2000") {
            minPrice = 1000000;
            maxPrice = 5000000;
        }

        // In ra thông tin để kiểm tra
        console.log(`Item: ${item.title}, Price: ${itemPrice}, Min: ${minPrice}, Max: ${maxPrice}`);

        return (
            (item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
            (productType ? (productType === "DIY" ? item.title.startsWith("Combo") : !item.title.startsWith("Combo")) : true) &&
            (itemPrice >= minPrice && itemPrice < maxPrice) // Kiểm tra khoảng giá
        );
    });

    // Sắp xếp dữ liệu theo tùy chọn
    const sortedData = [...filteredData].sort((a, b) => {
        const priceA = parseFloat(a.price.replace(/\./g, '').replace('₫', '').trim());
        const priceB = parseFloat(b.price.replace(/\./g, '').replace('₫', '').trim());

        switch (sortOption) {
            case "name":
                return a.title.localeCompare(b.title);
            case "priceLowToHigh":
                return priceA - priceB; // Sắp xếp từ thấp đến cao
            case "priceHighToLow":
                return priceB - priceA; // Sắp xếp từ cao đến thấp
            default:
                return 0;
        }
    });

    // Lấy danh sách sản phẩm hiện tại cho trang hiện tại
    const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(sortedData.length / itemsPerPage);

    // Hàm xử lý thay đổi trang
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber); // Assuming you have a state for currentPage
        window.scrollTo({
            top: 0, // Scroll to the top of the page
            behavior: 'smooth' // Smooth scroll
        });
    };


    // Hàm xử lý thay đổi từ khóa tìm kiếm
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Reset trang về 1 khi tìm kiếm
    };

    // Hàm xử lý thay đổi tùy chọn sắp xếp
    const handleSortChange = (option) => {
        setSortOption(option);
        setCurrentPage(1); // Reset trang về 1 khi sắp xếp
    };

    // Hàm xử lý thay đổi loại sản phẩm
    const handleTypeChange = (type) => {
        setProductType(type);
        setCurrentPage(1); // Reset trang về 1 khi thay đổi loại sản phẩm
    };

    // Hàm xử lý thay đổi phạm vi giá
    const handlePriceRangeChange = (range) => {
        setPriceRange(range);
        setCurrentPage(1); // Reset trang về 1 khi thay đổi phạm vi giá
    };


    return (
        <div id="ListItem">
            <div className="ListItem-Container1">
                {/* Task View Side Panel */}
                <div className="task-view">
                    {/* Sort Buttons */}
                    <div className="sort-buttons">
                        <h4>Sort by</h4>
                        <button onClick={() => handleSortChange("name")}>Name (A-Z)</button>
                        <button onClick={() => handleSortChange("priceLowToHigh")}>Price (Low to High)</button>
                        <button onClick={() => handleSortChange("priceHighToLow")}>Price (High to Low)</button>
                        <button onClick={() => handleSortChange("newest")}>Newest</button>
                    </div>

                    {/* Filter by Product Type */}
                    <div className="filter-type">
                        <h4>Filter by Product Type</h4>
                        <button onClick={() => handleTypeChange("DIY")}>DIY</button>
                        <button onClick={() => handleTypeChange("Module")}>Module</button>
                        <button onClick={() => handleTypeChange("")}>All</button>
                    </div>

                    {/* Price Range Selector */}
                    <div className="price-range">
                        <h4>Select Price Range</h4>
                        <select onChange={(e) => handlePriceRangeChange(e.target.value)} className="price-select">
                            <option value="">All</option>
                            <option value="0-200">0₫ - 200₫</option>
                            <option value="200-500">200₫ - 500₫</option>
                            <option value="500-1000">500₫ - 1.000₫</option>
                            <option value="1000-2000">1.000₫ - 2.000₫</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="ListItem-Container2">
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
                                                {item.price.toLocaleString()} {item.currency}
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

                <div className="pagination">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button key={index} onClick={() => handlePageChange(index + 1)} className={currentPage === index + 1 ? 'active' : ''}>
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}