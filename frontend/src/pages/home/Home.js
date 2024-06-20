import React from 'react';
import SideNavBar from '../../components/SideNavbar/SideNavbar';
import Navbar from '../../components/Navbar/Navbar';
import { Box } from '@mui/material';

export default function Home() {
  return (
    <>
    <Navbar/>
    <Box sx={{display:"flex"}}>
      <SideNavBar/>
      <Box component="main" sx={{flexGrow:1, p:5}}>
          <h1>Home</h1>
      </Box>
    </Box>
    </>
    
  )
}

