// Layout.js
import React from "react";
import Header from "./CommonComponents/Header"; // adjust path as needed
import Footer from "./CommonComponents/Footer"; // adjust path as needed

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
