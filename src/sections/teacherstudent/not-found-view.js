import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useMemo } from 'react';
import { Container, Tabs, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Paper, TextField, Button, Chip, Box, MenuItem, Select, FormControl, InputLabel, Typography, Badge, InputAdornment, } from '@mui/material';
import { Icon } from '@iconify/react/dist/iconify.js';
// Teacher's assigned English batches (realistic names)
const teacherAssignedCourses = [
    'IELTS Intensive - Batch A2025',
    'General English - Level 6 (Morning)',
    'Business English - B2 Advanced',
    'Spoken English - Weekend Batch',
    'IELTS Foundation - Batch B2025',
    'TOEFL Preparation - Evening',
];
// Sample students with batch assignment
const allStudents = [
    { id: 1, name: 'Aarav Sharma', email: 'aarav.sharma@email.com', phone: '+91 98765 43210', course: 'IELTS Intensive - Batch A2025', batch: 'A2025', level: 'Advanced' },
    { id: 2, name: 'Priya Singh', email: 'priya.s@email.com', phone: '+91 98765 43211', course: 'General English - Level 6 (Morning)', batch: 'Level 6 Morning', level: 'Upper-Intermediate' },
    { id: 3, name: 'Rahul Verma', email: 'rahul.v@email.com', phone: '+91 98765 43212', course: 'IELTS Intensive - Batch A2025', batch: 'A2025', level: 'Advanced' },
    { id: 4, name: 'Ananya Patel', email: 'ananya.p@email.com', phone: '+91 98765 43213', course: 'Business English - B2 Advanced', batch: 'B2 Advanced', level: 'Advanced' },
    { id: 5, name: 'Vikram Reddy', email: 'vikram.r@email.com', phone: '+91 98765 43214', course: 'Spoken English - Weekend Batch', batch: 'Weekend 2025', level: 'Intermediate' },
    { id: 6, name: 'Neha Gupta', email: 'neha.g@email.com', phone: '+91 98765 43215', course: 'IELTS Intensive - Batch A2025', batch: 'A2025', level: 'Advanced' },
    { id: 7, name: 'Rohan Mehta', email: 'rohan.m@email.com', phone: '+91 98765 43216', course: 'TOEFL Preparation - Evening', batch: 'TOEFL Evening', level: 'Advanced' },
    { id: 8, name: 'Sanya Kapoor', email: 'sanya.k@email.com', phone: '+91 98765 43217', course: 'General English - Level 6 (Morning)', batch: 'Level 6 Morning', level: 'Upper-Intermediate' },
    { id: 9, name: 'Arjun Nair', email: 'arjun.n@email.com', phone: '+91 98765 43218', course: 'IELTS Foundation - Batch B2025', batch: 'B2025', level: 'Pre-Intermediate' },
    { id: 10, name: 'Diya Joshi', email: 'diya.j@email.com', phone: '+91 98765 43219', course: 'Spoken English - Weekend Batch', batch: 'Weekend 2025', level: 'Intermediate' },
    { id: 11, name: 'Karan Malhotra', email: 'karan.m@email.com', phone: '+91 98765 43220', course: 'Business English - B2 Advanced', batch: 'B2 Advanced', level: 'Advanced' },
    { id: 12, name: 'Ishaan Khan', email: 'ishaan.k@email.com', phone: '+91 98765 43221', course: 'IELTS Intensive - Batch A2025', batch: 'A2025', level: 'Advanced' },
];
export function TeacherStudentListView() {
    const [selectedCourse, setSelectedCourse] = useState(teacherAssignedCourses[0]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchQuery, setSearchQuery] = useState('');
    const [batchFilter, setBatchFilter] = useState('');
    // Students in selected course
    const studentsInSelectedCourse = useMemo(() => {
        return allStudents.filter(s => s.course === selectedCourse);
    }, [selectedCourse]);
    // Unique batches in current course (usually just one, but useful if merged)
    const availableBatches = useMemo(() => {
        return [...new Set(studentsInSelectedCourse.map(s => s.batch))].sort();
    }, [studentsInSelectedCourse]);
    // Filtered students
    const filteredStudents = useMemo(() => {
        return studentsInSelectedCourse.filter(student => {
            const matchesSearch = !searchQuery ||
                student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                student.phone.includes(searchQuery);
            const matchesBatch = !batchFilter || student.batch === batchFilter;
            return matchesSearch && matchesBatch;
        });
    }, [studentsInSelectedCourse, searchQuery, batchFilter]);
    // Pagination
    const paginatedStudents = useMemo(() => {
        return filteredStudents.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    }, [filteredStudents, page, rowsPerPage]);
    const handleTabChange = (_, newCourse) => {
        setSelectedCourse(newCourse);
        setPage(0);
        setSearchQuery('');
        setBatchFilter('');
    };
    const handleClearFilters = () => {
        setSearchQuery('');
        setBatchFilter('');
        setPage(0);
    };
    const hasActiveFilters = searchQuery || batchFilter;
    return (_jsxs(Container, { maxWidth: "lg", sx: { mt: 4, mb: 4 }, children: [_jsx(Typography, { variant: "h4", gutterBottom: true, sx: { fontWeight: 600, mb: 3 }, children: "My English Classes" }), _jsx(Paper, { sx: { mb: 3, borderRadius: 2, overflow: 'hidden' }, children: _jsx(Tabs, { value: selectedCourse, onChange: handleTabChange, variant: "scrollable", scrollButtons: "auto", sx: {
                        bgcolor: 'background.paper',
                        '& .MuiTab-root': { textTransform: 'none', fontWeight: 500 },
                    }, children: teacherAssignedCourses.map((course) => {
                        const count = allStudents.filter(s => s.course === course).length;
                        return (_jsx(Tab, { value: course, label: _jsxs(Box, { sx: { display: 'flex', alignItems: 'center', gap: 1 }, children: [_jsx(Icon, { icon: "fluent:class-24-filled", style: { fontSize: 20 } }), _jsxs(Box, { children: [_jsx(Typography, { variant: "body2", sx: { fontWeight: 600, lineHeight: 1.2 }, children: course.split(' - ')[0] }), _jsx(Typography, { variant: "caption", color: "text.secondary", children: course.split(' - ')[1] || course })] }), _jsx(Badge, { badgeContent: count, color: "primary", sx: { ml: 1 }, children: _jsx(Icon, { icon: "eva:people-fill" }) })] }) }, course));
                    }) }) }), _jsxs(Paper, { sx: { p: 3, mb: 3 }, children: [_jsxs(Box, { sx: { display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }, children: [_jsx(TextField, { label: "Search Student", variant: "outlined", size: "small", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), placeholder: "Name, email, or phone", sx: { minWidth: 300 }, InputProps: {
                                    startAdornment: (_jsx(InputAdornment, { position: "start", children: _jsx(Icon, { icon: "eva:search-fill" }) })),
                                    endAdornment: searchQuery && (_jsx(InputAdornment, { position: "end", children: _jsx(Icon, { icon: "eva:close-fill", style: { cursor: 'pointer', color: 'text.disabled' }, onClick: () => setSearchQuery('') }) })),
                                } }), availableBatches.length > 1 && (_jsxs(FormControl, { size: "small", sx: { minWidth: 200 }, children: [_jsx(InputLabel, { children: "Batch" }), _jsxs(Select, { value: batchFilter, label: "Batch", onChange: (e) => setBatchFilter(e.target.value), children: [_jsx(MenuItem, { value: "", children: _jsx("em", { children: "All Batches" }) }), availableBatches.map(batch => (_jsxs(MenuItem, { value: batch, children: [_jsx(Icon, { icon: "eva:bookmark-fill", style: { fontSize: 16 } }), batch] }, batch)))] })] })), _jsx(Button, { variant: "outlined", startIcon: _jsx(Icon, { icon: "eva:trash-2-outline" }), onClick: handleClearFilters, disabled: !hasActiveFilters, children: "Clear Filters" })] }), hasActiveFilters && (_jsx(Box, { sx: { mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }, children: batchFilter && (_jsx(Chip, { label: `Batch: ${batchFilter}`, onDelete: () => setBatchFilter(''), deleteIcon: _jsx(Icon, { icon: "eva:close-fill" }), color: "primary", size: "small" })) }))] }), _jsxs(Paper, { children: [_jsx(TableContainer, { children: _jsxs(Table, { children: [_jsx(TableHead, { children: _jsxs(TableRow, { sx: { bgcolor: 'grey.100' }, children: [_jsx(TableCell, { sx: { fontWeight: 600 }, children: "Student Name" }), _jsx(TableCell, { sx: { fontWeight: 600 }, children: "Email" }), _jsx(TableCell, { sx: { fontWeight: 600 }, children: "Phone" }), _jsx(TableCell, { sx: { fontWeight: 600 }, children: "Batch" }), _jsx(TableCell, { sx: { fontWeight: 600 }, children: "Level" })] }) }), _jsx(TableBody, { children: paginatedStudents.length > 0 ? (paginatedStudents.map((student) => (_jsxs(TableRow, { hover: true, children: [_jsx(TableCell, { children: _jsxs(Box, { sx: { display: 'flex', alignItems: 'center', gap: 1 }, children: [_jsx(Icon, { icon: "eva:person-fill", style: { color: 'text.secondary' } }), student.name] }) }), _jsx(TableCell, { children: student.email }), _jsx(TableCell, { children: student.phone }), _jsx(TableCell, { children: _jsx(Chip, { label: student.batch, size: "small", color: "info", icon: _jsx(Icon, { icon: "eva:bookmark-fill" }) }) }), _jsx(TableCell, { children: _jsx(Chip, { label: student.level, size: "small", variant: "outlined" }) })] }, student.id)))) : (_jsx(TableRow, { children: _jsxs(TableCell, { colSpan: 5, align: "center", sx: { py: 6 }, children: [_jsx(Icon, { icon: "eva:book-open-outline", style: { fontSize: 64, color: 'text.disabled' } }), _jsx(Typography, { variant: "h6", color: "text.secondary", children: "No students found" }), _jsx(Typography, { color: "text.secondary", children: studentsInSelectedCourse.length === 0
                                                        ? 'This batch is empty'
                                                        : 'Try adjusting your filters' })] }) })) })] }) }), _jsx(TablePagination, { component: "div", count: filteredStudents.length, page: page, onPageChange: (_, p) => setPage(p), rowsPerPage: rowsPerPage, onRowsPerPageChange: (e) => {
                            setRowsPerPage(parseInt(e.target.value, 10));
                            setPage(0);
                        }, rowsPerPageOptions: [5, 10, 25, 50] })] }), _jsx(Box, { sx: { mt: 3, textAlign: 'center' }, children: _jsxs(Typography, { variant: "body2", color: "text.secondary", children: ["Showing ", _jsx("strong", { children: paginatedStudents.length }), " of ", _jsx("strong", { children: filteredStudents.length }), " students in", ' ', _jsx("strong", { children: selectedCourse.split(' - ')[1] || selectedCourse }), hasActiveFilters && ' • Filtered'] }) })] }));
}
