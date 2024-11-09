import React, { useState, useRef, useEffect } from "react";
import "./../Cart/Cart.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';

import { IoIosArrowDropleft } from "react-icons/io";
import { IoIosArrowDropright } from "react-icons/io";
import CryptoJS from 'crypto-js';


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



export default function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [orderItems, setOrderItems] = useState([]);
    const [sortOption, setSortOption] = useState(""); // State cho lựa chọn sắp xếp
    const [additionalProducts, setAdditionalProducts] = useState([]);
    const [user, setUser] = useState(null);

    // Hàm tính giá tiền
    const calculateCost = (productPrice, quantity) => {
        const price = Number(productPrice); // Chuyển đổi productPrice thành số
        const qty = Number(quantity); // Chuyển đổi quantity thành số
        if (isNaN(price) || isNaN(qty)) {
            return 0; // Nếu giá hoặc số lượng không hợp lệ, trả về 0
        }
        return price * qty; // Trả về tổng giá của sản phẩm
    };

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('userId'));
        if (storedUser) {
            setUser(storedUser);
        } else {
            console.error("User ID không tồn tại trong localStorage");
        }
    }, []);

    // Fetch giỏ hàng và sản phẩm bổ sung
    useEffect(() => {
        const fetchUserCartAndProducts = async () => {
            try {
                if (!user || !user.id) {
                    console.error("User hoặc userId không tồn tại");
                    return;
                }
    
                const userIds = user.id; 
                // const userIds= "4";
                console.log(userIds);
    
                // Fetch giỏ hàng của user
                const userResponse = await fetch(`http://localhost:5000/users/${userIds}`);
                if (!userResponse.ok) {
                    throw new Error(`User not found: ${userResponse.status} ${userResponse.statusText}`);
                }
                const userData = await userResponse.json();
    
                if (!userData.cart) {
                    console.error("Giỏ hàng trống hoặc không tồn tại");
                    return;
                }
    
                // Fetch sản phẩm
                const productResponse = await fetch("http://localhost:5000/products");
                if (!productResponse.ok) {
                    throw new Error(`Products not found: ${productResponse.status} ${productResponse.statusText}`);
                }
                const productData = await productResponse.json();
    
                // Hợp nhất thông tin giỏ hàng với sản phẩm
                const enrichedCartItems = userData.cart.map(cartItem => {
                    const productInfo = productData.find(product => product.productId === cartItem.productId);
                    return {
                        ...cartItem,
                        ...productInfo // Gộp dữ liệu từ `product` vào `cartItem`
                    };
                });
                console.log(enrichedCartItems);
                setCartItems(sortProducts(enrichedCartItems));
                console.log(cartItems,1);
                setAdditionalProducts(productData);
            } catch (error) {
                console.error('Error fetching cart items or products:', error);
            }
        };
    
        if (user) {  // Chỉ gọi fetchUserCartAndProducts khi user có dữ liệu
            fetchUserCartAndProducts();
        }
    }, [user, sortOption]);  // Thêm user vào dependency array


    const handlePayment = () => {

        // try {
        //     const userId = user.id;
        //     if (!userId) {
        //         console.error("User ID not found");
        //         return;
        //     }
    
        //     // Create a new order object
        //     const newOrder = {
        //         orderId: Date.now().toString(), // Generate unique ID based on timestamp
        //         date: new Date().toISOString().split("T")[0], // Current date in YYYY-MM-DD format
        //         status: "Processing", // Leave status empty
        //         total: "0", // Leave total empty or calculate if needed
        //         items: cartItems.map(item => ({
        //             productId: item.productId,
        //             image : item.image,
        //             title : item.title,
        //             price : item.price,
        //             description : item.description,
        //             quantity: item.quantity,
        //         })),
        //     };
    
        //     // Fetch the current user data
        //     const userResponse = await fetch(`http://localhost:5000/users/${userId}`);
        //     if (!userResponse.ok) {
        //         console.error("Error fetching user data:", userResponse.statusText);
        //         return;
        //     }
    
        //     const userData = await userResponse.json();
    
        //     // Add the new order to the user's orders array
        //     userData.orders = userData.orders ? [...userData.orders, newOrder] : [newOrder];
    
        //     // Update the user with the new order on the server
        //     const updateResponse = await fetch(`http://localhost:5000/users/${userId}`, {
        //         method: 'PUT',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify(userData),
        //     });
    
        //     if (updateResponse.ok) {
        //         const updatedUser = await updateResponse.json();
        //     // setCartItems(updatedUser.cart);  // Update local state with the new cart
        //     updateUserOrders(updatedUser.orders);
        //         console.log("Order added successfully");
    
        //         // Redirect to the VNPAY payment page
        //         window.location.href = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html'; // Replace with actual payment URL
        //     } else {
        //         console.error("Error updating user with new order:", updateResponse.statusText);
        //     }
        // } catch (error) {
        //     console.error("Error during payment process:", error);
        // }





        if (cartItems.length === 0) {
            // Hiển thị thông báo nếu giỏ hàng trống
            alert("Please select items before payment.");
            return;
        }
        const vnpayDemoUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
        const date = new Date();
        const vnpCreateDate = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}${String(date.getHours()).padStart(2, '0')}${String(date.getMinutes()).padStart(2, '0')}${String(date.getSeconds()).padStart(2, '0')}`;
        
        const expireDate = new Date(date.getTime() + 15 * 60 * 1000);
        const vnpExpireDate = `${expireDate.getFullYear()}${String(expireDate.getMonth() + 1).padStart(2, '0')}${String(expireDate.getDate()).padStart(2, '0')}${String(expireDate.getHours()).padStart(2, '0')}${String(expireDate.getMinutes()).padStart(2, '0')}${String(expireDate.getSeconds()).padStart(2, '0')}`;
    

        // Tham số thanh toán
        const params = {
            vnp_Version: "2.1.0",
            vnp_Command: "pay",
            vnp_TmnCode: "ME8MTL4P", // Thay YOUR_TMNCODE bằng mã TmnCode bạn nhận từ VNPay
            vnp_Amount: cartItems.reduce((total, item) => total + item.price * item.quantity, 0) * 100, // Tổng tiền tính bằng đồng\127.0.0.1(nhà)
            vnp_BankCode : "VNBANK",
            vnp_CreateDate: vnpCreateDate,
            vnp_CurrCode: "VND",
            vnp_IpAddr: "10.87.0.1",//trường
            vnp_Locale: "vn",
            vnp_OrderInfo: "Thanh toán đơn hàng tại cửa hàng XYZ",
            vnp_OrderType: "other",
            vnp_ReturnUrl: "http://localhost:5174/checkout-success", // URL trả về sau khi thanh toán thành công
            vnp_ExpireDate : vnpExpireDate,
            vnp_TxnRef: vnpExpireDate.toString(), // Mã đơn hàng (mỗi đơn hàng một mã duy nhất)
            // vnp_SecureHash : "NY4ZISFPPI1HP81EQ4K46MQJ2DYD128Y",
        };

        // Khóa bí mật từ VNPay
    const vnp_HashSecret = "NY4ZISFPPI1HP81EQ4K46MQJ2DYD128Y";
        // Sắp xếp các tham số theo thứ tự từ điển (alphabetical order)
    const sortedParams = Object.keys(params)
    .sort()
    .reduce((acc, key) => {
        acc[key] = params[key];
        return acc;
    }, {});

// Tạo chuỗi query từ các tham số đã sắp xếp
const queryString = new URLSearchParams(sortedParams).toString();

// Tạo chữ ký HMAC SHA-512 từ chuỗi query và khóa bí mật
const vnp_SecureHash = CryptoJS.HmacSHA512(queryString, vnp_HashSecret).toString(CryptoJS.enc.Hex);

// Thêm `vnp_SecureHash` vào params
params.vnp_SecureHash = vnp_SecureHash;

        // Tạo chuỗi query từ params
        // const queryString = new URLSearchParams(params).toString();
        const paymentUrl = `${vnpayDemoUrl}?${new URLSearchParams(params).toString()}`;

        // Chuyển hướng đến trang thanh toán VNPay
        window.location.href = paymentUrl;
    };


    // Adding to cart
const addToCart = async (product) => {
    try {
        const userId = user.id;  // Ensure userId is accessible
        if (!userId) {
            console.error("User ID not found");
            return;
        }

        // Fetch the current user data
        const userResponse = await fetch(`http://localhost:5000/users/${userId}`);
        if (!userResponse.ok) {
            console.error("Error fetching user data:", userResponse.statusText);
            return;
        }

        const userData = await userResponse.json();
        
        // Check if product is already in cart
        const existingProduct = userData.cart.find(item => item.productId === product.productId);
        if (existingProduct) {
            // Increase quantity if already in cart
            existingProduct.quantity += 1;
        } else {
            // Add new product to cart
            userData.cart.push({ productId: product.productId, quantity: 1 });
            console.log(product)
        }

        // Update user data on the server with the modified cart
        const updateResponse = await fetch(`http://localhost:5000/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (updateResponse.ok) {
            const updatedUser = await updateResponse.json();
            // setCartItems(updatedUser.cart);  // Update local state with the new cart
            updateUserCart(updatedUser.cart);
        } else {
            console.error("Error updating cart:", updateResponse.statusText);
        }
    } catch (error) {
        console.error("Error adding product to cart:", error);
    }
};


    const updateUserCart = async (updatedCart) => {
        if (!user) return;
        const updatedUser = { ...user, cart: updatedCart };

        try {
            const response = await fetch(`http://localhost:5000/users/${user.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedUser),
            });

            if (response.ok) {
                setUser(updatedUser);
                setCartItems(updatedCart);
            } else {
                console.error("Error updating cart:", response.statusText);
            }
        } catch (error) {
            console.error("Error updating cart:", error);
        }
    };
    const updateUserOrders = async (updatedCart) => {
        if (!user) return;
        const updatedUser = { ...user, orders: updatedCart };

        try {
            const response = await fetch(`http://localhost:5000/users/${user.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedUser),
            });

            if (response.ok) {
                setUser(updatedUser);
                setOrderItems(updatedCart);
            } else {
                console.error("Error updating cart:", response.statusText);
            }
        } catch (error) {
            console.error("Error updating cart:", error);
        }
    };

    // Tăng số lượng sản phẩm
    const increaseQuantity = (productId) => {
        const updatedCart = cartItems.map(item =>
            item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
        updateUserCart(updatedCart);
    };

    // Giảm số lượng sản phẩm
    const decreaseQuantity = (productId) => {
        const updatedCart = cartItems.map(item =>
            item.productId === productId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
        );
        updateUserCart(updatedCart);
    };

    // Xóa sản phẩm khỏi giỏ hàng
    const handleRemoveItem = (productId) => {
        const updatedCart = cartItems.filter(item => item.productId !== productId);
        updateUserCart(updatedCart);
    };

    // Format currency
    const formatCurrency = (value) => {
        // Kiểm tra nếu value là số và chuyển thành số, nếu không thì mặc định là 0
        const numericValue = Number(value) || 0;
        return numericValue.toLocaleString('vi-VN') + "₫"; // sử dụng `toLocaleString` để định dạng theo VN
    };

    // Scroll product row
    const productRowRef = useRef(null);

    const scrollProductRow = (direction) => {
        const scrollAmount = 300;
        if (direction === 'left') {
            productRowRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        } else if (direction === 'right') {
            productRowRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    // Hàm sắp xếp sản phẩm
    const sortProducts = (items) => {
        switch (sortOption) {
            case "price-asc":
                return [...items].sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
            case "price-desc":
                return [...items].sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
            case "name-asc":
                return [...items].sort((a, b) => a.title.localeCompare(b.title));
            default:
                return items;
        }
    };
    // Sắp xếp lại sản phẩm khi sortOption thay đổi
    useEffect(() => {
        setCartItems((prevItems) => sortProducts(prevItems)); // Áp dụng sắp xếp vào giỏ hàng
    }, [sortOption]); // Sử dụng sortOption làm dependency để khi thay đổi, giỏ hàng được sắp xếp lại

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
                                                    <a href="/Product" className="text-body">
                                                        <MDBIcon fas icon="long-arrow-alt-left me-2" /> Continue shopping
                                                    </a>
                                                </MDBTypography>

                                                <hr />

                                                <div className="d-flex justify-content-between align-items-center mb-4">
                                                    <div>
                                                        <p className="mb-1">Shopping cart</p>
                                                        <p className="mb-0">You have {cartItems.length} items in your cart</p>
                                                    </div>
                                                    {/* Dropdown chọn sắp xếp */}
                                                    <div>
                                                        <select
                                                            value={sortOption}
                                                            onChange={(e) => setSortOption(e.target.value)}
                                                            className="form-select"
                                                        >
                                                            <option value="">Sort</option>
                                                            <option value="price-asc">Price: Low to High</option>
                                                            <option value="price-desc">Price: High to Low</option>
                                                            <option value="name-asc">Name: A-Z</option>
                                                        </select>
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
                                                                        <MDBTypography tag="h5">{item.title}</MDBTypography>
                                                                        <p className="small mb-0">{item.description}</p>
                                                                    </div>
                                                                </div>
                                                                <div className="d-flex flex-row align-items-center">
                                                                    <div className="quantity-control d-flex align-items-center">
                                                                        <MDBIcon
                                                                            icon="minus-circle"
                                                                            onClick={() => decreaseQuantity(item.productId)}
                                                                            style={{ cursor: 'pointer', color: item.quantity > 1 ? '#007bff' : '#ccc' }}
                                                                        />
                                                                        <MDBTypography tag="h5" className="fw-normal mb-0 mx-2">{item.quantity}</MDBTypography>
                                                                        <MDBIcon
                                                                            icon="plus-circle"
                                                                            onClick={() => increaseQuantity(item.productId)}
                                                                            style={{ cursor: 'pointer', color: '#007bff' }}
                                                                        />
                                                                    </div>
                                                                    <div style={{ width: "auto", marginRight: "10px" }}>
                                                                        <MDBTypography tag="h5" className="mb-0">{formatCurrency(item.price * item.quantity)}</MDBTypography>
                                                                    </div>
                                                                    <a href="#!" onClick={() => handleRemoveItem(item.productId)} style={{ color: item.quantity > 1 ? "#cecece" : "#ccc" }}>
                                                                        <MDBIcon fas icon="trash-alt" />
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </MDBCardBody>

                                                    </MDBCard>
                                                ))}
                                                {/* Hiển thị tổng giỏ hàng (Tổng giá của tất cả sản phẩm trong giỏ hàng) */}
                                                {/* <MDBTypography tag="h4">
                                                    Tổng giỏ hàng: {formatCurrency(cartItems.reduce((total, item) => {
                                                        const product = additionalProducts.find((prod) => prod.id === item.id);
                                                        if (product) {
                                                            const priceNumber = parseFloat(product.price.replace(/[₫,]/g, '').trim());
                                                            total += calculateCost(priceNumber, item.quantity);
                                                        }
                                                        return total;
                                                    }, 0))}
                                                </MDBTypography> */}
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
                                                            <MDBInput className="mb-4" label="Cardholder's Name" type="text" size="lg" contrast />
                                                            <MDBInput className="mb-4" label="Card Number" type="text" size="lg" minLength="19" maxLength="19" placeholder="1234 5678 9012 3457" contrast />
                                                            <MDBInput className="mb-4" label="Expiration" type="text" size="lg" placeholder="MM/YYYY" contrast />
                                                            <MDBInput className="mb-4" label="CVV" type="password" size="lg" minLength="3" maxLength="3" placeholder="CVV" contrast />
                                                            <button
    
    onClick={handlePayment}
    type="button"
    style={{
        backgroundColor: "#00897b",
        color: "#fff", // Đặt màu chữ nếu cần
        padding: "10px 20px",
        fontSize: "18px",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        width: "100%", // Để thay thế cho `block` trong MDBBtn
        marginBottom: "16px" // Thay thế `mb-4` trong MDB
    }}
>
    Pay
</button>
                                                        </form>
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
                    <h5 className="mb-4">Other products you may like :</h5>
                    <div className="product-row" ref={productRowRef}>
                        {additionalProducts.length > 0 ? (
                            additionalProducts.map(product => (
                                <div className="product-card" key={product.id}>
                                <img src={product.image || "https://via.placeholder.com/150"} alt={product.title || "Product"} className="product-image" />
                                <div className="product-body">
                                    <h5 className="product-name">{product.title}</h5>
                                    <p className="product-description small">{product.description}</p>
                                    <h5 className="product-price">{formatCurrency(product.price)}</h5>
                                    <button className="add-to-cart" onClick={() => addToCart(product)}>
                                        Thêm vào giỏ hàng
                                    </button>
                                </div>
                            </div>
                            ))
                        ) : (
                            <p>No products available</p>
                        )}
                    </div>
                    {/* Nút điều hướng */}
                    <button className="navigation-button left" onClick={() => scrollProductRow('left')}><IoIosArrowDropleft /></button>
                    <button className="navigation-button right" onClick={() => scrollProductRow('right')}><IoIosArrowDropright /></button>
                </div>
            </div>

        </div>

    );
}
