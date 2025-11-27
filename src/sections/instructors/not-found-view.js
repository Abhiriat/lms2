import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useMemo } from 'react';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Paper, TextField, Button, Chip, Box, MenuItem, Select, FormControl, InputLabel, Typography, InputAdornment, Stack, } from '@mui/material';
import { Icon } from '@iconify/react';
const initialInstructors = [
    {
        id: 1,
        name: 'Dr. Harjit Singh',
        email: 'harjit.singh@university.com',
        phone: '+91-98765-0101',
        department: 'English Department',
        courses: [
            'Foundation English (Level 1–3)',
            'Grammar Mastery (Beginner to Advanced)',
            'Vocabulary Booster – 1000+ Words'
        ],
        studentCount: 120
    },
    {
        id: 2,
        name: 'Prof. Jaspreet Kaur',
        email: 'jaspreet.kaur@university.com',
        phone: '+91-98765-0102',
        department: 'English Department',
        courses: [
            'Reading Skills & Comprehension Mastery',
            'Creative Writing: Paragraph, Story, Letter, Notice',
            'Essay Writing & Formal Writing'
        ],
        studentCount: 85
    },
    {
        id: 3,
        name: 'Dr. Navjot Singh',
        email: 'navjot.singh@university.com',
        phone: '+91-98765-0103',
        department: 'Communication Skills',
        courses: [
            'Spoken English & Confidence Building',
            'Pronunciation + Accent Training',
            'Public Speaking & Presentation Skills'
        ],
        studentCount: 145
    },
    {
        id: 4,
        name: 'Prof. Manpreet Kaur',
        email: 'manpreet.kaur@university.com',
        phone: '+91-98765-0104',
        department: 'English & Exam Prep',
        courses: [
            'Exam English for Classes 6–12',
            'Foundation English (Level 1–3)',
            'Grammar Mastery (Beginner to Advanced)'
        ],
        studentCount: 95
    },
    {
        id: 5,
        name: 'Dr. Harman Singh',
        email: 'harman.singh@university.com',
        phone: '+91-98765-0105',
        department: 'Skill Development',
        courses: [
            'Communication Skills for Students',
            'Interview Skills + Resume Building',
            'Critical Thinking & Problem Solving'
        ],
        studentCount: 110
    },
    {
        id: 6,
        name: 'Prof. Navneet Kaur',
        email: 'navneet.kaur@university.com',
        phone: '+91-98765-0106',
        department: 'Skill Development',
        courses: [
            'Digital Literacy & Online Learning Skills',
            'Soft Skills Development',
            'Public Speaking & Presentation Skills'
        ],
        studentCount: 78
    },
    {
        id: 7,
        name: 'Dr. Gurmeet Singh',
        email: 'gurmeet.singh@university.com',
        phone: '+91-98765-0107',
        department: 'English Department',
        courses: [
            'Vocabulary Booster – 1000+ Words',
            'Creative Writing: Paragraph, Story, Letter, Notice',
            'Essay Writing & Formal Writing'
        ],
        studentCount: 102
    },
    {
        id: 8,
        name: 'Prof. Amanpreet Kaur',
        email: 'amanpreet.kaur@university.com',
        phone: '+91-98765-0108',
        department: 'Communication Skills',
        courses: [
            'Spoken English & Confidence Building',
            'Pronunciation + Accent Training',
            'Communication Skills for Students'
        ],
        studentCount: 156
    },
    {
        id: 9,
        name: 'Dr. Tejinder Singh',
        email: 'tejinder.singh@university.com',
        phone: '+91-98765-0109',
        department: 'Exam Preparation',
        courses: [
            'Exam English for Classes 6–12',
            'Reading Skills & Comprehension Mastery',
            'Foundation English (Level 1–3)'
        ],
        studentCount: 65
    },
    {
        id: 10,
        name: 'Prof. Kirandeep Kaur',
        email: 'kirandeep.kaur@university.com',
        phone: '+91-98765-0110',
        department: 'Skill Development',
        courses: [
            'Interview Skills + Resume Building',
            'Soft Skills Development',
            'Critical Thinking & Problem Solving'
        ],
        studentCount: 92
    },
    {
        id: 11,
        name: 'Dr. Ravinder Singh',
        email: 'ravinder.singh@university.com',
        phone: '+91-98765-0111',
        department: 'English & Communication',
        courses: [
            'Public Speaking & Presentation Skills',
            'Spoken English & Confidence Building',
            'Grammar Mastery (Beginner to Advanced)'
        ],
        studentCount: 88
    },
    {
        id: 12,
        name: 'Prof. Baljeet Kaur',
        email: 'baljeet.kaur@university.com',
        phone: '+91-98765-0112',
        department: 'English Department',
        courses: [
            'Creative Writing: Paragraph, Story, Letter, Notice',
            'Essay Writing & Formal Writing',
            'Reading Skills & Comprehension Mastery'
        ],
        studentCount: 103
    }
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
