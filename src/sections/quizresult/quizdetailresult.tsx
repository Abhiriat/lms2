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
  Card,
  CardContent,
  LinearProgress,
  
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import Grid from '@mui/material/GridLegacy';
// Iconify Icons
import { Icon } from '@iconify/react';
const initialQuizzes = [
  { id: 1, name: 'Data Structures Midterm', courses: ['Data Structures', 'Algorithms'], startDate: '2024-10-01', endDate: '2024-10-08', totalQuestions: 50, attemptedQuestions: 48, correctAnswers: 42, score: 84, topics: ['Arrays', 'Linked Lists', 'Trees', 'Graphs'] },
  { id: 2, name: 'Web Development Quiz 1', courses: ['Web Development'], startDate: '2024-10-05', endDate: '2024-10-12', totalQuestions: 30, attemptedQuestions: 30, correctAnswers: 27, score: 90, topics: ['HTML', 'CSS', 'JavaScript', 'React'] },
  { id: 3, name: 'Database Design Final', courses: ['Database Design', 'Data Structures'], startDate: '2024-10-10', endDate: '2024-10-17', totalQuestions: 40, attemptedQuestions: 40, correctAnswers: 36, score: 90, topics: ['SQL', 'Normalization', 'Indexing', 'Transactions'] },
];

const initialStudents = [
  { id: 101, name: 'Aditya Kumar', email: 'aditya@example.com', score: 42, marksObtained: 42, totalMarks: 50, attemptedQues: 48, correctAns: 42, accuracy: 87.5, timeSpent: 45, status: 'Completed' },
  { id: 102, name: 'Priya Singh', email: 'priya@example.com', score: 38, marksObtained: 38, totalMarks: 50, attemptedQues: 46, correctAns: 38, accuracy: 82.6, timeSpent: 52, status: 'Completed' },
  { id: 103, name: 'Raj Patel', email: 'raj@example.com', score: 45, marksObtained: 45, totalMarks: 50, attemptedQues: 50, correctAns: 45, accuracy: 90, timeSpent: 40, status: 'Completed' },
  { id: 104, name: 'Neha Gupta', email: 'neha@example.com', score: 35, marksObtained: 35, totalMarks: 50, attemptedQues: 40, correctAns: 35, accuracy: 87.5, timeSpent: 48, status: 'Completed' },
  { id: 105, name: 'Arjun Verma', email: 'arjun@example.com', score: 40, marksObtained: 40, totalMarks: 50, attemptedQues: 48, correctAns: 40, accuracy: 83.3, timeSpent: 50, status: 'Completed' },
  { id: 106, name: 'Sneha Sharma', email: 'sneha@example.com', score: 48, marksObtained: 48, totalMarks: 50, attemptedQues: 50, correctAns: 48, accuracy: 96, timeSpent: 35, status: 'Completed' },
];

export function QuizDetailResultView() {
  const [selectedQuizId] = useState(1);
  const [students] = useState(initialStudents);
  const [quizzes] = useState(initialQuizzes);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('score');
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const currentQuiz = quizzes.find(q => q.id === selectedQuizId);

  const filteredStudents = useMemo(() => {
    return students
      .filter(student => {
        const matchesSearch = searchQuery === '' ||
          student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          student.email.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesSearch;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'score': return b.score - a.score;
          case 'name': return a.name.localeCompare(b.name);
          case 'accuracy': return b.accuracy - a.accuracy;
          default: return 0;
        }
      });
  }, [students, searchQuery, sortBy]);

  const handleChangePage = (_: unknown, newPage: number) => setPage(newPage);
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedStudents = useMemo(() => {
    const startIndex = page * rowsPerPage;
    return filteredStudents.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredStudents, page, rowsPerPage]);

  const calculateStats = useMemo(() => {
    if (students.length === 0) return { avgScore: 0, highestScore: 0, lowestScore: 0, passCount: 0 };
    const scores = students.map(s => s.score);
    return {
      avgScore: (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1),
      highestScore: Math.max(...scores),
      lowestScore: Math.min(...scores),
      passCount: scores.filter(s => s >= 40).length,
    };
  }, [students]);

  const getScoreColor = (score: number) => {
    if (score >= 45) return '#4caf50';
    if (score >= 40) return '#2196f3';
    if (score >= 35) return '#ff9800';
    return '#f44336';
  };

  const getStatusColor = (accuracy: number): 'success' | 'info' | 'warning' | 'error' => {
    if (accuracy >= 90) return 'success';
    if (accuracy >= 75) return 'info';
    if (accuracy >= 60) return 'warning';
    return 'error';
  };

  const handleViewDetails = (student: any) => {
    setSelectedStudent(student);
    setOpenDialog(true);
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Button
          startIcon={<Icon icon="mdi:arrow-left" width={20} height={20} />}
          sx={{ mb: 2, textTransform: 'none' }}
        >
          Back to Quizzes
        </Button>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          {currentQuiz?.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Results & Performance Analytics
        </Typography>
      </Box>

      {/* Quiz Info Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Icon icon="mdi:account-group" width={40} height={40} style={{ color: '#1976d2' }} />
              <Box>
                <Typography color="textSecondary" gutterBottom>
                  Total Students
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  {students.length}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Icon icon="mdi:chart-line" width={40} height={40} style={{ color: '#4caf50' }} />
              <Box>
                <Typography color="textSecondary" gutterBottom>
                  Average Score
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  {calculateStats.avgScore}%
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Icon icon="mdi:trophy" width={40} height={40} style={{ color: '#ff9800' }} />
              <Box>
                <Typography color="textSecondary" gutterBottom>
                  Highest Score
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  {calculateStats.highestScore}%
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Icon icon="mdi:check-circle" width={40} height={40} style={{ color: '#2196f3' }} />
              <Box>
                <Typography color="textSecondary" gutterBottom>
                  Pass Rate
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  {((calculateStats.passCount / students.length) * 100).toFixed(0)}%
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Quiz Metadata */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Icon icon="mdi:help-circle-outline" width={24} height={24} style={{ color: '#757575' }} />
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Total Questions
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {currentQuiz?.totalQuestions}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Icon icon="mdi:clock-outline" width={24} height={24} style={{ color: '#757575' }} />
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Duration
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Oct 1 – Oct 8, 2024
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Box>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Topics Covered
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {currentQuiz?.topics?.map((topic, idx) => (
                  <Chip key={idx} label={topic} size="small" variant="outlined" />
                ))}
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Filter & Sort */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <TextField
            label="Search Student"
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name or email"
            sx={{ flexGrow: 1, minWidth: 280 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Icon icon="mdi:magnify" width={20} height={20} style={{ color: '#757575' }} />
                </InputAdornment>
              ),
            }}
          />

          <FormControl size="small" sx={{ minWidth: 160 }}>
            <InputLabel>Sort By</InputLabel>
            <Select value={sortBy} onChange={(e) => setSortBy(e.target.value as string)} label="Sort By">
              <MenuItem value="score">Highest Score</MenuItem>
              <MenuItem value="name">Name (A-Z)</MenuItem>
              <MenuItem value="accuracy">Accuracy</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Paper>

      {/* Results Table */}
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                <TableCell sx={{ fontWeight: 700 }}>Student Name</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Email</TableCell>
                <TableCell sx={{ fontWeight: 700, textAlign: 'center' }}>Marks</TableCell>
                <TableCell sx={{ fontWeight: 700, textAlign: 'center' }}>Accuracy %</TableCell>
                <TableCell sx={{ fontWeight: 700, textAlign: 'center' }}>Attempted</TableCell>
                <TableCell sx={{ fontWeight: 700, textAlign: 'center' }}>Time (min)</TableCell>
                <TableCell sx={{ fontWeight: 700, textAlign: 'center' }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 700, textAlign: 'center' }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedStudents.length > 0 ? (
                paginatedStudents.map((student) => (
                  <TableRow key={student.id} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Icon icon="mdi:account-circle" width={32} height={32} style={{ color: '#757575' }} />
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {student.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {student.email}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>
                      <Chip
                        label={`${student.marksObtained}/${student.totalMarks}`}
                        sx={{
                          backgroundColor: getScoreColor(student.score),
                          color: 'white',
                          fontWeight: 600,
                        }}
                        size="small"
                      />
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                        <Box sx={{ width: 70 }}>
                          <LinearProgress
                            variant="determinate"
                            value={student.accuracy}
                            sx={{
                              height: 8,
                              borderRadius: 4,
                              backgroundColor: '#e0e0e0',
                              '& .MuiLinearProgress-bar': {
                                backgroundColor: student.accuracy >= 80 ? '#4caf50' : student.accuracy >= 60 ? '#ff9800' : '#f44336',
                              },
                            }}
                          />
                        </Box>
                        <Typography variant="body2" sx={{ fontWeight: 600, minWidth: 40 }}>
                          {student.accuracy}%
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>
                      <Typography variant="body2">
                        {student.attemptedQues}/{currentQuiz?.totalQuestions}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>
                      <Typography variant="body2">{student.timeSpent}</Typography>
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>
                      <Chip
                        label={student.status}
                        size="small"
                        color={getStatusColor(student.accuracy)}
                        variant="filled"
                      />
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleViewDetails(student)}
                        startIcon={<Icon icon="mdi:eye" width={18} height={18} />}
                        sx={{ textTransform: 'none' }}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} align="center" sx={{ py: 6 }}>
                    <Typography color="text.secondary">
                      No students found matching your search
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
      <Box sx={{ mt: 3, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          Showing {paginatedStudents.length} of {filteredStudents.length} students
        </Typography>
      </Box>

      {/* Student Detail Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Icon icon="mdi:account-details" width={28} height={28} />
            Student Performance Details
          </Box>
        </DialogTitle>
        <DialogContent>
          {selectedStudent && (
            <Box sx={{ pt: 2 }}>
              <Stack spacing={3}>
                <Box>
                  <Typography variant="body2" color="text.secondary">Name</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>{selectedStudent.name}</Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">Email</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>{selectedStudent.email}</Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">Marks Obtained</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {selectedStudent.marksObtained} / {selectedStudent.totalMarks}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">Accuracy</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: getScoreColor(selectedStudent.score) }}>
                    {selectedStudent.accuracy}%
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">Questions Attempted</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {selectedStudent.attemptedQues} / {currentQuiz?.totalQuestions}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">Time Spent</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {selectedStudent.timeSpent} minutes
                  </Typography>
                </Box>
              </Stack>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} startIcon={<Icon icon="mdi:close" />}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}