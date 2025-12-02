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

const assignments = [
  {
    title: 'Chapter 3 - Grammar Quiz (Tenses)',
    subtitle: 'Auto synced on revised',
    skill: 'Grammar MCQ',
    due: '21 Nov',
    status: 'Start',
    statusColor: '#FFF4E6',
    textColor: '#FF9800'
  },
  {
    title: 'Listening Task - Flood Story',
    subtitle: 'New redeue',
    skill: 'Listening',
    due: '25 Nov',
    status: 'Listen',
    statusColor: '#E3F2FD',
    textColor: '#2196F3'
  },
  {
    title: 'Pronunciation Practice – Modals',
    subtitle: 'New',
    skill: 'Speaking',
    due: '25 Nov',
    status: 'Now',
    statusColor: '#E3F2FD',
    textColor: '#2196F3'
  },
  {
    title: 'Paragraph Writing – My Village',
    subtitle: 'Submitted',
    skill: 'Writing',
    due: '18 Nov',
    status: 'Upload',
    statusColor: '#E8F5E9',
    textColor: '#4CAF50'
  }
];

const aiLabs = [
  {
    title: 'Listening Lab',
    subtitle: 'states announcements dialogues',
    progress: '12/20 Task completed',
    icon: '🎧',
    color: '#FF9800'
  },
  {
    title: 'Reading Lab',
    subtitle: 'Unseen passages & lessons',
    progress: 'Average score: 62%',
    icon: '📚',
    color: '#2196F3'
  },
  {
    title: 'Speaking & Pronunciation',
    subtitle: 'Record and get AI feedback',
    badge: 'Level 2 - Fluency Badge',
    badgeColor: '#2196F3',
    icon: '🗣️',
    color: '#2196F3'
  },
  {
    title: 'Writing & Handwriting',
    subtitle: 'Upload notebook p...',
    badge: 'Next Writer - Level 1',
    badgeColor: '#4CAF50',
    icon: '✍️',
    color: '#FF5722'
  }
];

const summaryItems = [
  'WhatsApp reminder set for "Paragraph Writing – In Village."',
  'New AI Listening Task added by your teacher.',
  'Speaking Lab suggests revising "modals pronunciation".'
];

export function OverviewAnalyticsView() {
  return (
    <DashboardContent maxWidth="xl">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h3" sx={{ fontWeight: 600, mb: 0.5 }}>
            Welcome, Parvinder!
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Class 9 · English Learning Dashboard
          </Typography>
        </Box>
       
      </Box>

      <Grid container spacing={3}>
        {/* Summary Cards */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{ height: '100%',borderRadius:5 }}>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                New Assignments
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: 600, mb: 1 }}>
                3
              </Typography>
              <Typography variant="body2" color="primary">
                7 from English · 1 from Science
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{ height: '100%',borderRadius:5 }}>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Due This Week
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: 600, mb: 1 }}>
                5
              </Typography>
              <Typography variant="body2" color="error.main">
                Next due:- Grammar Quiz · Tomorrow
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{ height: '100%',borderRadius:5 }}>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Overdue
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: 600, mb: 1 }}>
                1
              </Typography>
              <Typography variant="body2" color="primary">
                Due Tomorrow
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{ height: '100%',borderRadius:5 }}>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Overall Progress
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: 600, mb: 1 }}>
                78%
              </Typography>
              <Typography variant="body2" color="success.main">
                Keep it up - target 88%
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* My English Assignments */}
        <Grid size={{ xs: 12, lg: 7 }}>
          <Card sx={{borderRadius:5}}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                My English Assignments
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, mb: 2, pb: 1, borderBottom: '1px solid', borderColor: 'divider' }}>
                <Typography variant="subtitle2" sx={{ flex: 2, color: 'text.secondary' }}>Title</Typography>
                <Typography variant="subtitle2" sx={{ flex: 1, color: 'text.secondary' }}>Skill</Typography>
                <Typography variant="subtitle2" sx={{ flex: 1, color: 'text.secondary' }}>Due</Typography>
                <Typography variant="subtitle2" sx={{ flex: 1, color: 'text.secondary' }}>Status</Typography>
              </Box>
              {assignments.map((assignment, index) => (
                <Box key={index} sx={{ display: 'flex', gap: 2, py: 2, borderBottom: index < assignments.length - 1 ? '1px solid' : 'none', borderColor: 'divider' }}>
                  <Box sx={{ flex: 2 }}>
                    <Typography variant="body2" sx={{ fontWeight: 500, mb: 0.5 }}>
                      {assignment.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {assignment.subtitle}
                    </Typography>
                  </Box>
                  <Box sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body2">{assignment.skill}</Typography>
                  </Box>
                  <Box sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body2">{assignment.due}</Typography>
                  </Box>
                  <Box sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                    <Chip 
                      label={assignment.status} 
                      size="small"
                      sx={{ 
                        bgcolor: assignment.statusColor, 
                        color: assignment.textColor,
                        fontWeight: 500,
                        fontSize: '0.75rem'
                      }} 
                    />
                  </Box>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* AI Skill Labs */}
        <Grid size={{ xs: 12, lg: 5 }}>
          <Card sx={{borderRadius:5}}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                AI Skill Labs
              </Typography>
              <Grid container spacing={2}>
                {aiLabs.map((lab, index) => (
                  <Grid size={{ xs: 12, sm: 6 }} key={index}>
                    <Card variant="outlined" sx={{ height: '100%',borderRadius:5 }}>
                      <CardContent sx={{ p: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, mb: 1 }}>
                          <Avatar sx={{ bgcolor: `${lab.color}20`, color: lab.color, width: 40, height: 40 }}>
                            {lab.icon}
                          </Avatar>
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
                              {lab.title}
                            </Typography>
                            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                              {lab.subtitle}
                            </Typography>
                            {lab.progress && (
                              <Typography variant="caption" sx={{ display: 'block' }}>
                                {lab.progress}
                              </Typography>
                            )}
                            {lab.badge && (
                              <Chip 
                                label={lab.badge} 
                                size="small"
                                sx={{ 
                                  mt: 1,
                                  bgcolor: `${lab.badgeColor}20`, 
                                  color: lab.badgeColor,
                                  fontSize: '0.7rem',
                                  height: 20
                                }} 
                              />
                            )}
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Today's Summary - Progress */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{borderRadius:5}}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Today's Summary
              </Typography>
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">
                    Completion towards weekly English Engih target
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    68%
                  </Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={68} 
                  sx={{ 
                    height: 8, 
                    borderRadius: 1,
                    bgcolor: '#E0E0E0',
                    '& .MuiLinearProgress-bar': {
                      bgcolor: '#FF9800'
                    }
                  }} 
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Today's Summary - Updates */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{borderRadius:5}}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Today's Summary
              </Typography>
              <List sx={{ p: 0 }}>
                {summaryItems.map((item, index) => (
                  <ListItem key={index} sx={{ px: 0, py: 0.5 }}>
                    <ListItemIcon sx={{ minWidth: 28 }}>
                      <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: 'text.primary' }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary={item} 
                      primaryTypographyProps={{ variant: 'body2' }}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </DashboardContent>
  );
}