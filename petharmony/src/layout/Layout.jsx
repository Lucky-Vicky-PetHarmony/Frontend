import React from "react";
import Header from "../layout/header/components/Header";

const Layout = ({ children }) => {
    return (
        <>
            <Header />
            <main>{children}</main>
        </>
    );
}

export default Layout;