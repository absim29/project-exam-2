import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import { motion } from "framer-motion";

/**
 * Layout component that provides a consistent structure for the
 * application, including a header, footer, and a main content area.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The content to be rendered
 * inside the layout.
 * @returns {JSX.Element} The rendered Layout component.
 */

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
