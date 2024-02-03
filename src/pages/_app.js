// pages/_app.js
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import "../app/globals.css";
import RootLayout from "@/app/layout";
import { isAuthenticated } from "@/utils/auth"; // Adjust the import path as necessary

function ProtectedRoute({ children }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        // Check authentication status
        if (!isAuthenticated() && router.pathname !== "/login") {
          // Not authenticated and trying to access a protected route
          router.push("/login");
        } else if (isAuthenticated() && router.pathname === "/login") {
          // Authenticated and trying to access the login page
          router.push("/user");
        }
      } finally {
        setLoading(false); // Set loading to false after authentication check
      }
    };

    checkAuthentication();

    // Cleanup function to avoid potential memory leaks
    return () => {
      // Cleanup logic if needed
    };
  }, [router]);

  // Render children only when not loading
  return loading ? null : children;
}

function MyApp({ Component, pageProps }) {
  return (
    <RootLayout>
      {/* Wrap pages that require authentication with ProtectedRoute */}
      <ProtectedRoute>
        <Component {...pageProps} />
      </ProtectedRoute>
    </RootLayout>
  );
}

export default MyApp;
