import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import { useProducts } from '../../utils/ProductContext';

const EditProduct = ({ productId }) => {
  const { addProduct } = useProducts();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    // Fetch product details when productId changes
    if (productId) {
      axios.get(`https://api.escuelajs.co/api/v1/products/${productId}`)
        .then(response => {
          const product = response.data;
          setTitle(product.title);
          setPrice(product.price);
          setDescription(product.description);
        setCategoryId(product.category.id)
      setImageUrl(product.images)
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
      price: parseFloat(price),
      description: description,
      categoryId: parseInt(categoryId),
      images: [imageUrl] // Assuming images is an array in your API structure
    };

    try {
      const response = await axios.put(`https://api.escuelajs.co/api/v1/products/${productId}`, productData);
      console.log('Product updated:', response.data);
      addProduct(response.data);

      // Optionally reset form fields or show a success message
      setTitle("");
      setPrice(0);
      setDescription("");
      setCategoryId("");
      setImageUrl("");
      alert('Product successfully updated!');
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Failed to update product. Please try again later.');
    }
  };

  useEffect(() => {
    // Fetch categories from the API
    axios.get('https://api.escuelajs.co/api/v1/categories')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

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
        <TextField
          size='small'
          id="description"
          type='text'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          label="Description"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <FormControl fullWidth margin="normal" size='small'>
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            id="category"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            label="Category"
          >
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          id="imageUrl"
          type='text'
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          label="Image URL"
          variant="outlined"
          fullWidth
          margin="normal"
          size='small'
        />
        <Button type="submit" variant="contained" color="primary">
          Edit Product
        </Button>
      </form>
    </Box>
  );
};

export default EditProduct;
