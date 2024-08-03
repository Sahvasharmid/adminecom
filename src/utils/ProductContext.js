import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from the API
    axios.get('https://api.escuelajs.co/api/v1/products')
      .then(response => {
        setProducts(response.data)
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const addProduct = (product) => {
    setProducts((prevProducts) => [...prevProducts, product]);
  };
  const removeProduct = (productId) => {
    setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));
  };


  return (
    <ProductContext.Provider value={{ products, addProduct,removeProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
