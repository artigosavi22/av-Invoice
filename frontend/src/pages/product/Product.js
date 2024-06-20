import React from 'react'
import SideNavBar from '../../components/SideNavbar/SideNavbar';
import Navbar from '../../components/Navbar/Navbar';
import { Box } from '@mui/material';

export default function Product() {
  return (
    <>
    <Navbar/>
    <Box sx={{display:"flex"}}>
      <SideNavBar/>
      <Box component="main" sx={{flexGrow:1, p:5}}>
          <h1>Product List</h1>
      </Box>
    </Box>
    </>
    
  )
}
