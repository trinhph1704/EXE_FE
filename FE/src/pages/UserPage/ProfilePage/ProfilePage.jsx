import React from "react";
import "./../ProfilePage/ProfilePage.css";

import Header from "../../../Components/Items/Header/Header";
import Footer from "../../../Components/Items/Footer/Footer";
import Profile from "../../../Components/User/Profile/Profile";

export default function ProfilePage() {
    return (
        <div id="ProfilePage">
            <Header />
            <main className="ProfilePage-Container">
                <Profile />
            </main>
            <Footer />
        </div>
    );
}