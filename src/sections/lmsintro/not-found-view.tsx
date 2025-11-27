import React from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Chip,
  Container,
  Paper,
  Divider
} from '@mui/material';
import Grid from '@mui/material/GridLegacy';
import {
  CalendarMonth,
  AccessTime,
  School,
  PlayArrow
} from '@mui/icons-material';
import { useRouter } from 'src/routes/hooks';

export function LMSIntroView() {
  const route = useRouter();

  const handleStartCourse = () => {
    console.log('Starting course...');
    route.push('/lmspage');
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {/* Course Card */}
        <Grid item xs={12} md={7}>
          <Card elevation={3} sx={{ borderRadius: 2 }}>
            <CardMedia
              component="img"
              height="350"
              image="https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80"
              alt="Foundation English"
              sx={{ objectFit: 'cover' }}
            />
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <School color="primary" />
                <Typography variant="overline" color="text.secondary">
                  Core English Program
                </Typography>
              </Box>
              <Typography variant="h5" gutterBottom fontWeight="bold">
                Foundation English (Level 1–3)
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                Instructor: Ms. Riya Sharma
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Course Details */}
        <Grid item xs={12} md={5}>
          <Paper elevation={2} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom fontWeight="bold" color="primary">
              Course Information
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <AccessTime color="action" />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Course Duration
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    6 Weeks
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <CalendarMonth color="action" />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Enrollment Period
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    2025-12-01 to 2026-01-10
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <CalendarMonth color="action" />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Assessment Window
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    2026-02-15 to 2026-02-25
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <CalendarMonth color="action" />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Certificate Exam
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    2026-03-05
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Button
              variant="contained"
              size="large"
              fullWidth
              startIcon={<PlayArrow />}
              onClick={handleStartCourse}
              sx={{
                mt: 3,
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 'bold',
                textTransform: 'none'
              }}
            >
              Start Course
            </Button>
          </Paper>

          <Paper elevation={1} sx={{ p: 2, bgcolor: 'primary.50' }}>
            <Chip label="Beginner Level" color="primary" size="small" sx={{ mb: 1 }} />
            <Typography variant="body2" color="text.secondary">
              Build strong basics in English grammar, vocabulary, pronunciation, and communication.
            </Typography>
          </Paper>
        </Grid>

        {/* Course Abstract */}
        <Grid item xs={12}>
          <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Course Overview
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
              The Foundation English Course (Level 1–3) is designed to strengthen basic English skills
              for learners of all age groups. It focuses on improving grammar, sentence formation,
              vocabulary usage, and reading comprehension.
            </Typography>

            <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
              Through interactive lessons, speaking practice, and guided writing activities, students
              develop confidence in using English in real-life situations. The course gradually
              progresses from basic concepts to intermediate-level proficiency.
            </Typography>

            <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
              By the end of the course, learners will be able to construct correct sentences, speak
              fluently in daily conversations, improve pronunciation, and prepare for school-level
              or competitive English exams.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
