import "tailwindcss/tailwind.css";

import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function RootLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="container mx-auto"> {children}</main>
      <Footer />
    </>
  );
}
