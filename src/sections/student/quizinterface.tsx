import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Paper,
  Alert,
  Chip,
  Grid,
  IconButton,
  Tooltip,
  Divider,
} from '@mui/material';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';

interface Quiz {
  id: number;
  title: string;
  subject: string;
  dueDate: string;
  status: string;
}

const getQuestionsByQuizId = (quizId: number) => {
  switch (quizId) {
    case 2:
      return [
        {
          id: 1,
          question: 'What is the primary purpose of React?',
          options: ['A server-side framework', 'A library for building user interfaces', 'A database ORM', 'A testing tool'],
          correct: 1,
        },
        {
          id: 2,
          question: 'Which hook is used for state in functional components?',
          options: ['useState', 'useEffect', 'useContext', 'useReducer'],
          correct: 0,
        },
        {
          id: 3,
          question: 'What does JSX stand for?',
          options: ['JavaScript XML', 'JSON eXtended', 'Java Syntax Extension', 'JQuery XML'],
          correct: 0,
        },
        {
          id: 4,
          question: 'What is the virtual DOM?',
          options: ['A copy of the real DOM', 'A JavaScript object representation', 'A database', 'A CSS framework'],
          correct: 1,
        },
        {
          id: 5,
          question: 'What is prop drilling?',
          options: ['Passing props through multiple levels', 'Creating holes in components', 'A debugging technique', 'A performance optimization'],
          correct: 0,
        },
      ];
    case 5:
      return [
        {
          id: 1,
          question: 'What is the time complexity of accessing an element in an array by index?',
          options: ['O(n)', 'O(log n)', 'O(1)', 'O(n^2)'],
          correct: 2,
        },
        {
          id: 2,
          question: 'Which data structure follows LIFO principle?',
          options: ['Queue', 'Stack', 'Linked List', 'Tree'],
          correct: 1,
        },
        {
          id: 3,
          question: 'What is a binary search tree?',
          options: ['A sorted tree where left < root < right', 'An unsorted list', 'A graph with cycles', 'A queue implementation'],
          correct: 0,
        },
      ];
    default:
      return [
        {
          id: 1,
          question: 'Sample Question 1: What is your favorite programming language?',
          options: ['JavaScript', 'Python', 'Java', 'C++'],
          correct: 0,
        },
        {
          id: 2,
          question: 'Sample Question 2: What does API stand for?',
          options: ['Application Programming Interface', 'Advanced Programming Input', 'Automated Process Integration', 'Application Performance Index'],
          correct: 0,
        },
        {
          id: 3,
          question: 'Sample Question 3: Which is a frontend framework?',
          options: ['React', 'Django', 'Express', 'Flask'],
          correct: 0,
        },
      ];
  }
};

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
}

interface QuizInterfaceProps {
  quiz: Quiz;
}

export function QuizInterface({ quiz }: QuizInterfaceProps) {
  const questions = getQuestionsByQuizId(quiz?.id || 2);
  const [activeStep, setActiveStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>(new Array(questions.length).fill(-1));
  const [flagged, setFlagged] = useState<boolean[]>(new Array(questions.length).fill(false));
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
const navigate=useNavigate()
  const handleAnswerChange = (selectedIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[activeStep] = selectedIndex;
    setAnswers(newAnswers);
  };

  const toggleFlag = () => {
    const newFlagged = [...flagged];
    newFlagged[activeStep] = !newFlagged[activeStep];
    setFlagged(newFlagged);
  };

  const handleSubmit = () => {
   navigate('/quizsuccess')
  };

  const getQuestionStatus = (index: number) => {
    if (answers[index] !== -1) return 'attempted';
    return 'unattempted';
  };

  const attemptedCount = answers.filter(a => a !== -1).length;
  const unattemptedCount = answers.filter(a => a === -1).length;
  const flaggedCount = flagged.filter(f => f).length;

  const currentQuestion = questions[activeStep];

  if (showResults) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Paper elevation={0} sx={{ p: 4, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
          <Box sx={{ textAlign: 'center' }}>
            <Icon icon="mdi:check-circle" width={80} height={80} color="#4caf50" />
            <Typography variant="h4" sx={{ mt: 2, mb: 1, fontWeight: 600 }}>
              Quiz Completed!
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Great job! Here are your results
            </Typography>

            <Grid container spacing={3} sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}>
              <Grid item xs={4}>
                <Paper elevation={0} sx={{ p: 3, bgcolor: '#e3f2fd', borderRadius: 2 }}>
                  <Typography variant="h3" sx={{ fontWeight: 700, color: '#1976d2' }}>
                    {score}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Correct Answers
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper elevation={0} sx={{ p: 3, bgcolor: '#f3e5f5', borderRadius: 2 }}>
                  <Typography variant="h3" sx={{ fontWeight: 700, color: '#9c27b0' }}>
                    {questions.length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Questions
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper elevation={0} sx={{ p: 3, bgcolor: '#e8f5e9', borderRadius: 2 }}>
                  <Typography variant="h3" sx={{ fontWeight: 700, color: '#4caf50' }}>
                    {percentage}%
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Score
                  </Typography>
                </Paper>
              </Grid>
            </Grid>

            <Button 
              variant="contained" 
              size="large"
              onClick={() => window.location.reload()}
              startIcon={<Icon icon="mdi:refresh" />}
              sx={{ borderRadius: 2, px: 4 }}
            >
              Take Another Quiz
            </Button>
          </Box>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 5 }}>
      <Grid container spacing={3}>
        {/* Left Side - Quiz Content */}
        <Grid item xs={12} md={8} sx={{width:'60%'}}>
          <Paper elevation={0} sx={{ p: 3, mb: 3, borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.5 }}>
                  {quiz?.title || 'Quiz'}
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                  <Chip 
                    icon={<Icon icon="mdi:book-open-variant" />}
                    label={quiz?.subject || 'General'}
                    size="small"
                    sx={{ borderRadius: 1 }}
                  />
                  <Chip 
                    icon={<Icon icon="mdi:calendar" />}
                    label={`Due: ${quiz?.dueDate || 'N/A'}`}
                    size="small"
                    variant="outlined"
                    sx={{ borderRadius: 1 }}
                  />
                </Box>
              </Box>
              <Chip 
                label={`${activeStep + 1}/${questions.length}`}
                sx={{ fontWeight: 600, fontSize: '0.9rem', px: 1 }}
              />
            </Box>
          </Paper>

          <Paper elevation={0} sx={{ p: 4, borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 500, flex: 1 }}>
                {currentQuestion?.question}
              </Typography>
              <Tooltip title={flagged[activeStep] ? "Unflag question" : "Flag for review"}>
                <IconButton 
                  onClick={toggleFlag}
                  sx={{ 
                    ml: 2,
                    color: flagged[activeStep] ? '#ff9800' : 'text.secondary',
                  }}
                >
                  <Icon 
                    icon={flagged[activeStep] ? "mdi:flag" : "mdi:flag-outline"} 
                    width={24} 
                    height={24}
                  />
                </IconButton>
              </Tooltip>
            </Box>

            <FormControl component="fieldset" fullWidth>
              <RadioGroup
                value={answers[activeStep]}
                onChange={(e) => handleAnswerChange(parseInt(e.target.value))}
              >
                {currentQuestion?.options.map((option, index) => (
                  <Paper
                    key={index}
                    elevation={0}
                    sx={{
                      mb: 2,
                      border: '1px solid',
                      borderColor: answers[activeStep] === index ? 'primary.main' : 'divider',
                      borderRadius: 2,
                      bgcolor: answers[activeStep] === index ? 'primary.50' : 'transparent',
                      transition: 'all 0.2s',
                      '&:hover': {
                        borderColor: 'primary.main',
                        bgcolor: 'action.hover',
                      },
                    }}
                  >
                    <FormControlLabel
                      value={index}
                      control={<Radio />}
                      label={option}
                      sx={{
                        m: 0,
                        p: 2,
                        width: '100%',
                        '& .MuiFormControlLabel-label': {
                          fontSize: '0.95rem',
                        },
                      }}
                    />
                  </Paper>
                ))}
              </RadioGroup>
            </FormControl>
          </Paper>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
            <Button
              disabled={activeStep === 0}
              onClick={() => setActiveStep(prev => prev - 1)}
              startIcon={<Icon icon="mdi:chevron-left" />}
              variant="outlined"
              sx={{ borderRadius: 2, px: 3 }}
            >
              Previous
            </Button>
            {activeStep === questions.length - 1 ? (
              <Button
                variant="contained"
                onClick={handleSubmit}
                endIcon={<Icon icon="mdi:check" />}
                sx={{ borderRadius: 2, px: 4 }}
              >
                Submit Quiz
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={() => setActiveStep(prev => prev + 1)}
                endIcon={<Icon icon="mdi:chevron-right" />}
                sx={{ borderRadius: 2, px: 3 }}
              >
                Next
              </Button>
            )}
          </Box>
        </Grid>

        {/* Right Side - Question Navigation Grid */}
        <Grid item xs={12} md={4} sx={{width:'30%'}}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 3, 
              borderRadius: 2, 
              border: '1px solid', 
              borderColor: 'divider',
              position: 'sticky',
              top: 20,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Question Palette
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ 
                  width: 32, 
                  height: 32, 
                  borderRadius: 1, 
                  bgcolor: 'success.main',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Typography variant="caption" sx={{ color: 'white', fontWeight: 600 }}>
                    {attemptedCount}
                  </Typography>
                </Box>
                <Typography variant="body2">Attempted</Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ 
                  width: 32, 
                  height: 32, 
                  borderRadius: 1, 
                  bgcolor: 'grey.300',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Typography variant="caption" sx={{ color: 'text.primary', fontWeight: 600 }}>
                    {unattemptedCount}
                  </Typography>
                </Box>
                <Typography variant="body2">Unattempted</Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ 
                  width: 32, 
                  height: 32, 
                  borderRadius: 1, 
                  bgcolor: 'warning.main',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Icon icon="mdi:flag" width={18} height={18} color="white" />
                </Box>
                <Typography variant="body2">Flagged ({flaggedCount})</Typography>
              </Box>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Grid container spacing={1.5}>
              {questions.map((q, index) => {
                const status = getQuestionStatus(index);
                const isFlagged = flagged[index];
                const isActive = activeStep === index;

                return (
                  <Grid item xs={3} key={q.id} sx={{width:'10%'}}>
                    <Tooltip title={`Question ${index + 1}${isFlagged ? ' (Flagged)' : ''}`}>
                      <Box
                        onClick={() => setActiveStep(index)}
                        sx={{
                          width: '100%',
                          aspectRatio: '1',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: 1,
                          bgcolor: status === 'attempted' ? 'success.main' : 'grey.300',
                          color: status === 'attempted' ? 'white' : 'text.primary',
                          cursor: 'pointer',
                          position: 'relative',
                          border: '2px solid',
                          borderColor: isActive ? 'primary.main' : 'transparent',
                          fontWeight: 600,
                          transition: 'all 0.2s',
                          '&:hover': {
                            transform: 'scale(1.05)',
                            boxShadow: 2,
                          },
                        }}
                      >
                        {index + 1}
                        {isFlagged && (
                          <Icon
                            icon="mdi:flag"
                            width={14}
                            height={14}
                            style={{
                              position: 'absolute',
                              top: 2,
                              right: 2,
                              color: '#ff9800',
                            }}
                          />
                        )}
                      </Box>
                    </Tooltip>
                  </Grid>
                );
              })}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}