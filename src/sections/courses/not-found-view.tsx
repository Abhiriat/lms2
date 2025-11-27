import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import LinearProgress from '@mui/material/LinearProgress';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';

import Grid from '@mui/material/GridLegacy';

// Sample course data
const coursesData = {
  running: [
    {
      id: 1,
      title: 'English Listening',
      instructor: 'Aman',
      progress: 68,
      image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=250&fit=crop',
      duration: '8 weeks',
      completedLessons: 17,
      totalLessons: 25,
      level: 'Intermediate',
      action:'listening'
    },
    {
      id: 2,
      title: 'English Speaking',
      instructor: 'Srishti',
      progress: 45,
      image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=400&h=250&fit=crop',
      duration: '10 weeks',
      completedLessons: 12,
      totalLessons: 30,
      level: 'Upper-Intermediate',
      action:'listening'

    },
    {
      id: 3,
      title: 'English Writing',
      instructor: 'Akash',
      progress: 33,
      image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=250&fit=crop',
      duration: '12 weeks',
      completedLessons: 10,
      totalLessons: 36,
      level: 'Advanced',
      action:'listening'

    },
  ],

  completed: [
    {
      id: 4,
      title: 'English Grammar in Use (A1–B1)',
      instructor: 'Mukul',
      completedDate: 'Nov 08, 2025',
      image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=250&fit=crop',
      rating: 4.9,
      certificate: true,
    },
    {
      id: 5,
      title: 'English Pronunciation & Accent Training',
      instructor: 'Gaurav',
      completedDate: 'Oct 22, 2025',
      image: 'https://images.unsplash.com/photo-1513258496096-90b10c3826ed?w=400&h=250&fit=crop',
      rating: 5.0,
      certificate: true,
    },
    {
      id: 6,
      title: 'Beginner English: Speak from Day 1',
      instructor: 'Sukhdeep',
      completedDate: 'Sep 30, 2025',
      image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=250&fit=crop',
      rating: 4.7,
      certificate: true,
    },
  ],

  upcoming: [
    {
      id: 7,
      title: 'TOEFL iBT Complete Preparation',
      instructor: 'Mehak',
      startDate: 'Dec 10, 2025',
      image: 'https://images.unsplash.com/photo-1588075592446-4f1e91889b70?w=400&h=250&fit=crop',
      duration: '10 weeks',
      enrolled: true,
      level: 'Advanced',
    },
    {
      id: 8,
      title: 'English for Academic Writing (EAP)',
      instructor: 'Gurleen',
      startDate: 'Jan 05, 2026',
      image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=250&fit=crop',
      duration: '14 weeks',
      enrolled: false,
      level: 'Advanced',
    },
    {
      id: 9,
      title: 'English Vocabulary Builder: 1000+ Words',
      instructor: 'Naina',
      startDate: 'Dec 20, 2025',
      image: 'https://images.unsplash.com/photo-1491841573634-281cebcf72c7?w=400&h=250&fit=crop',
      duration: '6 weeks',
      enrolled: true,
      level: 'Intermediate',
    },
  ],
};



function TabPanel({ children, value, index }) {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

function RunningCourseCard({ course }) {
const navigate=useNavigate()
  const handleNavigate=(action)=>{
    if(action==='listening'){
      navigate('/lmspage')

    }else if(action==='speaking'){
      navigate('/lmsspeaking')
    }else{
      navigate('/lmswriting')
    }
  }
  return (
    <Card sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      transition: 'transform 0.2s, box-shadow 0.2s',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: 6,
      }
    }}>
      <CardMedia
        component="img"
        height="180"
        image={course.image}
        alt={course.title}
      />
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 1 }}>
          <Chip 
            label="In Progress" 
            size="small" 
            color="primary" 
            icon={<Icon icon="mdi:play-circle-outline" />}
          />
          <Typography variant="caption" color="text.secondary">
            {course.duration}
          </Typography>
        </Box>
        
        <Typography gutterBottom variant="h6" component="h2" sx={{ fontWeight: 600 }}>
          {course.title}
        </Typography>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          by {course.instructor}
        </Typography>
        
        <Box sx={{ mb: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
            <Typography variant="body2" color="text.secondary">
              Progress
            </Typography>
            <Typography variant="body2" fontWeight="600" color="primary">
              {course.progress}%
            </Typography>
          </Box>
          <LinearProgress 
            variant="determinate" 
            value={course.progress} 
            sx={{ height: 8, borderRadius: 4 }}
          />
        </Box>
        
        <Typography variant="caption" color="text.secondary" sx={{ mb: 2 }}>
          {course.completedLessons} of {course.totalLessons} lessons completed
        </Typography>
        
        <Button 
          variant="contained" 
          fullWidth 
          sx={{ mt: 'auto' }}
          startIcon={<Icon icon="mdi:play-circle-outline" />}
          onClick={()=>handleNavigate(course.action)}
        >
          Continue Learning
        </Button>
      </CardContent>
    </Card>
  );
}

function CompletedCourseCard({ course }) {
  return (
    <Card sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      transition: 'transform 0.2s, box-shadow 0.2s',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: 6,
      }
    }}>
      <CardMedia
        component="img"
        height="180"
        image={course.image}
        alt={course.title}
      />
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 1 }}>
          <Chip 
            label="Completed" 
            size="small" 
            color="success" 
            icon={<Icon icon="mdi:check-circle" />}
          />
          {course.certificate && (
            <Chip label="Certified" size="small" variant="outlined" color="success" />
          )}
        </Box>
        
        <Typography gutterBottom variant="h6" component="h2" sx={{ fontWeight: 600 }}>
          {course.title}
        </Typography>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          by {course.instructor}
        </Typography>
        
        <Typography variant="caption" color="text.secondary" sx={{ mb: 2 }}>
          Completed on {course.completedDate}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Typography variant="body2" fontWeight="600" color="warning.main" sx={{ mr: 0.5 }}>
            ★ {course.rating}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Your Rating
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', gap: 1, mt: 'auto' }}>
          <Button variant="outlined" fullWidth>
            Review
          </Button>
          {course.certificate && (
            <Button variant="contained" fullWidth>
              Certificate
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}

function UpcomingCourseCard({ course }) {
  return (
    <Card sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      transition: 'transform 0.2s, box-shadow 0.2s',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: 6,
      }
    }}>
      <CardMedia
        component="img"
        height="180"
        image={course.image}
        alt={course.title}
      />
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 1 }}>
          <Chip 
            label={course.enrolled ? "Enrolled" : "Available"} 
            size="small" 
            color={course.enrolled ? "info" : "default"}
            icon={<Icon icon="mdi:schedule" />}
          />
          <Typography variant="caption" color="text.secondary">
            {course.duration}
          </Typography>
        </Box>
        
        <Typography gutterBottom variant="h6" component="h2" sx={{ fontWeight: 600 }}>
          {course.title}
        </Typography>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          by {course.instructor}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, p: 1.5, bgcolor: 'action.hover', borderRadius: 1 }}>
         <Icon
  icon="mdi:calendar-today"
  style={{ fontSize: 18, marginRight: 4, color: 'var(--mui-palette-primary-main)' }}
/>
          <Box>
            <Typography variant="caption" color="text.secondary" display="block">
              Starts on
            </Typography>
            <Typography variant="body2" fontWeight="600">
              {course.startDate}
            </Typography>
          </Box>
        </Box>
        
        <Button 
          variant={course.enrolled ? "outlined" : "contained"}
          fullWidth 
          sx={{ mt: 'auto' }}
        >
          {course.enrolled ? "View Details" : "Enroll Now"}
        </Button>
      </CardContent>
    </Card>
  );
}

export function CoursesView() {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 0 }}>
      <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700, mb: 1 }}>
        My Courses
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Track your learning progress and explore new courses
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange}
          sx={{
            '& .MuiTab-root': {
              fontSize: '1rem',
              fontWeight: 600,
              textTransform: 'none',
            }
          }}
        >
          <Tab 
            label={`Running (${coursesData.running.length})`} 
            icon={<Icon icon="mdi:play-circle-outline" />}
            iconPosition="start"
          />
          <Tab 
            label={`Completed (${coursesData.completed.length})`}
            icon={<Icon icon="mdi:check-circle" />}
            iconPosition="start"
          />
          <Tab 
            label={`Upcoming (${coursesData.upcoming.length})`}
            icon={<Icon icon="mdi:schedule" />}
            iconPosition="start"
          />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        <Grid container spacing={3}>
          {coursesData.running.map((course) => (
            <Grid item xs={12} sm={6} md={4} key={course.id}>
              <RunningCourseCard course={course} />
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <Grid container spacing={3}>
          {coursesData.completed.map((course) => (
            <Grid item xs={12} sm={6} md={4} key={course.id}>
              <CompletedCourseCard course={course} />
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <Grid container spacing={3}>
          {coursesData.upcoming.map((course) => (
            <Grid item xs={12} sm={6} md={4} key={course.id}>
              <UpcomingCourseCard course={course} />
            </Grid>
          ))}
        </Grid>
      </TabPanel>
    </Container>
  );
}