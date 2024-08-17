import React from 'react'
import Navbar from '../../Components/Header/Navbar'
import SideBar from '../../Components/Header/SideBar'
import { Box } from '@mui/material'
import CustomPaginationActionsTable from '../../Components/Header/StickyHeader'
import BasicModal from '../../Components/Header/Modal'
import { styled } from '@mui/material/styles'
const ResponsiveBox = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(2),
  overflow: 'scroll',
  [theme.breakpoints.down('sm')]: {
   
    overflow: 'auto',
  },
}));
const Products = () => {
  return (
    <div>
        <Navbar></Navbar>
        <Box height={55}></Box>
    <Box sx={{display:"flex",backgroundColor:"#E9EAEC",paddingBottom:"20px",paddingTop:"20px"}}>
        <SideBar></SideBar>
     
    <ResponsiveBox>
        <Box sx={{display:"flex"}}>
            <Box sx={{width:"100%",marginTop:"10px"}}>
                <CustomPaginationActionsTable></CustomPaginationActionsTable>
           
            </Box>
            
    
          
        </Box>
        </ResponsiveBox>
    </Box>
    </div>
  )
}

export default Products