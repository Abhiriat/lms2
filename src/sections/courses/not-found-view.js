import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import LinearProgress from '@mui/material/LinearProgress';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/GridLegacy';
// Sample course data
const coursesData = {
    running: [
        {
            id: 1,
            title: 'English Listening',
            instructor: 'Sarah Johnson',
            progress: 68,
            image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=250&fit=crop',
            duration: '8 weeks',
            completedLessons: 17,
            totalLessons: 25,
            level: 'Intermediate',
            action: 'listening'
        },
        {
            id: 2,
            title: 'English Speaking',
            instructor: 'Richard Thompson',
            progress: 45,
            image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=400&h=250&fit=crop',
            duration: '10 weeks',
            completedLessons: 12,
            totalLessons: 30,
            level: 'Upper-Intermediate',
            action: 'speaking'
        },
        {
            id: 3,
            title: 'English Writing',
            instructor: 'Emma Williams',
            progress: 33,
            image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=250&fit=crop',
            duration: '12 weeks',
            completedLessons: 10,
            totalLessons: 36,
            level: 'Advanced',
            action: 'writing'
        },
    ],
    completed: [
        {
            id: 4,
            title: 'English Grammar in Use (A1–B1)',
            instructor: 'Michael Brown',
            completedDate: 'Nov 08, 2025',
            image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=250&fit=crop',
            rating: 4.9,
            certificate: true,
        },
        {
            id: 5,
            title: 'English Pronunciation & Accent Training',
            instructor: 'Olivia Davis',
            completedDate: 'Oct 22, 2025',
            image: 'https://images.unsplash.com/photo-1513258496096-90b10c3826ed?w=400&h=250&fit=crop',
            rating: 5.0,
            certificate: true,
        },
        {
            id: 6,
            title: 'Beginner English: Speak from Day 1',
            instructor: 'Daniel Lee',
            completedDate: 'Sep 30, 2025',
            image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=250&fit=crop',
            rating: 4.7,
            certificate: true,
        },
    ],
    upcoming: [
        {
            id: 7,
            title: 'TOEFL iBT Complete Preparation',
            instructor: 'Dr. Sophia Chen',
            startDate: 'Dec 10, 2025',
            image: 'https://images.unsplash.com/photo-1588075592446-4f1e91889b70?w=400&h=250&fit=crop',
            duration: '10 weeks',
            enrolled: true,
            level: 'Advanced',
        },
        {
            id: 8,
            title: 'English for Academic Writing (EAP)',
            instructor: 'Professor James Carter',
            startDate: 'Jan 05, 2026',
            image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=250&fit=crop',
            duration: '14 weeks',
            enrolled: false,
            level: 'Advanced',
        },
        {
            id: 9,
            title: 'English Vocabulary Builder: 1000+ Words',
            instructor: 'Lucy Parker',
            startDate: 'Dec 20, 2025',
            image: 'https://images.unsplash.com/photo-1491841573634-281cebcf72c7?w=400&h=250&fit=crop',
            duration: '6 weeks',
            enrolled: true,
            level: 'Intermediate',
        },
    ],
};
function TabPanel({ children, value, index }) {
    return (_jsx("div", { role: "tabpanel", hidden: value !== index, children: value === index && _jsx(Box, { sx: { py: 3 }, children: children }) }));
}
function RunningCourseCard({ course }) {
    const navigate = useNavigate();
    const handleNavigate = (action) => {
        if (action === 'listening') {
            navigate('/lmspage');
        }
        else if (action === 'speaking') {
            navigate('/lmsspeaking');
        }
        else {
            navigate('/lmswriting');
        }
    };
    return (_jsxs(Card, { sx: {
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            transition: 'transform 0.2s, box-shadow 0.2s',
            '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 6,
            }
        }, children: [_jsx(CardMedia, { component: "img", height: "180", image: course.image, alt: course.title }), _jsxs(CardContent, { sx: { flexGrow: 1, display: 'flex', flexDirection: 'column' }, children: [_jsxs(Box, { sx: { display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 1 }, children: [_jsx(Chip, { label: "In Progress", size: "small", color: "primary", icon: _jsx(Icon, { icon: "mdi:play-circle-outline" }) }), _jsx(Typography, { variant: "caption", color: "text.secondary", children: course.duration })] }), _jsx(Typography, { gutterBottom: true, variant: "h6", component: "h2", sx: { fontWeight: 600 }, children: course.title }), _jsxs(Typography, { variant: "body2", color: "text.secondary", sx: { mb: 2 }, children: ["by ", course.instructor] }), _jsxs(Box, { sx: { mb: 1 }, children: [_jsxs(Box, { sx: { display: 'flex', justifyContent: 'space-between', mb: 0.5 }, children: [_jsx(Typography, { variant: "body2", color: "text.secondary", children: "Progress" }), _jsxs(Typography, { variant: "body2", fontWeight: "600", color: "primary", children: [course.progress, "%"] })] }), _jsx(LinearProgress, { variant: "determinate", value: course.progress, sx: { height: 8, borderRadius: 4 } })] }), _jsxs(Typography, { variant: "caption", color: "text.secondary", sx: { mb: 2 }, children: [course.completedLessons, " of ", course.totalLessons, " lessons completed"] }), _jsx(Button, { variant: "contained", fullWidth: true, sx: { mt: 'auto' }, startIcon: _jsx(Icon, { icon: "mdi:play-circle-outline" }), onClick: () => handleNavigate(course.action), children: "Continue Learning" })] })] }));
}
function CompletedCourseCard({ course }) {
    return (_jsxs(Card, { sx: {
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            transition: 'transform 0.2s, box-shadow 0.2s',
            '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 6,
            }
        }, children: [_jsx(CardMedia, { component: "img", height: "180", image: course.image, alt: course.title }), _jsxs(CardContent, { sx: { flexGrow: 1, display: 'flex', flexDirection: 'column' }, children: [_jsxs(Box, { sx: { display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 1 }, children: [_jsx(Chip, { label: "Completed", size: "small", color: "success", icon: _jsx(Icon, { icon: "mdi:check-circle" }) }), course.certificate && (_jsx(Chip, { label: "Certified", size: "small", variant: "outlined", color: "success" }))] }), _jsx(Typography, { gutterBottom: true, variant: "h6", component: "h2", sx: { fontWeight: 600 }, children: course.title }), _jsxs(Typography, { variant: "body2", color: "text.secondary", sx: { mb: 1 }, children: ["by ", course.instructor] }), _jsxs(Typography, { variant: "caption", color: "text.secondary", sx: { mb: 2 }, children: ["Completed on ", course.completedDate] }), _jsxs(Box, { sx: { display: 'flex', alignItems: 'center', mb: 2 }, children: [_jsxs(Typography, { variant: "body2", fontWeight: "600", color: "warning.main", sx: { mr: 0.5 }, children: ["\u2605 ", course.rating] }), _jsx(Typography, { variant: "caption", color: "text.secondary", children: "Your Rating" })] }), _jsxs(Box, { sx: { display: 'flex', gap: 1, mt: 'auto' }, children: [_jsx(Button, { variant: "outlined", fullWidth: true, children: "Review" }), course.certificate && (_jsx(Button, { variant: "contained", fullWidth: true, children: "Certificate" }))] })] })] }));
}
function UpcomingCourseCard({ course }) {
    return (_jsxs(Card, { sx: {
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            transition: 'transform 0.2s, box-shadow 0.2s',
            '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 6,
            }
        }, children: [_jsx(CardMedia, { component: "img", height: "180", image: course.image, alt: course.title }), _jsxs(CardContent, { sx: { flexGrow: 1, display: 'flex', flexDirection: 'column' }, children: [_jsxs(Box, { sx: { display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 1 }, children: [_jsx(Chip, { label: course.enrolled ? "Enrolled" : "Available", size: "small", color: course.enrolled ? "info" : "default", icon: _jsx(Icon, { icon: "mdi:schedule" }) }), _jsx(Typography, { variant: "caption", color: "text.secondary", children: course.duration })] }), _jsx(Typography, { gutterBottom: true, variant: "h6", component: "h2", sx: { fontWeight: 600 }, children: course.title }), _jsxs(Typography, { variant: "body2", color: "text.secondary", sx: { mb: 2 }, children: ["by ", course.instructor] }), _jsxs(Box, { sx: { display: 'flex', alignItems: 'center', mb: 2, p: 1.5, bgcolor: 'action.hover', borderRadius: 1 }, children: [_jsx(Icon, { icon: "mdi:calendar-today", style: { fontSize: 18, marginRight: 4, color: 'var(--mui-palette-primary-main)' } }), _jsxs(Box, { children: [_jsx(Typography, { variant: "caption", color: "text.secondary", display: "block", children: "Starts on" }), _jsx(Typography, { variant: "body2", fontWeight: "600", children: course.startDate })] })] }), _jsx(Button, { variant: course.enrolled ? "outlined" : "contained", fullWidth: true, sx: { mt: 'auto' }, children: course.enrolled ? "View Details" : "Enroll Now" })] })] }));
}
export function CoursesView() {
    const [tabValue, setTabValue] = useState(0);
    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };
    return (_jsxs(Container, { maxWidth: "lg", sx: { py: 0 }, children: [_jsx(Typography, { variant: "h3", component: "h1", gutterBottom: true, sx: { fontWeight: 700, mb: 1 }, children: "My Courses" }), _jsx(Typography, { variant: "body1", color: "text.secondary", sx: { mb: 4 }, children: "Track your learning progress and explore new courses" }), _jsx(Box, { sx: { borderBottom: 1, borderColor: 'divider', mb: 3 }, children: _jsxs(Tabs, { value: tabValue, onChange: handleTabChange, sx: {
                        '& .MuiTab-root': {
                            fontSize: '1rem',
                            fontWeight: 600,
                            textTransform: 'none',
                        }
                    }, children: [_jsx(Tab, { label: `Running (${coursesData.running.length})`, icon: _jsx(Icon, { icon: "mdi:play-circle-outline" }), iconPosition: "start" }), _jsx(Tab, { label: `Completed (${coursesData.completed.length})`, icon: _jsx(Icon, { icon: "mdi:check-circle" }), iconPosition: "start" }), _jsx(Tab, { label: `Upcoming (${coursesData.upcoming.length})`, icon: _jsx(Icon, { icon: "mdi:schedule" }), iconPosition: "start" })] }) }), _jsx(TabPanel, { value: tabValue, index: 0, children: _jsx(Grid, { container: true, spacing: 3, children: coursesData.running.map((course) => (_jsx(Grid, { item: true, xs: 12, sm: 6, md: 4, children: _jsx(RunningCourseCard, { course: course }) }, course.id))) }) }), _jsx(TabPanel, { value: tabValue, index: 1, children: _jsx(Grid, { container: true, spacing: 3, children: coursesData.completed.map((course) => (_jsx(Grid, { item: true, xs: 12, sm: 6, md: 4, children: _jsx(CompletedCourseCard, { course: course }) }, course.id))) }) }), _jsx(TabPanel, { value: tabValue, index: 2, children: _jsx(Grid, { container: true, spacing: 3, children: coursesData.upcoming.map((course) => (_jsx(Grid, { item: true, xs: 12, sm: 6, md: 4, children: _jsx(UpcomingCourseCard, { course: course }) }, course.id))) }) })] }));
}
