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
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { Iconify } from 'src/components/iconify';
import { Icon } from '@iconify/react/dist/iconify.js';

// Sample student data
const initialStudents = [
  { 
    id: 1, 
    name: 'Gurpreet Singh', 
    email: 'gurpreet.singh@email.com', 
    phone: '+91-98765-0101', 
    course: 'Foundation English (Level 1–3)', 
    place: 'Amritsar' 
  },
  { 
    id: 2, 
    name: 'Harsimran Kaur', 
    email: 'harsimran.kaur@email.com', 
    phone: '+91-98765-0102', 
    course: 'Grammar Mastery (Beginner to Advanced)', 
    place: 'Ludhiana' 
  },
  { 
    id: 3, 
    name: 'Jagdeep Singh', 
    email: 'jagdeep.s@email.com', 
    phone: '+91-98765-0103', 
    course: 'Vocabulary Booster – 1000+ Words', 
    place: 'Jalandhar' 
  },
  { 
    id: 4, 
    name: 'Simranjeet Kaur', 
    email: 'simranjeet.k@email.com', 
    phone: '+91-98765-0104', 
    course: 'Reading Skills & Comprehension Mastery', 
    place: 'Patiala' 
  },
  { 
    id: 5, 
    name: 'Harjot Singh', 
    email: 'harjot.s@email.com', 
    phone: '+91-98765-0105', 
    course: 'Creative Writing: Paragraph, Story, Letter, Notice', 
    place: 'Mohali' 
  },
  { 
    id: 6, 
    name: 'Navdeep Kaur', 
    email: 'navdeep.k@email.com', 
    phone: '+91-98765-0106', 
    course: 'Essay Writing & Formal Writing', 
    place: 'Bathinda' 
  },
  { 
    id: 7, 
    name: 'Manpreet Singh', 
    email: 'manpreet.s@email.com', 
    phone: '+91-98765-0107', 
    course: 'Spoken English & Confidence Building', 
    place: 'Hoshiarpur' 
  },
  { 
    id: 8, 
    name: 'Amandeep Kaur', 
    email: 'amandeep.k@email.com', 
    phone: '+91-98765-0108', 
    course: 'Pronunciation + Accent Training', 
    place: 'Ferozepur' 
  },
  { 
    id: 9, 
    name: 'Sukhwinder Singh', 
    email: 'sukhwinder.s@email.com', 
    phone: '+91-98765-0109', 
    course: 'Public Speaking & Presentation Skills', 
    place: 'Moga' 
  },
  { 
    id: 10, 
    name: 'Jasleen Kaur', 
    email: 'jasleen.k@email.com', 
    phone: '+91-98765-0110', 
    course: 'Exam English for Classes 6–12', 
    place: 'Ropar' 
  },
  { 
    id: 11, 
    name: 'Amritpal Singh', 
    email: 'amritpal.s@email.com', 
    phone: '+91-98765-0111', 
    course: 'Communication Skills for Students', 
    place: 'Sangrur' 
  },
  { 
    id: 12, 
    name: 'Kirandeep Kaur', 
    email: 'kirandeep.k@email.com', 
    phone: '+91-98765-0112', 
    course: 'Interview Skills + Resume Building', 
    place: 'Barnala' 
  },
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

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
        Student List
      </Typography>

      {/* Filters Section */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
          <TextField
            label="Search"
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, email, or phone"
            sx={{ flexGrow: 1, minWidth: 250 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Icon icon='ic:sharp-search' />
                </InputAdornment>
              ),
            }}
          />

          <FormControl size="small" sx={{ minWidth: 200 }}>
            <InputLabel>Course</InputLabel>
            <Select
              value={courseFilter}
              label="Course"
              onChange={(e) => setCourseFilter(e.target.value)}
            >
              <MenuItem value="">All Courses</MenuItem>
              {courses.map(course => (
                <MenuItem key={course} value={course}>{course}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 180 }}>
            <InputLabel>Place</InputLabel>
            <Select
              value={placeFilter}
              label="Place"
              onChange={(e) => setPlaceFilter(e.target.value)}
            >
              <MenuItem value="">All Places</MenuItem>
              {places.map(place => (
                <MenuItem key={place} value={place}>{place}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            variant="outlined"
            startIcon={<Icon icon='ic:baseline-clear' />}
            onClick={handleClearFilters}
            disabled={!searchQuery && !courseFilter && !placeFilter}
          >
            Clear
          </Button>
        </Box>

        {/* Active Filters Display */}
        {(courseFilter || placeFilter) && (
          <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {courseFilter && (
              <Chip
                label={`Course: ${courseFilter}`}
                onDelete={() => setCourseFilter('')}
                color="primary"
                size="small"
              />
            )}
            {placeFilter && (
              <Chip
                label={`Place: ${placeFilter}`}
                onDelete={() => setPlaceFilter('')}
                color="primary"
                size="small"
              />
            )}
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
                <TableCell sx={{ fontWeight: 600 }}>Course</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Place</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedStudents.length > 0 ? (
                paginatedStudents.map((student) => (
                  <TableRow 
                    key={student.id}
                    hover
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell>{student.phone}</TableCell>
                    <TableCell>
                      <Chip label={student.course} size="small" color="primary" variant="outlined" />
                    </TableCell>
                    <TableCell>{student.place}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                    <Typography color="text.secondary">
                      No students found matching your criteria
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
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25, 50]}
        />
      </Paper>

      {/* Results Summary */}
      <Box sx={{ mt: 2, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          Showing {paginatedStudents.length} of {filteredStudents.length} students
          {filteredStudents.length !== students.length && ` (filtered from ${students.length} total)`}
        </Typography>
      </Box>
    </Container>
  );
}