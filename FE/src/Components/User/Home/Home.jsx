import React from "react";
import "./../Home/Home.css"; // Đảm bảo bạn đã tạo file CSS cho trang này

import Logo from '/src/assets/Logo NSHOP.png';
import P21 from '/src/assets/Product/21.jpg';
import P22 from '/src/assets/Product/22.jpg';
import P23 from '/src/assets/Product/23.jpg';
import P24 from '/src/assets/Product/24.jpg';
import P25 from '/src/assets/Product/25.jpg';
import P26 from '/src/assets/Product/26.jpg';




// Dữ liệu giả
const fakeData = [
    {
        id: 1,
        image: P24,
        title: "Combo tự chế máy rót rượu tự động V1",
        price: "220.000₫"
    },
    {
        id: 2,
        image: P24,
        title: "Combo tự chế máy rót rượu tự động V2",
        price: "257.000₫"
    },
    {
        id: 3,
        image: P25,
        title: "Combo tự làm xe 3 bánh tránh vật cản Arduino",
        price: "369.000₫"
    },
    {
        id: 4,
        image: P26,
        title: "Combo xe đa hướng Arduino - Điều khiển bluetooth",
        price: "1.240.000₫"
    }
];

const newArrivals = {
    image: P22,
    title: "Arduino UNO R4 Minima (UNO R3 nâng cấp)",
};

export default function Home() {
    return (
        <div id="Home">
            {/* Phần chứa ảnh nền chính */}
            <div className="Home-Container">
                <div className="Home-Container1">
                    <div className="Home-Container1-Title">
                        <h1>NShop</h1>
                    </div>
                    <div className="Home-Container1-Image">
                        <img src={Logo} alt="" />
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
                        {fakeData.map(product => (
                            <div className="product-item" key={product.id}>
                                <img src={product.image} alt={product.title} />
                                <p>{product.title}</p>
                                <p className="price">{product.price}</p>
                            </div>
                        ))}
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
