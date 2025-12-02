import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import Chip from '@mui/material/Chip';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { DashboardContent } from 'src/layouts/dashboard';
import {
  School,
  AssignmentTurnedIn,
  Schedule,
  TrendingUp,
  People,
  Warning,
  CheckCircle,
  PendingActions,
} from '@mui/icons-material';

const recentActivities = [
  'Assigned "Chapter 3 - Grammar Quiz" to Class 9A',
  'Received 23 submissions for "Flood Story Listening Task"',
  'Updated due date for "My Village Paragraph" to 25 Nov',
  'Added 5 new AI Listening tasks to Grade 10',
  'Reviewed speaking recordings — 18 pending feedback',
];

const classPerformance = [
  { class: 'Class 9A', progress: 82, color: '#4CAF50' },
  { class: 'Class 9B', progress: 74, color: '#FF9800' },
  { class: 'Class 10A', progress: 68, color: '#2196F3' },
  { class: 'Class 10B', progress: 91, color: '#4CAF50' },
];

const skillOverview = [
  { skill: 'Grammar', avgScore: 78, trend: 'up' },
  { skill: 'Listening', avgScore: 65, trend: 'up' },
  { skill: 'Speaking', avgScore: 71, trend: 'same' },
  { skill: 'Writing', avgScore: 88, trend: 'up' },
];

export function OverviewAnalyticsView() {
  return (
    <DashboardContent maxWidth="xl">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h3" sx={{ fontWeight: 600, mb: 0.5 }}>
            Welcome back, Admin!
          </Typography>
          <Typography variant="body2" color="text.secondary">
            English Department • Academic Year 2024–2025
          </Typography>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Summary Cards */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{ height: '100%', borderRadius: 5, bgcolor: '#E3F2FD' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ bgcolor: '#1976d2', width: 56, height: 56 }}>
                  <People fontSize="large" />
                </Avatar>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Total Students
                  </Typography>
                  <Typography variant="h3" sx={{ fontWeight: 600 }}>
                    248
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{ height: '100%', borderRadius: 5, bgcolor: '#E8F5E9' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ bgcolor: '#2e7d32', width: 56, height: 56 }}>
                  <AssignmentTurnedIn fontSize="large" />
                </Avatar>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Active Assignments
                  </Typography>
                  <Typography variant="h3" sx={{ fontWeight: 600 }}>
                    18
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{ height: '100%', borderRadius: 5, bgcolor: '#FFF3E0' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ bgcolor: '#f57c00', width: 56, height: 56 }}>
                  <PendingActions fontSize="large" />
                </Avatar>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Pending Submissions
                  </Typography>
                  <Typography variant="h3" sx={{ fontWeight: 600 }}>
                    67
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{ height: '100%', borderRadius: 5, bgcolor: '#FCE4EC' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ bgcolor: '#c2185b', width: 56, height: 56 }}>
                  <Warning fontSize="large" />
                </Avatar>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Overdue Tasks
                  </Typography>
                  <Typography variant="h3" sx={{ fontWeight: 600 }}>
                    12
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Class Performance Overview */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <Card sx={{ borderRadius: 5 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Class Performance Overview
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {classPerformance.map((cls) => (
                  <Box key={cls.class}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {cls.class}
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {cls.progress}%
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={cls.progress}
                      sx={{
                        height: 10,
                        borderRadius: 5,
                        bgcolor: '#e0e0e0',
                        '& .MuiLinearProgress-bar': {
                          bgcolor: cls.color,
                        },
                      }}
                    />
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Skill-wise Average */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <Card sx={{ borderRadius: 5, height: '100%' }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Skill-wise Average Score
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                {skillOverview.map((skill) => (
                  <Box key={skill.skill} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <TrendingUp
                        sx={{
                          fontSize: 20,
                          color: skill.trend === 'up' ? '#4caf50' : skill.trend === 'down' ? '#f44336' : '#9e9e9e',
                        }}
                      />
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {skill.skill}
                      </Typography>
                    </Box>
                    <Chip
                      label={`${skill.avgScore}%`}
                      size="small"
                      sx={{
                        bgcolor: skill.avgScore >= 80 ? '#E8F5E9' : skill.avgScore >= 70 ? '#FFF3E0' : '#FFEBEE',
                        color: skill.avgScore >= 80 ? '#2e7d32' : skill.avgScore >= 70 ? '#f57c00' : '#c62828',
                        fontWeight: 600,
                      }}
                    />
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Activity */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ borderRadius: 5 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Recent Activity
              </Typography>
              <List sx={{ p: 0 }}>
                {recentActivities.map((activity, index) => (
                  <ListItem key={index} sx={{ px: 0, py: 1.2, alignItems: 'flex-start' }}>
                    <ListItemIcon sx={{ minWidth: 32, mt: 0.5 }}>
                      <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'primary.main' }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={activity}
                      primaryTypographyProps={{ variant: 'body2', color: 'text.primary' }}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Quick Actions */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ borderRadius: 5 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Quick Actions
              </Typography>
              <Grid container spacing={2}>
                <Grid size={6}>
                  <Button fullWidth variant="outlined" size="large" color='success' startIcon={<School />}>
                    Manage Classes
                  </Button>
                </Grid>
                <Grid size={6}>
                  <Button fullWidth variant="outlined" size="large" color='success' startIcon={<AssignmentTurnedIn />}>
                    Review Submissions
                  </Button>
                </Grid>
                <Grid size={6}>
                  <Button fullWidth variant="outlined" size="large" color='success' startIcon={<CheckCircle />}>
                    Grade Assignments
                  </Button>
                </Grid>
                <Grid size={6}>
                  <Button fullWidth variant="outlined" size="large" color='success' startIcon={<Schedule />}>
                    Schedule Reminder
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </DashboardContent>
  );
}