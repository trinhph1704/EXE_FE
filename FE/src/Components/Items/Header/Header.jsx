import React, { useContext, useEffect, useRef, useState } from "react";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { LuUserCog } from "react-icons/lu";
import { LuBookMarked } from "react-icons/lu";
import { LuBarChartBig } from "react-icons/lu";
import { TbBellCheck } from "react-icons/tb";
import { BiLogOut } from "react-icons/bi";
import Cookies from "js-cookie";
import LogoNSHOP from "../../../assets/Logo NSHOP.png";
import SliderCards from "../SliderCards/SliderCards";

export default function Header() {
    const [isDropDown, setIsDropDown] = useState(false);
    const [height, setHeight] = useState('0px');
    const contentDropdownRef = useRef(null);
    const [user, setUser] = useState(null);
    const [imgUser, setImgUser] = useState(null);
    const [isDropDownUser, setIsDropDownUser] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [datas, setDatas] = useState([]);
    const [isSearchActive, setIsSearchActive] = useState(false); // Đảm bảo theo dõi trạng thái tìm kiếm
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('userId'));
        if (storedUser) {
            setUser(storedUser);
            setImgUser(storedUser.imgUser || null);
        }
    }, []);

    useEffect(() => {
        if (isDropDown) {
            let process = document.querySelector('.search-result-container');
            process.classList.add("show");
            let process1 = document.querySelector('.search-bar');
            process1.classList.add("slide");
            setHeight(`400px`);
        } else {
            let process = document.querySelector('.search-result-container');
            process.classList.remove("show");
            let process1 = document.querySelector('.search-bar');
            process1.classList.remove("slide");
            setHeight('0px');
        }
    }, [isDropDown]);

    useEffect(() => {
        setDatas(null);
    }, [searchInput]);

    const handleSearchFocus = () => {
        setIsDropDown(true);
        setIsSearchActive(true);  // Đặt trạng thái tìm kiếm khi ô tìm kiếm được focus
    };

    const handleCancelBtn = () => {
        setSearchInput(''); // Xóa dữ liệu tìm kiếm khi nhấn "Hủy"
        setIsSearchActive(false);  // Đặt trạng thái tìm kiếm về false khi hủy
        setIsDropDown(false);  // Đóng dropdown
    };

    const handleLogOut = () => {
        localStorage.removeItem('user');
        Cookies.remove('token');
        setUser(null);
        setImgUser(null);
        navigate('/login');
    };

    const handleInputKeyDown = (e) => {
        if (e.key === 'Enter') {
            navigate(`/search?q=${searchInput}&page=1`);
        }
    };

    return (
        <div id="header">
            <div className="header-shown">
                <div className="logo-title">
                    <Link to="/home" className="logo-link">
                        <img src={LogoNSHOP} alt="" className="logo" />
                    </Link>
                    
                    <span className="title">NSHOP</span>
                </div>

                {/* Navigation Links */}
                <nav className="nav-links">
                    <Link to="/home">Home</Link>
                    <Link to="/product">Product</Link>
                </nav>

                <div className="search-container">
                    <div className="search-bar">
                        <IoSearchOutline />
                        <input
                            type="text"
                            placeholder="Searching for course"
                            onFocus={handleSearchFocus}
                            value={searchInput}
                            onChange={(e) => { setSearchInput(e.target.value) }}
                            onKeyDown={handleInputKeyDown}
                        />
                    </div>
                </div>

                <div className="action-button">
                    {/* Nút Hủy chỉ hiển thị khi có sự kiện tìm kiếm */}
                    {isSearchActive && (
                        <div className="cancel-btn" onClick={handleCancelBtn}>CANCEL</div>
                    )}

                    {/* Hiển thị phần người dùng nếu đã đăng nhập */}
                    {user ? (
                        <div className="user-action" onClick={() => setIsDropDownUser(prev => !prev)}>
                            {/* Logo người dùng */}
                            <div className="user-logo">
                                {imgUser ? (
                                    <img src={imgUser} alt="User" />
                                ) : (
                                    <HiOutlineUserCircle />
                                )}
                            </div>

                            {/* Thông tin người dùng */}
                            <div className="user-info">
                                <p className="name">{user.name}</p>
                            </div>

                            {/* Dropdown chứa các tùy chọn của người dùng */}
                            <div className={`user-dropdown ${isDropDownUser ? 'active' : ''}`}>
                                <div className="dropdown-container">
                                    {/* Mũi tên chỉ xuống */}
                                    <div className="arrow"></div>

                                    {/* Các mục menu */}
                                    <div className="notification special-block">
                                        <TbBellCheck />
                                        Notification
                                    </div>
                                    <a href="/profile" className="selection-block">
                                        <LuUserCog />
                                        Account Profile
                                    </a>
                                    <a href="/cart" className="selection-block">
                                        <LuBarChartBig />
                                        Cart
                                    </a>

                                    {/* Nút đăng xuất */}
                                    <div className="logout special-block" onClick={handleLogOut}>
                                        <BiLogOut />
                                        Log Out
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        // Hiển thị nếu người dùng chưa đăng nhập
                        <div className="login-signup">
                            <Link to="/login" className="login">Log in</Link>
                            <Link to="/signup" className="signup">Sign Up</Link>
                        </div>
                    )}
                </div>

            </div>
            <div
                ref={contentDropdownRef}
                className="search-result-container"
                style={{ height: height }}
            >
                <p className="title">Recommend</p>
                <div className="slider-container">
                    <SliderCards datas={datas} />
                </div>
            </div>
        </div>
    );
}
