import React from 'react'
import Navbar from '../../Components/Header/Navbar'
import SideBar from '../../Components/Header/SideBar'
import { Box } from '@mui/material'
import CustomPaginationActionsTable from '../../Components/Header/StickyHeader'
import BasicModal from '../../Components/Header/Modal'
const Products = () => {
  return (
    <div>
        <Navbar></Navbar>
        <Box height={55}></Box>
    <Box sx={{display:"flex",backgroundColor:"#E9EAEC",height:"100vh"}}>
        <SideBar></SideBar>
        <Box sx={{flexGrow:"1",p:5}}>
        <Box sx={{display:"flex"}}>
            <Box sx={{width:"100%",marginTop:"10px"}}>
                <CustomPaginationActionsTable></CustomPaginationActionsTable>
           
            </Box>
            
        </Box>
          
        </Box>
    </Box>
    </div>
  )
}

export default Products