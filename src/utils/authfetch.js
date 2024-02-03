const fetchWithAuth = async (url) => {
  const token = localStorage.getItem("authToken");
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error with fetch:", error);
    throw error;
  }
};

export default fetchWithAuth;
