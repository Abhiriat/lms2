import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { DashboardContent } from 'src/layouts/dashboard';
import { _posts, _tasks, _traffic, _timeline } from 'src/_mock';

import { AnalyticsNews } from '../analytics-news';
import { AnalyticsTasks } from '../analytics-tasks';
import { AnalyticsCurrentVisits } from '../analytics-current-visits';
import { AnalyticsOrderTimeline } from '../analytics-order-timeline';
import { AnalyticsWebsiteVisits } from '../analytics-website-visits';
import { AnalyticsWidgetSummary } from '../analytics-widget-summary';
import { AnalyticsTrafficBySite } from '../analytics-traffic-by-site';
import { AnalyticsCurrentSubject } from '../analytics-current-subject';
import { AnalyticsConversionRates } from '../analytics-conversion-rates';

// ----------------------------------------------------------------------
const classes = ['Class 10A', 'Class 10B', 'Class 11A', 'Class 11B'];
const studentRankings = [
  {
    id: '1',
    title: 'John Doe',
    coverUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&crop=face',
    description: 'Outstanding performance in Math and Science. GPA: 4.2',
    postedAt: '2025-11-18T10:30:00Z',
    studentClass: 'Class 10A',
    rank: 1,
  },
  {
    id: '2',
    title: 'Jane Smith',
    coverUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=48&h=48&fit=crop&crop=face',
    description: 'Excellent in English and History. GPA: 4.0',
    postedAt: '2025-11-18T10:30:00Z',
    studentClass: 'Class 10A',
    rank: 2,
  },
  {
    id: '3',
    title: 'Mike Johnson',
    coverUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=48&h=48&fit=crop&crop=face',
    description: 'Strong in Physics and Chemistry. GPA: 3.9',
    postedAt: '2025-11-18T10:30:00Z',
    studentClass: 'Class 10B',
    rank: 1,
  },
  {
    id: '4',
    title: 'Emily Davis',
    coverUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=48&h=48&fit=crop&crop=face',
    description: 'Top in Arts and Social Studies. GPA: 3.8',
    postedAt: '2025-11-18T10:30:00Z',
    studentClass: 'Class 10B',
    rank: 2,
  },
  {
    id: '5',
    title: 'Alex Wilson',
    coverUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=48&h=48&fit=crop&crop=face',
    description: 'Balanced performance across subjects. GPA: 3.7',
    postedAt: '2025-11-18T10:30:00Z',
    studentClass: 'Class 11A',
    rank: 1,
  },
];
export function OverviewAnalyticsView() {
  return (
    <DashboardContent maxWidth="xl">
      <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
        Hi, Welcome back Admin 👋
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <AnalyticsWidgetSummary
            title="Weekly enrollment"
            percent={2.6}
            total={714}
            icon={<img alt="Weekly enrollments" src="/assets/icons/glass/ic-glass-bag.svg" />}
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [22, 8, 35, 50, 82, 84, 77, 12],
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <AnalyticsWidgetSummary
            title="New students"
            percent={-0.1}
            total={1352}
            color="secondary"
            icon={<img alt="New students" src="/assets/icons/glass/ic-glass-users.svg" />}
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [56, 47, 40, 62, 73, 30, 23, 54],
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <AnalyticsWidgetSummary
            title="Active teachers"
            percent={2.8}
            total={172}
            color="warning"
            icon={<img alt="Active teachers" src="/assets/icons/glass/ic-glass-buy.svg" />}
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [40, 70, 50, 28, 70, 75, 7, 64],
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <AnalyticsWidgetSummary
            title="Completed Course"
            percent={3.6}
            total={234}
            color="error"
            icon={<img alt="Support tickets" src="/assets/icons/glass/ic-glass-message.svg" />}
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [56, 30, 23, 54, 47, 40, 62, 73],
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <AnalyticsCurrentVisits
            title="Active sessions"
            chart={{
              series: [
                { label: 'Students', value: 3500 },
                { label: 'Teachers', value: 2500 },
                { label: 'Admins', value: 1500 },
                { label: 'Guests', value: 500 },
              ],
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 8 }}>
          <AnalyticsWebsiteVisits
            title="Platform logins"
            subheader="(+43%) than last year"
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
              series: [
                { name: 'Students', data: [43, 33, 22, 37, 67, 68, 37, 24, 55] },
                { name: 'Teachers', data: [51, 70, 47, 67, 40, 37, 24, 70, 24] },
              ],
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 8 }}>
          <AnalyticsConversionRates
            title="Course completion rates"
            subheader="(+43%) than last year"
            chart={{
              categories: ['Math', 'Science', 'History', 'English', 'Art'],
              series: [
                { name: '2024', data: [44, 55, 41, 64, 22] },
                { name: '2025', data: [53, 32, 33, 52, 13] },
              ],
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <AnalyticsCurrentSubject
            title="Top subjects"
            chart={{
              categories: ['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math'],
              series: [
                { name: 'Enrollments', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Completions', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Ratings', data: [44, 76, 78, 13, 43, 10] },
              ],
            }}
          />
        </Grid>

       <Grid size={{ xs: 12, md: 6, lg: 6 }}>
  <AnalyticsNews 
    title="Student Rankings" 
    subheader="Top performers by class" 
    classes={classes} 
    list={studentRankings} 
  />
</Grid>

        {/* <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <AnalyticsOrderTimeline title="User onboarding timeline" list={_timeline} />
        </Grid> */}

        {/* <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <AnalyticsTrafficBySite title="Referrals by source" list={_traffic} />
        </Grid> */}

        <Grid size={{ xs: 12, md: 6, lg: 6}}>
          <AnalyticsTasks title="Admin tasks" list={_tasks} />
        </Grid>
      </Grid>
    </DashboardContent>
  );
}