import Link from "next/link";
import Homecard from "@/components/Homecard";

const hometitle = [
  { id: 1, name: "Products", description: "Check out all the products" },
  { id: 2, name: "Categories", description: "Check out all the categories" },
];

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center pt-0">
      <h1 className="text-3xl font-bold">Welcome!</h1>
      <h2>View all the products and categories in our site!</h2>
      <div className="container flex items-center justify-center mt-8 gap-4">
        {hometitle.map((title) => (
          <Homecard key={title.id} hometitle={title} />
        ))}
      </div>
    </main>
  );
}
