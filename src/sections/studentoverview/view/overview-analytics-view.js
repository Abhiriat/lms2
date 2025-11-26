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
    return (_jsxs(DashboardContent, { maxWidth: "xl", children: [_jsx(Typography, { variant: "h4", sx: { mb: { xs: 3, md: 5 } }, children: "Hi, Welcome back Student \uD83D\uDC4B" }), _jsxs(Grid, { container: true, spacing: 3, children: [_jsx(Grid, { size: { xs: 12, sm: 6, md: 3 }, children: _jsx(AnalyticsWidgetSummary, { title: "study hours", percent: 2.6, total: 714000, icon: _jsx("img", { alt: "Weekly study hours", src: "/assets/icons/glass/ic-glass-bag.svg" }), chart: {
                                categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                                series: [4, 3, 5, 4, 2, 5, 5],
                            } }) }), _jsx(Grid, { size: { xs: 12, sm: 6, md: 3 }, children: _jsx(AnalyticsWidgetSummary, { title: "Assignments Done", percent: 12.1, total: 1352831, color: "secondary", icon: _jsx("img", { alt: "Assignments completed", src: "/assets/icons/glass/ic-glass-users.svg" }), chart: {
                                categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                                series: [3, 2, 4, 5, 3, 4, 3],
                            } }) }), _jsx(Grid, { size: { xs: 12, sm: 6, md: 3 }, children: _jsx(AnalyticsWidgetSummary, { title: "Average grade", percent: 2.8, total: 1723315, color: "warning", icon: _jsx("img", { alt: "Average grade", src: "/assets/icons/glass/ic-glass-buy.svg" }), chart: {
                                categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8'],
                                series: [85, 88, 90, 82, 89, 91, 84, 87],
                            } }) }), _jsx(Grid, { size: { xs: 12, sm: 6, md: 3 }, children: _jsx(AnalyticsWidgetSummary, { title: "Notifications", percent: 3.6, total: 234, color: "error", icon: _jsx("img", { alt: "Notifications", src: "/assets/icons/glass/ic-glass-message.svg" }), chart: {
                                categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                                series: [1, 2, 1, 3, 1, 2, 2],
                            } }) }), _jsx(Grid, { size: { xs: 12, md: 6, lg: 4 }, children: _jsx(AnalyticsCurrentVisits, { title: "Study focus by subject", chart: {
                                series: [
                                    { label: 'Math', value: 8 },
                                    { label: 'Science', value: 6 },
                                    { label: 'History', value: 5 },
                                    { label: 'English', value: 4 },
                                ],
                            } }) }), _jsx(Grid, { size: { xs: 12, md: 6, lg: 8 }, children: _jsx(AnalyticsWebsiteVisits, { title: "Daily study time", subheader: "(+15%) than last week", chart: {
                                categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue'],
                                series: [
                                    { name: 'Planned', data: [4, 3, 5, 4, 2, 5, 5, 4, 3] },
                                    { name: 'Actual', data: [3.5, 3.2, 4.8, 4.1, 2.5, 4.7, 4.9, 3.8, 3.1] },
                                ],
                            } }) }), _jsx(Grid, { size: { xs: 12, md: 6, lg: 8 }, children: _jsx(AnalyticsConversionRates, { title: "Grades by semester", subheader: "(+5%) than previous", chart: {
                                categories: ['Math', 'Science', 'History', 'English', 'Art'],
                                series: [
                                    { name: 'Fall 2024', data: [85, 88, 90, 82, 89] },
                                    { name: 'Spring 2025', data: [87, 91, 92, 85, 91] },
                                ],
                            } }) }), _jsx(Grid, { size: { xs: 12, md: 6, lg: 4 }, children: _jsx(AnalyticsCurrentSubject, { title: "Subject performance", chart: {
                                categories: ['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math'],
                                series: [
                                    { name: 'Quizzes', data: [80, 50, 30, 40, 100, 20] },
                                    { name: 'Exams', data: [20, 30, 40, 80, 20, 80] },
                                    { name: 'Projects', data: [44, 76, 78, 13, 43, 10] },
                                ],
                            } }) }), _jsx(Grid, { size: { xs: 12, md: 12, lg: 12 }, children: _jsx(AnalyticsTasks, { title: "Upcoming assignments", list: _tasks }) })] })] }));
}
