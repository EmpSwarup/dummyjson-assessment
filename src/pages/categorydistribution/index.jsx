import React, { useEffect, useState } from "react";
import PieChart from "@/components/PieChart";
import Head from "next/head";
import { getCategoryDistributionData } from "@/utils/categoryapi";

const CategoryDistributionPage = () => {
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    getCategoryDistributionData().then((data) => {
      console.log("Fetched Data:", data); // Check the fetched data
      setCategoryData(data);
    });
  }, []);

  return (
    <>
      <Head>
        <title>Product distribution</title>
      </Head>
      <main className="min-h-[85vh] flex flex-col items-center justify-center">
        <h1>Category Distribution</h1>
        <div className="flex items-center justify-center">
          <PieChart data={categoryData} />
        </div>
      </main>
    </>
  );
};

export default CategoryDistributionPage;
