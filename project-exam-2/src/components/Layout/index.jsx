import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import { motion } from "framer-motion";

function Layout({ children }) {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <main className="d-flex flex-column align-items-center min-vh-100">
          {children}
        </main>
      </motion.div>
      <Footer />
    </div>
  );
}

export default Layout;
