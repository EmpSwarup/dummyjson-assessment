// auth.js
export const loginUser = async (username, password) => {
  try {
    const response = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    if (data.token) {
      // Store the token and expiration time in local storage or context for later use
      const expirationTime = new Date(data.expiredAt).getTime(); // Convert to milliseconds
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("authTokenExpiration", expirationTime);
      return data;
    } else {
      throw new Error("Login failed");
    }
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const getCurrentUser = async () => {
  const token = localStorage.getItem("authToken");
  const expirationTime = localStorage.getItem("authTokenExpiration");

  if (!token || !expirationTime) {
    // Token or expiration time is not available, handle accordingly
    throw new Error("No authentication token available");
  }

  // Check if the token has expired based on the stored expiration time
  const currentTimestamp = new Date().getTime();
  if (currentTimestamp > expirationTime) {
    // Token has expired, handle accordingly (e.g., log out the user)
    throw new Error("Token Expired!");
  }

  try {
    console.log("Fetching current user");
    const response = await fetch("https://dummyjson.com/auth/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const userData = await response.json();
    // console.log("Fetched User Data:", userData);
    return userData;
  } catch (error) {
    console.error("Error fetching user details:", error);
    throw error;
  }
};

export const isAuthenticated = () => {
  if (typeof window === "undefined") {
    // Server-side rendering, return false or handle accordingly
    return false;
  }

  const token = localStorage.getItem("authToken");
  const expirationTime = localStorage.getItem("authTokenExpiration");

  const currentTime = new Date().getTime();

  // console.log(
  //   `Token: ${token}, Expiration: ${expirationTime}, Current Time: ${currentTime}`
  // );

  if (!token) {
    console.log("No token found");
    return false;
  }

  if (!expirationTime || currentTime > parseInt(expirationTime, 10)) {
    console.log("Token expired or expiration time invalid");
    return false;
  }

  console.log("Token valid and not expired");
  return true;
};

export const logoutUser = () => {
  try {
    // Clear the authentication token and related data from localStorage
    localStorage.removeItem("authToken");
    localStorage.removeItem("authTokenExpiration");
    console.log("User successfully signed out");
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
};
