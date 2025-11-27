import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useMemo } from 'react';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Paper, TextField, Button, Chip, Box, MenuItem, Select, FormControl, InputLabel, Typography, InputAdornment, Stack, Card, CardContent, LinearProgress, Dialog, DialogTitle, DialogContent, DialogActions, } from '@mui/material';
import Grid from '@mui/material/GridLegacy';
// Iconify Icons
import { Icon } from '@iconify/react';
const initialQuizzes = [
    {
        id: 1,
        name: 'Foundation English Midterm',
        courses: [
            'Foundation English (Level 1–3)',
            'Grammar Mastery (Beginner to Advanced)'
        ],
        startDate: '2024-10-01',
        endDate: '2024-10-08',
        totalQuestions: 50,
        attemptedQuestions: 48,
        correctAnswers: 42,
        score: 84,
        topics: [
            'Basic Grammar',
            'Sentence Structure',
            'Reading Comprehension',
            'Vocabulary Practice'
        ]
    },
    {
        id: 2,
        name: 'Communication Skills Quiz 1',
        courses: [
            'Communication Skills for Students',
            'Spoken English & Confidence Building'
        ],
        startDate: '2024-10-05',
        endDate: '2024-10-12',
        totalQuestions: 30,
        attemptedQuestions: 30,
        correctAnswers: 27,
        score: 90,
        topics: [
            'Public Speaking',
            'Pronunciation',
            'Listening Skills',
            'Conversation Practice'
        ]
    },
    {
        id: 3,
        name: 'Digital Literacy Final Assessment',
        courses: [
            'Digital Literacy & Online Learning Skills',
            'Soft Skills Development'
        ],
        startDate: '2024-10-10',
        endDate: '2024-10-17',
        totalQuestions: 40,
        attemptedQuestions: 40,
        correctAnswers: 36,
        score: 90,
        topics: [
            'Online Tools',
            'Critical Thinking',
            'Problem Solving',
            'Digital Communication'
        ]
    }
];
const initialStudents = [
    { id: 101, name: 'Aditya Kumar', email: 'aditya@example.com', score: 42, marksObtained: 42, totalMarks: 50, attemptedQues: 48, correctAns: 42, accuracy: 87.5, timeSpent: 45, status: 'Completed' },
    { id: 102, name: 'Priya Singh', email: 'priya@example.com', score: 38, marksObtained: 38, totalMarks: 50, attemptedQues: 46, correctAns: 38, accuracy: 82.6, timeSpent: 52, status: 'Completed' },
    { id: 103, name: 'Raj Patel', email: 'raj@example.com', score: 45, marksObtained: 45, totalMarks: 50, attemptedQues: 50, correctAns: 45, accuracy: 90, timeSpent: 40, status: 'Completed' },
    { id: 104, name: 'Neha Gupta', email: 'neha@example.com', score: 35, marksObtained: 35, totalMarks: 50, attemptedQues: 40, correctAns: 35, accuracy: 87.5, timeSpent: 48, status: 'Completed' },
    { id: 105, name: 'Arjun Verma', email: 'arjun@example.com', score: 40, marksObtained: 40, totalMarks: 50, attemptedQues: 48, correctAns: 40, accuracy: 83.3, timeSpent: 50, status: 'Completed' },
    { id: 106, name: 'Sneha Sharma', email: 'sneha@example.com', score: 48, marksObtained: 48, totalMarks: 50, attemptedQues: 50, correctAns: 48, accuracy: 96, timeSpent: 35, status: 'Completed' },
];
export function QuizDetailResultView() {
    const [selectedQuizId] = useState(1);
    const [students] = useState(initialStudents);
    const [quizzes] = useState(initialQuizzes);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('score');
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const currentQuiz = quizzes.find(q => q.id === selectedQuizId);
    const filteredStudents = useMemo(() => {
        return students
            .filter(student => {
            const matchesSearch = searchQuery === '' ||
                student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                student.email.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesSearch;
        })
            .sort((a, b) => {
            switch (sortBy) {
                case 'score': return b.score - a.score;
                case 'name': return a.name.localeCompare(b.name);
                case 'accuracy': return b.accuracy - a.accuracy;
                default: return 0;
            }
        });
    }, [students, searchQuery, sortBy]);
    const handleChangePage = (_, newPage) => setPage(newPage);
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const paginatedStudents = useMemo(() => {
        const startIndex = page * rowsPerPage;
        return filteredStudents.slice(startIndex, startIndex + rowsPerPage);
    }, [filteredStudents, page, rowsPerPage]);
    const calculateStats = useMemo(() => {
        if (students.length === 0)
            return { avgScore: 0, highestScore: 0, lowestScore: 0, passCount: 0 };
        const scores = students.map(s => s.score);
        return {
            avgScore: (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1),
            highestScore: Math.max(...scores),
            lowestScore: Math.min(...scores),
            passCount: scores.filter(s => s >= 40).length,
        };
    }, [students]);
    const getScoreColor = (score) => {
        if (score >= 45)
            return '#4caf50';
        if (score >= 40)
            return '#2196f3';
        if (score >= 35)
            return '#ff9800';
        return '#f44336';
    };
    const getStatusColor = (accuracy) => {
        if (accuracy >= 90)
            return 'success';
        if (accuracy >= 75)
            return 'info';
        if (accuracy >= 60)
            return 'warning';
        return 'error';
    };
    const handleViewDetails = (student) => {
        setSelectedStudent(student);
        setOpenDialog(true);
    };
    return (_jsxs(Container, { maxWidth: "xl", sx: { mt: 4, mb: 4 }, children: [_jsxs(Box, { sx: { mb: 4 }, children: [_jsx(Button, { startIcon: _jsx(Icon, { icon: "mdi:arrow-left", width: 20, height: 20 }), sx: { mb: 2, textTransform: 'none' }, children: "Back to Quizzes" }), _jsx(Typography, { variant: "h4", sx: { fontWeight: 700, mb: 1 }, children: currentQuiz?.name }), _jsx(Typography, { variant: "body2", color: "text.secondary", children: "Results & Performance Analytics" })] }), _jsxs(Grid, { container: true, spacing: 3, sx: { mb: 4 }, children: [_jsx(Grid, { item: true, xs: 12, sm: 6, md: 3, children: _jsx(Card, { children: _jsxs(CardContent, { sx: { display: 'flex', alignItems: 'center', gap: 2 }, children: [_jsx(Icon, { icon: "mdi:account-group", width: 40, height: 40, style: { color: '#1976d2' } }), _jsxs(Box, { children: [_jsx(Typography, { color: "textSecondary", gutterBottom: true, children: "Total Students" }), _jsx(Typography, { variant: "h5", sx: { fontWeight: 600 }, children: students.length })] })] }) }) }), _jsx(Grid, { item: true, xs: 12, sm: 6, md: 3, children: _jsx(Card, { children: _jsxs(CardContent, { sx: { display: 'flex', alignItems: 'center', gap: 2 }, children: [_jsx(Icon, { icon: "mdi:chart-line", width: 40, height: 40, style: { color: '#4caf50' } }), _jsxs(Box, { children: [_jsx(Typography, { color: "textSecondary", gutterBottom: true, children: "Average Score" }), _jsxs(Typography, { variant: "h5", sx: { fontWeight: 600 }, children: [calculateStats.avgScore, "%"] })] })] }) }) }), _jsx(Grid, { item: true, xs: 12, sm: 6, md: 3, children: _jsx(Card, { children: _jsxs(CardContent, { sx: { display: 'flex', alignItems: 'center', gap: 2 }, children: [_jsx(Icon, { icon: "mdi:trophy", width: 40, height: 40, style: { color: '#ff9800' } }), _jsxs(Box, { children: [_jsx(Typography, { color: "textSecondary", gutterBottom: true, children: "Highest Score" }), _jsxs(Typography, { variant: "h5", sx: { fontWeight: 600 }, children: [calculateStats.highestScore, "%"] })] })] }) }) }), _jsx(Grid, { item: true, xs: 12, sm: 6, md: 3, children: _jsx(Card, { children: _jsxs(CardContent, { sx: { display: 'flex', alignItems: 'center', gap: 2 }, children: [_jsx(Icon, { icon: "mdi:check-circle", width: 40, height: 40, style: { color: '#2196f3' } }), _jsxs(Box, { children: [_jsx(Typography, { color: "textSecondary", gutterBottom: true, children: "Pass Rate" }), _jsxs(Typography, { variant: "h5", sx: { fontWeight: 600 }, children: [((calculateStats.passCount / students.length) * 100).toFixed(0), "%"] })] })] }) }) })] }), _jsx(Paper, { sx: { p: 3, mb: 4 }, children: _jsxs(Grid, { container: true, spacing: 3, children: [_jsx(Grid, { item: true, xs: 12, sm: 6, md: 4, children: _jsxs(Box, { sx: { display: 'flex', alignItems: 'center', gap: 2 }, children: [_jsx(Icon, { icon: "mdi:help-circle-outline", width: 24, height: 24, style: { color: '#757575' } }), _jsxs(Box, { children: [_jsx(Typography, { variant: "body2", color: "text.secondary", children: "Total Questions" }), _jsx(Typography, { variant: "h6", sx: { fontWeight: 600 }, children: currentQuiz?.totalQuestions })] })] }) }), _jsx(Grid, { item: true, xs: 12, sm: 6, md: 4, children: _jsxs(Box, { sx: { display: 'flex', alignItems: 'center', gap: 2 }, children: [_jsx(Icon, { icon: "mdi:clock-outline", width: 24, height: 24, style: { color: '#757575' } }), _jsxs(Box, { children: [_jsx(Typography, { variant: "body2", color: "text.secondary", children: "Duration" }), _jsx(Typography, { variant: "h6", sx: { fontWeight: 600 }, children: "Oct 1 \u2013 Oct 8, 2024" })] })] }) }), _jsx(Grid, { item: true, xs: 12, sm: 12, md: 4, children: _jsxs(Box, { children: [_jsx(Typography, { variant: "body2", color: "text.secondary", gutterBottom: true, children: "Topics Covered" }), _jsx(Stack, { direction: "row", spacing: 1, flexWrap: "wrap", useFlexGap: true, children: currentQuiz?.topics?.map((topic, idx) => (_jsx(Chip, { label: topic, size: "small", variant: "outlined" }, idx))) })] }) })] }) }), _jsx(Paper, { sx: { p: 3, mb: 3 }, children: _jsxs(Box, { sx: { display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'flex-end' }, children: [_jsx(TextField, { label: "Search Student", variant: "outlined", size: "small", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), placeholder: "Search by name or email", sx: { flexGrow: 1, minWidth: 280 }, InputProps: {
                                startAdornment: (_jsx(InputAdornment, { position: "start", children: _jsx(Icon, { icon: "mdi:magnify", width: 20, height: 20, style: { color: '#757575' } }) })),
                            } }), _jsxs(FormControl, { size: "small", sx: { minWidth: 160 }, children: [_jsx(InputLabel, { children: "Sort By" }), _jsxs(Select, { value: sortBy, onChange: (e) => setSortBy(e.target.value), label: "Sort By", children: [_jsx(MenuItem, { value: "score", children: "Highest Score" }), _jsx(MenuItem, { value: "name", children: "Name (A-Z)" }), _jsx(MenuItem, { value: "accuracy", children: "Accuracy" })] })] })] }) }), _jsxs(Paper, { children: [_jsx(TableContainer, { children: _jsxs(Table, { children: [_jsx(TableHead, { children: _jsxs(TableRow, { sx: { backgroundColor: '#f5f5f5' }, children: [_jsx(TableCell, { sx: { fontWeight: 700 }, children: "Student Name" }), _jsx(TableCell, { sx: { fontWeight: 700 }, children: "Email" }), _jsx(TableCell, { sx: { fontWeight: 700, textAlign: 'center' }, children: "Marks" }), _jsx(TableCell, { sx: { fontWeight: 700, textAlign: 'center' }, children: "Accuracy %" }), _jsx(TableCell, { sx: { fontWeight: 700, textAlign: 'center' }, children: "Attempted" }), _jsx(TableCell, { sx: { fontWeight: 700, textAlign: 'center' }, children: "Time (min)" }), _jsx(TableCell, { sx: { fontWeight: 700, textAlign: 'center' }, children: "Status" }), _jsx(TableCell, { sx: { fontWeight: 700, textAlign: 'center' }, children: "Action" })] }) }), _jsx(TableBody, { children: paginatedStudents.length > 0 ? (paginatedStudents.map((student) => (_jsxs(TableRow, { hover: true, children: [_jsx(TableCell, { children: _jsxs(Box, { sx: { display: 'flex', alignItems: 'center', gap: 1.5 }, children: [_jsx(Icon, { icon: "mdi:account-circle", width: 32, height: 32, style: { color: '#757575' } }), _jsx(Typography, { variant: "body2", sx: { fontWeight: 500 }, children: student.name })] }) }), _jsx(TableCell, { children: _jsx(Typography, { variant: "body2", color: "text.secondary", children: student.email }) }), _jsx(TableCell, { sx: { textAlign: 'center' }, children: _jsx(Chip, { label: `${student.marksObtained}/${student.totalMarks}`, sx: {
                                                        backgroundColor: getScoreColor(student.score),
                                                        color: 'white',
                                                        fontWeight: 600,
                                                    }, size: "small" }) }), _jsx(TableCell, { sx: { textAlign: 'center' }, children: _jsxs(Box, { sx: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }, children: [_jsx(Box, { sx: { width: 70 }, children: _jsx(LinearProgress, { variant: "determinate", value: student.accuracy, sx: {
                                                                    height: 8,
                                                                    borderRadius: 4,
                                                                    backgroundColor: '#e0e0e0',
                                                                    '& .MuiLinearProgress-bar': {
                                                                        backgroundColor: student.accuracy >= 80 ? '#4caf50' : student.accuracy >= 60 ? '#ff9800' : '#f44336',
                                                                    },
                                                                } }) }), _jsxs(Typography, { variant: "body2", sx: { fontWeight: 600, minWidth: 40 }, children: [student.accuracy, "%"] })] }) }), _jsx(TableCell, { sx: { textAlign: 'center' }, children: _jsxs(Typography, { variant: "body2", children: [student.attemptedQues, "/", currentQuiz?.totalQuestions] }) }), _jsx(TableCell, { sx: { textAlign: 'center' }, children: _jsx(Typography, { variant: "body2", children: student.timeSpent }) }), _jsx(TableCell, { sx: { textAlign: 'center' }, children: _jsx(Chip, { label: student.status, size: "small", color: getStatusColor(student.accuracy), variant: "filled" }) }), _jsx(TableCell, { sx: { textAlign: 'center' }, children: _jsx(Button, { variant: "outlined", size: "small", onClick: () => handleViewDetails(student), startIcon: _jsx(Icon, { icon: "mdi:eye", width: 18, height: 18 }), sx: { textTransform: 'none' }, children: "View" }) })] }, student.id)))) : (_jsx(TableRow, { children: _jsx(TableCell, { colSpan: 8, align: "center", sx: { py: 6 }, children: _jsx(Typography, { color: "text.secondary", children: "No students found matching your search" }) }) })) })] }) }), _jsx(TablePagination, { component: "div", count: filteredStudents.length, page: page, onPageChange: handleChangePage, rowsPerPage: rowsPerPage, onRowsPerPageChange: handleChangeRowsPerPage, rowsPerPageOptions: [5, 10, 25, 50] })] }), _jsx(Box, { sx: { mt: 3, textAlign: 'center' }, children: _jsxs(Typography, { variant: "body2", color: "text.secondary", children: ["Showing ", paginatedStudents.length, " of ", filteredStudents.length, " students"] }) }), _jsxs(Dialog, { open: openDialog, onClose: () => setOpenDialog(false), maxWidth: "sm", fullWidth: true, children: [_jsx(DialogTitle, { children: _jsxs(Box, { sx: { display: 'flex', alignItems: 'center', gap: 1 }, children: [_jsx(Icon, { icon: "mdi:account-details", width: 28, height: 28 }), "Student Performance Details"] }) }), _jsx(DialogContent, { children: selectedStudent && (_jsx(Box, { sx: { pt: 2 }, children: _jsxs(Stack, { spacing: 3, children: [_jsxs(Box, { children: [_jsx(Typography, { variant: "body2", color: "text.secondary", children: "Name" }), _jsx(Typography, { variant: "h6", sx: { fontWeight: 600 }, children: selectedStudent.name })] }), _jsxs(Box, { children: [_jsx(Typography, { variant: "body2", color: "text.secondary", children: "Email" }), _jsx(Typography, { variant: "body1", sx: { fontWeight: 600 }, children: selectedStudent.email })] }), _jsxs(Box, { children: [_jsx(Typography, { variant: "body2", color: "text.secondary", children: "Marks Obtained" }), _jsxs(Typography, { variant: "h6", sx: { fontWeight: 600 }, children: [selectedStudent.marksObtained, " / ", selectedStudent.totalMarks] })] }), _jsxs(Box, { children: [_jsx(Typography, { variant: "body2", color: "text.secondary", children: "Accuracy" }), _jsxs(Typography, { variant: "h6", sx: { fontWeight: 600, color: getScoreColor(selectedStudent.score) }, children: [selectedStudent.accuracy, "%"] })] }), _jsxs(Box, { children: [_jsx(Typography, { variant: "body2", color: "text.secondary", children: "Questions Attempted" }), _jsxs(Typography, { variant: "body1", sx: { fontWeight: 600 }, children: [selectedStudent.attemptedQues, " / ", currentQuiz?.totalQuestions] })] }), _jsxs(Box, { children: [_jsx(Typography, { variant: "body2", color: "text.secondary", children: "Time Spent" }), _jsxs(Typography, { variant: "body1", sx: { fontWeight: 600 }, children: [selectedStudent.timeSpent, " minutes"] })] })] }) })) }), _jsx(DialogActions, { children: _jsx(Button, { onClick: () => setOpenDialog(false), startIcon: _jsx(Icon, { icon: "mdi:close" }), children: "Close" }) })] })] }));
}
