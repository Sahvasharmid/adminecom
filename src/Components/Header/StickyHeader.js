import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Typography, Box, TextField, Divider, Avatar } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import BasicModal from './Modal';
import { useProducts } from '../../utils/ProductContext';
import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';
import './StickyHeader.css'
const columns = [
  { id: 'avatar', label: 'CategoryImage', minWidth: 170 },
  { id: 'title', label: 'Name', minWidth: 170, align: 'left' },
  {
    id: 'price',
    label: 'Price',
    minWidth: 170,
    align: 'center',
    format: (value) => `$${value.toFixed(2)}`, // Format price with dollar sign
  },
  { id: 'category', label: 'Category', minWidth: 170, align: 'center' },
  { id: 'buttons', label: 'Actions', minWidth: 170 },
];

export default function StickyHeadTable() {
  const { products } = useProducts(); // Use products from context
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [filteredRows, setFilteredRows] = React.useState([]);
  const [searchQuery, setSearchQuery] = React.useState('');

  React.useEffect(() => {
    setFilteredRows(products);
  }, [products]);

  React.useEffect(() => {
    // Filter rows based on search query
    const filtered = products.filter(
      (row) =>
        row.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.category.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredRows(filtered);
  }, [searchQuery, products]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSearch = (event, value) => {
    setSearchQuery(value || ''); // value is null when the input is cleared
  };

  return (
    <>
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Typography variant="h6" component="div" sx={{ p: 2 }}>
        Products List
      </Typography>
      <Divider />
      <Box sx={{ display: 'flex', flexDirection: {
          xs:'column',
          md:'row'
        } }}>
        <Box sx={{ p: 2, width: '30%', flexGrow: '1' }}>
          <Autocomplete
            disablePortal
            options={products.map((row) => row.title)}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Search" variant="outlined" fullWidth />}
            onChange={handleSearch}
          />
        </Box>
        <Box sx={{ p: 2 }}>
          <BasicModal mode="add" />
        </Box>
      </Box>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow key={row.id}>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align}>
                    {column.id === 'avatar' && <Avatar src={row.category.image} />}
                    {column.id === 'title' && row.title}
                    {column.id === 'price' && `$${row.price.toFixed(2)}`}
                    {column.id === 'category' && row.category.name}
                    {column.id === 'buttons' && (
                      <>
                    <Box sx={{display:"flex"}}>
                    <BasicModal mode="edit"  productId={row.id} />
                    <BasicModal mode="delete" productId={row.id} />
                    </Box>
                     
                        
                      </>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={filteredRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelDisplayedRows={({ page }) => `Page ${page + 1} of ${Math.ceil(filteredRows.length / rowsPerPage)}`}
        nextIconButtonProps={{ disabled: (page + 1) * rowsPerPage >= filteredRows.length }}
      />
     
    </Paper>
    {products.length===0&&(
      <>
        <Stack spacing={1}>
      {/* For variant="text", adjust the height via font-size */}
      <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
      {/* For other variants, adjust the size with `width` and `height` */}
      <Skeleton variant="circular" width={40} height={40} />
      <Skeleton variant="rectangular" width={210} height={60} />
      <Skeleton variant="rounded" width={210} height={60} />
    </Stack>
      </>
    )}

    </>
  );
}
