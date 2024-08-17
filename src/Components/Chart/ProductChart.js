import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart, LinearScale, CategoryScale, BarElement, Title } from 'chart.js';

Chart.register(LinearScale, CategoryScale, BarElement, Title);

const ProductsChart = () => {
  const [categoryData, setCategoryData] = useState({ labels: [], quantities: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.escuelajs.co/api/v1/products');
        const products = response.data;

        // Aggregate quantities based on category
        const categoryMap = new Map();
        products.forEach(product => {
          const categoryName = product.category.name;
          if (categoryMap.has(categoryName)) {
            categoryMap.set(categoryName, categoryMap.get(categoryName) + 1);
          } else {
            categoryMap.set(categoryName, 1);
          }
        });

        // Convert map to arrays for labels and quantities
        const labels = Array.from(categoryMap.keys());
        const quantities = Array.from(categoryMap.values());

        console.log('Labels:', labels);
        console.log('Quantities:', quantities);

        setCategoryData({ labels, quantities });

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const data = {
    labels: categoryData.labels,
    datasets: [
      {
        label: 'Quantity',
        data: categoryData.quantities,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        type: 'linear',
        beginAtZero: true,
        title: {
          display: true,
          text: 'Quantity',
        },
      },
      x: {
        type: 'category',
        title: {
          display: true,
          text: 'Product Category',
        },
      },
    },
  };

  return (
  <>
  
      <h2 style={{paddingLeft:"20px"}}>Product Categories Quantity Bar Chart</h2>
      <Bar data={data} options={options} />
    </>
  );
};

export default ProductsChart;
