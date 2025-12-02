import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useMemo } from 'react';
import { Container, Paper, Typography, Box, Avatar, Chip, Divider, Accordion, AccordionSummary, AccordionDetails, Card, CardContent, List, ListItem, ListItemAvatar, ListItemText, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, LinearProgress, } from '@mui/material';
import { Icon } from '@iconify/react';
import Grid from '@mui/material/GridLegacy';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
export function TeacherDetailView() {
    const initialInstructors = [
        {
            id: 1,
            name: 'Dr. Harjit Singh',
            email: 'harjit.singh@university.com',
            phone: '+91-98765-0101',
            department: 'English Department',
            studentCount: 120,
            classes: [
                {
                    name: 'Foundation English (Level 1–3)',
                    students: 45,
                    enrolledStudents: [
                        { id: 101, name: 'Aarav Sharma', grade: 'A' },
                        { id: 102, name: 'Diya Patel', grade: 'B+' },
                        { id: 103, name: 'Vihaan Kumar', grade: 'A-' },
                        { id: 104, name: 'Ananya Singh', grade: 'A' },
                        { id: 105, name: 'Rohan Verma', grade: 'B' },
                    ],
                    assignments: [
                        { id: 1, title: 'Basic Grammar Quiz – Tenses', dueDate: '2025-12-05', total: 45, submitted: 38, pending: 5, overdue: 2 },
                        { id: 2, title: 'Reading Comprehension – Level 1', dueDate: '2025-12-08', total: 45, submitted: 30, pending: 10, overdue: 5 },
                        { id: 3, title: 'Introduce Yourself (Speaking)', dueDate: '2025-12-10', total: 45, submitted: 42, pending: 3, overdue: 0 },
                    ],
                },
                {
                    name: 'Grammar Mastery (Beginner to Advanced)',
                    students: 38,
                    enrolledStudents: [
                        { id: 201, name: 'Ishaan Gupta', grade: 'A+' },
                        { id: 202, name: 'Saanvi Reddy', grade: 'A' },
                        { id: 203, name: 'Arjun Mehta', grade: 'B+' },
                        { id: 204, name: 'Myra Joshi', grade: 'A-' },
                    ],
                    assignments: [
                        { id: 4, title: 'Advanced Tenses Worksheet', dueDate: '2025-12-03', total: 38, submitted: 35, pending: 2, overdue: 1 },
                        { id: 5, title: 'Error Correction Exercise', dueDate: '2025-12-07', total: 38, submitted: 28, pending: 8, overdue: 2 },
                    ],
                },
                {
                    name: 'Vocabulary Booster – 1000+ Words',
                    students: 37,
                    enrolledStudents: [
                        { id: 301, name: 'Kabir Malhotra', grade: 'A' },
                        { id: 302, name: 'Zara Khan', grade: 'B+' },
                        { id: 303, name: 'Ayaan Kapoor', grade: 'A-' },
                    ],
                    assignments: [
                        { id: 6, title: 'Week 1: 100 Essential Words Quiz', dueDate: '2025-12-04', total: 37, submitted: 37, pending: 0, overdue: 0 },
                        { id: 7, title: 'Synonyms & Antonyms Test', dueDate: '2025-12-09', total: 37, submitted: 22, pending: 15, overdue: 0 },
                    ],
                },
            ],
        },
        // ... other teachers can have assignments too
        {
            id: 2,
            name: 'Prof. Jaspreet Kaur',
            email: 'jaspreet.kaur@university.com',
            phone: '+91-98765-0102',
            department: 'English Department',
            studentCount: 85,
            classes: [
                {
                    name: 'Reading Skills & Comprehension Mastery',
                    students: 30,
                    enrolledStudents: [
                        { id: 401, name: 'Riya Thakur', grade: 'A' },
                        { id: 402, name: 'Advik Yadav', grade: 'A-' },
                        { id: 403, name: 'Kiara Bhatia', grade: 'B+' },
                    ],
                    assignments: [
                        { id: 8, title: 'Unseen Passage – Level A', dueDate: '2025-12-06', total: 30, submitted: 28, pending: 2, overdue: 0 },
                        { id: 9, title: 'Comprehension + Summary Writing', dueDate: '2025-12-11', total: 30, submitted: 15, pending: 12, overdue: 3 },
                    ],
                },
                {
                    name: 'Creative Writing: Paragraph, Story, Letter, Notice',
                    students: 28,
                    enrolledStudents: [
                        { id: 501, name: 'Reyansh Rao', grade: 'A+' },
                        { id: 502, name: 'Aadhya Nair', grade: 'A' },
                    ],
                    assignments: [
                        { id: 10, title: 'Write a Story: "The Lost Key"', dueDate: '2025-12-02', total: 28, submitted: 26, pending: 1, overdue: 1 },
                        { id: 11, title: 'Formal Letter to Principal', dueDate: '2025-12-12', total: 28, submitted: 10, pending: 18, overdue: 0 },
                    ],
                },
            ],
        },
    ];
    const { id } = useParams();
    const teacherId = id ? Number(id) : 1;
    const teacher = useMemo(() => {
        return initialInstructors.find((t) => t.id === teacherId);
    }, [teacherId]);
    const [expanded, setExpanded] = useState(false);
    const handleAccordionChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    if (!teacher) {
        return (_jsx(Container, { maxWidth: "lg", sx: { mt: 4 }, children: _jsx(Typography, { variant: "h5", children: "Teacher not found" }) }));
    }
    const getInitials = (name) => {
        return name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase();
    };
    return (_jsxs(Container, { maxWidth: "lg", sx: { py: 4 }, children: [_jsx(Paper, { elevation: 3, sx: { p: 4, mb: 3, borderRadius: 3 }, children: _jsxs(Box, { sx: { display: 'flex', alignItems: 'flex-start', gap: 3 }, children: [_jsx(Avatar, { sx: {
                                width: 110,
                                height: 110,
                                bgcolor: 'warning.main',
                                fontSize: '2.2rem',
                                fontWeight: 'bold',
                            }, children: getInitials(teacher.name) }), _jsxs(Box, { sx: { flex: 1 }, children: [_jsx(Typography, { variant: "h4", gutterBottom: true, fontWeight: "600", children: teacher.name }), _jsx(Chip, { label: teacher.department, color: "warning", size: "medium", sx: { mb: 2, fontWeight: 600 } }), _jsxs(Grid, { container: true, spacing: 3, sx: { mt: 1 }, children: [_jsx(Grid, { item: true, xs: 12, sm: 6, md: 4, children: _jsxs(Box, { sx: { display: 'flex', alignItems: 'center', gap: 1.5 }, children: [_jsx(Icon, { icon: "mdi:email", width: "22" }), _jsx(Typography, { variant: "body1", children: teacher.email })] }) }), _jsx(Grid, { item: true, xs: 12, sm: 6, md: 4, children: _jsxs(Box, { sx: { display: 'flex', alignItems: 'center', gap: 1.5 }, children: [_jsx(Icon, { icon: "mdi:phone", width: "22" }), _jsx(Typography, { variant: "body1", children: teacher.phone })] }) }), _jsx(Grid, { item: true, xs: 12, sm: 6, md: 4, children: _jsxs(Box, { sx: { display: 'flex', alignItems: 'center', gap: 1.5 }, children: [_jsx(Icon, { icon: "mdi:account-group", width: "22" }), _jsxs(Typography, { variant: "body1", fontWeight: "600", children: [teacher.studentCount, " Total Students"] })] }) })] })] })] }) }), _jsxs(Grid, { container: true, spacing: 3, sx: { mb: 4 }, children: [_jsx(Grid, { item: true, xs: 12, sm: 4, children: _jsx(Card, { sx: { textAlign: 'center', borderRadius: 3 }, children: _jsxs(CardContent, { children: [_jsx(Icon, { icon: "mdi:book-open-page-variant", width: "48", color: "#1976d2" }), _jsx(Typography, { variant: "h3", sx: { mt: 2, fontWeight: 'bold' }, children: teacher.classes.length }), _jsx(Typography, { variant: "body1", color: "text.secondary", children: "Total Classes" })] }) }) }), _jsx(Grid, { item: true, xs: 12, sm: 4, children: _jsx(Card, { sx: { textAlign: 'center', borderRadius: 3 }, children: _jsxs(CardContent, { children: [_jsx(Icon, { icon: "mdi:account-group", width: "48", color: "#2e7d32" }), _jsx(Typography, { variant: "h3", sx: { mt: 2, fontWeight: 'bold' }, children: teacher.studentCount }), _jsx(Typography, { variant: "body1", color: "text.secondary", children: "Total Students" })] }) }) }), _jsx(Grid, { item: true, xs: 12, sm: 4, children: _jsx(Card, { sx: { textAlign: 'center', borderRadius: 3 }, children: _jsxs(CardContent, { children: [_jsx(Icon, { icon: "mdi:chart-line", width: "48", color: "#ed6c02" }), _jsx(Typography, { variant: "h3", sx: { mt: 2, fontWeight: 'bold' }, children: Math.round(teacher.studentCount / teacher.classes.length) }), _jsx(Typography, { variant: "body1", color: "text.secondary", children: "Avg. Students/Class" })] }) }) })] }), _jsxs(Paper, { elevation: 3, sx: { p: 4, borderRadius: 3 }, children: [_jsxs(Box, { sx: { display: 'flex', alignItems: 'center', gap: 2, mb: 3 }, children: [_jsx(Icon, { icon: "mdi:book-education", width: "32", color: "#173345" }), _jsx(Typography, { variant: "h5", fontWeight: "600", children: "Classes & Assignments" })] }), _jsx(Divider, { sx: { mb: 3 } }), teacher.classes.map((classItem, index) => {
                        const totalAssignments = classItem.assignments?.length || 0;
                        const totalSubmissions = classItem.assignments?.reduce((acc, a) => acc + a.submitted, 0) || 0;
                        const totalStudents = classItem.students;
                        const avgCompletion = totalAssignments > 0 ? Math.round((totalSubmissions / (totalAssignments * totalStudents)) * 100) : 0;
                        return (_jsxs(Accordion, { expanded: expanded === `panel${index}`, onChange: handleAccordionChange(`panel${index}`), sx: { mb: 2, borderRadius: 2, '&:before': { display: 'none' } }, children: [_jsx(AccordionSummary, { expandIcon: _jsx(Icon, { icon: "mdi:chevron-down", width: "28" }), sx: {
                                        bgcolor: 'grey.50',
                                        borderRadius: 2,
                                        '&.Mui-expanded': { borderBottomLeftRadius: 0, borderBottomRightRadius: 0 },
                                    }, children: _jsxs(Box, { sx: { display: 'flex', alignItems: 'center', gap: 2, width: '100%' }, children: [_jsx(Icon, { icon: "mdi:book-outline", width: "26", color: "#173345" }), _jsxs(Box, { sx: { flex: 1 }, children: [_jsx(Typography, { fontWeight: "600", children: classItem.name }), _jsxs(Typography, { variant: "body2", color: "text.secondary", children: [classItem.students, " students \u2022 ", totalAssignments, " active assignments"] })] }), _jsx(Chip, { label: `${avgCompletion}% Complete`, size: "small", color: avgCompletion >= 80 ? 'success' : avgCompletion >= 60 ? 'warning' : 'error', sx: { fontWeight: 600 } })] }) }), _jsx(AccordionDetails, { sx: { pt: 3 }, children: _jsxs(Box, { sx: { pl: 1 }, children: [_jsxs(Grid, { container: true, spacing: 2, sx: { mb: 4 }, children: [_jsx(Grid, { item: true, xs: 12, sm: 4, children: _jsxs(Box, { sx: { display: 'flex', alignItems: 'center', gap: 1 }, children: [_jsx(Icon, { icon: "mdi:account-group", width: "20", color: "primary" }), _jsxs(Typography, { variant: "body1", children: [_jsx("strong", { children: "Enrolled:" }), " ", classItem.students, " students"] })] }) }), _jsx(Grid, { item: true, xs: 12, sm: 4, children: _jsxs(Box, { sx: { display: 'flex', alignItems: 'center', gap: 1 }, children: [_jsx(Icon, { icon: "mdi:calendar-check", width: "20", color: "success" }), _jsxs(Typography, { variant: "body1", children: [_jsx("strong", { children: "Assignments:" }), " ", totalAssignments] })] }) }), _jsx(Grid, { item: true, xs: 12, sm: 4, children: _jsxs(Box, { sx: { display: 'flex', alignItems: 'center', gap: 1 }, children: [_jsx(Icon, { icon: "mdi:chart-pie", width: "20", color: "info" }), _jsxs(Typography, { variant: "body1", children: [_jsx("strong", { children: "Class Share:" }), " ", Math.round((classItem.students / teacher.studentCount) * 100), "%"] })] }) })] }), classItem.assignments && classItem.assignments.length > 0 ? (_jsxs(_Fragment, { children: [_jsx(Typography, { variant: "subtitle1", fontWeight: "600", sx: { mb: 2 }, children: "Active Assignments" }), _jsx(TableContainer, { children: _jsxs(Table, { size: "small", children: [_jsx(TableHead, { children: _jsxs(TableRow, { sx: { bgcolor: 'grey.100' }, children: [_jsx(TableCell, { children: _jsx("strong", { children: "Assignment" }) }), _jsx(TableCell, { children: _jsx("strong", { children: "Due Date" }) }), _jsx(TableCell, { align: "center", children: _jsx("strong", { children: "Submitted" }) }), _jsx(TableCell, { align: "center", children: _jsx("strong", { children: "Pending" }) }), _jsx(TableCell, { align: "center", children: _jsx("strong", { children: "Overdue" }) }), _jsx(TableCell, { align: "center", children: _jsx("strong", { children: "Progress" }) })] }) }), _jsx(TableBody, { children: classItem.assignments.map((assignment) => {
                                                                        const progress = Math.round((assignment.submitted / assignment.total) * 100);
                                                                        return (_jsxs(TableRow, { hover: true, children: [_jsx(TableCell, { children: _jsx(Typography, { variant: "body2", fontWeight: "500", children: assignment.title }) }), _jsx(TableCell, { children: format(new Date(assignment.dueDate), 'MMM dd, yyyy') }), _jsx(TableCell, { align: "center", children: _jsx(Chip, { label: assignment.submitted, size: "small", color: "success" }) }), _jsx(TableCell, { align: "center", children: _jsx(Chip, { label: assignment.pending, size: "small", color: "warning" }) }), _jsx(TableCell, { align: "center", children: _jsx(Chip, { label: assignment.overdue, size: "small", color: "error" }) }), _jsx(TableCell, { children: _jsxs(Box, { sx: { display: 'flex', alignItems: 'center', gap: 1 }, children: [_jsx(LinearProgress, { variant: "determinate", value: progress, sx: { flex: 1, height: 6, borderRadius: 3 }, color: progress >= 90 ? 'success' : progress >= 70 ? 'warning' : 'error' }), _jsxs(Typography, { variant: "caption", sx: { minWidth: 40 }, children: [progress, "%"] })] }) })] }, assignment.id));
                                                                    }) })] }) })] })) : (_jsx(Typography, { color: "text.secondary", sx: { py: 3, textAlign: 'center' }, children: "No assignments assigned to this class yet." })), classItem.enrolledStudents && classItem.enrolledStudents.length > 0 && (_jsxs(_Fragment, { children: [_jsx(Typography, { variant: "subtitle1", fontWeight: "600", sx: { mt: 5, mb: 2 }, children: "Enrolled Students" }), _jsx(List, { dense: true, children: classItem.enrolledStudents.map((student) => (_jsxs(ListItem, { disablePadding: true, sx: { py: 0.5 }, children: [_jsx(ListItemAvatar, { children: _jsx(Avatar, { sx: { width: 36, height: 36, bgcolor: 'secondary.main', fontSize: '0.9rem' }, children: student.name.split(' ').map((n) => n[0]).join('') }) }), _jsx(ListItemText, { primary: student.name, secondary: `Grade: ${student.grade || 'Not Graded'}` })] }, student.id))) })] }))] }) })] }, index));
                    })] })] }));
}
