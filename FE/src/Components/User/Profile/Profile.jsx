import { useEffect, useState } from 'react';
import './../Profile/Profile.css';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

export default function Profile() {
    const [profileData, setProfileData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [newImageUrl, setNewImageUrl] = useState("https://img.icons8.com/bubbles/100/000000/user.png");

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('userId'));
        if (storedUser && storedUser.email) {
            fetchProfileData(storedUser.email);
        } else {
            setProfileData({
                name: '',
                email: '',
                role: '',
                phone: '',
                address: '',
                cart: [],
                orders: []  // Initialize with an empty array
            });
        }
    }, []);

    const fetchProfileData = async (email) => {
        try {
            const response = await fetch('http://localhost:5000/users');
            const users = await response.json();
            const user = users.find((user) => user.email === email);
            if (user) {
                setProfileData(user);
                setNewImageUrl(user.imageUrl || newImageUrl);
            } else {
                console.error("User not found.");
            }
        } catch (error) {
            console.error("Error fetching profile data:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData({ ...profileData, [name]: value });
    };

    const handleImageChange = (e) => {
        setNewImageUrl(e.target.value);
    };

    const updateProfileData = async () => {
        try {
            const updatedData = { ...profileData, imageUrl: newImageUrl };

            const response = await fetch(`http://localhost:5000/users/${profileData.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedData)
            });

            if (response.ok) {
                alert("Profile updated successfully!");
            } else {
                console.error("Failed to update profile.");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateProfileData();
        setIsEditing(false);
    };

    if (!profileData) return <div>Loading...</div>;

    return (
        <div id="Profile">
            <div className="page-content">
                <div className="padding">
                    <div className="profile-container">
                        <div className="user-card-full">
                            <div className="user-profile-container">
                                <div className="user-profile bg-c-lite-green">
                                    <div className="profile-content text-center">
                                        <div className="profile-image">
                                            <img src={newImageUrl} className="img-radius" alt="User-Profile-Image" />
                                        </div>
                                        <h6 className="f-w-600">{profileData.name}</h6>
                                        <p>{profileData.role}</p>
                                        <ul className="social-links">
                                            <li>
                                                <a href={profileData.socialLinks?.facebook || '#'} title="facebook">
                                                    <FaFacebook size={20} color="#E6E6FA" />
                                                </a>
                                            </li>
                                            <li>
                                                <a href={profileData.socialLinks?.twitter || '#'} title="twitter">
                                                    <FaTwitter size={20} color="#E6E6FA" />
                                                </a>
                                            </li>
                                            <li>
                                                <a href={profileData.socialLinks?.instagram || '#'} title="instagram">
                                                    <FaInstagram size={20} color="#E6E6FA" />
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="user-info">
                                    {isEditing ? (
                                        <form onSubmit={handleSubmit}>
                                            <div className="info-block">
                                                <h6 className="section-title">Edit Profile</h6>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={profileData.name}
                                                    onChange={handleChange}
                                                    placeholder="Name"
                                                />
                                                <input
                                                    type="text"
                                                    name="email"
                                                    value={profileData.email}
                                                    onChange={handleChange}
                                                    placeholder="Email"
                                                />
                                                <input
                                                    type="text"
                                                    name="phone"
                                                    value={profileData.phone}
                                                    onChange={handleChange}
                                                    placeholder="Phone"
                                                />
                                                <input
                                                    type="text"
                                                    name="address"
                                                    value={profileData.address}
                                                    onChange={handleChange}
                                                    placeholder="Address"
                                                />
                                                <input
                                                    type="text"
                                                    value={newImageUrl}
                                                    onChange={handleImageChange}
                                                    placeholder="Profile Image URL"
                                                />
                                                <button type="submit" className='button-save'>Save</button>
                                                <button type="button" className='button-cancel' onClick={() => setIsEditing(false)}>Cancel</button>
                                            </div>
                                        </form>
                                    ) : (
                                        <>
                                            <div className="info-block">
                                                <h6 className="section-title">Contact Information</h6>
                                                <div className="info-row">
                                                    <div className="info-column">
                                                        <p>Email</p>
                                                        <h6 className="text-muted">{profileData.email}</h6>
                                                    </div>
                                                    <div className="info-column">
                                                        <p>Phone</p>
                                                        <h6 className="text-muted">{profileData.phone}</h6>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="info-block">
                                                <h6 className="section-title">Address Shipping</h6>
                                                <div className="info-row">
                                                    <p>{profileData.address}</p>
                                                </div>
                                            </div>
                                            <div className="info-block">
    <h6 className="section-title">Recent Orders</h6>
    
    {/* Header hàng tiêu đề */}
    <div className="info-row header-row">
        <div className="info-column">
            <p>Order</p>
        </div>
        <div className="info-column">
            <p>Date</p>
        </div>
        <div className="info-column">
            <p>Status</p>
        </div>
        <div className="info-column">
            <p>Total</p>
        </div>
    </div>

    {/* Nội dung đơn hàng */}
    {profileData.orders && profileData.orders.length > 0 ? (
        profileData.orders.map((orderData, index) => (
            <div className="info-row" key={index}>
                <div className="info-column">
                    <h6 className="text-muted">{orderData.orderId}</h6>
                </div>
                <div className="info-column">
                    <h6 className="text-muted">{orderData.date}</h6>
                </div>
                <div className="info-column">
                    <h6 className="text-muted">{orderData.status}</h6>
                </div>
                <div className="info-column">
                    <h6 className="text-muted">{orderData.total}</h6>
                </div>
            </div>
        ))
    ) : (
        <p>No recent orders available.</p>
    )}
</div>

                                            <button className="edit-profile" onClick={() => setIsEditing(true)}>
                                                Edit Profile
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
