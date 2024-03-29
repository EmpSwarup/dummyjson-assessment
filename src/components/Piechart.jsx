import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const formatLabelName = (name) => {
  return name
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const PieChart = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (data && data.length > 0) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
      const myChartRef = chartRef.current.getContext("2d");

      chartInstance.current = new Chart(myChartRef, {
        type: "pie",
        data: {
          labels: data.map((item) => formatLabelName(item.name)),
          datasets: [
            {
              data: data.map((item) => item.value),
              backgroundColor: [
                "rgb(255, 0, 0)",
                "rgb(0, 255, 0)",
                "rgb(0, 0, 255)",
                "rgb(255, 255, 0)",
                "rgb(255, 0, 255)",
                "rgb(0, 255, 255)",
                "rgb(128, 0, 0)",
                "rgb(0, 128, 0)",
                "rgb(0, 0, 128)",
                "rgb(128, 128, 0)",
                "rgb(128, 0, 128)",
                "rgb(0, 128, 128)",
                "rgb(255, 128, 0)",
                "rgb(255, 0, 128)",
                "rgb(128, 255, 0)",
                "rgb(0, 128, 255)",
                "rgb(255, 128, 128)",
                "rgb(128, 255, 128)",
                "rgb(128, 128, 255)",
                "rgb(255, 155, 255)",
              ],
            },
          ],
        },
      });
    }
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data]);

  return (
    <div>
      <canvas ref={chartRef} id="myPieChart" width="500" height="600" />
    </div>
  );
};

export default PieChart;
