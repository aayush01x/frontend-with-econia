import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const SimpleLineChart = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const myChartRef = useRef<Chart | null>(null);

  useEffect(() => {
    const canvas = chartRef.current;

    if (myChartRef.current) {
      myChartRef.current.destroy();
    }

    if (canvas) {
      myChartRef.current = new Chart(canvas, {
        type: "line",
        data: {
          labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          datasets: [
            {
              label: "Price",
              data: [
                120, 115, 130, 140, 135, 128, 145, 155, 150, 160, 170, 165,
              ],
              borderColor: "#4CAF50", // Greenish trading color
              borderWidth: 2,
              tension: 0.2, // Slight curve for smoothness
              fill: false,
              pointRadius: 0, // No points on the line for cleaner look
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              grid: {
                color: "rgba(200, 200, 200, 0.2)", // Light horizontal grid lines
              },
              ticks: {
                color: "#fff", // White text for labels
                maxTicksLimit: 12, // Limit number of labels
              },
            },
            y: {
              beginAtZero: false,
              grid: {
                color: "rgba(200, 200, 200, 0.2)", // Light vertical grid lines
              },
              ticks: {
                color: "#fff", // White text for labels
                callback: function (value) {
                  return "$" + value; // Display price format in y-axis
                },
              },
            },
          },
          plugins: {
            legend: {
              display: false, // Hide legend for a cleaner look
            },
            tooltip: {
              enabled: true,
              mode: "index",
              intersect: false,
              callbacks: {
                label: function (tooltipItem) {
                  return `Price: $${tooltipItem.raw}`; // Display price on hover
                },
              },
              backgroundColor: "#333",
              titleColor: "#fff",
              bodyColor: "#fff",
              borderColor: "#fff",
              borderWidth: 1,
            },
          },
        },
      });
    }

    return () => {
      if (myChartRef.current) {
        myChartRef.current.destroy();
      }
    };
  }, []);

  return <canvas ref={chartRef} />;
};

export default SimpleLineChart;
