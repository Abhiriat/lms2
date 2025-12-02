import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LinearProgress from '@mui/material/LinearProgress';
import { DashboardContent } from 'src/layouts/dashboard';

// Teacher-specific data
const pendingAssignments = [
  {
    title: 'Chapter 3 - Grammar Quiz (Tenses)',
    class: 'Class 9A',
    submitted: 28,
    total: 35,
    due: '21 Nov',
    status: 'Pending Grading',
    statusColor: '#FFF4E6',
    textColor: '#FF9800'
  },
  {
    title: 'Paragraph Writing – My Village',
    class: 'Class 9B',
    submitted: 32,
    total: 34,
    due: '18 Nov',
    status: 'Graded',
    statusColor: '#E8F5E9',
    textColor: '#4CAF50'
  },
  {
    title: 'Listening Task - Flood Story',
    class: 'Class 9A',
    submitted: 15,
    total: 35,
    due: '25 Nov',
    status: 'In Progress',
    statusColor: '#E3F2FD',
    textColor: '#2196F3'
  }
];

const classPerformance = [
  {
    title: 'Class 9A - English',
    subtitle: '35 students · Avg. Score: 78%',
    progress: 78,
    trend: '+5% from last week',
    icon: '👩‍🏫',
    color: '#2196F3'
  },
  {
    title: 'Class 9B - English',
    subtitle: '34 students · Avg. Score: 82%',
    progress: 82,
    trend: '+12% from last week',
    icon: '👨‍🏫',
    color: '#4CAF50'
  },
  {
    title: 'Class 10A - English',
    subtitle: '38 students · Avg. Score: 65%',
    progress: 65,
    trend: '-3% from last week',
    icon: '📚',
    color: '#FF9800'
  },
  {
    title: 'Class 8C - English',
    subtitle: '30 students · Avg. Score: 88%',
    progress: 88,
    trend: 'Top performer!',
    icon: '⭐',
    color: '#9C27B0'
  }
];

const teacherUpdates = [
  '28 students submitted "Grammar Quiz" – start grading',
  'Class 9B achieved highest writing score this month!',
  'Reminder: Parent-Teacher Meeting scheduled for 5 Dec',
  'AI suggested 12 students need extra practice on Tenses'
];

export function OverviewAnalyticsView() {
  return (
    <DashboardContent maxWidth="xl">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h3" sx={{ fontWeight: 600, mb: 0.5 }}>
            Welcome back, Mr. R. Verma !
          </Typography>
          <Typography variant="body2" color="text.secondary">
            English Teacher • Classes 9A, 9B, 10A & 8C
          </Typography>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Summary Cards - Teacher View */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{ height: '100%', borderRadius: 5 }}>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Pending Grading
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: 600, mb: 1 }}>
                47
              </Typography>
              <Typography variant="body2" color="primary">
                28 Writing • 19 Quizzes
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{ height: '100%', borderRadius: 5 }}>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Active Assignments
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: 600, mb: 1 }}>
                8
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Across 4 classes
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{ height: '100%', borderRadius: 5 }}>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Total Students
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: 600, mb: 1 }}>
                137
              </Typography>
              <Typography variant="body2" color="success.main">
                +2 new admissions this week
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{ height: '100%', borderRadius: 5 }}>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Average Class Performance
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: 600, mb: 1 }}>
                78.2%
              </Typography>
              <Typography variant="body2" color="success.main">
                Up 7.8% this month
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Pending Submissions & Grading */}
        <Grid size={{ xs: 12, lg: 7 }}>
          <Card sx={{ borderRadius: 5 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Pending Grading & Submissions
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, mb: 2, pb: 1, borderBottom: '1px solid', borderColor: 'divider' }}>
                <Typography variant="subtitle2" sx={{ flex: 2.5, color: 'text.secondary' }}>Assignment</Typography>
                <Typography variant="subtitle2" sx={{ flex: 1, color: 'text.secondary' }}>Class</Typography>
                <Typography variant="subtitle2" sx={{ flex: 1, color: 'text.secondary' }}>Submitted</Typography>
                <Typography variant="subtitle2" sx={{ flex: 1, color: 'text.secondary' }}>Status</Typography>
              </Box>
              {pendingAssignments.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    gap: 2,
                    py: 2,
                    borderBottom: index < pendingAssignments.length - 1 ? '1px solid' : 'none',
                    borderColor: 'divider'
                  }}
                >
                  <Box sx={{ flex: 2.5 }}>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {item.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Due: {item.due}
                    </Typography>
                  </Box>
                  <Box sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body2">{item.class}</Typography>
                  </Box>
                  <Box sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body2">
                      {item.submitted}/{item.total}
                    </Typography>
                  </Box>
                  <Box sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                    <Chip
                      label={item.status}
                      size="small"
                      sx={{
                        bgcolor: item.statusColor,
                        color: item.textColor,
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

        {/* Class Performance Overview */}
        <Grid size={{ xs: 12, lg: 5 }}>
          <Card sx={{ borderRadius: 5 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Class Performance
              </Typography>
              <Grid container spacing={2}>
                {classPerformance.map((cls, index) => (
                  <Grid size={{ xs: 12, sm: 6 }} key={index}>
                    <Card variant="outlined" sx={{ height: '100%', borderRadius: 5 }}>
                      <CardContent sx={{ p: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, mb: 2 }}>
                          <Avatar sx={{ bgcolor: `${cls.color}20`, color: cls.color, width: 44, height: 44 }}>
                            {cls.icon}
                          </Avatar>
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                              {cls.title}
                            </Typography>
                            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                              {cls.subtitle}
                            </Typography>
                            <Box sx={{ mt: 1 }}>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                <Typography variant="caption">Progress</Typography>
                                <Typography variant="caption" sx={{ fontWeight: 600 }}>{cls.progress}%</Typography>
                              </Box>
                              <LinearProgress
                                variant="determinate"
                                value={cls.progress}
                                sx={{
                                  height: 6,
                                  borderRadius: 3,
                                  bgcolor: '#E0E0E0',
                                  '& .MuiLinearProgress-bar': { bgcolor: cls.color }
                                }}
                              />
                              <Typography variant="caption" color="success.main" sx={{ mt: 0.5, display: 'block' }}>
                                {cls.trend}
                              </Typography>
                            </Box>
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
          <Card sx={{ borderRadius: 5 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Monthly Grading Progress
              </Typography>
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">
                    Assignments graded this month
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    186 / 240
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={77.5}
                  sx={{
                    height: 10,
                    borderRadius: 2,
                    bgcolor: '#E3F2FD',
                    '& .MuiLinearProgress-bar': {
                      bgcolor: '#2196F3'
                    }
                  }}
                />
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
                  77.5% completed • 54 pending
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Today's Updates for Teacher */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ borderRadius: 5 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Today's Updates
              </Typography>
              <List sx={{ p: 0 }}>
                {teacherUpdates.map((update, index) => (
                  <ListItem key={index} sx={{ px: 0, py: 0.75 }}>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'primary.main' }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={update}
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