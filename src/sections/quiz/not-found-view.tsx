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
  Tabs,
  Tab,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

export function QuizView() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const navigate = useNavigate();

  // Sample quiz data with marks for finished quizzes
  const quizzes = [
    { id: 1, title: 'JavaScript Basics', subject: 'Web Development', dueDate: '2025-12-15', status: 'upcoming', marks: null },
    { id: 2, title: 'React Fundamentals', subject: 'Web Development', dueDate: '2025-11-20', status: 'ongoing', marks: null },
    { id: 3, title: 'Python Basics', subject: 'Programming', dueDate: '2025-10-10', status: 'finished', marks: 85 },
    { id: 4, title: 'CSS Advanced', subject: 'Web Development', dueDate: '2025-11-25', status: 'upcoming', marks: null },
    { id: 5, title: 'Data Structures', subject: 'Computer Science', dueDate: '2025-11-15', status: 'ongoing', marks: null },
    { id: 6, title: 'Database Design', subject: 'Databases', dueDate: '2025-09-30', status: 'finished', marks: 92 },
    { id: 7, title: 'Node.js Mastery', subject: 'Web Development', dueDate: '2025-12-01', status: 'upcoming', marks: null },
    { id: 8, title: 'Vue.js Essentials', subject: 'Web Development', dueDate: '2025-11-18', status: 'ongoing', marks: null },
    { id: 9, title: 'SQL Queries', subject: 'Databases', dueDate: '2025-09-20', status: 'finished', marks: 78 },
    { id: 10, title: 'TypeScript Advanced', subject: 'Programming', dueDate: '2025-12-05', status: 'upcoming', marks: null },
    { id: 11, title: 'Angular Basics', subject: 'Web Development', dueDate: '2025-11-22', status: 'ongoing', marks: null },
    { id: 12, title: 'Git & GitHub', subject: 'Version Control', dueDate: '2025-08-30', status: 'finished', marks: 88 },
    { id: 13, title: 'REST APIs', subject: 'Web Development', dueDate: '2025-11-28', status: 'upcoming', marks: null },
    { id: 14, title: 'Machine Learning 101', subject: 'AI', dueDate: '2025-11-25', status: 'ongoing', marks: null },
    { id: 15, title: 'Cloud Computing', subject: 'Cloud', dueDate: '2025-07-15', status: 'finished', marks: 95 },
  ];

  // Filter quizzes based on search term and active tab
  const filteredQuizzes = useMemo(() => {
    let filtered = quizzes.filter(
      (quiz) =>
        quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quiz.subject.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (activeTab !== 'all') {
      filtered = filtered.filter((quiz) => quiz.status === activeTab);
    }

    return filtered;
  }, [searchTerm, activeTab]);

  // Paginate filtered quizzes
  const paginatedQuizzes = filteredQuizzes.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setPage(0);
    setSearchTerm('');
  };

  const getStatusChip = (status) => {
    const statusConfig = {
      upcoming: { label: 'Upcoming', color: 'info' },
      ongoing: { label: 'Ongoing', color: 'warning' },
      finished: { label: 'Finished', color: 'success' },
    };
    const config = statusConfig[status] || { label: status, color: 'default' };
    return <Chip label={config.label} color={config.color} size="small" variant="outlined" />;
  };

  const getMarksColor = (marks) => {
    if (marks >= 80) return '#4caf50';
    if (marks >= 60) return '#2196f3';
    return '#f44336';
  };

  const handleStartQuiz = (id, status) => {
    navigate('/quizinterface');
  };

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Box sx={{ mb: 3 }}>
        <h1>Quiz Management</h1>
        <TextField
          placeholder="Search by quiz title or subject..."
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(0);
          }}
          sx={{ mb: 3 }}
        />
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label="All Quizzes" value="all" />
          <Tab label="Upcoming" value="upcoming" />
          <Tab label="Ongoing" value="ongoing" />
          <Tab label="Finished" value="finished" />
        </Tabs>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell sx={{ fontWeight: 'bold' }}>Quiz Title</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Subject</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Due Date</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
              {activeTab === 'finished' && <TableCell sx={{ fontWeight: 'bold' }}>Marks</TableCell>}
              <TableCell sx={{ fontWeight: 'bold' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedQuizzes.length > 0 ? (
              paginatedQuizzes.map((quiz) => (
                <TableRow key={quiz.id} hover>
                  <TableCell>{quiz.title}</TableCell>
                  <TableCell>{quiz.subject}</TableCell>
                  <TableCell>{quiz.dueDate}</TableCell>
                  <TableCell>{getStatusChip(quiz.status)}</TableCell>
                  {activeTab === 'finished' && (
                    <TableCell>
                      <Box
                        sx={{
                          display: 'inline-block',
                          backgroundColor: getMarksColor(quiz.marks),
                          color: 'white',
                          padding: '4px 12px',
                          borderRadius: '4px',
                          fontWeight: 'bold',
                        }}
                      >
                        {quiz.marks}/100
                      </Box>
                    </TableCell>
                  )}
                  <TableCell>
                    <Button
                      variant="contained"
                      color={quiz.status === 'ongoing' ? 'primary' : 'inherit'}
                      size="small"
                      disabled={quiz.status !== 'ongoing'}
                      onClick={() => handleStartQuiz(quiz.id, quiz.status)}
                    >
                      Start
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={activeTab === 'finished' ? 6 : 5} align="center" sx={{ py: 3 }}>
                  No quizzes found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredQuizzes.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Container>
  );
}