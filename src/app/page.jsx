import React from "react";
import Homecard from "@/components/cards/Homecard";

export const metadata = {
  title: "Homepage",
  description: "This is the homepage of the assessment",
};

const hometitle = [
  { id: 1, name: "Products", description: "Check out all the products" },
  { id: 2, name: "Categories", description: "Check out all the categories" },
  {
    id: 3,
    name: "Piechart",
    description: "Pie chart of product count per category",
  },
];

const Home = () => {
  return (
    <>
      <main className="min-h-[90vh] flex flex-col items-center justify-center pt-0">
        <h1 className="text-3xl font-bold">Welcome!</h1>
        <h2>View all the products and categories in our site!</h2>
        <div className="container flex items-center justify-center my-8 gap-4">
          {hometitle.map((title) => (
            <Homecard key={title.id} hometitle={title} />
          ))}
        </div>
      </main>
    </>
  );
};

export default Home;
