import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { Box, Paper, Typography, Button, Chip, Avatar, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem, InputAdornment, Card, CardContent, Accordion, AccordionSummary, AccordionDetails, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Stack, Select, FormControl, InputLabel, Checkbox, FormControlLabel, FormGroup, } from '@mui/material';
import Grid from '@mui/material/GridLegacy'; // Modern Grid
import { Add, Search, ExpandMore, PictureAsPdf, Schedule, Cancel, Group, Assignment as AssignmentIcon, Visibility, Download, UploadFile, InsertDriveFile, } from '@mui/icons-material';
import { format } from 'date-fns';
export function AssignmentView() {
    const [classes] = useState([
        {
            id: 'class-1',
            name: 'Grade 10 - Science A',
            students: [
                { id: 's1', name: 'Gurpreet Kaur', avatar: 'GK', status: 'overdue' },
                { id: 's2', name: 'Jaswinder Singh', avatar: 'JS', status: 'pending' },
                { id: 's3', name: 'Harmanpreet Singh', avatar: 'HS', status: 'completed', submittedFile: { name: 'Lab_Report_Harman.pdf', url: '#', submittedAt: '2024-11-27' } },
                { id: 's6', name: 'Simranjeet Kaur', avatar: 'SK', status: 'pending' },
                { id: 's7', name: 'Manpreet Singh', avatar: 'MS', status: 'completed', submittedFile: { name: 'Report_Manpreet.docx', url: '#', submittedAt: '2024-11-28' } },
            ],
        },
        {
            id: 'class-2',
            name: 'Grade 11 - Mathematics B',
            students: [
                { id: 's4', name: 'Amarjeet Singh', avatar: 'AS', status: 'completed', submittedFile: { name: 'Math_Assignment_Amarjeet.docx', url: '#', submittedAt: '2024-11-29' } },
                { id: 's5', name: 'Navneet Kaur', avatar: 'NK', status: 'pending' },
                { id: 's8', name: 'Sukhwinder Singh', avatar: 'SS', status: 'overdue' },
                { id: 's9', name: 'Kiranpreet Kaur', avatar: 'KK', status: 'pending' },
                { id: 's10', name: 'Balwinder Singh', avatar: 'BS', status: 'completed', submittedFile: { name: 'Assignment_Balwinder.pdf', url: '#', submittedAt: '2024-11-30' } },
            ],
        },
    ]);
    const [assignments, setAssignments] = useState([
        {
            id: 1,
            documentName: 'Grammar Mastery (Beginner to Advanced)',
            classId: 'class-1',
            studentIds: ['s1', 's2', 's3', 's6', 's7'],
            dueDate: '2024-12-05',
            createdAt: '2024-11-20',
            fileUrl: '/sample-lab-safety.pdf',
        },
        {
            id: 2,
            documentName: 'Reading Skills & Comprehension Mastery',
            classId: 'class-2',
            studentIds: ['s4', 's5', 's10'],
            dueDate: '2024-12-10',
            createdAt: '2024-11-25',
            fileUrl: '/sample-form.pdf',
        },
    ]);
    const [openDialog, setOpenDialog] = useState(false);
    const [globalSearchTerm, setGlobalSearchTerm] = useState('');
    const [expandedAssignment, setExpandedAssignment] = useState(false);
    const [accordionSearch, setAccordionSearch] = useState({});
    const [accordionFilter, setAccordionFilter] = useState({});
    const [newAssignment, setNewAssignment] = useState({
        documentName: '',
        classId: '',
        studentIds: [],
        dueDate: '',
        file: null,
        fileName: '',
    });
    const selectedClass = classes.find(c => c.id === newAssignment.classId);
    const toggleStudent = (studentId) => {
        setNewAssignment(prev => ({
            ...prev,
            studentIds: prev.studentIds.includes(studentId)
                ? prev.studentIds.filter(id => id !== studentId)
                : [...prev.studentIds, studentId],
        }));
    };
    const selectAllStudents = () => {
        if (!selectedClass)
            return;
        setNewAssignment(prev => ({
            ...prev,
            studentIds: selectedClass.students.map(s => s.id),
        }));
    };
    const deselectAllStudents = () => {
        setNewAssignment(prev => ({ ...prev, studentIds: [] }));
    };
    const stats = {
        total: assignments.length,
        classesAssigned: new Set(assignments.map(a => a.classId)).size,
        totalStudentsAssigned: assignments.reduce((acc, a) => acc + a.studentIds.length, 0),
        submitted: classes.flatMap(c => c.students).filter(s => s.submittedFile).length,
        pending: classes.flatMap(c => c.students).filter(s => s.status === 'pending').length,
        overdue: classes.flatMap(c => c.students).filter(s => s.status === 'overdue').length,
    };
    const handleFileUpload = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setNewAssignment(prev => ({
                ...prev,
                file,
                fileName: file.name,
                documentName: prev.documentName || file.name.split('.').slice(0, -1).join('.'),
            }));
        }
    };
    const handleCreateAssignment = () => setOpenDialog(true);
    const handleCloseDialog = () => {
        setOpenDialog(false);
        setNewAssignment({
            documentName: '',
            classId: '',
            studentIds: [],
            dueDate: '',
            file: null,
            fileName: '',
        });
    };
    const handleSubmitAssignment = () => {
        if (!newAssignment.documentName ||
            !newAssignment.classId ||
            !newAssignment.dueDate ||
            !newAssignment.file ||
            newAssignment.studentIds.length === 0)
            return;
        const newAssign = {
            id: Date.now(),
            documentName: newAssignment.documentName,
            classId: newAssignment.classId,
            studentIds: newAssignment.studentIds,
            dueDate: newAssignment.dueDate,
            createdAt: new Date().toISOString().split('T')[0],
            file: newAssignment.file,
            fileUrl: URL.createObjectURL(newAssignment.file),
        };
        setAssignments(prev => [...prev, newAssign]);
        handleCloseDialog();
    };
    const filteredAssignments = assignments.filter(assignment => assignment.documentName.toLowerCase().includes(globalSearchTerm.toLowerCase()) ||
        classes.find(c => c.id === assignment.classId)?.name.toLowerCase().includes(globalSearchTerm.toLowerCase()));
    return (_jsxs(Box, { sx: { p: 3, backgroundColor: '#f5f5f5', minHeight: '100vh' }, children: [_jsx(Grid, { container: true, spacing: 3, sx: { mb: 4, gap: 2, p: 2 }, children: [
                    { icon: _jsx(AssignmentIcon, { color: "primary" }), label: 'Assignments', value: stats.total },
                    { icon: _jsx(Group, { sx: { color: '#7c4dff' } }), label: 'Classes', value: stats.classesAssigned },
                    { icon: _jsx(UploadFile, { color: "success" }), label: 'Submitted', value: stats.submitted },
                    { icon: _jsx(Schedule, { color: "warning" }), label: 'Pending', value: stats.pending },
                    { icon: _jsx(Cancel, { color: "error" }), label: 'Overdue', value: stats.overdue },
                ].map((stat, i) => (_jsx(Grid, { xs: 12, sm: 6, md: 2.2, children: _jsx(Card, { sx: { borderRadius: 3 }, children: _jsx(CardContent, { children: _jsxs(Box, { sx: { display: 'flex', alignItems: 'center', gap: 2 }, children: [stat.icon, _jsxs(Box, { children: [_jsx(Typography, { variant: "h4", fontWeight: "bold", children: stat.value }), _jsx(Typography, { variant: "body2", color: "text.secondary", children: stat.label })] })] }) }) }) }, i))) }), _jsxs(Paper, { sx: { borderRadius: 2, overflow: 'hidden' }, children: [_jsxs(Box, { sx: { p: 3, borderBottom: '1px solid #e0e0e0' }, children: [_jsxs(Box, { sx: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }, children: [_jsx(Typography, { variant: "h5", fontWeight: "bold", children: "Class Assignments" }), _jsx(Button, { variant: "contained", color: "warning", startIcon: _jsx(Add, {}), onClick: handleCreateAssignment, children: "Assign Document" })] }), _jsx(TextField, { fullWidth: true, placeholder: "Search assignments or classes...", size: "small", value: globalSearchTerm, onChange: (e) => setGlobalSearchTerm(e.target.value), InputProps: {
                                    startAdornment: _jsx(InputAdornment, { position: "start", children: _jsx(Search, {}) }),
                                } })] }), _jsx(Box, { sx: { p: 2 }, children: filteredAssignments.length === 0 ? (_jsx(Typography, { color: "text.secondary", align: "center", sx: { py: 8 }, children: "No assignments yet. Click \"Assign Document\" to get started!" })) : (filteredAssignments.map((assignment) => {
                            const assignedClass = classes.find(c => c.id === assignment.classId);
                            if (!assignedClass)
                                return null;
                            const searchTerm = accordionSearch[assignment.id] || '';
                            const filterStatus = accordionFilter[assignment.id] || 'all';
                            const filteredStudents = assignedClass.students
                                .filter(student => assignment.studentIds.includes(student.id))
                                .filter(student => {
                                const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase());
                                const matchesFilter = filterStatus === 'all' || student.status === filterStatus;
                                return matchesSearch && matchesFilter;
                            });
                            return (_jsxs(Accordion, { expanded: expandedAssignment === assignment.id, onChange: () => setExpandedAssignment(expandedAssignment === assignment.id ? false : assignment.id), sx: { mb: 2, boxShadow: 3, borderRadius: 2 }, children: [_jsx(AccordionSummary, { expandIcon: _jsx(ExpandMore, {}), children: _jsxs(Box, { sx: { display: 'flex', alignItems: 'center', gap: 2, width: '100%' }, children: [_jsx(PictureAsPdf, { color: "action", fontSize: "large" }), _jsxs(Box, { sx: { flexGrow: 1 }, children: [_jsx(Typography, { fontWeight: "bold", children: assignment.documentName }), _jsxs(Typography, { variant: "body2", color: "text.secondary", children: [assignedClass.name, " \u2022 Due ", format(new Date(assignment.dueDate), 'MMM dd, yyyy'), ' • ', " Assigned to ", assignment.studentIds.length, " student", assignment.studentIds.length !== 1 ? 's' : ''] })] }), _jsx(Chip, { label: `${assignment.studentIds.length} assigned`, color: "success", size: "small" })] }) }), _jsxs(AccordionDetails, { sx: { p: 3, pt: 2, backgroundColor: '#fafafa' }, children: [_jsxs(Box, { sx: { mb: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }, children: [_jsx(TextField, { size: "small", placeholder: "Search students...", value: accordionSearch[assignment.id] || '', onChange: (e) => setAccordionSearch(prev => ({ ...prev, [assignment.id]: e.target.value })), onKeyDown: (e) => e.stopPropagation(), InputProps: {
                                                            startAdornment: _jsx(InputAdornment, { position: "start", children: _jsx(Search, { fontSize: "small" }) }),
                                                        }, sx: { flexGrow: 1, minWidth: 250 } }), _jsxs(FormControl, { size: "small", sx: { minWidth: 180 }, children: [_jsx(InputLabel, { children: "Filter Status" }), _jsxs(Select, { value: accordionFilter[assignment.id] || 'all', label: "Filter Status", onChange: (e) => setAccordionFilter(prev => ({ ...prev, [assignment.id]: e.target.value })), children: [_jsx(MenuItem, { value: "all", children: "All Students" }), _jsx(MenuItem, { value: "pending", children: "Pending" }), _jsx(MenuItem, { value: "completed", children: "Completed" }), _jsx(MenuItem, { value: "overdue", children: "Overdue" })] })] })] }), _jsx(TableContainer, { children: _jsxs(Table, { size: "small", children: [_jsx(TableHead, { children: _jsxs(TableRow, { children: [_jsx(TableCell, { children: _jsx("strong", { children: "Student" }) }), _jsx(TableCell, { children: _jsx("strong", { children: "Status" }) }), _jsx(TableCell, { children: _jsx("strong", { children: "Submission" }) }), _jsx(TableCell, { children: _jsx("strong", { children: "Submitted On" }) }), _jsx(TableCell, { align: "right", children: _jsx("strong", { children: "Actions" }) })] }) }), _jsx(TableBody, { children: filteredStudents.length === 0 ? (_jsx(TableRow, { children: _jsx(TableCell, { colSpan: 5, align: "center", sx: { py: 4 }, children: _jsx(Typography, { color: "text.secondary", children: "No students assigned or matching filters" }) }) })) : (filteredStudents.map((student) => (_jsxs(TableRow, { hover: true, children: [_jsx(TableCell, { children: _jsxs(Box, { sx: { display: 'flex', alignItems: 'center', gap: 1.5 }, children: [_jsx(Avatar, { sx: { width: 36, height: 36, fontSize: '0.9rem', bgcolor: '#1976d2' }, children: student.avatar }), _jsx(Typography, { variant: "body2", fontWeight: "medium", children: student.name })] }) }), _jsx(TableCell, { children: _jsx(Chip, { label: student.status.toUpperCase(), color: student.status === 'completed' ? 'success' : student.status === 'overdue' ? 'error' : 'warning', size: "small", sx: { minWidth: 80 } }) }), _jsx(TableCell, { children: student.submittedFile ? (_jsxs(Box, { sx: { display: 'flex', alignItems: 'center', gap: 1 }, children: [_jsx(InsertDriveFile, { fontSize: "small", color: "action" }), _jsx(Typography, { variant: "body2", noWrap: true, sx: { maxWidth: 200 }, children: student.submittedFile.name })] })) : (_jsx(Typography, { color: "text.secondary", variant: "body2", children: "Not submitted" })) }), _jsx(TableCell, { children: student.submittedFile ? format(new Date(student.submittedFile.submittedAt), 'MMM dd, yyyy') : '—' }), _jsx(TableCell, { align: "right", children: _jsx(Stack, { direction: "row", spacing: 0.5, children: student.submittedFile && (_jsxs(_Fragment, { children: [_jsx(IconButton, { size: "small", color: "primary", children: _jsx(Visibility, {}) }), _jsx(IconButton, { size: "small", color: "success", children: _jsx(Download, {}) })] })) }) })] }, student.id)))) })] }) })] })] }, assignment.id));
                        })) })] }), _jsxs(Dialog, { open: openDialog, onClose: handleCloseDialog, maxWidth: "sm", fullWidth: true, children: [_jsx(DialogTitle, { children: "Assign Document to Students" }), _jsx(DialogContent, { children: _jsxs(Box, { sx: { display: 'flex', flexDirection: 'column', gap: 2.5, pt: 1 }, children: [_jsxs(Box, { children: [_jsx("input", { accept: ".pdf,.doc,.docx,.txt,.pptx", style: { display: 'none' }, id: "assignment-file-upload", type: "file", onChange: handleFileUpload }), _jsx("label", { htmlFor: "assignment-file-upload", children: _jsx(Button, { variant: "outlined", color: 'success', component: "span", startIcon: _jsx(UploadFile, {}), fullWidth: true, sx: { py: 2, justifyContent: 'flex-start' }, children: newAssignment.fileName || 'Click to upload document (PDF, DOCX, etc.)' }) }), newAssignment.fileName && (_jsxs(Typography, { variant: "caption", color: "success.main", sx: { ml: 2, mt: 1 }, children: ["Selected: ", newAssignment.fileName] }))] }), _jsx(TextField, { label: "Document Title", fullWidth: true, value: newAssignment.documentName, onChange: (e) => setNewAssignment(prev => ({ ...prev, documentName: e.target.value })) }), _jsxs(FormControl, { fullWidth: true, children: [_jsx(InputLabel, { children: "Assign to Class" }), _jsx(Select, { value: newAssignment.classId, label: "Assign to Class", onChange: (e) => {
                                                setNewAssignment(prev => ({
                                                    ...prev,
                                                    classId: e.target.value,
                                                    studentIds: [],
                                                }));
                                            }, children: classes.map(cls => (_jsxs(MenuItem, { value: cls.id, children: [cls.name, " (", cls.students.length, " students)"] }, cls.id))) })] }), newAssignment.classId && selectedClass && (_jsxs(Paper, { variant: "outlined", sx: { p: 2, maxHeight: 320, overflow: 'auto', backgroundColor: '#fafafa' }, children: [_jsxs(Box, { sx: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }, children: [_jsxs(Typography, { variant: "subtitle2", children: ["Select Students (", newAssignment.studentIds.length, "/", selectedClass.students.length, ")"] }), _jsxs(Box, { children: [_jsx(Button, { size: "small", onClick: selectAllStudents, children: "Select All" }), _jsx(Button, { size: "small", onClick: deselectAllStudents, children: "Clear" })] })] }), _jsx(FormGroup, { children: selectedClass.students.map(student => (_jsx(FormControlLabel, { control: _jsx(Checkbox, { checked: newAssignment.studentIds.includes(student.id), onChange: () => toggleStudent(student.id), size: "small" }), label: _jsxs(Box, { sx: { display: 'flex', alignItems: 'center', gap: 1 }, children: [_jsx(Avatar, { sx: { width: 28, height: 28, fontSize: '0.75rem' }, children: student.avatar }), _jsx(Typography, { variant: "body2", children: student.name })] }), sx: { ml: 0.5 } }, student.id))) })] })), _jsx(TextField, { label: "Due Date", type: "date", fullWidth: true, InputLabelProps: { shrink: true }, value: newAssignment.dueDate, onChange: (e) => setNewAssignment(prev => ({ ...prev, dueDate: e.target.value })) })] }) }), _jsxs(DialogActions, { sx: { p: 3 }, children: [_jsx(Button, { onClick: handleCloseDialog, color: 'warning', children: "Cancel" }), _jsx(Button, { variant: "contained", color: 'success', onClick: handleSubmitAssignment, disabled: !newAssignment.file ||
                                    !newAssignment.documentName ||
                                    !newAssignment.classId ||
                                    !newAssignment.dueDate ||
                                    newAssignment.studentIds.length === 0, children: "Assign to Selected Students" })] })] })] }));
}
