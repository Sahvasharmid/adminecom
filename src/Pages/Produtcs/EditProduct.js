// EditProduct.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { updateProduct } from '../../redux/features/ProductSlice/ProductSlice'; // Adjust the import based on your file structure

const EditProduct = ({ productId }) => {
  const dispatch = useDispatch();
  
  // Fetch the product details from the Redux store
  const product = useSelector(state => state.products.products.find(p => p.id === productId)) || {};
  
  const [title, setTitle] = useState(product.title || "");
  const [price, setPrice] = useState(product.price || 0);

  useEffect(() => {
    // Update local state when productId or product changes
    if (productId && product) {
      setTitle(product.title);
      setPrice(product.price);
    }
  }, [productId, product]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      id: productId,
      title: title,
      price: parseFloat(price)
    };

    try {
      const response = await axios.put(`https://api.escuelajs.co/api/v1/products/${productId}`, productData);
      console.log('Product updated:', response.data);

      // Dispatch the update action to the Redux store
      dispatch(updateProduct(response.data));

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
