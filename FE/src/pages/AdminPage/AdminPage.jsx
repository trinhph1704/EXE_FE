import React from "react";

import "./../AdminPage/AdminPage.css";
import Dashboard from "../../Components/Admin/Dashboard/Dashboard";
import ProductList from "../../Components/Admin/ProductList/ProductList";
import AccountList from "../../Components/Admin/AccountList/AccountList";

export default function AdminPage() {
    return (
        <div id="AdminPage">
            <div className="AdminPage-Container">
                <h2>
                    Dash Board
                    <Dashboard />
                </h2>

                <h2>
                    Product List
                    <ProductList />
                </h2>
                <h2>
                    Account List
                    <AccountList />
                </h2>

            </div>
        </div>
    )
}