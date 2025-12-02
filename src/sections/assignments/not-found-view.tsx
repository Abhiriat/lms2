import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Chip,
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  InputAdornment,
  Card,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Stack,
  Select,
  FormControl,
  InputLabel,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from '@mui/material';
import Grid from '@mui/material/GridLegacy'; // Modern Grid
import {
  Add,
  Search,
  ExpandMore,
  PictureAsPdf,
  CheckCircle,
  Schedule,
  Cancel,
  Group,
  Assignment as AssignmentIcon,
  Visibility,
  Download,
  UploadFile,
  InsertDriveFile,
} from '@mui/icons-material';
import { format } from 'date-fns';

interface Student {
  id: string;
  name: string;
  avatar: string;
  status: 'pending' | 'completed' | 'overdue';
  submittedFile?: {
    name: string;
    url: string;
    submittedAt: string;
  };
}

interface Class {
  id: string;
  name: string;
  students: Student[];
}

interface Assignment {
  id: number;
  documentName: string;
  classId: string;
  studentIds: string[];
  dueDate: string;
  createdAt: string;
  file?: File | null;
  fileUrl?: string;
}

export function AssignmentView() {
  const [classes] = useState<Class[]>([
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

  const [assignments, setAssignments] = useState<Assignment[]>([
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
  const [expandedAssignment, setExpandedAssignment] = useState<number | false>(false);
  const [accordionSearch, setAccordionSearch] = useState<Record<number, string>>({});
  const [accordionFilter, setAccordionFilter] = useState<Record<number, string>>({});

  const [newAssignment, setNewAssignment] = useState({
    documentName: '',
    classId: '',
    studentIds: [] as string[],
    dueDate: '',
    file: null as File | null,
    fileName: '',
  });

  const selectedClass = classes.find(c => c.id === newAssignment.classId);

  const toggleStudent = (studentId: string) => {
    setNewAssignment(prev => ({
      ...prev,
      studentIds: prev.studentIds.includes(studentId)
        ? prev.studentIds.filter(id => id !== studentId)
        : [...prev.studentIds, studentId],
    }));
  };

  const selectAllStudents = () => {
    if (!selectedClass) return;
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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    if (
      !newAssignment.documentName ||
      !newAssignment.classId ||
      !newAssignment.dueDate ||
      !newAssignment.file ||
      newAssignment.studentIds.length === 0
    )
      return;

    const newAssign: Assignment = {
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

  const filteredAssignments = assignments.filter(assignment =>
    assignment.documentName.toLowerCase().includes(globalSearchTerm.toLowerCase()) ||
    classes.find(c => c.id === assignment.classId)?.name.toLowerCase().includes(globalSearchTerm.toLowerCase())
  );

  return (
    <Box sx={{ p: 3, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4,gap:2,p:2 }}>
        {[
          { icon: <AssignmentIcon color="primary" />, label: 'Assignments', value: stats.total },
          { icon: <Group sx={{ color: '#7c4dff' }} />, label: 'Classes', value: stats.classesAssigned },
          { icon: <UploadFile color="success" />, label: 'Submitted', value: stats.submitted },
          { icon: <Schedule color="warning" />, label: 'Pending', value: stats.pending },
          { icon: <Cancel color="error" />, label: 'Overdue', value: stats.overdue },
        ].map((stat, i) => (
          <Grid xs={12} sm={6} md={2.2} key={i}>
            <Card sx={{borderRadius:3}}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  {stat.icon}
                  <Box>
                    <Typography variant="h4" fontWeight="bold">{stat.value}</Typography>
                    <Typography variant="body2" color="text.secondary">{stat.label}</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Main Content */}
      <Paper sx={{ borderRadius: 2, overflow: 'hidden' }}>
        <Box sx={{ p: 3, borderBottom: '1px solid #e0e0e0' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h5" fontWeight="bold">Class Assignments</Typography>
            <Button variant="contained" color="warning" startIcon={<Add />} onClick={handleCreateAssignment}>
              Assign Document
            </Button>
          </Box>

          <TextField
            fullWidth
            placeholder="Search assignments or classes..."
            size="small"
            value={globalSearchTerm}
            onChange={(e) => setGlobalSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: <InputAdornment position="start"><Search /></InputAdornment>,
            }}
          />
        </Box>

        <Box sx={{ p: 2 }}>
          {filteredAssignments.length === 0 ? (
            <Typography color="text.secondary" align="center" sx={{ py: 8 }}>
              No assignments yet. Click "Assign Document" to get started!
            </Typography>
          ) : (
            filteredAssignments.map((assignment) => {
              const assignedClass = classes.find(c => c.id === assignment.classId);
              if (!assignedClass) return null;

              const searchTerm = accordionSearch[assignment.id] || '';
              const filterStatus = accordionFilter[assignment.id] || 'all';

              const filteredStudents = assignedClass.students
                .filter(student => assignment.studentIds.includes(student.id))
                .filter(student => {
                  const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase());
                  const matchesFilter = filterStatus === 'all' || student.status === filterStatus;
                  return matchesSearch && matchesFilter;
                });

              return (
                <Accordion
                  key={assignment.id}
                  expanded={expandedAssignment === assignment.id}
                  onChange={() => setExpandedAssignment(expandedAssignment === assignment.id ? false : assignment.id)}
                  sx={{ mb: 2, boxShadow: 3, borderRadius: 2 }}
                >
                  <AccordionSummary expandIcon={<ExpandMore />}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                      <PictureAsPdf color="action" fontSize="large" />
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography fontWeight="bold">{assignment.documentName}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {assignedClass.name} • Due {format(new Date(assignment.dueDate), 'MMM dd, yyyy')} 
                          {' • '} Assigned to {assignment.studentIds.length} student{assignment.studentIds.length !== 1 ? 's' : ''}
                        </Typography>
                      </Box>
                      <Chip label={`${assignment.studentIds.length} assigned`} color="success" size="small" />
                    </Box>
                  </AccordionSummary>

                  <AccordionDetails sx={{ p: 3, pt: 2, backgroundColor: '#fafafa' }}>
                    <Box sx={{ mb: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                      <TextField
                        size="small"
                        placeholder="Search students..."
                        value={accordionSearch[assignment.id] || ''}
                        onChange={(e) => setAccordionSearch(prev => ({ ...prev, [assignment.id]: e.target.value }))}
                        onKeyDown={(e) => e.stopPropagation()}
                        InputProps={{
                          startAdornment: <InputAdornment position="start"><Search fontSize="small" /></InputAdornment>,
                        }}
                        sx={{ flexGrow: 1, minWidth: 250 }}
                      />

                      <FormControl size="small" sx={{ minWidth: 180 }}>
                        <InputLabel>Filter Status</InputLabel>
                        <Select
                          value={accordionFilter[assignment.id] || 'all'}
                          label="Filter Status"
                          onChange={(e) => setAccordionFilter(prev => ({ ...prev, [assignment.id]: e.target.value }))}
                        >
                          <MenuItem value="all">All Students</MenuItem>
                          <MenuItem value="pending">Pending</MenuItem>
                          <MenuItem value="completed">Completed</MenuItem>
                          <MenuItem value="overdue">Overdue</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>

                    <TableContainer>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell><strong>Student</strong></TableCell>
                            <TableCell><strong>Status</strong></TableCell>
                            <TableCell><strong>Submission</strong></TableCell>
                            <TableCell><strong>Submitted On</strong></TableCell>
                            <TableCell align="right"><strong>Actions</strong></TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {filteredStudents.length === 0 ? (
                            <TableRow>
                              <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                                <Typography color="text.secondary">No students assigned or matching filters</Typography>
                              </TableCell>
                            </TableRow>
                          ) : (
                            filteredStudents.map((student) => (
                              <TableRow key={student.id} hover>
                                <TableCell>
                                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                    <Avatar sx={{ width: 36, height: 36, fontSize: '0.9rem', bgcolor: '#1976d2' }}>
                                      {student.avatar}
                                    </Avatar>
                                    <Typography variant="body2" fontWeight="medium">{student.name}</Typography>
                                  </Box>
                                </TableCell>
                                <TableCell>
                                  <Chip
                                    label={student.status.toUpperCase()}
                                    color={student.status === 'completed' ? 'success' : student.status === 'overdue' ? 'error' : 'warning'}
                                    size="small"
                                    sx={{ minWidth: 80 }}
                                  />
                                </TableCell>
                                <TableCell>
                                  {student.submittedFile ? (
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                      <InsertDriveFile fontSize="small" color="action" />
                                      <Typography variant="body2" noWrap sx={{ maxWidth: 200 }}>
                                        {student.submittedFile.name}
                                      </Typography>
                                    </Box>
                                  ) : (
                                    <Typography color="text.secondary" variant="body2">Not submitted</Typography>
                                  )}
                                </TableCell>
                                <TableCell>
                                  {student.submittedFile ? format(new Date(student.submittedFile.submittedAt), 'MMM dd, yyyy') : '—'}
                                </TableCell>
                                <TableCell align="right">
                                  <Stack direction="row" spacing={0.5}>
                                    {student.submittedFile && (
                                      <>
                                        <IconButton size="small" color="primary"><Visibility /></IconButton>
                                        <IconButton size="small" color="success"><Download /></IconButton>
                                      </>
                                    )}
                                  </Stack>
                                </TableCell>
                              </TableRow>
                            ))
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </AccordionDetails>
                </Accordion>
              );
            })
          )}
        </Box>
      </Paper>

      {/* Assign Document Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Assign Document to Students</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, pt: 1 }}>
            {/* File Upload */}
            <Box>
              <input
                accept=".pdf,.doc,.docx,.txt,.pptx"
                style={{ display: 'none' }}
                id="assignment-file-upload"
                type="file"
                onChange={handleFileUpload}
              />
              <label htmlFor="assignment-file-upload">
                <Button variant="outlined" color='success' component="span" startIcon={<UploadFile />} fullWidth sx={{ py: 2, justifyContent: 'flex-start' }}>
                  {newAssignment.fileName || 'Click to upload document (PDF, DOCX, etc.)'}
                </Button>
              </label>
              {newAssignment.fileName && (
                <Typography variant="caption" color="success.main" sx={{ ml: 2, mt: 1 }}>
                  Selected: {newAssignment.fileName}
                </Typography>
              )}
            </Box>

            <TextField
              label="Document Title"
              fullWidth
              value={newAssignment.documentName}
              onChange={(e) => setNewAssignment(prev => ({ ...prev, documentName: e.target.value }))}
            />

            {/* Class Selection */}
            <FormControl fullWidth>
              <InputLabel>Assign to Class</InputLabel>
              <Select
                value={newAssignment.classId}
                label="Assign to Class"
                onChange={(e) => {
                  setNewAssignment(prev => ({
                    ...prev,
                    classId: e.target.value,
                    studentIds: [],
                  }));
                }}
              >
                {classes.map(cls => (
                  <MenuItem key={cls.id} value={cls.id}>
                    {cls.name} ({cls.students.length} students)
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Student Selection */}
            {newAssignment.classId && selectedClass && (
              <Paper variant="outlined" sx={{ p: 2, maxHeight: 320, overflow: 'auto', backgroundColor: '#fafafa' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="subtitle2">
                    Select Students ({newAssignment.studentIds.length}/{selectedClass.students.length})
                  </Typography>
                  <Box>
                    <Button size="small" onClick={selectAllStudents}>Select All</Button>
                    <Button size="small" onClick={deselectAllStudents}>Clear</Button>
                  </Box>
                </Box>

                <FormGroup>
                  {selectedClass.students.map(student => (
                    <FormControlLabel
                      key={student.id}
                      control={
                        <Checkbox
                          checked={newAssignment.studentIds.includes(student.id)}
                          onChange={() => toggleStudent(student.id)}
                          size="small"
                        />
                      }
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Avatar sx={{ width: 28, height: 28, fontSize: '0.75rem' }}>{student.avatar}</Avatar>
                          <Typography variant="body2">{student.name}</Typography>
                        </Box>
                      }
                      sx={{ ml: 0.5 }}
                    />
                  ))}
                </FormGroup>
              </Paper>
            )}

            <TextField
              label="Due Date"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={newAssignment.dueDate}
              onChange={(e) => setNewAssignment(prev => ({ ...prev, dueDate: e.target.value }))}
            />
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleCloseDialog} color='warning'>Cancel</Button>
          <Button
            variant="contained"
            color='success'
            onClick={handleSubmitAssignment}
            disabled={
              !newAssignment.file ||
              !newAssignment.documentName ||
              !newAssignment.classId ||
              !newAssignment.dueDate ||
              newAssignment.studentIds.length === 0
            }
          >
            Assign to Selected Students
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}