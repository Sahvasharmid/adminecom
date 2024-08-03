import React, { useState, useEffect } from 'react';
import MiniDrawer from '../../Components/Header/SideBar';
import { Box, Paper, Grid } from '@mui/material';
import Navbar from '../../Components/Header/Navbar';
import { styled } from '@mui/material/styles';
import { DashboardCard, DashboardSmallCard } from '../../Components/Dashboard/DashboardCard';
import ProductsChart from '../../Components/Chart/ProductChart';
import AccordionUsage from '../../Components/Header/Accordion';
import axios from 'axios';

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '10px',
  height: '80vh',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    height: 'auto',
  },
}));

const ContentBox = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(5),
  backgroundColor: '#E9EAEC',
}));

const StatsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '10px',
  marginBottom: '10px',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'row',
    height: 'auto',
  },
  
}));

const StatsColumn = styled(Box)(({ theme }) => ({
  width: '70%',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  marginBottom: '10px',
  marginTop: '10px',
  [theme.breakpoints.down('sm')]: {
    width:"100%",
     height: 'auto',
  
   },

}));
const GridContainer=styled(Grid)(({theme})=>({
  display: "flex",
   flexDirection: "column",
  

}))

const SmallCardColumn = styled(Box)(({ theme }) => ({
  width: '30%',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  marginBottom: '10px',
  marginTop: '10px',
  [theme.breakpoints.down('sm')]: {
   width:"100%",
    height: 'auto',
  },
}));

const ChartContainer = styled(Box)(({ theme }) => ({
  width: '70%',
  backgroundColor: 'white',
  [theme.breakpoints.down('sm')]: {
    width:"100%",
     height: 'auto',
   },
}));

const AccordionContainer = styled(Box)(({ theme }) => ({
  width: '30%',
  overflow: 'auto', 
  [theme.breakpoints.down('sm')]: {
    width:"100%",
     height: 'auto',
   },

}));

const Home = () => {
  const [totalUsers, setTotalUser] = useState(0);
  const [ProductsCount, setProductsCount] = useState(250);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch users count
        const usersResponse = await axios.get('https://api.escuelajs.co/api/v1/users');
        const usersCount = usersResponse.data.length;
        setTotalUser(usersCount);

        // Fetch products count
        const productsResponse = await axios.get('https://api.escuelajs.co/api/v1/products');
        const productsCount = productsResponse.data.length;
        setProductsCount(productsCount);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Box>
        <Navbar />
        <Box height={55} />
        <Box sx={{ display: 'flex' }}>
          <MiniDrawer />
          <ContentBox>
            <StatsContainer>
              <StatsColumn>
                <Grid container spacing={2} sx={{flex:1}}>
                <GridContainer item md={6} xs={12} >
                    <DashboardCard title="Total Users" value={totalUsers} className="gradient" />
                  </GridContainer>
                  <GridContainer item md={6} xs={12}>
                    <DashboardCard title="Total Products" value={ProductsCount} className="gradient2" />
                  </GridContainer>
                </Grid>
              </StatsColumn>
              <SmallCardColumn>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <DashboardSmallCard className="gradient" title="Total Income" value="120" />
                  </Grid>
                  <Grid item xs={12}>
                    <DashboardSmallCard className="gradient2" title="Total Income" value="120" />
                  </Grid>
                </Grid>
              </SmallCardColumn>
            </StatsContainer>
            <StyledBox>
              <ChartContainer>
                <Grid container spacing={2}>
                  <ProductsChart />
                </Grid>
              </ChartContainer>
              <AccordionContainer>
                <div className="accordion">
                  <h4>Popular Products</h4>
                  <AccordionUsage />
                </div>
              </AccordionContainer>
            </StyledBox>
          </ContentBox>
        </Box>
      </Box>
    </>
  );
};

export default Home;
