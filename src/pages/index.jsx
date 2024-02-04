import React from "react";
import Homecard from "@/components/cards/Homecard";
import Head from "next/head";

export default function Home() {
  const hometitle = [
    { id: 1, name: "Products", description: "Check out all the products" },
    { id: 2, name: "Categories", description: "Check out all the categories" },
    {
      id: 3,
      name: "Piechart",
      description: "Piechart of product count per category",
    },
  ];

  return (
    <>
      <Head>
        <title>Homepage</title>
      </Head>
      <main className="min-h-[85vh] flex flex-col items-center justify-center pt-0">
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
}
