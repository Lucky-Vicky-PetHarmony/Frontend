import React from "react";
import Header from "../layout/header/components/Header";
import Footer from "../layout/footer/components/Footer";

const Layout = ({ children }) => {
    return (
        <>
            <Header />
            <main>{children}</main>
            <Footer />
        </>
    );
}

export default Layout;