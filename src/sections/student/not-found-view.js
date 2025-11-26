import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useMemo } from 'react';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Paper, TextField, Button, Chip, Box, MenuItem, Select, FormControl, InputLabel, Typography, InputAdornment, } from '@mui/material';
import { Icon } from '@iconify/react/dist/iconify.js';
// Sample student data
const initialStudents = [
    { id: 1, name: 'John Doe', email: 'john.doe@email.com', phone: '+1-555-0101', course: 'Computer Science', place: 'New York' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@email.com', phone: '+1-555-0102', course: 'Business Administration', place: 'Los Angeles' },
    { id: 3, name: 'Mike Johnson', email: 'mike.j@email.com', phone: '+1-555-0103', course: 'Engineering', place: 'Chicago' },
    { id: 4, name: 'Emily Davis', email: 'emily.d@email.com', phone: '+1-555-0104', course: 'Computer Science', place: 'New York' },
    { id: 5, name: 'David Wilson', email: 'david.w@email.com', phone: '+1-555-0105', course: 'Medicine', place: 'Boston' },
    { id: 6, name: 'Sarah Brown', email: 'sarah.b@email.com', phone: '+1-555-0106', course: 'Business Administration', place: 'Seattle' },
    { id: 7, name: 'Chris Lee', email: 'chris.lee@email.com', phone: '+1-555-0107', course: 'Engineering', place: 'San Francisco' },
    { id: 8, name: 'Anna Martinez', email: 'anna.m@email.com', phone: '+1-555-0108', course: 'Computer Science', place: 'Austin' },
    { id: 9, name: 'Tom Anderson', email: 'tom.a@email.com', phone: '+1-555-0109', course: 'Medicine', place: 'Boston' },
    { id: 10, name: 'Lisa Taylor', email: 'lisa.t@email.com', phone: '+1-555-0110', course: 'Business Administration', place: 'Miami' },
    { id: 11, name: 'Robert Clark', email: 'robert.c@email.com', phone: '+1-555-0111', course: 'Engineering', place: 'Chicago' },
    { id: 12, name: 'Maria Garcia', email: 'maria.g@email.com', phone: '+1-555-0112', course: 'Computer Science', place: 'Denver' },
];
export function StudentListView() {
    const [students] = useState(initialStudents);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchQuery, setSearchQuery] = useState('');
    const [courseFilter, setCourseFilter] = useState('');
    const [placeFilter, setPlaceFilter] = useState('');
    // Get unique courses and places for filters
    const courses = useMemo(() => {
        return [...new Set(students.map(s => s.course))].sort();
    }, [students]);
    const places = useMemo(() => {
        return [...new Set(students.map(s => s.place))].sort();
    }, [students]);
    // Filter and search logic
    const filteredStudents = useMemo(() => {
        return students.filter(student => {
            const matchesSearch = searchQuery === '' ||
                student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                student.phone.includes(searchQuery);
            const matchesCourse = courseFilter === '' || student.course === courseFilter;
            const matchesPlace = placeFilter === '' || student.place === placeFilter;
            return matchesSearch && matchesCourse && matchesPlace;
        });
    }, [students, searchQuery, courseFilter, placeFilter]);
    // Pagination handlers
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    // Clear all filters
    const handleClearFilters = () => {
        setSearchQuery('');
        setCourseFilter('');
        setPlaceFilter('');
        setPage(0);
    };
    // Get current page data
    const paginatedStudents = useMemo(() => {
        const startIndex = page * rowsPerPage;
        return filteredStudents.slice(startIndex, startIndex + rowsPerPage);
    }, [filteredStudents, page, rowsPerPage]);
    return (_jsxs(Container, { maxWidth: "lg", sx: { mt: 4, mb: 4 }, children: [_jsx(Typography, { variant: "h4", gutterBottom: true, sx: { fontWeight: 600, mb: 3 }, children: "Student List" }), _jsxs(Paper, { sx: { p: 3, mb: 3 }, children: [_jsxs(Box, { sx: { display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }, children: [_jsx(TextField, { label: "Search", variant: "outlined", size: "small", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), placeholder: "Search by name, email, or phone", sx: { flexGrow: 1, minWidth: 250 }, InputProps: {
                                    startAdornment: (_jsx(InputAdornment, { position: "start", children: _jsx(Icon, { icon: 'ic:sharp-search' }) })),
                                } }), _jsxs(FormControl, { size: "small", sx: { minWidth: 200 }, children: [_jsx(InputLabel, { children: "Course" }), _jsxs(Select, { value: courseFilter, label: "Course", onChange: (e) => setCourseFilter(e.target.value), children: [_jsx(MenuItem, { value: "", children: "All Courses" }), courses.map(course => (_jsx(MenuItem, { value: course, children: course }, course)))] })] }), _jsxs(FormControl, { size: "small", sx: { minWidth: 180 }, children: [_jsx(InputLabel, { children: "Place" }), _jsxs(Select, { value: placeFilter, label: "Place", onChange: (e) => setPlaceFilter(e.target.value), children: [_jsx(MenuItem, { value: "", children: "All Places" }), places.map(place => (_jsx(MenuItem, { value: place, children: place }, place)))] })] }), _jsx(Button, { variant: "outlined", startIcon: _jsx(Icon, { icon: 'ic:baseline-clear' }), onClick: handleClearFilters, disabled: !searchQuery && !courseFilter && !placeFilter, children: "Clear" })] }), (courseFilter || placeFilter) && (_jsxs(Box, { sx: { mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }, children: [courseFilter && (_jsx(Chip, { label: `Course: ${courseFilter}`, onDelete: () => setCourseFilter(''), color: "primary", size: "small" })), placeFilter && (_jsx(Chip, { label: `Place: ${placeFilter}`, onDelete: () => setPlaceFilter(''), color: "primary", size: "small" }))] }))] }), _jsxs(Paper, { children: [_jsx(TableContainer, { children: _jsxs(Table, { children: [_jsx(TableHead, { children: _jsxs(TableRow, { sx: { backgroundColor: '#f5f5f5' }, children: [_jsx(TableCell, { sx: { fontWeight: 600 }, children: "Name" }), _jsx(TableCell, { sx: { fontWeight: 600 }, children: "Email" }), _jsx(TableCell, { sx: { fontWeight: 600 }, children: "Phone" }), _jsx(TableCell, { sx: { fontWeight: 600 }, children: "Course" }), _jsx(TableCell, { sx: { fontWeight: 600 }, children: "Place" })] }) }), _jsx(TableBody, { children: paginatedStudents.length > 0 ? (paginatedStudents.map((student) => (_jsxs(TableRow, { hover: true, sx: { '&:last-child td, &:last-child th': { border: 0 } }, children: [_jsx(TableCell, { children: student.name }), _jsx(TableCell, { children: student.email }), _jsx(TableCell, { children: student.phone }), _jsx(TableCell, { children: _jsx(Chip, { label: student.course, size: "small", color: "primary", variant: "outlined" }) }), _jsx(TableCell, { children: student.place })] }, student.id)))) : (_jsx(TableRow, { children: _jsx(TableCell, { colSpan: 5, align: "center", sx: { py: 4 }, children: _jsx(Typography, { color: "text.secondary", children: "No students found matching your criteria" }) }) })) })] }) }), _jsx(TablePagination, { component: "div", count: filteredStudents.length, page: page, onPageChange: handleChangePage, rowsPerPage: rowsPerPage, onRowsPerPageChange: handleChangeRowsPerPage, rowsPerPageOptions: [5, 10, 25, 50] })] }), _jsx(Box, { sx: { mt: 2, textAlign: 'center' }, children: _jsxs(Typography, { variant: "body2", color: "text.secondary", children: ["Showing ", paginatedStudents.length, " of ", filteredStudents.length, " students", filteredStudents.length !== students.length && ` (filtered from ${students.length} total)`] }) })] }));
}
