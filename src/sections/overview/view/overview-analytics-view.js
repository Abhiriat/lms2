import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
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
    return (_jsxs(DashboardContent, { maxWidth: "xl", children: [_jsx(Box, { sx: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }, children: _jsxs(Box, { children: [_jsx(Typography, { variant: "h3", sx: { fontWeight: 600, mb: 0.5 }, children: "Welcome, Parvinder!" }), _jsx(Typography, { variant: "body2", color: "text.secondary", children: "Class 9 \u00B7 English Learning Dashboard" })] }) }), _jsxs(Grid, { container: true, spacing: 3, children: [_jsx(Grid, { size: { xs: 12, sm: 6, md: 3 }, children: _jsx(Card, { sx: { height: '100%', borderRadius: 5 }, children: _jsxs(CardContent, { children: [_jsx(Typography, { variant: "subtitle2", color: "text.secondary", gutterBottom: true, children: "New Assignments" }), _jsx(Typography, { variant: "h3", sx: { fontWeight: 600, mb: 1 }, children: "3" }), _jsx(Typography, { variant: "body2", color: "primary", children: "7 from English \u00B7 1 from Science" })] }) }) }), _jsx(Grid, { size: { xs: 12, sm: 6, md: 3 }, children: _jsx(Card, { sx: { height: '100%', borderRadius: 5 }, children: _jsxs(CardContent, { children: [_jsx(Typography, { variant: "subtitle2", color: "text.secondary", gutterBottom: true, children: "Due This Week" }), _jsx(Typography, { variant: "h3", sx: { fontWeight: 600, mb: 1 }, children: "5" }), _jsx(Typography, { variant: "body2", color: "error.main", children: "Next due:- Grammar Quiz \u00B7 Tomorrow" })] }) }) }), _jsx(Grid, { size: { xs: 12, sm: 6, md: 3 }, children: _jsx(Card, { sx: { height: '100%', borderRadius: 5 }, children: _jsxs(CardContent, { children: [_jsx(Typography, { variant: "subtitle2", color: "text.secondary", gutterBottom: true, children: "Overdue" }), _jsx(Typography, { variant: "h3", sx: { fontWeight: 600, mb: 1 }, children: "1" }), _jsx(Typography, { variant: "body2", color: "primary", children: "Due Tomorrow" })] }) }) }), _jsx(Grid, { size: { xs: 12, sm: 6, md: 3 }, children: _jsx(Card, { sx: { height: '100%', borderRadius: 5 }, children: _jsxs(CardContent, { children: [_jsx(Typography, { variant: "subtitle2", color: "text.secondary", gutterBottom: true, children: "Overall Progress" }), _jsx(Typography, { variant: "h3", sx: { fontWeight: 600, mb: 1 }, children: "78%" }), _jsx(Typography, { variant: "body2", color: "success.main", children: "Keep it up - target 88%" })] }) }) }), _jsx(Grid, { size: { xs: 12, lg: 7 }, children: _jsx(Card, { sx: { borderRadius: 5 }, children: _jsxs(CardContent, { children: [_jsx(Typography, { variant: "h6", sx: { fontWeight: 600, mb: 3 }, children: "My English Assignments" }), _jsxs(Box, { sx: { display: 'flex', gap: 2, mb: 2, pb: 1, borderBottom: '1px solid', borderColor: 'divider' }, children: [_jsx(Typography, { variant: "subtitle2", sx: { flex: 2, color: 'text.secondary' }, children: "Title" }), _jsx(Typography, { variant: "subtitle2", sx: { flex: 1, color: 'text.secondary' }, children: "Skill" }), _jsx(Typography, { variant: "subtitle2", sx: { flex: 1, color: 'text.secondary' }, children: "Due" }), _jsx(Typography, { variant: "subtitle2", sx: { flex: 1, color: 'text.secondary' }, children: "Status" })] }), assignments.map((assignment, index) => (_jsxs(Box, { sx: { display: 'flex', gap: 2, py: 2, borderBottom: index < assignments.length - 1 ? '1px solid' : 'none', borderColor: 'divider' }, children: [_jsxs(Box, { sx: { flex: 2 }, children: [_jsx(Typography, { variant: "body2", sx: { fontWeight: 500, mb: 0.5 }, children: assignment.title }), _jsx(Typography, { variant: "caption", color: "text.secondary", children: assignment.subtitle })] }), _jsx(Box, { sx: { flex: 1, display: 'flex', alignItems: 'center' }, children: _jsx(Typography, { variant: "body2", children: assignment.skill }) }), _jsx(Box, { sx: { flex: 1, display: 'flex', alignItems: 'center' }, children: _jsx(Typography, { variant: "body2", children: assignment.due }) }), _jsx(Box, { sx: { flex: 1, display: 'flex', alignItems: 'center' }, children: _jsx(Chip, { label: assignment.status, size: "small", sx: {
                                                        bgcolor: assignment.statusColor,
                                                        color: assignment.textColor,
                                                        fontWeight: 500,
                                                        fontSize: '0.75rem'
                                                    } }) })] }, index)))] }) }) }), _jsx(Grid, { size: { xs: 12, lg: 5 }, children: _jsx(Card, { sx: { borderRadius: 5 }, children: _jsxs(CardContent, { children: [_jsx(Typography, { variant: "h6", sx: { fontWeight: 600, mb: 3 }, children: "AI Skill Labs" }), _jsx(Grid, { container: true, spacing: 2, children: aiLabs.map((lab, index) => (_jsx(Grid, { size: { xs: 12, sm: 6 }, children: _jsx(Card, { variant: "outlined", sx: { height: '100%', borderRadius: 5 }, children: _jsx(CardContent, { sx: { p: 2 }, children: _jsxs(Box, { sx: { display: 'flex', alignItems: 'flex-start', gap: 1.5, mb: 1 }, children: [_jsx(Avatar, { sx: { bgcolor: `${lab.color}20`, color: lab.color, width: 40, height: 40 }, children: lab.icon }), _jsxs(Box, { sx: { flex: 1 }, children: [_jsx(Typography, { variant: "subtitle2", sx: { fontWeight: 600, mb: 0.5 }, children: lab.title }), _jsx(Typography, { variant: "caption", color: "text.secondary", sx: { display: 'block', mb: 1 }, children: lab.subtitle }), lab.progress && (_jsx(Typography, { variant: "caption", sx: { display: 'block' }, children: lab.progress })), lab.badge && (_jsx(Chip, { label: lab.badge, size: "small", sx: {
                                                                            mt: 1,
                                                                            bgcolor: `${lab.badgeColor}20`,
                                                                            color: lab.badgeColor,
                                                                            fontSize: '0.7rem',
                                                                            height: 20
                                                                        } }))] })] }) }) }) }, index))) })] }) }) }), _jsx(Grid, { size: { xs: 12, md: 6 }, children: _jsx(Card, { sx: { borderRadius: 5 }, children: _jsxs(CardContent, { children: [_jsx(Typography, { variant: "h6", sx: { fontWeight: 600, mb: 3 }, children: "Today's Summary" }), _jsxs(Box, { children: [_jsxs(Box, { sx: { display: 'flex', justifyContent: 'space-between', mb: 1 }, children: [_jsx(Typography, { variant: "body2", children: "Completion towards weekly English Engih target" }), _jsx(Typography, { variant: "body2", sx: { fontWeight: 600 }, children: "68%" })] }), _jsx(LinearProgress, { variant: "determinate", value: 68, sx: {
                                                    height: 8,
                                                    borderRadius: 1,
                                                    bgcolor: '#E0E0E0',
                                                    '& .MuiLinearProgress-bar': {
                                                        bgcolor: '#FF9800'
                                                    }
                                                } })] })] }) }) }), _jsx(Grid, { size: { xs: 12, md: 6 }, children: _jsx(Card, { sx: { borderRadius: 5 }, children: _jsxs(CardContent, { children: [_jsx(Typography, { variant: "h6", sx: { fontWeight: 600, mb: 3 }, children: "Today's Summary" }), _jsx(List, { sx: { p: 0 }, children: summaryItems.map((item, index) => (_jsxs(ListItem, { sx: { px: 0, py: 0.5 }, children: [_jsx(ListItemIcon, { sx: { minWidth: 28 }, children: _jsx(Box, { sx: { width: 6, height: 6, borderRadius: '50%', bgcolor: 'text.primary' } }) }), _jsx(ListItemText, { primary: item, primaryTypographyProps: { variant: 'body2' } })] }, index))) })] }) }) })] })] }));
}
