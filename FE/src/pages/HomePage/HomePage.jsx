import React from "react";

import "./../HomePage/HomePage.css";
import Header from "../../Components/Items/Header/Header";
import Footer from "../../Components/Items/Footer/Footer";
import Home from "../../Components/User/Home/Home";

export default function HomePage() {
    return (
        <div id="HomePage">
            <Header />
            <Home />
            <Footer />
        </div>
    )
}