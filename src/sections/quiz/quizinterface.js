import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Container, Typography, Box, Button, Radio, RadioGroup, FormControlLabel, FormControl, Paper, Chip, IconButton, Tooltip, Divider, } from '@mui/material';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/GridLegacy'; // Updated import (MUI v5+)
const getQuestionsByQuizId = (quizId) => {
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
        // Calculate score
        let correctCount = 0;
        questions.forEach((q, i) => {
            if (answers[i] === q.correct)
                correctCount++;
        });
        setScore(correctCount);
        setShowResults(true);
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
    // ── Results Screen ─────────────────────────────────────
    if (showResults) {
        const percentage = Math.round((score / questions.length) * 100);
        return (_jsx(Container, { maxWidth: "lg", sx: { py: 4 }, children: _jsxs(Paper, { elevation: 0, sx: { p: 4, borderRadius: 3, border: '1px solid', borderColor: 'divider' }, children: [_jsxs(Box, { sx: { textAlign: 'center', mb: 6 }, children: [_jsx(Icon, { icon: "mdi:check-circle", width: 80, height: 80, color: "#4caf50" }), _jsx(Typography, { variant: "h4", sx: { mt: 2, mb: 1, fontWeight: 600 }, children: "Quiz Completed!" }), _jsx(Typography, { variant: "body1", color: "text.secondary", sx: { mb: 4 }, children: "Here are your detailed results" }), _jsxs(Grid, { container: true, spacing: 3, sx: { mb: 6, maxWidth: 600, mx: 'auto' }, children: [_jsx(Grid, { item: true, xs: 4, children: _jsxs(Paper, { elevation: 0, sx: { p: 3, bgcolor: '#e3f2fd', borderRadius: 2 }, children: [_jsx(Typography, { variant: "h3", sx: { fontWeight: 700, color: '#1976d2' }, children: score }), _jsx(Typography, { variant: "body2", color: "text.secondary", children: "Correct" })] }) }), _jsx(Grid, { item: true, xs: 4, children: _jsxs(Paper, { elevation: 0, sx: { p: 3, bgcolor: '#ffebee', borderRadius: 2 }, children: [_jsx(Typography, { variant: "h3", sx: { fontWeight: 700, color: '#d32f2f' }, children: questions.length - score }), _jsx(Typography, { variant: "body2", color: "text.secondary", children: "Wrong" })] }) }), _jsx(Grid, { item: true, xs: 4, children: _jsxs(Paper, { elevation: 0, sx: { p: 3, bgcolor: '#e8f5e9', borderRadius: 2 }, children: [_jsxs(Typography, { variant: "h3", sx: { fontWeight: 700, color: '#4caf50' }, children: [percentage, "%"] }), _jsx(Typography, { variant: "body2", color: "text.secondary", children: "Score" })] }) })] }), _jsx(Button, { variant: "contained", size: "large", onClick: () => window.location.reload(), startIcon: _jsx(Icon, { icon: "mdi:refresh" }), sx: { borderRadius: 2, px: 4 }, children: "Take Another Quiz" })] }), _jsx(Typography, { variant: "h5", sx: { fontWeight: 600, mb: 3 }, children: "Answer Review" }), questions.map((q, index) => {
                        const userAnswer = answers[index];
                        const isCorrect = userAnswer === q.correct;
                        const correctOption = q.options[q.correct];
                        const userOption = userAnswer !== -1 ? q.options[userAnswer] : null;
                        return (_jsx(Paper, { elevation: 0, sx: {
                                p: 3,
                                mb: 2,
                                borderRadius: 2,
                                border: '1px solid',
                                borderColor: isCorrect ? 'success.main' : 'error.main',
                                bgcolor: isCorrect ? 'success.50' : 'error.50',
                            }, children: _jsxs(Box, { sx: { display: 'flex', alignItems: 'flex-start', gap: 2 }, children: [_jsx(Icon, { icon: isCorrect ? 'mdi:check-circle' : 'mdi:close-circle', width: 28, height: 28, color: isCorrect ? '#4caf50' : '#f44336' }), _jsxs(Box, { sx: { flex: 1 }, children: [_jsxs(Typography, { variant: "subtitle1", sx: { fontWeight: 600, mb: 1 }, children: ["Q", index + 1, ". ", q.question.replace(/\n/g, ' ')] }), !isCorrect && userAnswer !== -1 && (_jsxs(Typography, { variant: "body2", color: "error", sx: { mb: 1 }, children: [_jsx("strong", { children: "Your Answer:" }), " ", userOption] })), _jsxs(Typography, { variant: "body2", color: "success.main", sx: { mb: 1 }, children: [_jsx("strong", { children: "Correct Answer:" }), " ", correctOption] }), _jsx(Typography, { variant: "body2", color: "text.secondary", sx: { fontStyle: 'italic' }, children: q.explanation })] })] }) }, index));
                    })] }) }));
    }
    // ── Main Quiz UI ───────────────────────────────────────
    return (_jsx(Container, { maxWidth: "xl", sx: { py: 5 }, children: _jsxs(Grid, { container: true, spacing: 3, children: [_jsxs(Grid, { item: true, xs: 12, md: 8, children: [_jsx(Paper, { elevation: 0, sx: { p: 3, mb: 3, borderRadius: 2, border: '1px solid', borderColor: 'divider' }, children: _jsxs(Box, { sx: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }, children: [_jsxs(Box, { children: [_jsx(Typography, { variant: "h5", sx: { fontWeight: 600, mb: 0.5 }, children: quiz?.title || 'Grammar + Vocabulary Quiz' }), _jsxs(Box, { sx: { display: 'flex', gap: 2, alignItems: 'center' }, children: [_jsx(Chip, { icon: _jsx(Icon, { icon: "mdi:book-open-variant" }), label: quiz?.subject || 'General English', size: "small", sx: { borderRadius: 1 } }), _jsx(Chip, { icon: _jsx(Icon, { icon: "mdi:calendar" }), label: `Due: ${quiz?.dueDate || 'No limit'}`, size: "small", variant: "outlined", sx: { borderRadius: 1 } })] })] }), _jsx(Chip, { label: `${activeStep + 1}/${questions.length}`, sx: { fontWeight: 600, fontSize: '0.9rem', px: 1 } })] }) }), _jsxs(Paper, { elevation: 0, sx: { p: 4, borderRadius: 2, border: '1px solid', borderColor: 'divider' }, children: [_jsxs(Box, { sx: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }, children: [_jsx(Typography, { variant: "h6", sx: { fontWeight: 500, flex: 1, whiteSpace: 'pre-line' }, children: currentQuestion.question }), _jsx(Tooltip, { title: flagged[activeStep] ? 'Unflag question' : 'Flag for review', children: _jsx(IconButton, { onClick: toggleFlag, sx: {
                                                    ml: 2,
                                                    color: flagged[activeStep] ? '#ff9800' : 'text.secondary',
                                                }, children: _jsx(Icon, { icon: flagged[activeStep] ? 'mdi:flag' : 'mdi:flag-outline', width: 24, height: 24 }) }) })] }), _jsx(FormControl, { component: "fieldset", fullWidth: true, children: _jsx(RadioGroup, { value: answers[activeStep], onChange: (e) => handleAnswerChange(parseInt(e.target.value)), children: currentQuestion.options.map((option, index) => (_jsx(Paper, { elevation: 0, sx: {
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
                                                    '& .MuiFormControlLabel-label': { fontSize: '0.95rem' },
                                                } }) }, index))) }) })] }), _jsxs(Box, { sx: { display: 'flex', justifyContent: 'space-between', mt: 4 }, children: [_jsx(Button, { disabled: activeStep === 0, onClick: () => setActiveStep((prev) => prev - 1), startIcon: _jsx(Icon, { icon: "mdi:chevron-left" }), variant: "outlined", sx: { borderRadius: 2, px: 3 }, children: "Previous" }), activeStep === questions.length - 1 ? (_jsx(Button, { variant: "contained", onClick: handleSubmit, endIcon: _jsx(Icon, { icon: "mdi:check" }), sx: { borderRadius: 2, px: 4 }, children: "Submit Quiz" })) : (_jsx(Button, { variant: "contained", onClick: () => setActiveStep((prev) => prev + 1), endIcon: _jsx(Icon, { icon: "mdi:chevron-right" }), sx: { borderRadius: 2, px: 3 }, children: "Next" }))] })] }), _jsx(Grid, { item: true, xs: 12, md: 4, children: _jsxs(Paper, { elevation: 0, sx: {
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
                                                }, children: _jsx(Icon, { icon: "mdi:flag", width: 18, height: 18, color: "white" }) }), _jsxs(Typography, { variant: "body2", children: ["Flagged (", flaggedCount, ")"] })] })] }), _jsx(Divider, { sx: { my: 2 } }), _jsx(Grid, { container: true, spacing: 1.5, children: questions.map((_, index) => {
                                    const status = getQuestionStatus(index);
                                    const isFlagged = flagged[index];
                                    const isActive = activeStep === index;
                                    return (_jsx(Grid, { item: true, xs: 3, children: _jsx(Tooltip, { title: `Question ${index + 1}${isFlagged ? ' (Flagged)' : ''}`, children: _jsxs(Box, { onClick: () => setActiveStep(index), sx: {
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
                                                        } }))] }) }) }, index));
                                }) })] }) })] }) }));
}
