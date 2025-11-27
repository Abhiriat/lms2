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
  Chip,
  IconButton,
  Tooltip,
  Divider,
} from '@mui/material';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/GridLegacy'; // Updated import (MUI v5+)

interface Quiz {
  id: number;
  title: string;
  subject: string;
  dueDate: string;
  status: string;
}

const getQuestionsByQuizId = (quizId: number) => {
  if (quizId === 2) {
    return [
      {
        id: 1,
        question: 'Choose the correct synonym of "brave":',
        options: ['bold', 'shy', 'weak', 'timid'],
        correct: 0,
        explanation: '"Brave" means having courage. "Bold" is the closest synonym.',
      },
      {
        id: 2,
        question: 'Identify the verb in the sentence:\n"The birds fly high."',
        options: ['The birds', 'fly', 'high', 'None'],
        correct: 1,
        explanation: 'A verb shows action or state of being. "Fly" is the action verb here.',
      },
      {
        id: 3,
        question: 'Choose the correct preposition:\nHe sat ___ the sofa.',
        options: ['in', 'on', 'at', 'by'],
        correct: 1,
        explanation: 'We use "on" with surfaces like sofa, bed, table, etc.',
      },
      {
        id: 4,
        question: 'Correct tense:\nShe ___ dinner right now.',
        options: ['cooks', 'is cooking', 'cooked', 'has cooked'],
        correct: 1,
        explanation: '"Right now" indicates an action happening at the moment → Present Continuous.',
      },
      {
        id: 5,
        question: 'What is the opposite of "success"?',
        options: ['victory', 'failure', 'achievement', 'progress'],
        correct: 1,
        explanation: '"Success" means achieving a goal; its direct opposite is "failure".',
      },
      {
        id: 6,
        question: 'Identify the adjective in:\n"He is a smart boy."',
        options: ['He', 'is', 'smart', 'boy'],
        correct: 2,
        explanation: 'An adjective describes a noun. "Smart" describes the boy.',
      },
      {
        id: 7,
        question: 'Fill in the blank:\nRohan has lived here ___ 2010.',
        options: ['for', 'since', 'from', 'after'],
        correct: 1,
        explanation: '"Since" is used with a specific point in time (2010). "For" is used with duration.',
      },
      {
        id: 8,
        question: 'Choose the correct sentence:',
        options: ['She don’t know', 'She doesn’t know', 'She not know', 'She knowing'],
        correct: 1,
        explanation: 'Third person singular (she/he/it) takes "doesn’t" in negative present simple.',
      },
      {
        id: 9,
        question: 'What is the plural of "child"?',
        options: ['childs', 'childes', 'children', 'childrens'],
        correct: 2,
        explanation: '"Child" is an irregular noun → plural is "children".',
      },
      {
        id: 10,
        question: 'One word for: A place where books are kept.',
        options: ['kitchen', 'library', 'museum', 'stationery'],
        correct: 1,
        explanation: 'A library is a place where books are kept and borrowed.',
      },
      {
        id: 11,
        question: 'Use “fortunate” in a correct sentence:',
        options: [
          'I am fortunate to have good friends.',
          'He fortunate yesterday.',
          'They is fortunate.',
          'Fortunate me!',
        ],
        correct: 0,
        explanation: '"Fortunate" is an adjective and needs a proper subject-verb structure.',
      },
      {
        id: 12,
        question: 'Change to passive voice:\n"He wrote a letter."',
        options: [
          'A letter is written by him.',
          'A letter was written by him.',
          'A letter has written by him.',
          'A letter wrote by him.',
        ],
        correct: 1,
        explanation: 'Simple past active → Simple past passive: "was written".',
      },
      {
        id: 13,
        question: 'Pick the adverb:\n"She sings sweetly."',
        options: ['She', 'sings', 'sweetly', 'None'],
        correct: 2,
        explanation: 'An adverb describes how an action is done. "Sweetly" tells how she sings.',
      },
      {
        id: 14,
        question: 'Identify the conjunction:\n"I was tired but I continued."',
        options: ['I', 'was', 'but', 'continued'],
        correct: 2,
        explanation: 'A conjunction joins clauses. "But" shows contrast here.',
      },
      {
        id: 15,
        question: 'Spell correctly:',
        options: ['Acheive', 'Achive', 'Achieve', 'Acheeve'],
        correct: 2,
        explanation: 'Correct spelling: Achieve (i before e except after c).',
      },
      {
        id: 16,
        question: 'Choose the correct article:\n___ honest person.',
        options: ['A', 'An', 'The', 'No article'],
        correct: 1,
        explanation: '"An" is used before vowel sounds. "Honest" starts with /ɒ/ sound.',
      },
      {
        id: 17,
        question: 'What is the meaning of "anxious"?',
        options: ['Calm', 'Worried/Nervous', 'Happy', 'Tired'],
        correct: 1,
        explanation: '"Anxious" means feeling worry or unease, usually about something uncertain.',
      },
      {
        id: 18,
        question: 'Choose the correct modal:\nYou ___ follow traffic rules.',
        options: ['can', 'should', 'may', 'might'],
        correct: 1,
        explanation: '"Should" expresses obligation or advice. Following rules is mandatory.',
      },
      {
        id: 19,
        question: 'Form a question from:\n"He is coming."',
        options: [
          'He is coming?',
          'Is he coming?',
          'Does he coming?',
          'He coming?',
        ],
        correct: 1,
        explanation: 'Present continuous questions invert "is/are" + subject.',
      },
      {
        id: 20,
        question: 'Convert to present perfect:\n"They played cricket."',
        options: [
          'They are playing cricket.',
          'They have played cricket.',
          'They have played cricket.', // duplicate fixed
          'They played cricket.',
        ],
        correct: 1,
        explanation: 'Present perfect = have/has + past participle. Used for past actions with present relevance.',
      },
    ];
  }

  return [
    {
      id: 1,
      question: 'Sample Question',
      options: ['A', 'B', 'C', 'D'],
      correct: 0,
      explanation: 'This is a sample explanation.',
    },
  ];
};

interface QuizInterfaceProps {
  quiz?: Quiz;
}

export function QuizInterface({ quiz }: QuizInterfaceProps) {
  const questions = getQuestionsByQuizId(quiz?.id || 2);
  const [activeStep, setActiveStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>(new Array(questions.length).fill(-1));
  const [flagged, setFlagged] = useState<boolean[]>(new Array(questions.length).fill(false));
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();

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
    // Calculate score
    let correctCount = 0;
    questions.forEach((q, i) => {
      if (answers[i] === q.correct) correctCount++;
    });
    setScore(correctCount);
    setShowResults(true);
  };

  const getQuestionStatus = (index: number) => {
    if (answers[index] !== -1) return 'attempted';
    return 'unattempted';
  };

  const attemptedCount = answers.filter(a => a !== -1).length;
  const unattemptedCount = answers.filter(a => a === -1).length;
  const flaggedCount = flagged.filter(f => f).length;

  const currentQuestion = questions[activeStep];

  // ── Results Screen ─────────────────────────────────────
  if (showResults) {
    const percentage = Math.round((score / questions.length) * 100);

    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Paper elevation={0} sx={{ p: 4, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Icon icon="mdi:check-circle" width={80} height={80} color="#4caf50" />
            <Typography variant="h4" sx={{ mt: 2, mb: 1, fontWeight: 600 }}>
              Quiz Completed!
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Here are your detailed results
            </Typography>

            <Grid container spacing={3} sx={{ mb: 6, maxWidth: 600, mx: 'auto' }}>
              <Grid item xs={4}>
                <Paper elevation={0} sx={{ p: 3, bgcolor: '#e3f2fd', borderRadius: 2 }}>
                  <Typography variant="h3" sx={{ fontWeight: 700, color: '#1976d2' }}>
                    {score}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Correct
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper elevation={0} sx={{ p: 3, bgcolor: '#ffebee', borderRadius: 2 }}>
                  <Typography variant="h3" sx={{ fontWeight: 700, color: '#d32f2f' }}>
                    {questions.length - score}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Wrong
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

          {/* Detailed Review */}
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
            Answer Review
          </Typography>

          {questions.map((q, index) => {
            const userAnswer = answers[index];
            const isCorrect = userAnswer === q.correct;
            const correctOption = q.options[q.correct];
            const userOption = userAnswer !== -1 ? q.options[userAnswer] : null;

            return (
              <Paper
                key={index}
                elevation={0}
                sx={{
                  p: 3,
                  mb: 2,
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: isCorrect ? 'success.main' : 'error.main',
                  bgcolor: isCorrect ? 'success.50' : 'error.50',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <Icon
                    icon={isCorrect ? 'mdi:check-circle' : 'mdi:close-circle'}
                    width={28}
                    height={28}
                    color={isCorrect ? '#4caf50' : '#f44336'}
                  />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                      Q{index + 1}. {q.question.replace(/\n/g, ' ')}
                    </Typography>

                    {!isCorrect && userAnswer !== -1 && (
                      <Typography variant="body2" color="error" sx={{ mb: 1 }}>
                        <strong>Your Answer:</strong> {userOption}
                      </Typography>
                    )}

                    <Typography variant="body2" color="success.main" sx={{ mb: 1 }}>
                      <strong>Correct Answer:</strong> {correctOption}
                    </Typography>

                    <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                      {q.explanation}
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            );
          })}
        </Paper>
      </Container>
    );
  }

  // ── Main Quiz UI ───────────────────────────────────────
  return (
    <Container maxWidth="xl" sx={{ py: 5 }}>
      <Grid container spacing={3}>
        {/* Left – Question Area */}
        <Grid item xs={12} md={8}>
          {/* Header */}
          <Paper elevation={0} sx={{ p: 3, mb: 3, borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.5 }}>
                  {quiz?.title || 'Grammar + Vocabulary Quiz'}
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                  <Chip
                    icon={<Icon icon="mdi:book-open-variant" />}
                    label={quiz?.subject || 'General English'}
                    size="small"
                    sx={{ borderRadius: 1 }}
                  />
                  <Chip
                    icon={<Icon icon="mdi:calendar" />}
                    label={`Due: ${quiz?.dueDate || 'No limit'}`}
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

          {/* Question Card */}
          <Paper elevation={0} sx={{ p: 4, borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 500, flex: 1, whiteSpace: 'pre-line' }}>
                {currentQuestion.question}
              </Typography>
              <Tooltip title={flagged[activeStep] ? 'Unflag question' : 'Flag for review'}>
                <IconButton
                  onClick={toggleFlag}
                  sx={{
                    ml: 2,
                    color: flagged[activeStep] ? '#ff9800' : 'text.secondary',
                  }}
                >
                  <Icon
                    icon={flagged[activeStep] ? 'mdi:flag' : 'mdi:flag-outline'}
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
                {currentQuestion.options.map((option, index) => (
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
                        '& .MuiFormControlLabel-label': { fontSize: '0.95rem' },
                      }}
                    />
                  </Paper>
                ))}
              </RadioGroup>
            </FormControl>
          </Paper>

          {/* Navigation Buttons */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <Button
              disabled={activeStep === 0}
              onClick={() => setActiveStep((prev) => prev - 1)}
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
                onClick={() => setActiveStep((prev) => prev + 1)}
                endIcon={<Icon icon="mdi:chevron-right" />}
                sx={{ borderRadius: 2, px: 3 }}
              >
                Next
              </Button>
            )}
          </Box>
        </Grid>

        {/* Right – Palette */}
        <Grid item xs={12} md={4}>
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
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: 1,
                    bgcolor: 'success.main',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography variant="caption" sx={{ color: 'white', fontWeight: 600 }}>
                    {attemptedCount}
                  </Typography>
                </Box>
                <Typography variant="body2">Attempted</Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: 1,
                    bgcolor: 'grey.300',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography variant="caption" sx={{ color: 'text.primary', fontWeight: 600 }}>
                    {unattemptedCount}
                  </Typography>
                </Box>
                <Typography variant="body2">Unattempted</Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: 1,
                    bgcolor: 'warning.main',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Icon icon="mdi:flag" width={18} height={18} color="white" />
                </Box>
                <Typography variant="body2">Flagged ({flaggedCount})</Typography>
              </Box>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Grid container spacing={1.5}>
              {questions.map((_, index) => {
                const status = getQuestionStatus(index);
                const isFlagged = flagged[index];
                const isActive = activeStep === index;

                return (
                  <Grid item xs={3} key={index}>
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