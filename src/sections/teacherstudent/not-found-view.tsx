import React, { useState, useMemo } from 'react';
import {
  Container,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  TextField,
  Button,
  Chip,
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Typography,
  Badge,
  InputAdornment,
} from '@mui/material';
import { Iconify } from 'src/components/iconify';

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

  const handleTabChange = (_: any, newCourse: string) => {
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

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
        My English Classes
      </Typography>

      {/* Course Tabs with Student Count */}
      <Paper sx={{ mb: 3, borderRadius: 2, overflow: 'hidden' }}>
        <Tabs
          value={selectedCourse}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            bgcolor: 'background.paper',
            '& .MuiTab-root': { textTransform: 'none', fontWeight: 500 },
          }}
        >
          {teacherAssignedCourses.map((course) => {
            const count = allStudents.filter(s => s.course === course).length;
            return (
              <Tab
                key={course}
                value={course}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Iconify icon="fluent:class-24-filled" sx={{ fontSize: 20 }} />
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 600, lineHeight: 1.2 }}>
                        {course.split(' - ')[0]}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {course.split(' - ')[1] || course}
                      </Typography>
                    </Box>
                    <Badge badgeContent={count} color="primary" sx={{ ml: 1 }}>
                      <Iconify icon="eva:people-fill" />
                    </Badge>
                  </Box>
                }
              />
            );
          })}
        </Tabs>
      </Paper>

      {/* Filters */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
          <TextField
            label="Search Student"
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Name, email, or phone"
            sx={{ minWidth: 300 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="eva:search-fill" />
                </InputAdornment>
              ),
              endAdornment: searchQuery && (
                <InputAdornment position="end">
                  <Iconify
                    icon="eva:close-fill"
                    sx={{ cursor: 'pointer', color: 'text.disabled' }}
                    onClick={() => setSearchQuery('')}
                  />
                </InputAdornment>
              ),
            }}
          />

          {availableBatches.length > 1 && (
            <FormControl size="small" sx={{ minWidth: 200 }}>
              <InputLabel>Batch</InputLabel>
              <Select value={batchFilter} label="Batch" onChange={(e) => setBatchFilter(e.target.value)}>
                <MenuItem value="">
                  <em>All Batches</em>
                </MenuItem>
                {availableBatches.map(batch => (
                  <MenuItem key={batch} value={batch}>
                    <Iconify icon="eva:bookmark-fill" sx={{ mr: 1, fontSize: 16 }} />
                    {batch}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          <Button
            variant="outlined"
            startIcon={<Iconify icon="eva:trash-2-outline" />}
            onClick={handleClearFilters}
            disabled={!hasActiveFilters}
          >
            Clear Filters
          </Button>
        </Box>

        {/* Active Filter Chips */}
        {hasActiveFilters && (
          <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {batchFilter && (
              <Chip
                label={`Batch: ${batchFilter}`}
                onDelete={() => setBatchFilter('')}
                deleteIcon={<Iconify icon="eva:close-fill" />}
                color="primary"
                size="small"
              />
            )}
          </Box>
        )}
      </Paper>

      {/* Students Table */}
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: 'grey.100' }}>
                <TableCell sx={{ fontWeight: 600 }}>Student Name</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Phone</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Batch</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Level</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedStudents.length > 0 ? (
                paginatedStudents.map((student) => (
                  <TableRow key={student.id} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Iconify icon="eva:person-fill" sx={{ color: 'text.secondary' }} />
                        {student.name}
                      </Box>
                    </TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell>{student.phone}</TableCell>
                    <TableCell>
                      <Chip
                        label={student.batch}
                        size="small"
                        color="info"
                        icon={<Iconify icon="eva:bookmark-fill" />}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip label={student.level} size="small" variant="outlined" />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 6 }}>
                    <Iconify icon="eva:book-open-outline" sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
                    <Typography variant="h6" color="text.secondary">
                      No students found
                    </Typography>
                    <Typography color="text.secondary">
                      {studentsInSelectedCourse.length === 0
                        ? 'This batch is empty'
                        : 'Try adjusting your filters'}
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          count={filteredStudents.length}
          page={page}
          onPageChange={(_, p) => setPage(p)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
          rowsPerPageOptions={[5, 10, 25, 50]}
        />
      </Paper>

      {/* Summary */}
      <Box sx={{ mt: 3, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          Showing <strong>{paginatedStudents.length}</strong> of <strong>{filteredStudents.length}</strong> students in{' '}
          <strong>{selectedCourse.split(' - ')[1] || selectedCourse}</strong>
          {hasActiveFilters && ' • Filtered'}
        </Typography>
      </Box>
    </Container>
  );
}