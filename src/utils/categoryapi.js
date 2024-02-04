// Get all categories

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

// Get all products from a category

export const getProductsByCategory = async (category) => {
  try {
    const response = await fetch(
      `https://dummyjson.com/products/category/${category}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data.products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// Get category distribution data
export const getCategoryDistributionData = async () => {
  console.log("Fetching category distribution data");
  try {
    const response = await fetch("https://dummyjson.com/products?limit=0");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();

    const categoryCounts = data.products.reduce((acc, product) => {
      const { category } = product;
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {});

    const distributionData = Object.entries(categoryCounts).map(
      ([category, count]) => ({
        name: category,
        value: count,
      })
    );

    return distributionData;
  } catch (error) {
    console.error("Error calculating category distribution:", error);
    throw error;
  }
};
