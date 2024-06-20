import React from "react";
import { Nav, Navbar} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {  NavLink,useLocation } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import TelegramIcon from '@mui/icons-material/Telegram';
import resumeData from '../../utils/resumeData';
import CustomButton from '../Button/Button';
import './Header.css';

const Header = (props) => {
    const location = useLocation();
    const pathName = location.pathname;
  return (
    <Navbar expand="lg" sticky='top' className="header"> 
        {/* Home Link */}
        <Nav.Link as={NavLink} to={'/'} className="header_navlink">
            <Navbar.Brand className="header_home">
                <HomeIcon />
            </Navbar.Brand>
        </Nav.Link>
        <Navbar.Toggle />
        <Navbar.Collapse >
            <Nav className="header_left">
                {/* Resume Link */}
                <Nav.Link as={NavLink} to={'/'} className={pathName ==='/' ? 'header_link_active': 'header_link'}>Resume</Nav.Link> 
                {/* portfolio link */}
                <Nav.Link as={NavLink} to={'/portfolio'} className={pathName ==='/portfolio' ? 'header_link_active': 'header_link'}>Portfolio</Nav.Link>

            </Nav>
        </Navbar.Collapse>

        <div className="header_right">
            {Object.keys(resumeData.socials).map(key=>(
                        <a href={resumeData.socials[key].link} target="_blank" rel="noopener noreferrer" key={key} >{resumeData.socials[key].icon}</a>
                    ))}
            <CustomButton text={'Hire Me'} icon={<TelegramIcon/>}/>
        </div>

        
    </Navbar>
  );
};

export default Header;
