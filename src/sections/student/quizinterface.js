import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Container, Typography, Box, Button, Radio, RadioGroup, FormControlLabel, FormControl, Paper, Chip, IconButton, Tooltip, Divider, } from '@mui/material';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/GridLegacy';
const getQuestionsByQuizId = (quizId) => {
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
export function QuizInterface({ quiz }) {
    const questions = getQuestionsByQuizId(quiz?.id || 2);
    const [activeStep, setActiveStep] = useState(0);
    const [answers, setAnswers] = useState(new Array(questions.length).fill(-1));
    const [flagged, setFlagged] = useState(new Array(questions.length).fill(false));
    const [showResults, setShowResults] = useState(false);
    const [score, setScore] = useState(0);
    const navigate = useNavigate();
    const handleAnswerChange = (selectedIndex) => {
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
        navigate('/quizsuccess');
    };
    const getQuestionStatus = (index) => {
        if (answers[index] !== -1)
            return 'attempted';
        return 'unattempted';
    };
    const attemptedCount = answers.filter(a => a !== -1).length;
    const unattemptedCount = answers.filter(a => a === -1).length;
    const flaggedCount = flagged.filter(f => f).length;
    const currentQuestion = questions[activeStep];
    if (showResults) {
        const percentage = Math.round((score / questions.length) * 100);
        return (_jsx(Container, { maxWidth: "lg", sx: { py: 4 }, children: _jsx(Paper, { elevation: 0, sx: { p: 4, borderRadius: 3, border: '1px solid', borderColor: 'divider' }, children: _jsxs(Box, { sx: { textAlign: 'center' }, children: [_jsx(Icon, { icon: "mdi:check-circle", width: 80, height: 80, color: "#4caf50" }), _jsx(Typography, { variant: "h4", sx: { mt: 2, mb: 1, fontWeight: 600 }, children: "Quiz Completed!" }), _jsx(Typography, { variant: "body1", color: "text.secondary", sx: { mb: 4 }, children: "Great job! Here are your results" }), _jsxs(Grid, { container: true, spacing: 3, sx: { mb: 4, maxWidth: 600, mx: 'auto' }, children: [_jsx(Grid, { item: true, xs: 4, children: _jsxs(Paper, { elevation: 0, sx: { p: 3, bgcolor: '#e3f2fd', borderRadius: 2 }, children: [_jsx(Typography, { variant: "h3", sx: { fontWeight: 700, color: '#1976d2' }, children: score }), _jsx(Typography, { variant: "body2", color: "text.secondary", children: "Correct Answers" })] }) }), _jsx(Grid, { item: true, xs: 4, children: _jsxs(Paper, { elevation: 0, sx: { p: 3, bgcolor: '#f3e5f5', borderRadius: 2 }, children: [_jsx(Typography, { variant: "h3", sx: { fontWeight: 700, color: '#9c27b0' }, children: questions.length }), _jsx(Typography, { variant: "body2", color: "text.secondary", children: "Total Questions" })] }) }), _jsx(Grid, { item: true, xs: 4, children: _jsxs(Paper, { elevation: 0, sx: { p: 3, bgcolor: '#e8f5e9', borderRadius: 2 }, children: [_jsxs(Typography, { variant: "h3", sx: { fontWeight: 700, color: '#4caf50' }, children: [percentage, "%"] }), _jsx(Typography, { variant: "body2", color: "text.secondary", children: "Score" })] }) })] }), _jsx(Button, { variant: "contained", size: "large", onClick: () => window.location.reload(), startIcon: _jsx(Icon, { icon: "mdi:refresh" }), sx: { borderRadius: 2, px: 4 }, children: "Take Another Quiz" })] }) }) }));
    }
    return (_jsx(Container, { maxWidth: "xl", sx: { py: 5 }, children: _jsxs(Grid, { container: true, spacing: 3, children: [_jsxs(Grid, { item: true, xs: 12, md: 8, sx: { width: '60%' }, children: [_jsx(Paper, { elevation: 0, sx: { p: 3, mb: 3, borderRadius: 2, border: '1px solid', borderColor: 'divider' }, children: _jsxs(Box, { sx: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }, children: [_jsxs(Box, { children: [_jsx(Typography, { variant: "h5", sx: { fontWeight: 600, mb: 0.5 }, children: quiz?.title || 'Quiz' }), _jsxs(Box, { sx: { display: 'flex', gap: 2, alignItems: 'center' }, children: [_jsx(Chip, { icon: _jsx(Icon, { icon: "mdi:book-open-variant" }), label: quiz?.subject || 'General', size: "small", sx: { borderRadius: 1 } }), _jsx(Chip, { icon: _jsx(Icon, { icon: "mdi:calendar" }), label: `Due: ${quiz?.dueDate || 'N/A'}`, size: "small", variant: "outlined", sx: { borderRadius: 1 } })] })] }), _jsx(Chip, { label: `${activeStep + 1}/${questions.length}`, sx: { fontWeight: 600, fontSize: '0.9rem', px: 1 } })] }) }), _jsxs(Paper, { elevation: 0, sx: { p: 4, borderRadius: 2, border: '1px solid', borderColor: 'divider' }, children: [_jsxs(Box, { sx: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }, children: [_jsx(Typography, { variant: "h6", sx: { fontWeight: 500, flex: 1 }, children: currentQuestion?.question }), _jsx(Tooltip, { title: flagged[activeStep] ? "Unflag question" : "Flag for review", children: _jsx(IconButton, { onClick: toggleFlag, sx: {
                                                    ml: 2,
                                                    color: flagged[activeStep] ? '#ff9800' : 'text.secondary',
                                                }, children: _jsx(Icon, { icon: flagged[activeStep] ? "mdi:flag" : "mdi:flag-outline", width: 24, height: 24 }) }) })] }), _jsx(FormControl, { component: "fieldset", fullWidth: true, children: _jsx(RadioGroup, { value: answers[activeStep], onChange: (e) => handleAnswerChange(parseInt(e.target.value)), children: currentQuestion?.options.map((option, index) => (_jsx(Paper, { elevation: 0, sx: {
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
                                            }, children: _jsx(FormControlLabel, { value: index, control: _jsx(Radio, {}), label: option, sx: {
                                                    m: 0,
                                                    p: 2,
                                                    width: '100%',
                                                    '& .MuiFormControlLabel-label': {
                                                        fontSize: '0.95rem',
                                                    },
                                                } }) }, index))) }) })] }), _jsxs(Box, { sx: { display: 'flex', justifyContent: 'space-between', mt: 3 }, children: [_jsx(Button, { disabled: activeStep === 0, onClick: () => setActiveStep(prev => prev - 1), startIcon: _jsx(Icon, { icon: "mdi:chevron-left" }), variant: "outlined", sx: { borderRadius: 2, px: 3 }, children: "Previous" }), activeStep === questions.length - 1 ? (_jsx(Button, { variant: "contained", onClick: handleSubmit, endIcon: _jsx(Icon, { icon: "mdi:check" }), sx: { borderRadius: 2, px: 4 }, children: "Submit Quiz" })) : (_jsx(Button, { variant: "contained", onClick: () => setActiveStep(prev => prev + 1), endIcon: _jsx(Icon, { icon: "mdi:chevron-right" }), sx: { borderRadius: 2, px: 3 }, children: "Next" }))] })] }), _jsx(Grid, { item: true, xs: 12, md: 4, sx: { width: '30%' }, children: _jsxs(Paper, { elevation: 0, sx: {
                            p: 3,
                            borderRadius: 2,
                            border: '1px solid',
                            borderColor: 'divider',
                            position: 'sticky',
                            top: 20,
                        }, children: [_jsx(Typography, { variant: "h6", sx: { fontWeight: 600, mb: 2 }, children: "Question Palette" }), _jsxs(Box, { sx: { display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }, children: [_jsxs(Box, { sx: { display: 'flex', alignItems: 'center', gap: 1 }, children: [_jsx(Box, { sx: {
                                                    width: 32,
                                                    height: 32,
                                                    borderRadius: 1,
                                                    bgcolor: 'success.main',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                }, children: _jsx(Typography, { variant: "caption", sx: { color: 'white', fontWeight: 600 }, children: attemptedCount }) }), _jsx(Typography, { variant: "body2", children: "Attempted" })] }), _jsxs(Box, { sx: { display: 'flex', alignItems: 'center', gap: 1 }, children: [_jsx(Box, { sx: {
                                                    width: 32,
                                                    height: 32,
                                                    borderRadius: 1,
                                                    bgcolor: 'grey.300',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                }, children: _jsx(Typography, { variant: "caption", sx: { color: 'text.primary', fontWeight: 600 }, children: unattemptedCount }) }), _jsx(Typography, { variant: "body2", children: "Unattempted" })] }), _jsxs(Box, { sx: { display: 'flex', alignItems: 'center', gap: 1 }, children: [_jsx(Box, { sx: {
                                                    width: 32,
                                                    height: 32,
                                                    borderRadius: 1,
                                                    bgcolor: 'warning.main',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                }, children: _jsx(Icon, { icon: "mdi:flag", width: 18, height: 18, color: "white" }) }), _jsxs(Typography, { variant: "body2", children: ["Flagged (", flaggedCount, ")"] })] })] }), _jsx(Divider, { sx: { my: 2 } }), _jsx(Grid, { container: true, spacing: 1.5, children: questions.map((q, index) => {
                                    const status = getQuestionStatus(index);
                                    const isFlagged = flagged[index];
                                    const isActive = activeStep === index;
                                    return (_jsx(Grid, { item: true, xs: 3, sx: { width: '10%' }, children: _jsx(Tooltip, { title: `Question ${index + 1}${isFlagged ? ' (Flagged)' : ''}`, children: _jsxs(Box, { onClick: () => setActiveStep(index), sx: {
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
                                                }, children: [index + 1, isFlagged && (_jsx(Icon, { icon: "mdi:flag", width: 14, height: 14, style: {
                                                            position: 'absolute',
                                                            top: 2,
                                                            right: 2,
                                                            color: '#ff9800',
                                                        } }))] }) }) }, q.id));
                                }) })] }) })] }) }));
}
