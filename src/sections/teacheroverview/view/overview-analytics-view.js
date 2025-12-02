import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
    return (_jsxs(DashboardContent, { maxWidth: "xl", children: [_jsx(Box, { sx: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }, children: _jsxs(Box, { children: [_jsx(Typography, { variant: "h3", sx: { fontWeight: 600, mb: 0.5 }, children: "Welcome back, Mr. R. Verma !" }), _jsx(Typography, { variant: "body2", color: "text.secondary", children: "English Teacher \u2022 Classes 9A, 9B, 10A & 8C" })] }) }), _jsxs(Grid, { container: true, spacing: 3, children: [_jsx(Grid, { size: { xs: 12, sm: 6, md: 3 }, children: _jsx(Card, { sx: { height: '100%', borderRadius: 5 }, children: _jsxs(CardContent, { children: [_jsx(Typography, { variant: "subtitle2", color: "text.secondary", gutterBottom: true, children: "Pending Grading" }), _jsx(Typography, { variant: "h3", sx: { fontWeight: 600, mb: 1 }, children: "47" }), _jsx(Typography, { variant: "body2", color: "primary", children: "28 Writing \u2022 19 Quizzes" })] }) }) }), _jsx(Grid, { size: { xs: 12, sm: 6, md: 3 }, children: _jsx(Card, { sx: { height: '100%', borderRadius: 5 }, children: _jsxs(CardContent, { children: [_jsx(Typography, { variant: "subtitle2", color: "text.secondary", gutterBottom: true, children: "Active Assignments" }), _jsx(Typography, { variant: "h3", sx: { fontWeight: 600, mb: 1 }, children: "8" }), _jsx(Typography, { variant: "body2", color: "text.secondary", children: "Across 4 classes" })] }) }) }), _jsx(Grid, { size: { xs: 12, sm: 6, md: 3 }, children: _jsx(Card, { sx: { height: '100%', borderRadius: 5 }, children: _jsxs(CardContent, { children: [_jsx(Typography, { variant: "subtitle2", color: "text.secondary", gutterBottom: true, children: "Total Students" }), _jsx(Typography, { variant: "h3", sx: { fontWeight: 600, mb: 1 }, children: "137" }), _jsx(Typography, { variant: "body2", color: "success.main", children: "+2 new admissions this week" })] }) }) }), _jsx(Grid, { size: { xs: 12, sm: 6, md: 3 }, children: _jsx(Card, { sx: { height: '100%', borderRadius: 5 }, children: _jsxs(CardContent, { children: [_jsx(Typography, { variant: "subtitle2", color: "text.secondary", gutterBottom: true, children: "Average Class Performance" }), _jsx(Typography, { variant: "h3", sx: { fontWeight: 600, mb: 1 }, children: "78.2%" }), _jsx(Typography, { variant: "body2", color: "success.main", children: "Up 7.8% this month" })] }) }) }), _jsx(Grid, { size: { xs: 12, lg: 7 }, children: _jsx(Card, { sx: { borderRadius: 5 }, children: _jsxs(CardContent, { children: [_jsx(Typography, { variant: "h6", sx: { fontWeight: 600, mb: 3 }, children: "Pending Grading & Submissions" }), _jsxs(Box, { sx: { display: 'flex', gap: 2, mb: 2, pb: 1, borderBottom: '1px solid', borderColor: 'divider' }, children: [_jsx(Typography, { variant: "subtitle2", sx: { flex: 2.5, color: 'text.secondary' }, children: "Assignment" }), _jsx(Typography, { variant: "subtitle2", sx: { flex: 1, color: 'text.secondary' }, children: "Class" }), _jsx(Typography, { variant: "subtitle2", sx: { flex: 1, color: 'text.secondary' }, children: "Submitted" }), _jsx(Typography, { variant: "subtitle2", sx: { flex: 1, color: 'text.secondary' }, children: "Status" })] }), pendingAssignments.map((item, index) => (_jsxs(Box, { sx: {
                                            display: 'flex',
                                            gap: 2,
                                            py: 2,
                                            borderBottom: index < pendingAssignments.length - 1 ? '1px solid' : 'none',
                                            borderColor: 'divider'
                                        }, children: [_jsxs(Box, { sx: { flex: 2.5 }, children: [_jsx(Typography, { variant: "body2", sx: { fontWeight: 500 }, children: item.title }), _jsxs(Typography, { variant: "caption", color: "text.secondary", children: ["Due: ", item.due] })] }), _jsx(Box, { sx: { flex: 1, display: 'flex', alignItems: 'center' }, children: _jsx(Typography, { variant: "body2", children: item.class }) }), _jsx(Box, { sx: { flex: 1, display: 'flex', alignItems: 'center' }, children: _jsxs(Typography, { variant: "body2", children: [item.submitted, "/", item.total] }) }), _jsx(Box, { sx: { flex: 1, display: 'flex', alignItems: 'center' }, children: _jsx(Chip, { label: item.status, size: "small", sx: {
                                                        bgcolor: item.statusColor,
                                                        color: item.textColor,
                                                        fontWeight: 500,
                                                        fontSize: '0.75rem'
                                                    } }) })] }, index)))] }) }) }), _jsx(Grid, { size: { xs: 12, lg: 5 }, children: _jsx(Card, { sx: { borderRadius: 5 }, children: _jsxs(CardContent, { children: [_jsx(Typography, { variant: "h6", sx: { fontWeight: 600, mb: 3 }, children: "Class Performance" }), _jsx(Grid, { container: true, spacing: 2, children: classPerformance.map((cls, index) => (_jsx(Grid, { size: { xs: 12, sm: 6 }, children: _jsx(Card, { variant: "outlined", sx: { height: '100%', borderRadius: 5 }, children: _jsx(CardContent, { sx: { p: 2 }, children: _jsxs(Box, { sx: { display: 'flex', alignItems: 'flex-start', gap: 1.5, mb: 2 }, children: [_jsx(Avatar, { sx: { bgcolor: `${cls.color}20`, color: cls.color, width: 44, height: 44 }, children: cls.icon }), _jsxs(Box, { sx: { flex: 1 }, children: [_jsx(Typography, { variant: "subtitle2", sx: { fontWeight: 600 }, children: cls.title }), _jsx(Typography, { variant: "caption", color: "text.secondary", sx: { display: 'block', mb: 1 }, children: cls.subtitle }), _jsxs(Box, { sx: { mt: 1 }, children: [_jsxs(Box, { sx: { display: 'flex', justifyContent: 'space-between', mb: 0.5 }, children: [_jsx(Typography, { variant: "caption", children: "Progress" }), _jsxs(Typography, { variant: "caption", sx: { fontWeight: 600 }, children: [cls.progress, "%"] })] }), _jsx(LinearProgress, { variant: "determinate", value: cls.progress, sx: {
                                                                                    height: 6,
                                                                                    borderRadius: 3,
                                                                                    bgcolor: '#E0E0E0',
                                                                                    '& .MuiLinearProgress-bar': { bgcolor: cls.color }
                                                                                } }), _jsx(Typography, { variant: "caption", color: "success.main", sx: { mt: 0.5, display: 'block' }, children: cls.trend })] })] })] }) }) }) }, index))) })] }) }) }), _jsx(Grid, { size: { xs: 12, md: 6 }, children: _jsx(Card, { sx: { borderRadius: 5 }, children: _jsxs(CardContent, { children: [_jsx(Typography, { variant: "h6", sx: { fontWeight: 600, mb: 3 }, children: "Monthly Grading Progress" }), _jsxs(Box, { children: [_jsxs(Box, { sx: { display: 'flex', justifyContent: 'space-between', mb: 1 }, children: [_jsx(Typography, { variant: "body2", children: "Assignments graded this month" }), _jsx(Typography, { variant: "body2", sx: { fontWeight: 600 }, children: "186 / 240" })] }), _jsx(LinearProgress, { variant: "determinate", value: 77.5, sx: {
                                                    height: 10,
                                                    borderRadius: 2,
                                                    bgcolor: '#E3F2FD',
                                                    '& .MuiLinearProgress-bar': {
                                                        bgcolor: '#2196F3'
                                                    }
                                                } }), _jsx(Typography, { variant: "caption", color: "text.secondary", sx: { mt: 1 }, children: "77.5% completed \u2022 54 pending" })] })] }) }) }), _jsx(Grid, { size: { xs: 12, md: 6 }, children: _jsx(Card, { sx: { borderRadius: 5 }, children: _jsxs(CardContent, { children: [_jsx(Typography, { variant: "h6", sx: { fontWeight: 600, mb: 3 }, children: "Today's Updates" }), _jsx(List, { sx: { p: 0 }, children: teacherUpdates.map((update, index) => (_jsxs(ListItem, { sx: { px: 0, py: 0.75 }, children: [_jsx(ListItemIcon, { sx: { minWidth: 32 }, children: _jsx(Box, { sx: { width: 8, height: 8, borderRadius: '50%', bgcolor: 'primary.main' } }) }), _jsx(ListItemText, { primary: update, primaryTypographyProps: { variant: 'body2' } })] }, index))) })] }) }) })] })] }));
}
