import React, { useState } from 'react';
import {
  Container,
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Avatar,
  Alert,
  Button,
  
} from '@mui/material';
import Grid from '@mui/material/GridLegacy';
import CloseIcon from '@mui/icons-material/Close';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PeopleIcon from '@mui/icons-material/People';
import FolderIcon from '@mui/icons-material/Folder';
import CreateIcon from '@mui/icons-material/Create';
import { Link } from 'react-router-dom';

export function ClassesView() {
  const [showBanner, setShowBanner] = useState(true);
  
  const classData = {
    title: "6th Class(English)",
    section: "B",
    teacher: "Parvinder Singh",
    initial: "D"
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      {/* Research Participation Banner */}
      {showBanner && (
        <Box sx={{ 
          bgcolor: '#e3f2fd', 
          borderBottom: '1px solid #bbdefb',
          py: 2,
          px: 3
        }}>
          <Container maxWidth="lg">
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2,p:5 }}>
              {/* Icon */}
              <Box sx={{ 
                width: 48, 
                height: 48, 
                bgcolor: '#90caf9', 
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                borderradius:2,
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <CreateIcon sx={{ color: '#fff', fontSize: 24 }} />
              </Box>
              
              {/* Content */}
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 500, mb: 0.5 }}>
                 Participate in Research to Improve English Studio
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                 
 Be a part of shaping the future of digital learning!
 By sharing your experience and insights, you help us enhance English Studio and create smarter, more effective tools for teachers, students, and institutions.
Join our growing community of educators and learners to make English Studio better—for your classroom, your progress, and your learning journey.
                </Typography>
              </Box>

            
            </Box>
          </Container>
        </Box>
      )}

      {/* Main Content */}
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Grid container spacing={3}>
          {/* Class Card */}
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card 
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                borderRadius:3,
                '&:hover': {
                  boxShadow: 3
                },
                transition: 'box-shadow 0.3s'
              }}
            >
              {/* Card Header with Gradient */}
              <Box
                sx={{
                  background: 'linear-gradient(135deg, #fb8c00 0%, #f57c00 100%)',
                  height: 130,
                  p: 2,
                  color: 'white',
                  position: 'relative',
                  
                }}
              >
                <Link style={{color:'white',textDecoration:'none'}} to='/classdetail'>
                <Typography variant="h6" sx={{ fontWeight: 400, mb: 0.5 }}>
                  {classData.title}
                </Typography>
                </Link>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  {classData.section}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9, mt: 1 }}>
                  {classData.teacher}
                </Typography>

                {/* Avatar positioned at bottom right */}
                <Avatar
                  sx={{
                    position: 'absolute',
                    bottom: -28,
                    right: 16,
                    width: 56,
                    height: 56,
                    bgcolor: '#00897b',
                    fontSize: '1.5rem',
                    fontWeight: 500,
                    border: '3px solid white'
                  }}
                >
                  {classData.initial}
                </Avatar>
              </Box>

              {/* Card Content */}
              <CardContent sx={{ flex: 1, pt: 5 }}>
                {/* Empty space for content */}
              </CardContent>

              {/* Card Actions */}
              <CardActions sx={{ 
                borderTop: '1px solid #e0e0e0',
                justifyContent: 'flex-end',
                px: 1,
                py: 0.5
              }}>
                <IconButton size="small" sx={{ color: 'text.secondary' }}>
                  <PeopleIcon />
                </IconButton>
                <IconButton size="small" sx={{ color: 'text.secondary' }}>
                  <FolderIcon />
                </IconButton>
                <IconButton size="small" sx={{ color: 'text.secondary' }}>
                  <MoreVertIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>

          {/* You can add more class cards by duplicating the Grid item above */}
        </Grid>
      </Container>
    </Box>
  );
}