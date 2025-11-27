import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useMemo } from 'react';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Paper, TextField, Button, Chip, Box, MenuItem, Select, FormControl, InputLabel, Typography, InputAdornment, Stack, } from '@mui/material';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
const initialQuizzes = [
    {
        id: 1,
        name: 'Foundation English Level Test',
        courses: ['Foundation English (Level 1–3)'],
        startDate: '2024-10-01',
        endDate: '2024-10-08',
        totalQuestions: 40,
        attemptedQuestions: 38,
        correctAnswers: 32,
        score: 80
    },
    {
        id: 2,
        name: 'Grammar Mastery Quiz 1',
        courses: ['Grammar Mastery (Beginner to Advanced)'],
        startDate: '2024-10-05',
        endDate: '2024-10-12',
        totalQuestions: 30,
        attemptedQuestions: 30,
        correctAnswers: 27,
        score: 90
    },
    {
        id: 3,
        name: 'Vocabulary Booster Test – 1000 Words',
        courses: ['Vocabulary Booster – 1000+ Words'],
        startDate: '2024-10-10',
        endDate: '2024-10-17',
        totalQuestions: 50,
        attemptedQuestions: 48,
        correctAnswers: 41,
        score: 82
    },
    {
        id: 4,
        name: 'Reading & Comprehension Quiz',
        courses: ['Reading Skills & Comprehension Mastery'],
        startDate: '2024-09-20',
        endDate: '2024-09-27',
        totalQuestions: 35,
        attemptedQuestions: 35,
        correctAnswers: 30,
        score: 86
    },
    {
        id: 5,
        name: 'Creative Writing Assessment',
        courses: ['Creative Writing: Paragraph, Story, Letter, Notice'],
        startDate: '2024-10-15',
        endDate: '2024-10-22',
        totalQuestions: 20,
        attemptedQuestions: 20,
        correctAnswers: 18,
        score: 90
    },
    {
        id: 6,
        name: 'Essay & Formal Writing Exam',
        courses: ['Essay Writing & Formal Writing'],
        startDate: '2024-09-15',
        endDate: '2024-09-22',
        totalQuestions: 25,
        attemptedQuestions: 25,
        correctAnswers: 22,
        score: 88
    },
    {
        id: 7,
        name: 'Spoken English & Confidence Test',
        courses: ['Spoken English & Confidence Building'],
        startDate: '2024-10-08',
        endDate: '2024-10-15',
        totalQuestions: 30,
        attemptedQuestions: 29,
        correctAnswers: 25,
        score: 83
    },
    {
        id: 8,
        name: 'Public Speaking & Presentation Quiz',
        courses: ['Public Speaking & Presentation Skills'],
        startDate: '2024-10-01',
        endDate: '2024-10-08',
        totalQuestions: 32,
        attemptedQuestions: 32,
        correctAnswers: 28,
        score: 87
    }
];
export function QuizResultView() {
    const [quizzes] = useState(initialQuizzes);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchQuery, setSearchQuery] = useState('');
    const [courseFilter, setCourseFilter] = useState([]);
    const [selectedQuiz, setSelectedQuiz] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const navigate = useNavigate();
    // Get unique courses
    const courses = useMemo(() => {
        const allCourses = quizzes.flatMap(q => q.courses);
        return [...new Set(allCourses)].sort();
    }, [quizzes]);
    // Filter logic
    const filteredQuizzes = useMemo(() => {
        return quizzes.filter(quiz => {
            const matchesSearch = searchQuery === '' ||
                quiz.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                quiz.courses.some(course => course.toLowerCase().includes(searchQuery.toLowerCase()));
            const matchesCourse = courseFilter.length === 0 ||
                quiz.courses.some(course => courseFilter.includes(course));
            return matchesSearch && matchesCourse;
        });
    }, [quizzes, searchQuery, courseFilter]);
    const handleChangePage = (event, newPage) => setPage(newPage);
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const handleClearFilters = () => {
        setSearchQuery('');
        setCourseFilter([]);
        setPage(0);
    };
    const handleViewDetails = (id) => {
        navigate(`/quizdetailresultview/${id}`);
    };
    const paginatedQuizzes = useMemo(() => {
        const startIndex = page * rowsPerPage;
        return filteredQuizzes.slice(startIndex, startIndex + rowsPerPage);
    }, [filteredQuizzes, page, rowsPerPage]);
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };
    const getScoreColor = (score) => {
        if (score >= 90)
            return '#4caf50';
        if (score >= 80)
            return '#2196f3';
        if (score >= 70)
            return '#ff9800';
        return '#f44336';
    };
    return (_jsxs(Container, { maxWidth: "lg", sx: { mt: 4, mb: 4 }, children: [_jsx(Typography, { variant: "h4", gutterBottom: true, sx: { fontWeight: 600, mb: 3 }, children: "Quiz Results" }), _jsxs(Paper, { sx: { p: 3, mb: 3 }, children: [_jsxs(Box, { sx: { display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'flex-end' }, children: [_jsx(TextField, { label: "Search", variant: "outlined", size: "small", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), placeholder: "Search by quiz name or course", sx: { flexGrow: 1, minWidth: 280 }, InputProps: {
                                    startAdornment: (_jsx(InputAdornment, { position: "start", children: _jsx(Icon, { icon: "mdi:magnify", width: 20, height: 20, style: { color: '#757575' } }) })),
                                } }), _jsxs(FormControl, { size: "small", sx: { minWidth: 240 }, children: [_jsx(InputLabel, { id: "course-filter-label", children: "Courses" }), _jsx(Select, { labelId: "course-filter-label", multiple: true, value: courseFilter, onChange: (e) => setCourseFilter(e.target.value), label: "Courses", renderValue: (selected) => (_jsx(Box, { sx: { display: 'flex', flexWrap: 'wrap', gap: 0.5 }, children: selected.map((value) => (_jsx(Chip, { label: value, size: "small" }, value))) })), children: courses.map((course) => (_jsx(MenuItem, { value: course, children: _jsxs(Box, { sx: { display: 'flex', alignItems: 'center', gap: 1 }, children: [_jsx("input", { type: "checkbox", checked: courseFilter.includes(course), readOnly: true, style: { pointerEvents: 'none' } }), course] }) }, course))) })] }), _jsx(Button, { variant: "outlined", onClick: handleClearFilters, disabled: !searchQuery && courseFilter.length === 0, startIcon: _jsx(Icon, { icon: "mdi:close-circle", width: 18, height: 18 }), children: "Clear All" })] }), courseFilter.length > 0 && (_jsx(Box, { sx: { mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }, children: courseFilter.map((course) => (_jsx(Chip, { label: `Course: ${course}`, onDelete: () => setCourseFilter(prev => prev.filter(c => c !== course)), deleteIcon: _jsx(Icon, { icon: "mdi:close", width: 18, height: 18 }), color: "primary", size: "small" }, course))) }))] }), _jsxs(Paper, { children: [_jsx(TableContainer, { children: _jsxs(Table, { children: [_jsx(TableHead, { children: _jsxs(TableRow, { sx: { backgroundColor: '#f5f5f5' }, children: [_jsx(TableCell, { sx: { fontWeight: 600 }, children: "Quiz Name" }), _jsx(TableCell, { sx: { fontWeight: 600 }, children: "Assigned Courses" }), _jsx(TableCell, { sx: { fontWeight: 600 }, children: "Start Date" }), _jsx(TableCell, { sx: { fontWeight: 600 }, children: "End Date" }), _jsx(TableCell, { sx: { fontWeight: 600, textAlign: 'center' }, children: "Score" }), _jsx(TableCell, { sx: { fontWeight: 600, textAlign: 'center' }, children: "Action" })] }) }), _jsx(TableBody, { children: paginatedQuizzes.length > 0 ? (paginatedQuizzes.map((quiz) => (_jsxs(TableRow, { hover: true, children: [_jsx(TableCell, { children: _jsx(Typography, { variant: "body2", sx: { fontWeight: 500 }, children: quiz.name }) }), _jsx(TableCell, { children: _jsx(Stack, { direction: "row", spacing: 0.5, flexWrap: "wrap", useFlexGap: true, children: quiz.courses.map((course, idx) => (_jsx(Chip, { label: course, size: "small", variant: "filled", sx: { backgroundColor: '#e3f2fd', color: '#1976d2' } }, idx))) }) }), _jsx(TableCell, { children: _jsx(Typography, { variant: "body2", children: formatDate(quiz.startDate) }) }), _jsx(TableCell, { children: _jsx(Typography, { variant: "body2", children: formatDate(quiz.endDate) }) }), _jsx(TableCell, { sx: { textAlign: 'center' }, children: _jsx(Chip, { label: `${quiz.score}%`, sx: {
                                                        backgroundColor: getScoreColor(quiz.score),
                                                        color: 'white',
                                                        fontWeight: 600,
                                                    }, size: "small" }) }), _jsx(TableCell, { sx: { textAlign: 'center' }, children: _jsx(Button, { variant: "contained", size: "small", onClick: () => handleViewDetails(quiz.id), startIcon: _jsx(Icon, { icon: "mdi:information-outline", width: 18, height: 18 }), sx: { textTransform: 'none' }, children: "Details" }) })] }, quiz.id)))) : (_jsx(TableRow, { children: _jsx(TableCell, { colSpan: 6, align: "center", sx: { py: 4 }, children: _jsx(Typography, { color: "text.secondary", children: "No quizzes found matching your criteria" }) }) })) })] }) }), _jsx(TablePagination, { component: "div", count: filteredQuizzes.length, page: page, onPageChange: handleChangePage, rowsPerPage: rowsPerPage, onRowsPerPageChange: handleChangeRowsPerPage, rowsPerPageOptions: [5, 10, 25, 50] })] }), _jsx(Box, { sx: { mt: 2, textAlign: 'center' }, children: _jsxs(Typography, { variant: "body2", color: "text.secondary", children: ["Showing ", paginatedQuizzes.length, " of ", filteredQuizzes.length, " quizzes", filteredQuizzes.length !== quizzes.length && ` (filtered from ${quizzes.length} total)`] }) })] }));
}
