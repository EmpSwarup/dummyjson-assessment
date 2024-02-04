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
      const expirationTime = new Date(data.expiredAt).getTime();
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
    throw new Error("No authentication token available");
  }

  const currentTimestamp = new Date().getTime();
  if (currentTimestamp > expirationTime) {
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
    localStorage.removeItem("authToken");
    localStorage.removeItem("authTokenExpiration");
    console.log("User successfully signed out");
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
};
