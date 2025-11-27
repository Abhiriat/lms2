import React, { useState, useMemo } from 'react';
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
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
  InputAdornment,
  Stack,
} from '@mui/material';
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
  const [departmentFilter, setDepartmentFilter] = useState<string[]>([]); // Now an array

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

  const handleChangePage = (event: unknown, newPage: number) => setPage(newPage);
  
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
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

  const getInitials = (name: string) => {
    return name.split(' ').map(part => part[0]).join('').toUpperCase();
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
        Instructor Management
      </Typography>

      {/* Filters Section */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <TextField
            label="Search"
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, email, phone or course"
            sx={{ flexGrow: 1, minWidth: 280 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Icon icon="mdi:magnify" width={20} height={20} style={{ color: '#757575' }} />
                </InputAdornment>
              ),
            }}
          />

          {/* Multi-Select Department Filter */}
          <FormControl size="small" sx={{ minWidth: 240 }}>
            <InputLabel id="department-filter-label">Departments</InputLabel>
            <Select
              labelId="department-filter-label"
              multiple
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value as string[])}
              label="Departments"
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {(selected as string[]).map((value) => (
                    <Chip key={value} label={value} size="small" />
                  ))}
                </Box>
              )}
            >
              {departments.map((dept) => (
                <MenuItem key={dept} value={dept}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <input
                      type="checkbox"
                      checked={departmentFilter.includes(dept)}
                      readOnly
                      style={{ pointerEvents: 'none' }}
                    />
                    {dept}
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            variant="outlined"
            onClick={handleClearFilters}
            disabled={!searchQuery && departmentFilter.length === 0}
            startIcon={<Icon icon="mdi:close-circle" width={18} height={18} />}
          >
            Clear All
          </Button>
        </Box>

        {/* Active Filter Chips (only departments shown as removable tags) */}
        {departmentFilter.length > 0 && (
          <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {departmentFilter.map((dept) => (
              <Chip
                key={dept}
                label={`Department: ${dept}`}
                onDelete={() => setDepartmentFilter(prev => prev.filter(d => d !== dept))}
                deleteIcon={<Icon icon="mdi:close" width={18} height={18} />}
                color="primary"
                size="small"
              />
            ))}
          </Box>
        )}
      </Paper>

      {/* Table */}
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Phone</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Department</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Courses</TableCell>
                <TableCell sx={{ fontWeight: 600, textAlign: 'center' }}>Student Count</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedInstructors.length > 0 ? (
                paginatedInstructors.map((instructor) => (
                  <TableRow key={instructor.id} hover>
                    <TableCell>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {instructor.name}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ color: '#666' }}>
                        {instructor.email}
                      </Typography>
                    </TableCell>
                    <TableCell>{instructor.phone}</TableCell>
                    <TableCell>
                      <Chip label={instructor.department} size="small" color="primary" variant="outlined" />
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
                        {instructor.courses.map((course, idx) => (
                          <Chip
                            key={idx}
                            label={course}
                            size="small"
                            variant="filled"
                            sx={{ backgroundColor: '#e3f2fd', color: '#1976d2' }}
                          />
                        ))}
                      </Stack>
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>
                      <Chip
                        label={instructor.studentCount}
                        color="success"
                        size="small"
                        sx={{ fontWeight: 600 }}
                      />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                    <Typography color="text.secondary">
                      No instructors found matching your criteria
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          count={filteredInstructors.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25, 50]}
        />
      </Paper>

      {/* Results Summary */}
      <Box sx={{ mt: 2, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          Showing {paginatedInstructors.length} of {filteredInstructors.length} instructors
          {filteredInstructors.length !== instructors.length && ` (filtered from ${instructors.length} total)`}
        </Typography>
      </Box>
    </Container>
  );
}