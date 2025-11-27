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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
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
  const [courseFilter, setCourseFilter] = useState<string[]>([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
const navigate=useNavigate()
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

  const handleChangePage = (event: unknown, newPage: number) => setPage(newPage);

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setCourseFilter([]);
    setPage(0);
  };

 const handleViewDetails = (id: number) => {
  navigate(`/quizdetailresultview/${id}`);
};

  

  const paginatedQuizzes = useMemo(() => {
    const startIndex = page * rowsPerPage;
    return filteredQuizzes.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredQuizzes, page, rowsPerPage]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return '#4caf50';
    if (score >= 80) return '#2196f3';
    if (score >= 70) return '#ff9800';
    return '#f44336';
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
        Quiz Results
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
            placeholder="Search by quiz name or course"
            sx={{ flexGrow: 1, minWidth: 280 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Icon icon="mdi:magnify" width={20} height={20} style={{ color: '#757575' }} />
                </InputAdornment>
              ),
            }}
          />

          {/* Multi-Select Course Filter */}
          <FormControl size="small" sx={{ minWidth: 240 }}>
            <InputLabel id="course-filter-label">Courses</InputLabel>
            <Select
              labelId="course-filter-label"
              multiple
              value={courseFilter}
              onChange={(e) => setCourseFilter(e.target.value as string[])}
              label="Courses"
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {(selected as string[]).map((value) => (
                    <Chip key={value} label={value} size="small" />
                  ))}
                </Box>
              )}
            >
              {courses.map((course) => (
                <MenuItem key={course} value={course}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <input
                      type="checkbox"
                      checked={courseFilter.includes(course)}
                      readOnly
                      style={{ pointerEvents: 'none' }}
                    />
                    {course}
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            variant="outlined"
            onClick={handleClearFilters}
            disabled={!searchQuery && courseFilter.length === 0}
            startIcon={<Icon icon="mdi:close-circle" width={18} height={18} />}
          >
            Clear All
          </Button>
        </Box>

        {/* Active Filter Chips */}
        {courseFilter.length > 0 && (
          <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {courseFilter.map((course) => (
              <Chip
                key={course}
                label={`Course: ${course}`}
                onDelete={() => setCourseFilter(prev => prev.filter(c => c !== course))}
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
                <TableCell sx={{ fontWeight: 600 }}>Quiz Name</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Assigned Courses</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Start Date</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>End Date</TableCell>
                <TableCell sx={{ fontWeight: 600, textAlign: 'center' }}>Score</TableCell>
                <TableCell sx={{ fontWeight: 600, textAlign: 'center' }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedQuizzes.length > 0 ? (
                paginatedQuizzes.map((quiz) => (
                  <TableRow key={quiz.id} hover>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {quiz.name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
                        {quiz.courses.map((course, idx) => (
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
                    <TableCell>
                      <Typography variant="body2">
                        {formatDate(quiz.startDate)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {formatDate(quiz.endDate)}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>
                      <Chip
                        label={`${quiz.score}%`}
                        sx={{
                          backgroundColor: getScoreColor(quiz.score),
                          color: 'white',
                          fontWeight: 600,
                        }}
                        size="small"
                      />
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => handleViewDetails(quiz.id)}
                        startIcon={<Icon icon="mdi:information-outline" width={18} height={18} />}
                        sx={{ textTransform: 'none' }}
                      >
                        Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                    <Typography color="text.secondary">
                      No quizzes found matching your criteria
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          count={filteredQuizzes.length}
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
          Showing {paginatedQuizzes.length} of {filteredQuizzes.length} quizzes
          {filteredQuizzes.length !== quizzes.length && ` (filtered from ${quizzes.length} total)`}
        </Typography>
      </Box>

   
    </Container>
  );
}