// src/app/layout.js

import "tailwindcss/tailwind.css"; // Import Tailwind CSS

import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function RootLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="container mx-auto">
        {" "}
        {/* Apply Tailwind container class */}
        {children}
      </main>
      <Footer />
    </>
  );
}
