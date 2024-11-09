import React, { useEffect, useState } from "react";
import "./../Home/Home.css"; // Đảm bảo bạn đã tạo file CSS cho trang này

import Logo from '../../../assets/Logo NSHOP.png';
import P21 from '../../../assets/Product/21.jpg';
import P22 from '../../../assets/Product/22.jpg';
import P23 from '../../../assets/Product/23.jpg';


export default function Home() {
    const [products, setProducts] = useState([]); // State để lưu trữ danh sách sản phẩm

    // Fetch dữ liệu các sản phẩm từ API khi component render
    useEffect(() => {
        fetch("http://localhost:5000/products")
            .then((response) => response.json()) // Chuyển response thành JSON
            .then((data) => setProducts(data)) // Cập nhật state với dữ liệu lấy từ API
            .catch((error) => console.error("Error fetching products:", error)); // Xử lý lỗi
    }, []); // Chỉ chạy khi component được render lần đầu

    // Dữ liệu cho sản phẩm mới
    const newArrivals = {
        image: P22,
        title: "Arduino UNO R4 Minima (UNO R3 nâng cấp)",
    };

    return (
        <div id="Home">
            {/* Phần chứa ảnh nền chính */}
            <div className="Home-Container">
                <div className="Home-Container1">
                    <div className="Home-Container1-Title">
                        <h1>NShop</h1>
                    </div>
                    <div className="Home-Container1-Image">
                        <img src={Logo} alt="Logo" />
                    </div>
                </div>

                {/* Phần chứa Board Arduino và IOT STARTER KIT */}
                <div className="Home-Container2">
                    <a href="/Product" className="Home-Container2-BoardArduino">
                        <img src={P23} alt="Board Arduino" />
                        <p>Board Arduino</p>
                        <a className="Home-Container2-Viewmore" href="/Product">View More</a>
                    </a>

                    <a href="/Product" className="Home-Container2-KIT">
                        <img src={P21} alt="IOT STARTER KIT" />
                        <p>IOT STARTER KIT</p>
                        <a className="Home-Container2-Viewmore" href="/Product">View More</a>
                    </a>
                </div>

                {/* Phần gợi ý sản phẩm Top Picks For You */}
                <div className="Home-Container3">
                    <h2>Top Picks For You</h2>
                    <p>
                        Find a bright idea to suit your taste with our great selection of suspension, floor, and table lights.
                    </p>
                    <div className="product-list">
                        {/* Lọc danh sách sản phẩm để chỉ hiển thị sản phẩm có id từ 1 đến 4 */}
                        {products.length > 0 ? (
                            products
                                .filter((product) => product.id >= 1 && product.id <= 4) // Lọc sản phẩm theo id
                                .map((product) => (
                                    <div className="product-item" key={product.id}>
                                        <img src={product.image} alt={product.title} />
                                        <p>{product.title}</p>
                                        <p className="price">{product.price}</p>
                                    </div>
                                ))
                        ) : (
                            <p>Loading products...</p> // Hiển thị khi đang load dữ liệu
                        )}
                    </div>
                    <a href="/Product" className="view-more-link">View More</a>
                </div>

                {/* Phần sản phẩm mới */}
                <div className="Home-Container4">
                    <div className="new-arrivals">
                        <div className="new-arrivals-image">
                            <img src={newArrivals.image} alt="Arduino UNO R4 Minima" />
                        </div>
                        <div className="new-arrivals-info">
                            <h3>New Arrivals</h3>
                            <p>{newArrivals.title}</p>
                            <a href="/Cart" className="order-now-btn">Order Now</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
