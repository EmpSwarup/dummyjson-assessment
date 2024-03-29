import React, { useState, useEffect } from "react";
import { loginUser, isAuthenticated } from "../../utils/auth";
import { useRouter } from "next/router";
import Head from "next/head";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated()) {
      router.push("/");
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser(username, password);

      if (isAuthenticated()) {
        router.push("/");
      } else {
        setError("Authentication failed. Please try again.");
      }
    } catch (error) {
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <>
      <Head>
        <title>Login to your account</title>
      </Head>
      <div className="min-h-[85vh] flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-md shadow-md w-96">
          <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-600"
              >
                Username ( Try atuny0 )
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 p-2 border rounded-md w-full"
                placeholder="Enter your username"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-600"
              >
                Password ( Try 9uQFF1Lh )
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 p-2 border rounded-md w-full"
                placeholder="Enter your password"
                required
              />
            </div>
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                Login
              </button>
            </div>
            <a
              href="https://dummyjson.com/users"
              target="_blank"
              className="text-blue-500 underline text-center block"
            >
              Login using username and password from this doc
            </a>
            {error && <p className="text-red-500 text-center">{error}</p>}
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
