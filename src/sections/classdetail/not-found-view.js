import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Box, Container, Tabs, Tab, Card, CardContent, Typography, Button, IconButton, Avatar, AppBar, Divider, Dialog, DialogTitle, DialogContent, List, ListItem, ListItemAvatar, ListItemText, Accordion, AccordionSummary, AccordionDetails, Chip, Link, } from '@mui/material';
import { CalendarToday, Edit, MoreVert, Book, Assignment, Description, ExpandMore, YouTube, PictureAsPdf, Link as LinkIcon, } from '@mui/icons-material';
export function ClassDetailView() {
    const [currentTab, setCurrentTab] = useState(0);
    const [openWorkDialog, setOpenWorkDialog] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const handleOpenWorkDialog = () => setOpenWorkDialog(true);
    const handleCloseWorkDialog = () => setOpenWorkDialog(false);
    const handleTabChange = (event, newValue) => {
        setCurrentTab(newValue);
    };
    const handleAccordionChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    const classworkItems = [
        {
            id: 'exercise-1',
            title: 'Exercise',
            postedDate: 'Posted 8 Sept 2020',
            dueDate: 'Due 15 Sept 2020',
            points: 100,
            content: [
                { type: 'pdf', title: 'Chapter_5_Exercises.pdf', icon: _jsx(PictureAsPdf, {}) },
                { type: 'youtube', title: 'Grammer Lecture', url: 'https://youtube.com/watch?v=abc123', icon: _jsx(YouTube, {}) },
                { type: 'instructions', text: 'Complete all questions from page 45-52. Submit handwritten answers.' },
            ],
        },
        {
            id: 'exercise-2',
            title: 'Exercise',
            postedDate: 'Posted 24 Aug 2020',
            dueDate: 'Due 30 Aug 2020',
            points: 50,
            content: [
                { type: 'pdf', title: 'Communication.pdf', icon: _jsx(PictureAsPdf, {}) },
                { type: 'link', title: 'Conversation Practice', url: 'https://ncert.nic.in/textbook.php', icon: _jsx(LinkIcon, {}) },
                { type: 'instructions', text: 'Prepare practical file as per CBSE guidelines.' },
            ],
        },
        {
            id: 'pt-exercise',
            title: 'P T exercise',
            postedDate: 'Posted 15 Jul 2020',
            dueDate: 'No due date',
            content: [
                { type: 'youtube', title: 'Introduction Video', url: 'https://youtube.com/watch?v=pt2020', icon: _jsx(YouTube, {}) },
                { type: 'instructions', text: 'Practice daily and record a 2-minute video of your speaking performance.' },
            ],
        },
        {
            id: 'fundamental',
            title: 'Fundamental',
            postedDate: 'Posted 17 Jun 2020',
            dueDate: 'Due 25 Jun 2020',
            points: 80,
            content: [
                { type: 'pdf', title: 'English Learning.pdf', icon: _jsx(PictureAsPdf, {}) },
                { type: 'instructions', text: 'Read chapter 1 & 2. Answer the questions in your notebook.' },
            ],
        },
    ];
    const posts = [
        {
            id: 1,
            author: 'Parvinder Singh',
            title: 'Exercise',
            date: '8 Sept 2020',
        },
        {
            id: 2,
            author: 'Parvinder Singh',
            title: 'Exercise',
            date: '24 Aug 2020',
        },
        {
            id: 3,
            author: 'Parvinder Singh',
            title: 'exercise',
            date: '20 Aug 2020',
        },
    ];
    const teachers = [
        { name: 'Jagjot singh', initials: 'J', color: '#00695c' },
        { name: 'Parvinder Singh', initials: 'P', color: '#e65100' },
    ];
    const classmates = [
        { name: 'Arsh', hasImage: true, imageLetter: 'A' },
        { name: 'Jaspreet', initials: 'J', color: '#ef6c00' },
        { name: 'Aman Singh', hasImage: true, imageLetter: 'Z' },
        { name: 'Karan', hasImage: true, imageLetter: 'K' },
        { name: 'Gurleen Kaur', initials: 'G', color: '#7b1fa2' },
        { name: 'Manpreet Singh', initials: 'M', color: '#1976d2' },
        { name: 'Simranjeet Kaur', initials: 'S', color: '#c2185b' },
        { name: 'Amandeep Sharma', initials: 'A', color: '#388e3c' },
        { name: 'Ravinder Pal', initials: 'R', color: '#d32f2f' },
        { name: 'Navjot Kaur', initials: 'N', color: '#512da8' },
    ];
    // Dummy data for "View your work" dialog
    const studentWork = [
        { title: 'Exercise - Submitted', date: 'Sep 10, 2020', status: 'Turned in', icon: _jsx(Description, {}) },
        { title: 'P T exercise', date: 'Jul 18, 2020', status: 'Missing', icon: _jsx(Assignment, {}) },
        { title: 'Exercise 2', date: 'Jul 5, 2020', status: 'Turned in late', icon: _jsx(Description, {}) },
    ];
    return (_jsxs(Box, { sx: { minHeight: '100vh', bgcolor: 'white' }, children: [_jsx(AppBar, { position: "sticky", sx: { bgcolor: 'white', boxShadow: 1 }, children: _jsx(Container, { maxWidth: "lg", children: _jsxs(Box, { sx: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' }, children: [_jsxs(Tabs, { value: currentTab, onChange: handleTabChange, sx: {
                                    '& .MuiTab-root': {
                                        color: '#666',
                                        textTransform: 'none',
                                        fontSize: '16px',
                                        fontWeight: 500,
                                        minWidth: 100,
                                    },
                                    '& .Mui-selected': {
                                        color: '#1976d2',
                                    },
                                }, children: [_jsx(Tab, { label: "Stream" }), _jsx(Tab, { label: "Classwork" }), _jsx(Tab, { label: "People" })] }), _jsx(IconButton, { children: _jsx(CalendarToday, {}) })] }) }) }), currentTab === 0 && (_jsxs(Container, { maxWidth: "lg", sx: { mt: 3, pb: 4 }, children: [_jsxs(Card, { sx: {
                            background: 'linear-gradient(135deg, #ff9a76 0%, #ff8a65 100%)',
                            color: 'white',
                            borderRadius: 2,
                            mb: 3,
                            position: 'relative',
                            overflow: 'hidden',
                        }, children: [_jsxs(CardContent, { sx: { p: 4, minHeight: 200 }, children: [_jsx(Typography, { variant: "h3", component: "h1", sx: { fontWeight: 500, mb: 1 }, children: "6th Class(English)" }), _jsx(Typography, { variant: "h5", component: "h2", sx: { fontWeight: 400 }, children: "B" })] }), _jsx(Box, { sx: {
                                    position: 'absolute',
                                    right: 20,
                                    top: 20,
                                    bottom: 20,
                                    width: 300,
                                    backgroundImage: 'url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBvcGFjaXR5PSIwLjMiPjxjaXJjbGUgY3g9IjE1MCIgY3k9IjEwMCIgcj0iNjAiIGZpbGw9IiNmZmYiLz48Y2lyY2xlIGN4PSIyMDAiIGN5PSI1MCIgcj0iNDAiIGZpbGw9IiNmZmMxMDciLz48cmVjdCB4PSI1MCIgeT0iMTIwIiB3aWR0aD0iNjAiIGhlaWdodD0iNDAiIGZpbGw9IiNmZmYiLz48L2c+PC9zdmc+)',
                                    backgroundSize: 'contain',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'center',
                                } })] }), _jsxs(Box, { sx: { display: 'flex', gap: 3 }, children: [_jsx(Box, { sx: { width: 300 }, children: _jsx(Card, { sx: { borderRadius: 2 }, children: _jsxs(CardContent, { children: [_jsx(Typography, { variant: "h6", sx: { mb: 2, fontWeight: 500 }, children: "Upcoming" }), _jsx(Typography, { variant: "body2", color: "text.secondary", sx: { mb: 2 }, children: "Woohoo, no work due in soon!" }), _jsx(Button, { fullWidth: true, sx: {
                                                    textTransform: 'none',
                                                    color: '#1976d2',
                                                    justifyContent: 'flex-end',
                                                }, children: "View all" })] }) }) }), _jsxs(Box, { sx: { flex: 1 }, children: [_jsx(Button, { variant: "contained", startIcon: _jsx(Edit, {}), sx: {
                                            textTransform: 'none',
                                            bgcolor: '#e3f2fd',
                                            color: '#1976d2',
                                            boxShadow: 'none',
                                            borderRadius: 8,
                                            mb: 3,
                                            px: 3,
                                            '&:hover': {
                                                bgcolor: '#bbdefb',
                                                boxShadow: 'none',
                                            },
                                        }, children: "New announcement" }), _jsx(Box, { sx: { display: 'flex', flexDirection: 'column', gap: 2 }, children: posts.map((post) => (_jsx(Card, { sx: { borderRadius: 2 }, children: _jsxs(CardContent, { sx: {
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 2,
                                                    p: 2,
                                                    '&:last-child': { pb: 2 },
                                                }, children: [_jsx(Avatar, { sx: { bgcolor: '#ff6f00', width: 48, height: 48 }, children: _jsx(Book, {}) }), _jsxs(Box, { sx: { flex: 1 }, children: [_jsxs(Typography, { variant: "body1", sx: { fontWeight: 500 }, children: [post.author, " posted a new material: ", post.title] }), _jsx(Typography, { variant: "caption", color: "text.secondary", children: post.date })] }), _jsx(IconButton, { size: "small", children: _jsx(MoreVert, {}) })] }) }, post.id))) })] })] })] })), currentTab === 1 && (_jsxs(Container, { maxWidth: "lg", sx: { mt: 4, pb: 6 }, children: [_jsx(Box, { sx: { display: 'flex', justifyContent: 'flex-end', mb: 4 }, children: _jsx(Button, { variant: "outlined", startIcon: _jsx(Assignment, {}), onClick: handleOpenWorkDialog, sx: { textTransform: 'none', borderRadius: 3 }, children: "View your work" }) }), _jsx(Box, { sx: { maxWidth: 900, mx: 'auto' }, children: classworkItems.map((item) => (_jsxs(Accordion, { expanded: expanded === item.id, onChange: handleAccordionChange(item.id), sx: {
                                boxShadow: 1,
                                borderRadius: 2,
                                '&:before': { display: 'none' },
                                mb: 2,
                            }, children: [_jsx(AccordionSummary, { expandIcon: _jsx(ExpandMore, {}), children: _jsxs(Box, { sx: { display: 'flex', alignItems: 'center', gap: 3, width: '100%' }, children: [_jsx(Avatar, { sx: { bgcolor: '#e3f2fd', color: '#1976d2' }, children: _jsx(Book, {}) }), _jsxs(Box, { sx: { flex: 1 }, children: [_jsx(Typography, { variant: "body1", fontWeight: 500, children: item.title }), _jsx(Typography, { variant: "caption", color: "text.secondary", children: item.postedDate })] }), item.points && (_jsx(Chip, { label: `${item.points} points`, size: "small", color: "primary" })), item.dueDate !== 'No due date' && (_jsx(Chip, { label: item.dueDate, size: "small", variant: "outlined" }))] }) }), _jsx(AccordionDetails, { sx: { bgcolor: '#fafafa', pt: 2 }, children: _jsxs(Box, { sx: { pl: 7 }, children: [item.content.map((content, idx) => (_jsx(Box, { sx: { mb: 3 }, children: content.type === 'instructions' ? (_jsx(Typography, { variant: "body1", sx: { mb: 2, lineHeight: 1.6 }, children: content.text })) : (_jsxs(ListItem, { sx: {
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: 2,
                                                        p: 2,
                                                        borderRadius: 2,
                                                        bgcolor: 'white',
                                                        boxShadow: 1,
                                                        '&:hover': { bgcolor: '#f0f7ff' },
                                                    }, children: [content.icon, _jsx(Link, { href: content.url || '#', target: "_blank", underline: "hover", color: "primary", sx: { fontWeight: 500 }, children: content.title })] })) }, idx))), _jsxs(Box, { sx: { mt: 3, display: 'flex', gap: 2 }, children: [_jsx(Button, { variant: "outlined", startIcon: _jsx(Assignment, {}), children: "View assignment" }), _jsx(Button, { variant: "contained", color: "primary", children: "Add class comment..." })] })] }) })] }, item.id))) })] })), currentTab === 2 && (_jsxs(Box, { sx: { maxWidth: 800, mx: 'auto', py: 5 }, children: [_jsx(Typography, { variant: "h5", sx: { mb: 3, fontWeight: 600, color: '#202124' }, children: "Teachers" }), _jsx(Box, { sx: { mb: 6 }, children: teachers.map((teacher) => (_jsxs(Box, { children: [_jsxs(ListItem, { sx: { px: 0, py: 2 }, children: [_jsx(ListItemAvatar, { children: _jsx(Avatar, { sx: { bgcolor: teacher.color, color: 'white', fontWeight: 600 }, children: teacher.initials }) }), _jsx(ListItemText, { primary: teacher.name, primaryTypographyProps: { fontSize: '1.1rem', fontWeight: 500 } })] }), _jsx(Divider, {})] }, teacher.name))) }), _jsxs(Box, { sx: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }, children: [_jsx(Typography, { variant: "h5", sx: { fontWeight: 600, color: '#202124' }, children: "Classmates" }), _jsxs(Typography, { variant: "body1", color: "text.secondary", children: [classmates.length, " students"] })] }), _jsx(Box, { children: classmates.map((student) => (_jsxs(Box, { children: [_jsxs(ListItem, { sx: { px: 0, py: 2 }, children: [_jsx(ListItemAvatar, { children: _jsx(Avatar, { sx: { bgcolor: student.color || '#5f6368', color: 'white' }, children: student.initials || student.name[0] }) }), _jsx(ListItemText, { primary: student.name, primaryTypographyProps: { fontSize: '1.1rem', fontWeight: 500 } })] }), _jsx(Divider, {})] }, student.name))) })] })), _jsxs(Dialog, { open: openWorkDialog, onClose: handleCloseWorkDialog, maxWidth: "sm", fullWidth: true, children: [_jsx(DialogTitle, { sx: { fontWeight: 600 }, children: "Your work" }), _jsx(DialogContent, { dividers: true, children: _jsx(List, { children: studentWork.map((work, index) => (_jsxs(ListItem, { sx: { borderRadius: 2, '&:hover': { bgcolor: '#f5f5f5' } }, children: [_jsx(ListItemAvatar, { children: _jsx(Avatar, { sx: { bgcolor: '#e3f2fd', color: '#1976d2' }, children: work.icon }) }), _jsx(ListItemText, { primary: work.title, secondary: work.date }), _jsx(Typography, { variant: "body2", sx: {
                                            color: work.status === 'Missing' ? 'error.main' : 'success.main',
                                            fontWeight: 500,
                                        }, children: work.status })] }, index))) }) })] })] }));
}
