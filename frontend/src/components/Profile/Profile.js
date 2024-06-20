import { Typography } from "@mui/material";
import React from "react"
import './Profile.css';
import CustomTimeline, {CustomeTimelineSeparator} from '../Timeline/Timeline';
import resumeData from '../../utils/resumeData'
import WorkIcon from '@mui/icons-material/Work';
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineContent from "@mui/lab/TimelineContent";
import CustomButton from '../Button/Button'
import DownloadIcon from '@mui/icons-material/Download';

const CustomTimelineItem = ({ title, text, link }) => {
    return (
      <TimelineItem>
        <CustomeTimelineSeparator />    
        <TimelineContent className="timeline_content">
          {link ? (
            <Typography className="timelineItem_text">
              <span>{title}:</span>{" "}
              <a href={link} target="_blank" rel="noopener noreferrer">
                {text}
              </a>
            </Typography>
          ) : (
            <Typography className="timelineItem_text">
              <span>{title}:</span> {text}
            </Typography>
          )}
        </TimelineContent>
      </TimelineItem>
    );
  };
  
const Profile = () => {
    return(
        <div className="profile container_shadow">
           <div className="profile_name">
            <Typography className="name">{resumeData.name}</Typography>
            <Typography className="title">{resumeData.title}</Typography>
           </div>

           <figure className="profile_image">
            <img src={require('../../assets/images/Arti.jpg')} alt={require('../../assets/images/profile.png')}></img>
           </figure>

           <div className="profile_information">
                <CustomTimeline icon={<WorkIcon />}>
                    <CustomTimelineItem title='Name' text={resumeData.name} />
                    <CustomTimelineItem title='Title' text={resumeData.title} />
                    <CustomTimelineItem title='Email' text={resumeData.email} />
                    {Object.keys(resumeData.socials).map(key=>(
                        <CustomTimelineItem title={key} text={resumeData.socials[key].text}  link={resumeData.socials[key].link} />
                    ))}
                </CustomTimeline>
                <div className="button_container">
                    <CustomButton text={'Download CV'} icon={<DownloadIcon/>}/>
                </div>
           </div>
        </div>
    )

}
export default Profile;