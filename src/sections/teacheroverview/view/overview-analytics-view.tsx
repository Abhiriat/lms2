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

export function OverviewAnalyticsView() {
  return (
    <DashboardContent maxWidth="xl">
      <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
        Hi, Welcome back Teacher 👋
      </Typography>

      <Grid container spacing={3}>
        {/* 1. Total Teaching Hours This Week */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <AnalyticsWidgetSummary
            title="Teaching Hours"
            percent={4.2}
            total={38}
            icon={<img alt="Teaching hours" src="/assets/icons/glass/ic-glass-bag.svg" />}
            chart={{
              categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
              series: [6, 7, 8, 6, 5, 4, 2],
            }}
          />
        </Grid>

        {/* 2. Assignments Graded */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <AnalyticsWidgetSummary
            title="Assignment Grade"
            percent={18.5}
            total={342}
            color="secondary"
            icon={<img alt="Graded assignments" src="/assets/icons/glass/ic-glass-users.svg" />}
            chart={{
              categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
              series: [45, 62, 78, 55, 48, 32, 22],
            }}
          />
        </Grid>

        {/* 3. Average Class Performance */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <AnalyticsWidgetSummary
            title="Avg. Class Grade"
            percent={+3.1}
            total={86.4}
            color="warning"
            icon={<img alt="Class average" src="/assets/icons/glass/ic-glass-buy.svg" />}
            chart={{
              categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8'],
              series: [82, 84, 85, 83, 86, 88, 87, 86.4],
            }}
          />
        </Grid>

        {/* 4. Pending Feedback / Notifications */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <AnalyticsWidgetSummary
            title="Pending Reviews"
            percent={-12.3}
            total={18}
            color="error"
            icon={<img alt="Pending items" src="/assets/icons/glass/ic-glass-message.svg" />}
            chart={{
              categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
              series: [5, 8, 12, 10, 18, 15, 14],
            }}
          />
        </Grid>

        {/* 5. Student Engagement by Subject (pie) */}
        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <AnalyticsCurrentVisits
            title="Student Participation by Subject"
            chart={{
              series: [
                { label: 'Math', value: 145 },
                { label: 'Science', value: 132 },
                { label: 'History', value: 98 },
                { label: 'English', value: 112 },
              ],
            }}
          />
        </Grid>

        {/* 6. Weekly Class Attendance vs Planned */}
        <Grid size={{ xs: 12, md: 6, lg: 8 }}>
          <AnalyticsWebsiteVisits
            title="Weekly Attendance"
            subheader="(+8%) compared to last week"
            chart={{
              categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
              series: [
                { name: 'Expected', data: [30, 30, 30, 30, 30, 0, 0] },
                { name: 'Present', data: [28, 29, 27, 30, 28, 0, 0] },
              ],
            }}
          />
        </Grid>

        {/* 7. Class Performance by Semester */}
        <Grid size={{ xs: 12, md: 6, lg: 8 }}>
          <AnalyticsConversionRates
            title="Class Average by Subject"
            subheader="Spring 2025 vs Fall 2024"
            chart={{
              categories: ['Math', 'Science', 'History', 'English', 'Art'],
              series: [
                { name: 'Fall 2024', data: [82, 85, 88, 80, 87] },
                { name: 'Spring 2025', data: [86, 89, 91, 84, 90] },
              ],
            }}
          />
        </Grid>

        {/* 8. Performance Breakdown (Quizzes / Exams / Projects) */}
        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <AnalyticsCurrentSubject
            title="Assessment Type Performance"
            chart={{
              categories: ['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math'],
              series: [
                { name: 'Quizzes', data: [88, 72, 68, 75, 92, 65] },
                { name: 'Midterms', data: [78, 82, 70, 88, 75, 85] },
                { name: 'Projects', data: [90, 85, 88, 70, 80, 78] },
              ],
            }}
          />
        </Grid>

        {/* Optional sections you can uncomment later */}
        {/* <Grid size={{ xs: 12, md: 6, lg: 8 }}>
          <AnalyticsNews title="School Announcements" list={_posts.slice(0, 5)} />
        </Grid> */}

        {/* <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <AnalyticsOrderTimeline title="Upcoming Events" list={_timeline} />
        </Grid> */}

        {/* <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <AnalyticsTrafficBySite title="Resource Usage" list={_traffic} />
        </Grid> */}

        {/* Full-width upcoming tasks / assignments to grade */}
        <Grid size={{ xs: 12, md: 12, lg: 12 }}>
          <AnalyticsTasks
            title="Assignments Awaiting Grading"
            list={_tasks}
          />
        </Grid>
      </Grid>
    </DashboardContent>
  );
}