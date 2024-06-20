// import logo from './logo.svg';
import React from 'react';
// import { Grid,Box } from '@mui/material';
// import Container from '@mui/material/Container';
// import Profile from './components/Profile/Profile';
// import Portfolio from './pages/portfolio/Portfolio';
// import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import SideNavBar from './components/SideNavbar/SideNavbar';
import Resume from './pages/resume/Resume';
import Home from './pages/home/Home';
import Product from './pages/product/Product';
import {BrowserRouter as Router,Routes, Route} from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div style={{ display: 'flex' }}>   
     {/* <SideNavBar /> */}
       <Router>
          {/* <Header /> */}
              <Routes>
                {/* <Route path="/portfolio" exact element={<Portfolio />} /> */}
                <Route path="/home" exact element={<Home />} />
                <Route path="/product" exact element={<Product />} />
              </Routes>
            
        </Router>
        {/* <Footer /> */}
    </div>

  );
}

export default App;
