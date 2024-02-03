import React, { useEffect, useState } from "react";
import { getCurrentUser, logoutUser } from "../../utils/auth"; // Import logoutUser
import { useRouter } from "next/router";
import Loader from "@/components/loader/Loader";
import Head from "next/head";

const User = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const userData = await getCurrentUser();
        setUser(userData);
        setError("");
      } catch (err) {
        console.error(err);
        setError("Failed to fetch user details");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleSignOut = async () => {
    try {
      await logoutUser();
      // Redirect to login page after sign out
      router.push("/login");
    } catch (err) {
      console.error(err);
      setError("Failed to sign out");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  if (loading)
    return (
      <div>
        <Loader />
      </div>
    );
  if (error) return <div>Error: {error}</div>;
  if (!user) {
    // Redirect to login page if not logged in
    router.push("/login");
    return null;
  }

  return (
    <>
      <Head>
        <title>User Profile</title>
      </Head>
      <div className="min-h-[85vh] flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-md shadow-md w-96">
          {/* Center the heading */}
          <h2 className="text-2xl font-semibold mb-4 text-center">
            User Profile
          </h2>
          <div className="bg-gray-200 rounded-md p-4 flex items-center flex-col space-y-4">
            {user.image && (
              <img
                src={user.image}
                alt="User Avatar"
                className="rounded-full"
                style={{ width: "100px", height: "100px" }}
              />
            )}
            <p className="mb-2">
              <span className="font-bold">Username:</span> {user.username}
            </p>
            <p className="mb-2">
              <span className="font-bold">Email:</span> {user.email}
            </p>
            <p className="mb-2">
              <span className="font-bold">Password:</span>{" "}
              {showPassword ? user.password : "*".repeat(user.password.length)}
            </p>
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="text-blue-500 hover:underline focus:outline-none"
            >
              {showPassword ? "Hide" : "Show"} Password
            </button>
          </div>
          {/* Center the sign-out button */}
          <div className="flex justify-center mt-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
              type="button"
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default User;
