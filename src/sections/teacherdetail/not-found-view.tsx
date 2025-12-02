import React, { useState, useMemo } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Avatar,
  Chip,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  LinearProgress,
} from '@mui/material';
import { Icon } from '@iconify/react';
import Grid from '@mui/material/GridLegacy';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';

export function TeacherDetailView() {
  const initialInstructors = [
    {
      id: 1,
      name: 'Dr. Harjit Singh',
      email: 'harjit.singh@university.com',
      phone: '+91-98765-0101',
      department: 'English Department',
      studentCount: 120,
      classes: [
        {
          name: 'Foundation English (Level 1–3)',
          students: 45,
          enrolledStudents: [
            { id: 101, name: 'Aarav Sharma', grade: 'A' },
            { id: 102, name: 'Diya Patel', grade: 'B+' },
            { id: 103, name: 'Vihaan Kumar', grade: 'A-' },
            { id: 104, name: 'Ananya Singh', grade: 'A' },
            { id: 105, name: 'Rohan Verma', grade: 'B' },
          ],
          assignments: [
            { id: 1, title: 'Basic Grammar Quiz – Tenses', dueDate: '2025-12-05', total: 45, submitted: 38, pending: 5, overdue: 2 },
            { id: 2, title: 'Reading Comprehension – Level 1', dueDate: '2025-12-08', total: 45, submitted: 30, pending: 10, overdue: 5 },
            { id: 3, title: 'Introduce Yourself (Speaking)', dueDate: '2025-12-10', total: 45, submitted: 42, pending: 3, overdue: 0 },
          ],
        },
        {
          name: 'Grammar Mastery (Beginner to Advanced)',
          students: 38,
          enrolledStudents: [
            { id: 201, name: 'Ishaan Gupta', grade: 'A+' },
            { id: 202, name: 'Saanvi Reddy', grade: 'A' },
            { id: 203, name: 'Arjun Mehta', grade: 'B+' },
            { id: 204, name: 'Myra Joshi', grade: 'A-' },
          ],
          assignments: [
            { id: 4, title: 'Advanced Tenses Worksheet', dueDate: '2025-12-03', total: 38, submitted: 35, pending: 2, overdue: 1 },
            { id: 5, title: 'Error Correction Exercise', dueDate: '2025-12-07', total: 38, submitted: 28, pending: 8, overdue: 2 },
          ],
        },
        {
          name: 'Vocabulary Booster – 1000+ Words',
          students: 37,
          enrolledStudents: [
            { id: 301, name: 'Kabir Malhotra', grade: 'A' },
            { id: 302, name: 'Zara Khan', grade: 'B+' },
            { id: 303, name: 'Ayaan Kapoor', grade: 'A-' },
          ],
          assignments: [
            { id: 6, title: 'Week 1: 100 Essential Words Quiz', dueDate: '2025-12-04', total: 37, submitted: 37, pending: 0, overdue: 0 },
            { id: 7, title: 'Synonyms & Antonyms Test', dueDate: '2025-12-09', total: 37, submitted: 22, pending: 15, overdue: 0 },
          ],
        },
      ],
    },
    // ... other teachers can have assignments too
    {
      id: 2,
      name: 'Prof. Jaspreet Kaur',
      email: 'jaspreet.kaur@university.com',
      phone: '+91-98765-0102',
      department: 'English Department',
      studentCount: 85,
      classes: [
        {
          name: 'Reading Skills & Comprehension Mastery',
          students: 30,
          enrolledStudents: [
            { id: 401, name: 'Riya Thakur', grade: 'A' },
            { id: 402, name: 'Advik Yadav', grade: 'A-' },
            { id: 403, name: 'Kiara Bhatia', grade: 'B+' },
          ],
          assignments: [
            { id: 8, title: 'Unseen Passage – Level A', dueDate: '2025-12-06', total: 30, submitted: 28, pending: 2, overdue: 0 },
            { id: 9, title: 'Comprehension + Summary Writing', dueDate: '2025-12-11', total: 30, submitted: 15, pending: 12, overdue: 3 },
          ],
        },
        {
          name: 'Creative Writing: Paragraph, Story, Letter, Notice',
          students: 28,
          enrolledStudents: [
            { id: 501, name: 'Reyansh Rao', grade: 'A+' },
            { id: 502, name: 'Aadhya Nair', grade: 'A' },
          ],
          assignments: [
            { id: 10, title: 'Write a Story: "The Lost Key"', dueDate: '2025-12-02', total: 28, submitted: 26, pending: 1, overdue: 1 },
            { id: 11, title: 'Formal Letter to Principal', dueDate: '2025-12-12', total: 28, submitted: 10, pending: 18, overdue: 0 },
          ],
        },
      ],
    },
  ];

  const { id } = useParams();
  const teacherId = id ? Number(id) : 1;

  const teacher = useMemo(() => {
    return initialInstructors.find((t) => t.id === teacherId);
  }, [teacherId]);

  const [expanded, setExpanded] = useState<string | false>(false);

  const handleAccordionChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  if (!teacher) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h5">Teacher not found</Typography>
      </Container>
    );
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header Section */}
      <Paper elevation={3} sx={{ p: 4, mb: 3, borderRadius: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3 }}>
          <Avatar
            sx={{
              width: 110,
              height: 110,
              bgcolor: 'warning.main',
              fontSize: '2.2rem',
              fontWeight: 'bold',
            }}
          >
            {getInitials(teacher.name)}
          </Avatar>

          <Box sx={{ flex: 1 }}>
            <Typography variant="h4" gutterBottom fontWeight="600">
              {teacher.name}
            </Typography>
            <Chip label={teacher.department} color="warning" size="medium" sx={{ mb: 2, fontWeight: 600 }} />

            <Grid container spacing={3} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={6} md={4}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Icon icon="mdi:email" width="22" />
                  <Typography variant="body1">{teacher.email}</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Icon icon="mdi:phone" width="22" />
                  <Typography variant="body1">{teacher.phone}</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Icon icon="mdi:account-group" width="22" />
                  <Typography variant="body1" fontWeight="600">
                    {teacher.studentCount} Total Students
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Paper>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ textAlign: 'center', borderRadius: 3 }}>
            <CardContent>
              <Icon icon="mdi:book-open-page-variant" width="48" color="#1976d2" />
              <Typography variant="h3" sx={{ mt: 2, fontWeight: 'bold' }}>
                {teacher.classes.length}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Total Classes
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ textAlign: 'center', borderRadius: 3 }}>
            <CardContent>
              <Icon icon="mdi:account-group" width="48" color="#2e7d32" />
              <Typography variant="h3" sx={{ mt: 2, fontWeight: 'bold' }}>
                {teacher.studentCount}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Total Students
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ textAlign: 'center', borderRadius: 3 }}>
            <CardContent>
              <Icon icon="mdi:chart-line" width="48" color="#ed6c02" />
              <Typography variant="h3" sx={{ mt: 2, fontWeight: 'bold' }}>
                {Math.round(teacher.studentCount / teacher.classes.length)}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Avg. Students/Class
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Classes with Assignments Table */}
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <Icon icon="mdi:book-education" width="32" color="#173345" />
          <Typography variant="h5" fontWeight="600">
            Classes & Assignments
          </Typography>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {teacher.classes.map((classItem, index) => {
          const totalAssignments = classItem.assignments?.length || 0;
          const totalSubmissions = classItem.assignments?.reduce((acc, a) => acc + a.submitted, 0) || 0;
          const totalStudents = classItem.students;
          const avgCompletion = totalAssignments > 0 ? Math.round((totalSubmissions / (totalAssignments * totalStudents)) * 100) : 0;

          return (
            <Accordion
              key={index}
              expanded={expanded === `panel${index}`}
              onChange={handleAccordionChange(`panel${index}`)}
              sx={{ mb: 2, borderRadius: 2, '&:before': { display: 'none' } }}
            >
              <AccordionSummary
                expandIcon={<Icon icon="mdi:chevron-down" width="28" />}
                sx={{
                  bgcolor: 'grey.50',
                  borderRadius: 2,
                  '&.Mui-expanded': { borderBottomLeftRadius: 0, borderBottomRightRadius: 0 },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                  <Icon icon="mdi:book-outline" width="26" color="#173345" />
                  <Box sx={{ flex: 1 }}>
                    <Typography fontWeight="600">{classItem.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {classItem.students} students • {totalAssignments} active assignments
                    </Typography>
                  </Box>
                  <Chip
                    label={`${avgCompletion}% Complete`}
                    size="small"
                    color={avgCompletion >= 80 ? 'success' : avgCompletion >= 60 ? 'warning' : 'error'}
                    sx={{ fontWeight: 600 }}
                  />
                </Box>
              </AccordionSummary>

              <AccordionDetails sx={{ pt: 3 }}>
                <Box sx={{ pl: 1 }}>
                  {/* Class Stats */}
                  <Grid container spacing={2} sx={{ mb: 4 }}>
                    <Grid item xs={12} sm={4}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Icon icon="mdi:account-group" width="20" color="primary" />
                        <Typography variant="body1">
                          <strong>Enrolled:</strong> {classItem.students} students
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Icon icon="mdi:calendar-check" width="20" color="success" />
                        <Typography variant="body1">
                          <strong>Assignments:</strong> {totalAssignments}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Icon icon="mdi:chart-pie" width="20" color="info" />
                        <Typography variant="body1">
                          <strong>Class Share:</strong> {Math.round((classItem.students / teacher.studentCount) * 100)}%
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>

                  {/* Assignments Table */}
                  {classItem.assignments && classItem.assignments.length > 0 ? (
                    <>
                      <Typography variant="subtitle1" fontWeight="600" sx={{ mb: 2 }}>
                        Active Assignments
                      </Typography>
                      <TableContainer>
                        <Table size="small">
                          <TableHead>
                            <TableRow sx={{ bgcolor: 'grey.100' }}>
                              <TableCell><strong>Assignment</strong></TableCell>
                              <TableCell><strong>Due Date</strong></TableCell>
                              <TableCell align="center"><strong>Submitted</strong></TableCell>
                              <TableCell align="center"><strong>Pending</strong></TableCell>
                              <TableCell align="center"><strong>Overdue</strong></TableCell>
                              <TableCell align="center"><strong>Progress</strong></TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {classItem.assignments.map((assignment) => {
                              const progress = Math.round((assignment.submitted / assignment.total) * 100);
                              return (
                                <TableRow key={assignment.id} hover>
                                  <TableCell>
                                    <Typography variant="body2" fontWeight="500">
                                      {assignment.title}
                                    </Typography>
                                  </TableCell>
                                  <TableCell>
                                    {format(new Date(assignment.dueDate), 'MMM dd, yyyy')}
                                  </TableCell>
                                  <TableCell align="center">
                                    <Chip label={assignment.submitted} size="small" color="success" />
                                  </TableCell>
                                  <TableCell align="center">
                                    <Chip label={assignment.pending} size="small" color="warning" />
                                  </TableCell>
                                  <TableCell align="center">
                                    <Chip label={assignment.overdue} size="small" color="error" />
                                  </TableCell>
                                  <TableCell>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                      <LinearProgress
                                        variant="determinate"
                                        value={progress}
                                        sx={{ flex: 1, height: 6, borderRadius: 3 }}
                                        color={progress >= 90 ? 'success' : progress >= 70 ? 'warning' : 'error'}
                                      />
                                      <Typography variant="caption" sx={{ minWidth: 40 }}>
                                        {progress}%
                                      </Typography>
                                    </Box>
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </>
                  ) : (
                    <Typography color="text.secondary" sx={{ py: 3, textAlign: 'center' }}>
                      No assignments assigned to this class yet.
                    </Typography>
                  )}

                  {/* Enrolled Students List */}
                  {classItem.enrolledStudents && classItem.enrolledStudents.length > 0 && (
                    <>
                      <Typography variant="subtitle1" fontWeight="600" sx={{ mt: 5, mb: 2 }}>
                        Enrolled Students
                      </Typography>
                      <List dense>
                        {classItem.enrolledStudents.map((student) => (
                          <ListItem key={student.id} disablePadding sx={{ py: 0.5 }}>
                            <ListItemAvatar>
                              <Avatar sx={{ width: 36, height: 36, bgcolor: 'secondary.main', fontSize: '0.9rem' }}>
                                {student.name.split(' ').map((n) => n[0]).join('')}
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                              primary={student.name}
                              secondary={`Grade: ${student.grade || 'Not Graded'}`}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </>
                  )}
                </Box>
              </AccordionDetails>
            </Accordion>
          );
        })}
      </Paper>
    </Container>
  );
}