import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useMemo } from 'react';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Paper, TextField, Button, Chip, Box, MenuItem, Select, FormControl, InputLabel, Typography, InputAdornment, Stack, } from '@mui/material';
import { Icon } from '@iconify/react';
const initialInstructors = [
    { id: 1, name: 'Dr. John Doe', email: 'john.doe@university.com', phone: '+1-555-0101', department: 'Computer Science', courses: ['Data Structures', 'Algorithms', 'Database Design'], studentCount: 120 },
    { id: 2, name: 'Prof. Jane Smith', email: 'jane.smith@university.com', phone: '+1-555-0102', department: 'Business', courses: ['Marketing', 'Business Analytics'], studentCount: 85 },
    { id: 3, name: 'Dr. Mike Johnson', email: 'mike.j@university.com', phone: '+1-555-0103', department: 'Engineering', courses: ['Circuit Design', 'Embedded Systems', 'Microprocessors'], studentCount: 145 },
    { id: 4, name: 'Prof. Emily Davis', email: 'emily.d@university.com', phone: '+1-555-0104', department: 'Computer Science', courses: ['Web Development', 'Mobile Apps'], studentCount: 95 },
    { id: 5, name: 'Dr. David Wilson', email: 'david.w@university.com', phone: '+1-555-0105', department: 'Medicine', courses: ['Anatomy', 'Physiology', 'Pathology'], studentCount: 110 },
    { id: 6, name: 'Prof. Sarah Brown', email: 'sarah.b@university.com', phone: '+1-555-0106', department: 'Business', courses: ['Finance', 'Investment Management'], studentCount: 78 },
    { id: 7, name: 'Dr. Chris Lee', email: 'chris.lee@university.com', phone: '+1-555-0107', department: 'Engineering', courses: ['Civil Engineering', 'Structural Analysis'], studentCount: 102 },
    { id: 8, name: 'Prof. Anna Martinez', email: 'anna.m@university.com', phone: '+1-555-0108', department: 'Computer Science', courses: ['Machine Learning', 'AI', 'Neural Networks'], studentCount: 156 },
    { id: 9, name: 'Dr. Tom Anderson', email: 'tom.a@university.com', phone: '+1-555-0109', department: 'Medicine', courses: ['Surgery', 'Clinical Practice'], studentCount: 65 },
    { id: 10, name: 'Prof. Lisa Taylor', email: 'lisa.t@university.com', phone: '+1-555-0110', department: 'Business', courses: ['Economics', 'Microeconomics'], studentCount: 92 },
    { id: 11, name: 'Dr. Robert Clark', email: 'robert.c@university.com', phone: '+1-555-0111', department: 'Engineering', courses: ['Robotics', 'Control Systems'], studentCount: 88 },
    { id: 12, name: 'Prof. Maria Garcia', email: 'maria.g@university.com', phone: '+1-555-0112', department: 'Computer Science', courses: ['Cloud Computing', 'DevOps'], studentCount: 103 },
];
export function InstructorsListView() {
    const [instructors] = useState(initialInstructors);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchQuery, setSearchQuery] = useState('');
    const [departmentFilter, setDepartmentFilter] = useState([]); // Now an array
    // Get unique departments
    const departments = useMemo(() => {
        return [...new Set(instructors.map(i => i.department))].sort();
    }, [instructors]);
    // Filter logic - supports multiple departments
    const filteredInstructors = useMemo(() => {
        return instructors.filter(instructor => {
            const matchesSearch = searchQuery === '' ||
                instructor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                instructor.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                instructor.phone.includes(searchQuery) ||
                instructor.courses.some(course => course.toLowerCase().includes(searchQuery.toLowerCase()));
            const matchesDepartment = departmentFilter.length === 0 ||
                departmentFilter.includes(instructor.department);
            return matchesSearch && matchesDepartment;
        });
    }, [instructors, searchQuery, departmentFilter]);
    const handleChangePage = (event, newPage) => setPage(newPage);
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const handleClearFilters = () => {
        setSearchQuery('');
        setDepartmentFilter([]);
        setPage(0);
    };
    const paginatedInstructors = useMemo(() => {
        const startIndex = page * rowsPerPage;
        return filteredInstructors.slice(startIndex, startIndex + rowsPerPage);
    }, [filteredInstructors, page, rowsPerPage]);
    const getInitials = (name) => {
        return name.split(' ').map(part => part[0]).join('').toUpperCase();
    };
    return (_jsxs(Container, { maxWidth: "lg", sx: { mt: 4, mb: 4 }, children: [_jsx(Typography, { variant: "h4", gutterBottom: true, sx: { fontWeight: 600, mb: 3 }, children: "Instructor Management" }), _jsxs(Paper, { sx: { p: 3, mb: 3 }, children: [_jsxs(Box, { sx: { display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'flex-end' }, children: [_jsx(TextField, { label: "Search", variant: "outlined", size: "small", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), placeholder: "Search by name, email, phone or course", sx: { flexGrow: 1, minWidth: 280 }, InputProps: {
                                    startAdornment: (_jsx(InputAdornment, { position: "start", children: _jsx(Icon, { icon: "mdi:magnify", width: 20, height: 20, style: { color: '#757575' } }) })),
                                } }), _jsxs(FormControl, { size: "small", sx: { minWidth: 240 }, children: [_jsx(InputLabel, { id: "department-filter-label", children: "Departments" }), _jsx(Select, { labelId: "department-filter-label", multiple: true, value: departmentFilter, onChange: (e) => setDepartmentFilter(e.target.value), label: "Departments", renderValue: (selected) => (_jsx(Box, { sx: { display: 'flex', flexWrap: 'wrap', gap: 0.5 }, children: selected.map((value) => (_jsx(Chip, { label: value, size: "small" }, value))) })), children: departments.map((dept) => (_jsx(MenuItem, { value: dept, children: _jsxs(Box, { sx: { display: 'flex', alignItems: 'center', gap: 1 }, children: [_jsx("input", { type: "checkbox", checked: departmentFilter.includes(dept), readOnly: true, style: { pointerEvents: 'none' } }), dept] }) }, dept))) })] }), _jsx(Button, { variant: "outlined", onClick: handleClearFilters, disabled: !searchQuery && departmentFilter.length === 0, startIcon: _jsx(Icon, { icon: "mdi:close-circle", width: 18, height: 18 }), children: "Clear All" })] }), departmentFilter.length > 0 && (_jsx(Box, { sx: { mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }, children: departmentFilter.map((dept) => (_jsx(Chip, { label: `Department: ${dept}`, onDelete: () => setDepartmentFilter(prev => prev.filter(d => d !== dept)), deleteIcon: _jsx(Icon, { icon: "mdi:close", width: 18, height: 18 }), color: "primary", size: "small" }, dept))) }))] }), _jsxs(Paper, { children: [_jsx(TableContainer, { children: _jsxs(Table, { children: [_jsx(TableHead, { children: _jsxs(TableRow, { sx: { backgroundColor: '#f5f5f5' }, children: [_jsx(TableCell, { sx: { fontWeight: 600 }, children: "Name" }), _jsx(TableCell, { sx: { fontWeight: 600 }, children: "Email" }), _jsx(TableCell, { sx: { fontWeight: 600 }, children: "Phone" }), _jsx(TableCell, { sx: { fontWeight: 600 }, children: "Department" }), _jsx(TableCell, { sx: { fontWeight: 600 }, children: "Courses" }), _jsx(TableCell, { sx: { fontWeight: 600, textAlign: 'center' }, children: "Student Count" })] }) }), _jsx(TableBody, { children: paginatedInstructors.length > 0 ? (paginatedInstructors.map((instructor) => (_jsxs(TableRow, { hover: true, children: [_jsx(TableCell, { children: _jsx(Stack, { direction: "row", spacing: 1, alignItems: "center", children: _jsx(Typography, { variant: "body2", sx: { fontWeight: 500 }, children: instructor.name }) }) }), _jsx(TableCell, { children: _jsx(Typography, { variant: "body2", sx: { color: '#666' }, children: instructor.email }) }), _jsx(TableCell, { children: instructor.phone }), _jsx(TableCell, { children: _jsx(Chip, { label: instructor.department, size: "small", color: "primary", variant: "outlined" }) }), _jsx(TableCell, { children: _jsx(Stack, { direction: "row", spacing: 0.5, flexWrap: "wrap", useFlexGap: true, children: instructor.courses.map((course, idx) => (_jsx(Chip, { label: course, size: "small", variant: "filled", sx: { backgroundColor: '#e3f2fd', color: '#1976d2' } }, idx))) }) }), _jsx(TableCell, { sx: { textAlign: 'center' }, children: _jsx(Chip, { label: instructor.studentCount, color: "success", size: "small", sx: { fontWeight: 600 } }) })] }, instructor.id)))) : (_jsx(TableRow, { children: _jsx(TableCell, { colSpan: 6, align: "center", sx: { py: 4 }, children: _jsx(Typography, { color: "text.secondary", children: "No instructors found matching your criteria" }) }) })) })] }) }), _jsx(TablePagination, { component: "div", count: filteredInstructors.length, page: page, onPageChange: handleChangePage, rowsPerPage: rowsPerPage, onRowsPerPageChange: handleChangeRowsPerPage, rowsPerPageOptions: [5, 10, 25, 50] })] }), _jsx(Box, { sx: { mt: 2, textAlign: 'center' }, children: _jsxs(Typography, { variant: "body2", color: "text.secondary", children: ["Showing ", paginatedInstructors.length, " of ", filteredInstructors.length, " instructors", filteredInstructors.length !== instructors.length && ` (filtered from ${instructors.length} total)`] }) })] }));
}
