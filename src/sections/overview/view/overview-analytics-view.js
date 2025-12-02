import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
import { School, AssignmentTurnedIn, Schedule, TrendingUp, People, Warning, CheckCircle, PendingActions, } from '@mui/icons-material';
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
    return (_jsxs(DashboardContent, { maxWidth: "xl", children: [_jsx(Box, { sx: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }, children: _jsxs(Box, { children: [_jsx(Typography, { variant: "h3", sx: { fontWeight: 600, mb: 0.5 }, children: "Welcome back, Admin!" }), _jsx(Typography, { variant: "body2", color: "text.secondary", children: "English Department \u2022 Academic Year 2024\u20132025" })] }) }), _jsxs(Grid, { container: true, spacing: 3, children: [_jsx(Grid, { size: { xs: 12, sm: 6, md: 3 }, children: _jsx(Card, { sx: { height: '100%', borderRadius: 5, bgcolor: '#E3F2FD' }, children: _jsx(CardContent, { children: _jsxs(Box, { sx: { display: 'flex', alignItems: 'center', gap: 2 }, children: [_jsx(Avatar, { sx: { bgcolor: '#1976d2', width: 56, height: 56 }, children: _jsx(People, { fontSize: "large" }) }), _jsxs(Box, { children: [_jsx(Typography, { variant: "subtitle2", color: "text.secondary", children: "Total Students" }), _jsx(Typography, { variant: "h3", sx: { fontWeight: 600 }, children: "248" })] })] }) }) }) }), _jsx(Grid, { size: { xs: 12, sm: 6, md: 3 }, children: _jsx(Card, { sx: { height: '100%', borderRadius: 5, bgcolor: '#E8F5E9' }, children: _jsx(CardContent, { children: _jsxs(Box, { sx: { display: 'flex', alignItems: 'center', gap: 2 }, children: [_jsx(Avatar, { sx: { bgcolor: '#2e7d32', width: 56, height: 56 }, children: _jsx(AssignmentTurnedIn, { fontSize: "large" }) }), _jsxs(Box, { children: [_jsx(Typography, { variant: "subtitle2", color: "text.secondary", children: "Active Assignments" }), _jsx(Typography, { variant: "h3", sx: { fontWeight: 600 }, children: "18" })] })] }) }) }) }), _jsx(Grid, { size: { xs: 12, sm: 6, md: 3 }, children: _jsx(Card, { sx: { height: '100%', borderRadius: 5, bgcolor: '#FFF3E0' }, children: _jsx(CardContent, { children: _jsxs(Box, { sx: { display: 'flex', alignItems: 'center', gap: 2 }, children: [_jsx(Avatar, { sx: { bgcolor: '#f57c00', width: 56, height: 56 }, children: _jsx(PendingActions, { fontSize: "large" }) }), _jsxs(Box, { children: [_jsx(Typography, { variant: "subtitle2", color: "text.secondary", children: "Pending Submissions" }), _jsx(Typography, { variant: "h3", sx: { fontWeight: 600 }, children: "67" })] })] }) }) }) }), _jsx(Grid, { size: { xs: 12, sm: 6, md: 3 }, children: _jsx(Card, { sx: { height: '100%', borderRadius: 5, bgcolor: '#FCE4EC' }, children: _jsx(CardContent, { children: _jsxs(Box, { sx: { display: 'flex', alignItems: 'center', gap: 2 }, children: [_jsx(Avatar, { sx: { bgcolor: '#c2185b', width: 56, height: 56 }, children: _jsx(Warning, { fontSize: "large" }) }), _jsxs(Box, { children: [_jsx(Typography, { variant: "subtitle2", color: "text.secondary", children: "Overdue Tasks" }), _jsx(Typography, { variant: "h3", sx: { fontWeight: 600 }, children: "12" })] })] }) }) }) }), _jsx(Grid, { size: { xs: 12, lg: 8 }, children: _jsx(Card, { sx: { borderRadius: 5 }, children: _jsxs(CardContent, { children: [_jsx(Typography, { variant: "h6", sx: { fontWeight: 600, mb: 3 }, children: "Class Performance Overview" }), _jsx(Box, { sx: { display: 'flex', flexDirection: 'column', gap: 3 }, children: classPerformance.map((cls) => (_jsxs(Box, { children: [_jsxs(Box, { sx: { display: 'flex', justifyContent: 'space-between', mb: 1 }, children: [_jsx(Typography, { variant: "body1", sx: { fontWeight: 500 }, children: cls.class }), _jsxs(Typography, { variant: "body2", sx: { fontWeight: 600 }, children: [cls.progress, "%"] })] }), _jsx(LinearProgress, { variant: "determinate", value: cls.progress, sx: {
                                                        height: 10,
                                                        borderRadius: 5,
                                                        bgcolor: '#e0e0e0',
                                                        '& .MuiLinearProgress-bar': {
                                                            bgcolor: cls.color,
                                                        },
                                                    } })] }, cls.class))) })] }) }) }), _jsx(Grid, { size: { xs: 12, lg: 4 }, children: _jsx(Card, { sx: { borderRadius: 5, height: '100%' }, children: _jsxs(CardContent, { children: [_jsx(Typography, { variant: "h6", sx: { fontWeight: 600, mb: 3 }, children: "Skill-wise Average Score" }), _jsx(Box, { sx: { display: 'flex', flexDirection: 'column', gap: 2.5 }, children: skillOverview.map((skill) => (_jsxs(Box, { sx: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' }, children: [_jsxs(Box, { sx: { display: 'flex', alignItems: 'center', gap: 1.5 }, children: [_jsx(TrendingUp, { sx: {
                                                                fontSize: 20,
                                                                color: skill.trend === 'up' ? '#4caf50' : skill.trend === 'down' ? '#f44336' : '#9e9e9e',
                                                            } }), _jsx(Typography, { variant: "body1", sx: { fontWeight: 500 }, children: skill.skill })] }), _jsx(Chip, { label: `${skill.avgScore}%`, size: "small", sx: {
                                                        bgcolor: skill.avgScore >= 80 ? '#E8F5E9' : skill.avgScore >= 70 ? '#FFF3E0' : '#FFEBEE',
                                                        color: skill.avgScore >= 80 ? '#2e7d32' : skill.avgScore >= 70 ? '#f57c00' : '#c62828',
                                                        fontWeight: 600,
                                                    } })] }, skill.skill))) })] }) }) }), _jsx(Grid, { size: { xs: 12, md: 6 }, children: _jsx(Card, { sx: { borderRadius: 5 }, children: _jsxs(CardContent, { children: [_jsx(Typography, { variant: "h6", sx: { fontWeight: 600, mb: 3 }, children: "Recent Activity" }), _jsx(List, { sx: { p: 0 }, children: recentActivities.map((activity, index) => (_jsxs(ListItem, { sx: { px: 0, py: 1.2, alignItems: 'flex-start' }, children: [_jsx(ListItemIcon, { sx: { minWidth: 32, mt: 0.5 }, children: _jsx(Box, { sx: { width: 8, height: 8, borderRadius: '50%', bgcolor: 'primary.main' } }) }), _jsx(ListItemText, { primary: activity, primaryTypographyProps: { variant: 'body2', color: 'text.primary' } })] }, index))) })] }) }) }), _jsx(Grid, { size: { xs: 12, md: 6 }, children: _jsx(Card, { sx: { borderRadius: 5 }, children: _jsxs(CardContent, { children: [_jsx(Typography, { variant: "h6", sx: { fontWeight: 600, mb: 3 }, children: "Quick Actions" }), _jsxs(Grid, { container: true, spacing: 2, children: [_jsx(Grid, { size: 6, children: _jsx(Button, { fullWidth: true, variant: "outlined", size: "large", color: 'success', startIcon: _jsx(School, {}), children: "Manage Classes" }) }), _jsx(Grid, { size: 6, children: _jsx(Button, { fullWidth: true, variant: "outlined", size: "large", color: 'success', startIcon: _jsx(AssignmentTurnedIn, {}), children: "Review Submissions" }) }), _jsx(Grid, { size: 6, children: _jsx(Button, { fullWidth: true, variant: "outlined", size: "large", color: 'success', startIcon: _jsx(CheckCircle, {}), children: "Grade Assignments" }) }), _jsx(Grid, { size: 6, children: _jsx(Button, { fullWidth: true, variant: "outlined", size: "large", color: 'success', startIcon: _jsx(Schedule, {}), children: "Schedule Reminder" }) })] })] }) }) })] })] }));
}
