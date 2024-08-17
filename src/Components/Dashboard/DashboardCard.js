import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import StorefrontIcon from '@mui/icons-material/Storefront';
import CountUp from 'react-countup';

import { Typography ,Stack} from '@mui/material';
export const DashboardCard = ({title,value,className}) => {
  return (
    <>
        <Card sx={{ maxWidth: "100%", color: "white", flex: 1 }} className={className}>
      <CardContent className='white-font' sx={
      {display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"left",height:"100%",paddingLeft:"10px"}}>
         <StorefrontIcon></StorefrontIcon>
         <span><CountUp end={value} duration={2} delay={0.5} /></span>
        <Typography variant="body2">
{title}
        </Typography>
      </CardContent>
    </Card>
    </>
  )
}

export const DashboardSmallCard=({title,value,className})=>{

    return(
<>
<Card sx={{ maxWidth: "100%",flex:1,color:"white"}} className={className}>
      <CardContent>
      <Stack spacing={{xs:0,md:2}} direction={{xs:"column",md:"row"}}>
         <StorefrontIcon></StorefrontIcon>
<div className='paddingall'>
  <span><CountUp end={value} duration={2} delay={0.5} />$</span>
<br/>

  <span>{title}</span>
  </div>
        </Stack>

      </CardContent>
  
    </Card>
</>
    )
}