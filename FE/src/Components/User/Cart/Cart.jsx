import React, { useState } from "react";
import "./../Cart/Cart.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';

import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBInput,
    MDBRow,
    MDBTypography,
} from "mdb-react-ui-kit";

import P21 from '/SWD392_FE/fe/src/assets/Product/21.jpg';

// Dữ liệu giả cho sản phẩm trong giỏ hàng
const fakeData = [
    {
        id: 1,
        name: "Combo xe điều khiển từ xa có camera giám sát",
        description: "DIY",
        quantity: 1,
        price: 5600000000,
        image: P21,
    },
    {
        id: 2,
        name: "Samsung galaxy Note 10",
        description: "256GB, Navy Blue",
        quantity: 1,
        price: 900000, // Sửa lại giá để thử nghiệm
        image: "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img2.webp"
    },
    // Thêm các sản phẩm khác tại đây
];

const additionalProducts = [
    {
        id: 3,
        name: "Máy tính xách tay ASUS ROG",
        description: "Core i7, 16GB RAM, 512GB SSD",
        price: 25000000,
        image: P21,
    },
    {
        id: 4,
        name: "Tai nghe Sony WH-1000XM4",
        description: "Khử tiếng ồn, Bluetooth",
        price: 7500000,
        image: P21,
    },
    {
        id: 3,
        name: "Máy tính xách tay ASUS ROG",
        description: "Core i7, 16GB RAM, 512GB SSD",
        price: 25000000,
        image: P21,
    },
    {
        id: 4,
        name: "Tai nghe Sony WH-1000XM4",
        description: "Khử tiếng ồn, Bluetooth",
        price: 7500000,
        image: P21,
    },
    {
        id: 3,
        name: "Máy tính xách tay ASUS ROG",
        description: "Core i7, 16GB RAM, 512GB SSD",
        price: 25000000,
        image: P21,
    },
    {
        id: 4,
        name: "Tai nghe Sony WH-1000XM4",
        description: "Khử tiếng ồn, Bluetooth",
        price: 7500000,
        image: P21,
    },
    {
        id: 3,
        name: "Máy tính xách tay ASUS ROG",
        description: "Core i7, 16GB RAM, 512GB SSD",
        price: 25000000,
        image: P21,
    },
    {
        id: 4,
        name: "Tai nghe Sony WH-1000XM4",
        description: "Khử tiếng ồn, Bluetooth",
        price: 7500000,
        image: P21,
    },

    // Thêm sản phẩm khác tại đây
];

// Hàm định dạng giá tiền
const formatCurrency = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "₫";
};

export default function Cart() {

    const [cartItems, setCartItems] = useState(fakeData);

    const increaseQuantity = (id) => {
        setCartItems(cartItems.map(item =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        ));
    };

    const decreaseQuantity = (id) => {
        setCartItems(cartItems.map(item =>
            item.id === id ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
        ));
    };

    const handleRemoveItem = (id) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    };

    const [currentIndex, setCurrentIndex] = useState(0);
    const productsPerPage = 3; // Số sản phẩm hiển thị mỗi lần (có thể chỉnh tùy theo kích thước màn hình)

    const handlePrevClick = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - productsPerPage);
        }
    };

    const handleNextClick = () => {
        if (currentIndex < additionalProducts.length - productsPerPage) {
            setCurrentIndex(currentIndex + productsPerPage);
        }
    };

    return (
        <div id="Cart-Container">
            <div className="Cart-Container-01">
                <section className="h-100 h-custom" style={{ backgroundColor: "whitesmoke" }}>
                    <MDBContainer className="py-5 h-100">
                        <MDBRow className="justify-content-center align-items-center h-100">
                            <MDBCol>
                                <MDBCard>
                                    <MDBCardBody className="p-4">
                                        <MDBRow>
                                            <MDBCol lg="7">
                                                <MDBTypography tag="h5">
                                                    <a href="#!" className="text-body">
                                                        <MDBIcon fas icon="long-arrow-alt-left me-2" /> Continue shopping
                                                    </a>
                                                </MDBTypography>

                                                <hr />

                                                <div className="d-flex justify-content-between align-items-center mb-4">
                                                    <div>
                                                        <p className="mb-1">Shopping cart</p>
                                                        <p className="mb-0">You have {cartItems.length} items in your cart</p>
                                                    </div>
                                                    <div>
                                                        <p>
                                                            <span className="text-muted">Sort by:</span>
                                                            <a href="#!" className="text-body">
                                                                price
                                                                <MDBIcon fas icon="angle-down mt-1" />
                                                            </a>
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Danh sách sản phẩm */}
                                                {cartItems.map(item => (
                                                    <MDBCard className="mb-3" key={item.id}>
                                                        <MDBCardBody>
                                                            <div className="d-flex justify-content-between">
                                                                <div className="d-flex flex-row align-items-center">
                                                                    <div>
                                                                        <MDBCardImage
                                                                            src={item.image}
                                                                            fluid className="rounded-3"
                                                                            style={{ width: "65px" }}
                                                                            alt="Shopping item"
                                                                        />
                                                                    </div>
                                                                    <div className="ms-3">
                                                                        <MDBTypography tag="h5">{item.name}</MDBTypography>
                                                                        <p className="small mb-0">{item.description}</p>
                                                                    </div>
                                                                </div>
                                                                <div className="d-flex flex-row align-items-center">
                                                                    <div className="quantity-control d-flex align-items-center">
                                                                        <MDBIcon
                                                                            icon="minus-circle"
                                                                            onClick={() => decreaseQuantity(item.id)}
                                                                            style={{ cursor: 'pointer', color: item.quantity > 1 ? '#007bff' : '#ccc' }}
                                                                        />
                                                                        <MDBTypography tag="h5" className="fw-normal mb-0 mx-2">{item.quantity}</MDBTypography>
                                                                        <MDBIcon
                                                                            icon="plus-circle"
                                                                            onClick={() => increaseQuantity(item.id)}
                                                                            style={{ cursor: 'pointer', color: '#007bff' }}
                                                                        />
                                                                    </div>
                                                                    <div style={{ width: "auto", marginRight: "10px" }}>
                                                                        <MDBTypography tag="h5" className="mb-0">{formatCurrency(item.price * item.quantity)}</MDBTypography>
                                                                    </div>
                                                                    <a href="#!" onClick={() => handleRemoveItem(item.id)} style={{ color: item.quantity > 1 ? "#cecece" : "#ccc" }}>
                                                                        <MDBIcon fas icon="trash-alt" />
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </MDBCardBody>
                                                    </MDBCard>
                                                ))}

                                            </MDBCol>

                                            <MDBCol lg="5">
                                                <MDBCard className="bg-primary text-white rounded-3">
                                                    <MDBCardBody>
                                                        <div className="d-flex justify-content-between align-items-center mb-4">
                                                            <MDBTypography tag="h5" className="mb-0">Card details</MDBTypography>
                                                            <MDBCardImage
                                                                src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                                                                fluid className="rounded-3"
                                                                style={{ width: "45px" }}
                                                                alt="Avatar"
                                                            />
                                                        </div>

                                                        <p className="small">Card type</p>
                                                        <a href="#!" type="submit" className="text-white">
                                                            <MDBIcon fab icon="cc-mastercard fa-2x me-2" />
                                                        </a>
                                                        <a href="#!" type="submit" className="text-white">
                                                            <MDBIcon fab icon="cc-visa fa-2x me-2" />
                                                        </a>
                                                        <a href="#!" type="submit" className="text-white">
                                                            <MDBIcon fab icon="cc-amex fa-2x me-2" />
                                                        </a>
                                                        <a href="#!" type="submit" className="text-white">
                                                            <MDBIcon fab icon="cc-paypal fa-2x me-2" />
                                                        </a>

                                                        <form className="mt-4">
                                                            <MDBInput className="mb-4" label="Cardholder's Name" type="text" size="lg" placeholder="Cardholder's Name" contrast />
                                                            <MDBInput className="mb-4" label="Card Number" type="text" size="lg" minLength="19" maxLength="19" placeholder="1234 5678 9012 3457" contrast />

                                                            <MDBRow className="mb-4">
                                                                <MDBCol md="6">
                                                                    <MDBInput className="mb-4" label="Expiration" type="text" size="lg" minLength="7" maxLength="7" placeholder="MM/YYYY" contrast />
                                                                </MDBCol>
                                                                <MDBCol md="6">
                                                                    <MDBInput className="mb-4" label="Cvv" type="text" size="lg" minLength="3" maxLength="3" placeholder="&#9679;&#9679;&#9679;" contrast />
                                                                </MDBCol>
                                                            </MDBRow>
                                                        </form>

                                                        <hr />

                                                        <div className="d-flex justify-content-between">
                                                            <p className="mb-2">Subtotal</p>
                                                            <p className="mb-2">{formatCurrency(cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0))}</p>
                                                        </div>

                                                        <div className="d-flex justify-content-between">
                                                            <p className="mb-2">Shipping</p>
                                                            <p className="mb-2">20.000₫</p>
                                                        </div>

                                                        <div className="d-flex justify-content-between">
                                                            <p className="mb-2">Total(Incl. taxes)</p>
                                                            <p className="mb-2">{formatCurrency(cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0) + 20000)}</p>
                                                        </div>

                                                        <MDBBtn color="info" block size="lg">
                                                            <div className="d-flex justify-content-between">
                                                                <span>{formatCurrency(cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0) + 20000)}</span>
                                                                <span>Checkout</span>
                                                            </div>
                                                        </MDBBtn>
                                                    </MDBCardBody>
                                                </MDBCard>
                                            </MDBCol>
                                        </MDBRow>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </section>
            </div>

            <div className="Cart-Container-02">
                <div className="additional-products">
                    <h5 className="mb-4">Các sản phẩm khác bạn có thể thích:</h5>
                    <div className="carousel-container">
                        <button className="carousel-btn prev-btn" onClick={handlePrevClick}>❮</button>
                        <div className="product-row">
                            {additionalProducts.slice(currentIndex, currentIndex + productsPerPage).map(product => (
                                <div className="product-card" key={product.id}>
                                    <img src={product.image} alt={product.name} className="product-image" />
                                    <div className="product-body">
                                        <h5 className="product-name">{product.name}</h5>
                                        <p className="product-description small">{product.description}</p>
                                        <h5 className="product-price">{formatCurrency(product.price)}</h5>
                                        <button className="add-to-cart" onClick={() => setCartItems([...cartItems, { ...product, quantity: 1 }])}>
                                            Thêm vào giỏ hàng
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="carousel-btn next-btn" onClick={handleNextClick}>❯</button>
                    </div>
                </div>
            </div>
        </div>

    );
}
