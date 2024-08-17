import React from 'react'
import MiniDrawer from '../../Components/Header/SideBar';
import { Box, Stack, Typography } from '@mui/material'
import Navbar from '../../Components/Header/Navbar';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import StorefrontIcon from '@mui/icons-material/Storefront';
import '../../../src/Dash.css'

const CreateProduct = () => {
  return (
    <div>
      <Box height={30}></Box>
<Box sx={{ display: "flex" }}>
  <MiniDrawer></MiniDrawer>
  <Box sx={{ flexGrow: 1, p: 5, border: "1px solid red", backgroundColor: "#E9EAEC"
   }}>
    <Box sx={{ flexGrow: 1 }}>
      <Box sx={{ display: "flex", border: "1px solid green", gap: "10px" }}>
        <Box sx={{ width: "70%", border: "1px solid purple", display: "flex", flexDirection: "column", gap: "10px" }}>
          <Grid container spacing={2} sx={{ flex: 1 }}>
            <Grid item md={6} sx={{ display: "flex", flexDirection: "column" }}>
              <Card sx={{ maxWidth: "100%", color: "white", flex: 1 }} className='gradient'>
                <CardContent className='white-font'>
                  <Typography gutterBottom variant="h5" component="div">
                    Lizard
                  </Typography>
                  <Typography variant="body2">
                    Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Share</Button>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item md={6} sx={{ display: "flex", flexDirection: "column" }}>
              <Card sx={{ maxWidth: "100%", color: "white", flex: 1 }} className='gradient2'>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Lizard
                  </Typography>
                  <Typography variant="body2">
                    Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Share</Button>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ width: "30%", display: "flex", flexDirection: "column", gap: "10px" }}>
          <Grid container spacing={2} sx={{ flex: 1 }}>
            <Grid item xs={12} sx={{ display: "flex", flexDirection: "column" }}>
              <Card sx={{ maxWidth: "100%"}}>
                <CardContent>
                  <Stack spacing={2} direction="row">
                    <StorefrontIcon />
                    <div className='paddingall'>
                      <span>$20k </span><br />
                      <span>Total income</span>

                      

                    </div>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sx={{ display: "flex", flexDirection: "column" }}>
              <Card sx={{ maxWidth: "100%", flex: 1 }}>
                <CardContent>
                  <Stack spacing={2} direction="row">
                    <StorefrontIcon />
                    <div className='paddingall'>
                      <span>$20k </span><br />
                      <span>Total income</span>
                    </div>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  </Box>
</Box>

    </div>
  )
}

export default CreateProduct
