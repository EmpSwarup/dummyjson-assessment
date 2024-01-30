import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav class="font-sans flex flex-col text-center sm:flex-row sm:text-left sm:justify-between py-4 px-6 bg-gray-300 text-gray-800 shadow sm:items-baseline w-full">
      <div class="mb-2 sm:mb-0">
        <Link href="/">dummyJSON Assessment</Link>
      </div>
      <div>
        <Link href="/login">Login</Link> <Link href="/signup">Sign Up</Link>
      </div>
    </nav>
  );
};

export default Navbar;