import React, { useContext, useEffect, useState } from 'react'
import { Box,Button,Container, Typography, styled ,Checkbox,FormControlLabel} from '@mui/material'
import TextField from '@mui/material/TextField';

import { useNavigate } from 'react-router-dom';
import {Alert} from '@mui/material';
import backgroundimg from '../../../src/assets/ecomfeature.jpg'
import { AuthContext } from '../../utils/AuthContext';
import MiniDrawer from '../../Components/Header/SideBar';
const CustomContainer=styled(Container)(({theme})=>({
  margin:"0px",
  padding:"0px",
  backgroundColor:theme.palette.primary.main,
  height:"100vh",
  display:"flex",
  justifyContent:"center",
  alignItems:"center",
  
      })
  );
  const CustomBox=styled(Box)(({theme})=>({
      backgroundImage: `url(${backgroundimg})`, // Replace with your direct image URL
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      
      [theme.breakpoints.down('md')]: {
        height:"45vh",
        width:"100%"
        // Adjust width for small screens and up
      },
  }));
  
const LoginPage = () => {
  const navigate=useNavigate()
  const[email,setEmail]=useState("")
  const[password,setPassword]=useState("")
  const [error, setError] = useState('');
  const [checked, setChecked] = useState(false);

  const { login } = useContext(AuthContext);

const handleEmailChange = (e) => {
  setEmail(e.target.value);
};

const handlePasswordChange = (e) => {
  setPassword(e.target.value);
};
const handleChangeCheckbox=(e)=>{

  setChecked(e.target.checked)
 
}
useEffect(()=>{
  console.log(checked);
  console.log(email);
  console.log(password)
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    const rememberedPassword = localStorage.getItem('rememberedPassword');
    
    if (rememberedEmail && rememberedPassword) {
      setEmail(rememberedEmail);
      setPassword(rememberedPassword);
      setChecked(true);
    }
  }, []);


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { token, user } = await login(email, password);

      if (checked) {
        localStorage.setItem('rememberedEmail', email);
        localStorage.setItem('rememberedPassword', password);
      } else {
        localStorage.removeItem('rememberedEmail');
        localStorage.removeItem('rememberedPassword');
      }

      localStorage.setItem('token', token);
      navigate('/dashboard/home');
    } catch (error) {
      console.error('Error logging in:', error);
      if (error.response && error.response.status === 401) {
        setError('Invalid email or password. Please try again.'); // Display wrong password message
      } else if (error.message === 'Access denied. Admins only.') {
        setError(error.message); // Display access denied message
      } else {
        setError('An unexpected error occurred. Please try again later.'); // Handle other errors
      }
    }
  };


  return (
  <CustomContainer maxWidth="xxl">
    
        <Container maxWidth="md" sx={(theme)=>({backgroundColor:"white",height:"80vh",display:"flex",padding:"0px!important",[theme.breakpoints.down('md')]: {
   flexDirection:"column",
   height:"100vh",
   width:"100%"
   // Adjust width for small screens and up
  },})}>
            <Box sx={(theme)=>({width:"50%",[theme.breakpoints.down('md')]: {
    width: "100%", // Adjust width for small screens and up
  },})}>
              <CustomBox></CustomBox>
              
            </Box>

            <Box sx={(theme)=>({display:"flex",height:"100%",justifyContent:"center",alignItems:"center",width:"50%",
            [theme.breakpoints.down('md')]: {
              width: "100%", // Adjust width for small screens and up
            },
                       })}>
              <Box sx={(theme)=>({height:"50%",paddingBottom:"50px",width:"70%",[theme.breakpoints.down('md')]:{
                width:"90%"
              }})}>
              <Box>
              <Typography variant='h6' sx={{color:(theme)=>theme.palette.secondary.main,fontWeight:"bold"}}>Welcome to  InstaShipin</Typography>
                <Typography variant='h6' sx={{color:(theme)=>theme.palette.secondary.main,fontStyle:"italic"}}>Ship Smarter Today</Typography>
                {error && (
              <Alert severity="error" sx={{ backgroundColor: 'transparent', color: 'red', border: 'none', boxShadow: 'none', padding: 0 }}>
                {error}
              </Alert>
            )}
                <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '100%' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-email" label="Email" placeholder='admin@mail.com' variant="outlined"  value={email} onChange={handleEmailChange} sx={{marginLeft:"0px!important"}} required />
  
      <TextField id="outlined-password" label="Password" placeholder='admin123' variant="outlined"  value={password} onChange={handlePasswordChange} sx={{marginLeft:"0px!important"}} required/>
      <Button variant='contained' sx={{backgroundColor:(theme)=>theme.palette.secondary.main,color:"white",marginLeft:"0px!important"}} onClick={handleLogin}>Submit</Button>
     
      <FormControlLabel
      control={<Checkbox checked={checked} onChange={handleChangeCheckbox} />}
      label="Remember Me"
      sx={{marginLeft:"0px!important"}}
    />
    </Box>

  
              </Box>
                </Box>
                </Box>

        
        </Container>
      </CustomContainer>

  )
}

export default LoginPage
