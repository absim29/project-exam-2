import React from "react";
import Header from "../Header";
import Footer from "../Footer";

function Layout({ children }) {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-fill d-flex flex-column flex-wrap align-items-center">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
