import React, { useEffect, useState } from "react";
import { getCurrentUser, logoutUser } from "../../utils/auth";
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
        if (!userData) {
          router.push("/login");
        } else {
          setUser(userData);
          setError("");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch user details");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  const handleSignOut = async () => {
    try {
      await logoutUser();
      router.push("/login");
    } catch (err) {
      console.error(err);
      setError("Failed to sign out");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div className="text-center">Error: {error}</div>;
  }

  return (
    <>
      <Head>
        <title>User Profile</title>
      </Head>
      <div className="min-h-[85vh] flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md flex flex-col items-center">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            User Profile
          </h2>
          <div className="space-y-4 text-center">
            {user.image && (
              <img
                src={user.image}
                alt="User Avatar"
                className="mx-auto h-24 w-24 rounded-full object-cover"
              />
            )}
            <div className="text-sm">
              <p className="font-bold text-gray-900 mx-2">
                Username: <span className="font-normal">{user.username}</span>
              </p>
              <p className="font-bold text-gray-900 mx-2">
                Email: <span className="font-normal">{user.email}</span>
              </p>
              <p className="font-bold text-gray-900 mx-2">
                Password:{" "}
                <span className="font-normal">
                  {showPassword
                    ? user.password
                    : "*".repeat(user.password.length)}
                </span>
              </p>
            </div>
            <button
              onClick={togglePasswordVisibility}
              className="text-blue-500 hover:text-blue-700 transition-colors duration-200 ease-in-out"
            >
              {showPassword ? "Hide" : "Show"} Password
            </button>
            <div className="pt-4">
              <button
                onClick={handleSignOut}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Sign Out
              </button>
            </div>
            {error && <p className="text-red-500 text-center mt-4">{error}</p>}
          </div>
        </div>
      </div>
    </>
  );
};

export default User;
