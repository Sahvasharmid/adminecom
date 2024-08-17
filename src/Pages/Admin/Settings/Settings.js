import React from 'react';
import Navbar from '../../../Components/Header/Navbar';
import { Box } from '@mui/material';
import MiniDrawer from '../../../Components/Header/SideBar';
import BasicTabs from '../../../Components/Header/Tab';

const Settings = () => {
  return (
    <div>
      <Navbar />
      <Box sx={{ height: 55 }} /> {/* Adjust height if necessary */}
      <Box sx={{ display: "flex", height: "calc(100vh - 30px)" }}> {/* Adjust height calculation to fit the full viewport */}
        <MiniDrawer />
        <Box 
          sx={{ 
            flexGrow: 1, 
            p: 2, 
            backgroundColor: "#E9EAEC",
            height: "100%",
            overflowY: "scroll" // Ensures content scrolls vertically if it overflows
          }}
        >
          <BasicTabs />
        </Box>
      </Box>
    </div>
  );
};

export default Settings;
