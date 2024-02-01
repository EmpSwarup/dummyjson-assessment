export const getCategories = async () => {
  try {
    const response = await fetch("https://dummyjson.com/products/categories");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const categories = await response.json();
    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};
