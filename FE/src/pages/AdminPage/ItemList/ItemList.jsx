import React from "react";
import "./ItemList.css";
import Sidebar from "../Sidebar/Sidebar";

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


const ItemList = () => {
    return (
        <div className="container" id="itemlist-container">
            <Sidebar />
            <div className="dashboard" id="dashboard">
                <div className="dashboard-header" id="dashboard-header">
                    <h2>Product Overview</h2>
                </div>

                <div className="dashboard-cards" id="dashboard-cards">
                    <div className="card account-card" id="account-card">
                        <h3 id="all-products-title">All Products</h3>
                        <table className="account-table" id="account-table">
                            <thead>
                                <tr>
                                    <th id="product-name-header">Name</th>
                                    <th id="product-img-header">Image</th>
                                    <th id="product-des-header">Description</th>
                                    <th id="product-price-header">Price</th>
                                    <th id="product-status-header">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {fakeData.map((product, index) => (
                                    <tr key={index}>
                                        <td id={`product-name-${index}`}>{product.title}</td>
                                        <td id={`product-img-${index}`}><img src={product.image} alt={product.title} className="product-image" /></td>
                                        <td id={`product-des-${index}`}>{product.description}</td>
                                        <td id={`product-price-${index}`}>{product.price} {product.currency}</td>
                                        <td className={`status ${index % 2 === 0 ? 'active' : 'inactive'}`} id={`status-${index}`}>
                                            {index % 2 === 0 ? 'Active' : 'Inactive'}
                                        </td>
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

export default ItemList;
