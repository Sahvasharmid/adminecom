import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import DeleteIcon from '@mui/icons-material/Delete';
import AddProductForm from '../../Pages/Produtcs/AddProductForm';
import EditProduct from '../../Pages/Produtcs/EditProduct';
import { useProducts } from '../../utils/ProductContext';
import axios from 'axios';
const iconStyle = {
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
};
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function BasicModal({ mode,productId}) {
  const{removeProduct}=useProducts()
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
const handleDelete=async()=>{
  try {
///
delete(`https://api.escuelajs.co/api/v1/products/${productId}`);
    removeProduct(productId);
    alert('Product successfully deleted!');
  } catch (error) {
    console.error('Error deleting product:', error);
    alert('Failed to delete product. Please try again later.');
  }
};

  

  return (
    <div>
     {mode === 'add' && (
        <Button variant='contained' onClick={handleOpen} endIcon={<AddCircleIcon />}>
          Add
        </Button>
      )}
     {(mode === 'edit' || mode === 'delete') && (
  <Typography onClick={handleOpen} style={iconStyle}>
    {mode === 'edit' ? <EditOutlinedIcon /> : <DeleteOutlinedIcon />}
  </Typography>
)}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.primary.main,
            }}
          >
            <CloseIcon />
          </IconButton>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {mode === 'edit' ? (
              <>
                <EditProduct productId={productId} />
    
              </>
            ) : mode === 'delete' ? (
              
              <Box>
                <Typography variant="h6" component="p" sx={{p:2}}>
                  Are you sure you want to delete this product?
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center",mb:2 }}>
                <Button
                onClick={handleDelete}
                  variant="contained"
                  color="error"
              
                
                >
                  Confirm Delete
                </Button>
              </Box></Box>
            ) : (
              <AddProductForm />
            )}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
export default BasicModal