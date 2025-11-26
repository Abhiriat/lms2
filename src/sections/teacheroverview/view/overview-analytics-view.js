import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { DashboardContent } from 'src/layouts/dashboard';
import { _tasks } from 'src/_mock';
import { AnalyticsTasks } from '../analytics-tasks';
import { AnalyticsCurrentVisits } from '../analytics-current-visits';
import { AnalyticsWebsiteVisits } from '../analytics-website-visits';
import { AnalyticsWidgetSummary } from '../analytics-widget-summary';
import { AnalyticsCurrentSubject } from '../analytics-current-subject';
import { AnalyticsConversionRates } from '../analytics-conversion-rates';
// ----------------------------------------------------------------------
export function OverviewAnalyticsView() {
    return (_jsxs(DashboardContent, { maxWidth: "xl", children: [_jsx(Typography, { variant: "h4", sx: { mb: { xs: 3, md: 5 } }, children: "Hi, Welcome back Teacher \uD83D\uDC4B" }), _jsxs(Grid, { container: true, spacing: 3, children: [_jsx(Grid, { size: { xs: 12, sm: 6, md: 3 }, children: _jsx(AnalyticsWidgetSummary, { title: "Teaching Hours", percent: 4.2, total: 38, icon: _jsx("img", { alt: "Teaching hours", src: "/assets/icons/glass/ic-glass-bag.svg" }), chart: {
                                categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                                series: [6, 7, 8, 6, 5, 4, 2],
                            } }) }), _jsx(Grid, { size: { xs: 12, sm: 6, md: 3 }, children: _jsx(AnalyticsWidgetSummary, { title: "Assignment Grade", percent: 18.5, total: 342, color: "secondary", icon: _jsx("img", { alt: "Graded assignments", src: "/assets/icons/glass/ic-glass-users.svg" }), chart: {
                                categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                                series: [45, 62, 78, 55, 48, 32, 22],
                            } }) }), _jsx(Grid, { size: { xs: 12, sm: 6, md: 3 }, children: _jsx(AnalyticsWidgetSummary, { title: "Avg. Class Grade", percent: +3.1, total: 86.4, color: "warning", icon: _jsx("img", { alt: "Class average", src: "/assets/icons/glass/ic-glass-buy.svg" }), chart: {
                                categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8'],
                                series: [82, 84, 85, 83, 86, 88, 87, 86.4],
                            } }) }), _jsx(Grid, { size: { xs: 12, sm: 6, md: 3 }, children: _jsx(AnalyticsWidgetSummary, { title: "Pending Reviews", percent: -12.3, total: 18, color: "error", icon: _jsx("img", { alt: "Pending items", src: "/assets/icons/glass/ic-glass-message.svg" }), chart: {
                                categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                                series: [5, 8, 12, 10, 18, 15, 14],
                            } }) }), _jsx(Grid, { size: { xs: 12, md: 6, lg: 4 }, children: _jsx(AnalyticsCurrentVisits, { title: "Student Participation by Subject", chart: {
                                series: [
                                    { label: 'Math', value: 145 },
                                    { label: 'Science', value: 132 },
                                    { label: 'History', value: 98 },
                                    { label: 'English', value: 112 },
                                ],
                            } }) }), _jsx(Grid, { size: { xs: 12, md: 6, lg: 8 }, children: _jsx(AnalyticsWebsiteVisits, { title: "Weekly Attendance", subheader: "(+8%) compared to last week", chart: {
                                categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                                series: [
                                    { name: 'Expected', data: [30, 30, 30, 30, 30, 0, 0] },
                                    { name: 'Present', data: [28, 29, 27, 30, 28, 0, 0] },
                                ],
                            } }) }), _jsx(Grid, { size: { xs: 12, md: 6, lg: 8 }, children: _jsx(AnalyticsConversionRates, { title: "Class Average by Subject", subheader: "Spring 2025 vs Fall 2024", chart: {
                                categories: ['Math', 'Science', 'History', 'English', 'Art'],
                                series: [
                                    { name: 'Fall 2024', data: [82, 85, 88, 80, 87] },
                                    { name: 'Spring 2025', data: [86, 89, 91, 84, 90] },
                                ],
                            } }) }), _jsx(Grid, { size: { xs: 12, md: 6, lg: 4 }, children: _jsx(AnalyticsCurrentSubject, { title: "Assessment Type Performance", chart: {
                                categories: ['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math'],
                                series: [
                                    { name: 'Quizzes', data: [88, 72, 68, 75, 92, 65] },
                                    { name: 'Midterms', data: [78, 82, 70, 88, 75, 85] },
                                    { name: 'Projects', data: [90, 85, 88, 70, 80, 78] },
                                ],
                            } }) }), _jsx(Grid, { size: { xs: 12, md: 12, lg: 12 }, children: _jsx(AnalyticsTasks, { title: "Assignments Awaiting Grading", list: _tasks }) })] })] }));
}
