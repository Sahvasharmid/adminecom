import { createTheme,ThemeProvider } from '@mui/material'
import React from 'react'



const ThemeAppProvider = ({children}) => {
    const theme=createTheme({
   
        palette:{
            primary:{
                main:"#669ACB",
                dark:"#456b8e",
                light:"#82add5"

            
        },
        secondary:{
            main:"#023A78"
        }
       
    }})
  return (
    <div>
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    </div>
  )
}

export default ThemeAppProvider