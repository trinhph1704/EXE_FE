import React, { useState } from "react";

import "./../AdminPage/AdminPage.css";
import Dashboard from "../../Components/Admin/Dashboard/Dashboard";
import ProductList from "../../Components/Admin/ProductList/ProductList";
import AccountList from "../../Components/Admin/AccountList/AccountList";
import Sidebar from "../../Components/Admin/Sidebar/Sidebar";

export default function AdminPage() {
    const [activeTab, setActiveTab] = useState("Dashboard");
    return (
        <div id="AdminPage">
            <div className="AdminPage-Container">
                <Sidebar />
                <div className="Sidebar-Dashboard">
                    <Sidebar setActiveTab={setActiveTab} activeTab={activeTab} />
                    <div className="Content">
                        {activeTab === "Dashboard" && <Dashboard />}
                        {activeTab === "Account" && <AccountList />}
                        {activeTab === "Item" && <ProductList />}
                    </div>
                </div>
            </div>
        </div>
    )
}