"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { isAuthenticated } from "@/utils/auth"; // Adjust the import path as necessary

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Since useEffect runs on the client side, it won't cause hydration issues
    setIsLoggedIn(isAuthenticated());
  }, []);

  return (
    <nav className="font-sans flex flex-col text-center sm:flex-row sm:text-left sm:justify-between py-4 px-6 bg-gray-300 text-gray-800 shadow sm:items-baseline w-full">
      <div className="mb-2 sm:mb-0">
        <Link href="/">dummyJSON Assessment</Link>
      </div>
      <div>
        {isLoggedIn ? (
          <Link href="/user">Profile</Link>
        ) : (
          <Link href="/login">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
