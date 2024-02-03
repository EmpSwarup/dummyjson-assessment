import Link from "next/link";
import React, { useEffect, useState } from "react";
import Loader from "./loader/Loader";
import { FaUserCircle } from "react-icons/fa";
import { IoHomeSharp } from "react-icons/io5";
import { isAuthenticated } from "@/utils/auth"; // Adjust the import path as necessary

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        setLoading(true);
        setIsLoggedIn(await isAuthenticated());
      } catch (error) {
        console.error("Error checking authentication status:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  if (loading) {
    // Return a loading state or spinner here if needed
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <nav className="font-sans flex items-center justify-between py-4 px-6 bg-gray-300 text-gray-800 shadow sm:items-baseline w-full">
      <div className="flex items-center mb-2 sm:mb-0">
        <Link href="/">
          <IoHomeSharp className="text-3xl px-0" />{" "}
        </Link>
      </div>
      <div className="flex items-center">
        {isLoggedIn ? (
          <Link href="/user">
            <FaUserCircle className="text-3xl px-0" />{" "}
            {/* Adjust the size as needed */}
          </Link>
        ) : (
          <Link href="/login">
            <FaUserCircle className="text-3xl px-0" />{" "}
            {/* Adjust the size as needed */}
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
