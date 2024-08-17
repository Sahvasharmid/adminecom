import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useProducts } from '../../utils/ProductContext';

const EditProduct = ({ productId }) => {
  const { updateProduct } = useProducts();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);

  useEffect(() => {
    // Fetch product details when productId changes
    if (productId) {
      axios.get(`https://api.escuelajs.co/api/v1/products/${productId}`)
        .then(response => {
          const product = response.data;
          setTitle(product.title);
          setPrice(product.price);
        })
        .catch(error => {
          console.error('Error fetching product details:', error);
        });
    }
  }, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      title: title,
      price: parseFloat(price)
    };

    try {
      const response = await axios.put(`https://api.escuelajs.co/api/v1/products/${productId}`, productData);
      console.log('Product updated:', response.data);

      // Immediately update local state or context
      updateProduct(response.data);

      // Optionally reset form fields or show a success message
      setTitle("");
      setPrice(0);
      alert('Product successfully updated!');
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Failed to update product. Please try again later.');
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 600,
        padding: 2,
        margin: 'auto',
        border: '1px solid #ccc',
        backgroundColor: '#f0f0f0',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      }}
    >
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          size="small"
          id="title"
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          label="Title"
          variant="outlined"
          fullWidth
          margin="normal"
          required
        />
        <TextField
          id="price"
          type='number'
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          label="Price"
          variant="outlined"
          fullWidth
          margin="normal"
          size='small'
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Edit Product
        </Button>
      </form>
    </Box>
  );
};

export default EditProduct;
