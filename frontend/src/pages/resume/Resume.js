import React from 'react';
import "./Resume.css";
import { Grid, Typography,Paper, TextField } from '@mui/material'
import resumeData from '../../utils/resumeData';
import CustomTimeline from '../../components/Timeline/Timeline';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import CustomButton from '../../components/Button/Button';

const Resume = () => {
  return (
    <>
      {/* about Me */}
      <Grid container className='section pb_45 pt_45'>
        <Grid item className='section_title mb_30'>
          <span></span>
          <h6 className='section_title_text'>About Me</h6>
        </Grid>
        <Grid item  xs={12}>
          <Typography variant='body2' className='aboutme_text'>{resumeData.about}</Typography>
        </Grid>
      </Grid>
      {/* Eductaion and Expriences*/}
      <Grid container className='section pb_45'>
        <Grid item className='section_title mb_30'>
          <span></span>
          <h6 className='section_title_text'>Resume</h6>
        </Grid>

        <Grid item  xs={12}>
          <Grid container className='resume_timeline' >
            {/* Working Experience */}
            <Grid item sm={12} md={6}>
              <CustomTimeline title={'Working History'} icon={<WorkIcon/>}>
              {resumeData.experiences.map((experience) => (
                   <TimelineItem>
                      <TimelineSeparator className="separator_padding">
                        <TimelineDot variant ="outlined"
                        className="timeline_dot" />
                        <TimelineConnector />
                      </TimelineSeparator>
                      <TimelineContent className='resume_timeline_content'>
                        <Typography className='timeline_title'>{experience.title}</Typography>
                        <Typography variant='caption' className='timeline_date'> {experience.date}</Typography>
                        <Typography variant='body2' className='timeline_description'>{experience.description}</Typography>
                      </TimelineContent>
                  </TimelineItem>
                  
              ))}
              </CustomTimeline>
            </Grid>
           
            {/* Work Eductation */}
            <Grid item sm={12} md={6}>
            <CustomTimeline title={'Education History'} icon={<SchoolIcon/>}>
              {resumeData.educations.map((education) => (
                   <TimelineItem>
                      <TimelineSeparator className="separator_padding">
                        <TimelineDot variant ="outlined"
                        className="timeline_dot" />
                        <TimelineConnector />
                      </TimelineSeparator>
                      <TimelineContent className='resume_timeline_content'>
                        <Typography className='timeline_title'>{education.title}</Typography>
                        <Typography variant='caption' className='timeline_date'> {education.date}</Typography>
                        <Typography variant='body2' className='timeline_description'>{education.description}</Typography>
                      </TimelineContent>
                  </TimelineItem>
              ))}
              </CustomTimeline>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {/* services*/}
      <Grid container className='section  pb_45'>
        <Grid item className='section_title mb_30'>
          <span></span>
          <h6 className='section_title_text'>My Services</h6>
        </Grid>

        <Grid item >
          <Grid container xs={12} spacing={3} justify='space-around'>
            {resumeData.services.map((service)=>(
              <Grid item xs={12} sm={6} md={3}>
                  <div className='services'>
                    <icon className='service_icon'>{service.icon}</icon>
                    <Typography className='service_title' variant='h6'>{service.title}</Typography>
                    <Typography className='service_description' variant='body2'>{service.description}</Typography>
                  </div>
              </Grid>

            ))}
          </Grid>
        </Grid>
      </Grid>

      {/* skills */}
      <Grid container className='section graybg pb_45 p_50' >
        <Grid item xs={12}>
          <Grid container justify='space-between' spacing={3}>
          {resumeData.skills.map((skill)=>(
             <Grid item xs={12} sm={6} md={3}>
                 <Paper elevation={0} className='skill'>
                  <Typography variant='h6' className='skill_title'>{skill.title}</Typography>
                  {skill.description.map((element)=>(
                    <Typography variant='body2' className='skill_description'>
                      <TimelineDot variant={'outlined'} className='timeline_dot'/>{element}
                    </Typography>
                   ))}
                 </Paper>
             </Grid>
        ))}
          </Grid>
        </Grid>
      
      </Grid>

      {/* contacts */}
      <Grid container spacing={5} className='section pt_45 pb_45'>
        {/* contact form */}
        <Grid item xs={12} lg={7}>
          <Grid container>
            {/* Contact form Heading */}
            <Grid item className='section_title mb_30'>
              <span></span>
              <h6 className='section_title_text'>Contact Form</h6>
            </Grid>
               {/* Contact form Text input field */}
            <Grid item  xs={12}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth name='name' label='Name'  variant="standard" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth name='email' label='Email'  variant="standard" />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth name='message' label='Message'  variant="standard" multiline rows={4}/>
                </Grid>
                <Grid item xs={12}>
                  <CustomButton text='Submit'/>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {/* contact imformation */}
        <Grid item xs={12} lg={5}>
          <Grid container>
            <Grid item className='section_title mb_30'>
                  <span></span>
                  <h6 className='section_title_text'>Contact Information</h6>
            </Grid>

            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={12}>
                  <Typography className='contactInfo_item'>
                    <span>Address:</span>{resumeData.address}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography className='contactInfo_item'>
                    <span>Phone:</span>{resumeData.phone}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography className='contactInfo_item'>
                    <span>Email:</span>{resumeData.email}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography className='contactInfo_item'>
                    <span>Designation:</span>{resumeData.title}
                  </Typography>
                </Grid>
                 
              </Grid>
            </Grid>

            <Grid item>
              <Grid container className='contactInfo_socialContainer'>
                {Object.keys(resumeData.socials).map(key =>(
                    <Grid item className='contactInfo_social'>
                      <a href={resumeData.socials[key].link}>{resumeData.socials[key].icon}</a>
                    </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default Resume

  