import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Container, Box, Card, CardContent, CardActions, Typography, IconButton, Avatar, } from '@mui/material';
import Grid from '@mui/material/GridLegacy';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PeopleIcon from '@mui/icons-material/People';
import FolderIcon from '@mui/icons-material/Folder';
import CreateIcon from '@mui/icons-material/Create';
import { Link } from 'react-router-dom';
export function ClassesView() {
    const [showBanner, setShowBanner] = useState(true);
    const classData = {
        title: "6th Class(English)",
        section: "B",
        teacher: "Parvinder Singh",
        initial: "D"
    };
    return (_jsxs(Box, { sx: { minHeight: '100vh', bgcolor: '#f5f5f5' }, children: [showBanner && (_jsx(Box, { sx: {
                    bgcolor: '#e3f2fd',
                    borderBottom: '1px solid #bbdefb',
                    py: 2,
                    px: 3
                }, children: _jsx(Container, { maxWidth: "lg", children: _jsxs(Box, { sx: { display: 'flex', alignItems: 'flex-start', gap: 2, p: 5 }, children: [_jsx(Box, { sx: {
                                    width: 48,
                                    height: 48,
                                    bgcolor: '#90caf9',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    borderradius: 2,
                                    justifyContent: 'center',
                                    flexShrink: 0
                                }, children: _jsx(CreateIcon, { sx: { color: '#fff', fontSize: 24 } }) }), _jsxs(Box, { sx: { flex: 1 }, children: [_jsx(Typography, { variant: "h6", sx: { fontWeight: 500, mb: 0.5 }, children: "Participate in Research to Improve English Studio" }), _jsx(Typography, { variant: "body2", sx: { color: 'text.secondary' }, children: "Be a part of shaping the future of digital learning! By sharing your experience and insights, you help us enhance English Studio and create smarter, more effective tools for teachers, students, and institutions. Join our growing community of educators and learners to make English Studio better\u2014for your classroom, your progress, and your learning journey." })] })] }) }) })), _jsx(Container, { maxWidth: "xl", sx: { py: 4 }, children: _jsx(Grid, { container: true, spacing: 3, children: _jsx(Grid, { item: true, xs: 12, sm: 6, md: 4, lg: 3, children: _jsxs(Card, { sx: {
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                position: 'relative',
                                borderRadius: 3,
                                '&:hover': {
                                    boxShadow: 3
                                },
                                transition: 'box-shadow 0.3s'
                            }, children: [_jsxs(Box, { sx: {
                                        background: 'linear-gradient(135deg, #fb8c00 0%, #f57c00 100%)',
                                        height: 130,
                                        p: 2,
                                        color: 'white',
                                        position: 'relative',
                                    }, children: [_jsx(Link, { style: { color: 'white', textDecoration: 'none' }, to: '/classdetail', children: _jsx(Typography, { variant: "h6", sx: { fontWeight: 400, mb: 0.5 }, children: classData.title }) }), _jsx(Typography, { variant: "body2", sx: { opacity: 0.9 }, children: classData.section }), _jsx(Typography, { variant: "body2", sx: { opacity: 0.9, mt: 1 }, children: classData.teacher }), _jsx(Avatar, { sx: {
                                                position: 'absolute',
                                                bottom: -28,
                                                right: 16,
                                                width: 56,
                                                height: 56,
                                                bgcolor: '#00897b',
                                                fontSize: '1.5rem',
                                                fontWeight: 500,
                                                border: '3px solid white'
                                            }, children: classData.initial })] }), _jsx(CardContent, { sx: { flex: 1, pt: 5 } }), _jsxs(CardActions, { sx: {
                                        borderTop: '1px solid #e0e0e0',
                                        justifyContent: 'flex-end',
                                        px: 1,
                                        py: 0.5
                                    }, children: [_jsx(IconButton, { size: "small", sx: { color: 'text.secondary' }, children: _jsx(PeopleIcon, {}) }), _jsx(IconButton, { size: "small", sx: { color: 'text.secondary' }, children: _jsx(FolderIcon, {}) }), _jsx(IconButton, { size: "small", sx: { color: 'text.secondary' }, children: _jsx(MoreVertIcon, {}) })] })] }) }) }) })] }));
}
