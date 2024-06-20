import React from "react";
import { Typography } from "@mui/material";
import './Footer.css';
import resumeData from '../../utils/resumeData'

const Footer = () => {
    return(
        <div className="footer">
           <div className="footer_left">
                <Typography className="footer_name">{resumeData.name}</Typography>
           </div>
           <div className="footer_right">
                <Typography className="footer_copyright">
                    Designed and Developed By <a href="/" target="_blank">Arti Gosavi</a>
                    <br/>
                    Clone Idea from<a href="/" target="_blank">TavOnline</a> 
                </Typography>
           </div>

        </div>
    )

}
export default Footer;