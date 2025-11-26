import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { Container, Card, CardContent, CardHeader, Button, Box, Typography, Chip, Paper, LinearProgress, Alert, CircularProgress, Dialog, DialogTitle, DialogContent, IconButton, Backdrop } from '@mui/material';
import { Icon } from '@iconify/react';
import Grid from '@mui/material/GridLegacy';
export function LMSWritingView() {
    const [uploadedFiles, setUploadedFiles] = useState({
        1: null,
        2: null,
    });
    const [analyzing, setAnalyzing] = useState(false);
    const [progress, setProgress] = useState(0); // New: progress state
    const [openDialog, setOpenDialog] = useState(false);
    // Dummy analysis result
    const dummyAnalysis = {
        overallScore: 85,
        overallFeedback: 'Very strong writing overall! You demonstrate excellent control of structure and argumentation with only minor areas for polish.',
        strengths: [
            'Clear and compelling thesis statement',
            'Well-organized paragraphs with strong topic sentences',
            'Effective use of evidence and examples',
        ],
        weaknesses: [
            'Occasional repetitive vocabulary',
            'Some sentences could be more concise',
            'Minor article/preposition errors',
        ],
        categories: {
            grammar: { score: 82, feedback: 'Mostly accurate; watch articles (a/an/the) and prepositions.' },
            vocabulary: { score: 80, feedback: 'Good range, but try incorporating more academic/phrasal verbs.' },
            organization: { score: 94, feedback: 'Outstanding logical flow and paragraph structure.' },
            clarity: { score: 90, feedback: 'Ideas are expressed clearly and precisely.' },
            argumentation: { score: 88, feedback: 'Strong arguments with relevant counterargument acknowledgment.' },
        },
        improvements: [
            'Vary sentence starters to avoid repetition of “I” and “The”',
            'Replace basic words (good → beneficial, bad → detrimental, etc.)',
            'Read aloud to catch small grammar mistakes',
        ],
        nextSteps: [
            'Write one more essay this week on a different topic',
            'Study advanced linking phrases (e.g., “in contrast”, “consequently”)',
            'Review your essay after 24 hours for fresh proofreading',
        ],
    };
    const writingTopics = [
        {
            id: 1,
            title: 'Descriptive Essay: Your Favorite Place',
            description: 'Write a descriptive essay (300–500 words) about a place that holds special meaning to you. Use vivid sensory details to help readers visualize and experience this location.',
            tips: [
                'Use strong adjectives and adverbs',
                'Include all five senses',
                'Show, don’t just tell',
                'Organize spatially (e.g., left to right, near to far)',
            ],
            difficulty: 'Intermediate',
            timeEstimate: '45 minutes',
        },
        {
            id: 2,
            title: 'Argumentative Essay: Technology in Education',
            description: 'Write an argumentative essay (400–600 words) discussing whether technology has improved or hindered the quality of education. Take a clear stance and support it with evidence and examples.',
            tips: [
                'Clear thesis statement',
                'At least 2–3 strong arguments',
                'Address counterarguments',
                'Use real-world examples or studies',
            ],
            difficulty: 'Advanced',
            timeEstimate: '60 minutes',
        },
        {
            id: 3,
            title: 'Opinion Essay: Should College Be Free?',
            description: 'Write an opinion essay (350–550 words) stating whether college/university education should be free for everyone. Explain your position with logical reasoning and examples.',
            tips: [
                'Start with a strong opinion in the introduction',
                'Use linking words (Moreover, However, etc.)',
                'Balance advantages and disadvantages if needed',
            ],
            difficulty: 'Upper-Intermediate',
            timeEstimate: '50 minutes',
        },
        {
            id: 4,
            title: 'Narrative Essay: A Life-Changing Moment',
            description: 'Write a narrative essay (400–600 words) about a moment or event that significantly changed your life. Focus on emotions, thoughts, and lessons learned.',
            tips: [
                'Use chronological order',
                'Include dialogue where possible',
                'Show emotions through actions and thoughts',
                'End with reflection',
            ],
            difficulty: 'Intermediate',
            timeEstimate: '55 minutes',
        },
        {
            id: 5,
            title: 'Problem-Solution Essay: Climate Change',
            description: 'Write a problem-solution essay (450–650 words) about climate change. Clearly explain the problem and propose realistic, actionable solutions.',
            tips: [
                'Paragraph 1: Explain the problem',
                'Paragraph 2–3: Suggest 2–3 solutions',
                'Use cause-effect language',
                'Be specific and practical',
            ],
            difficulty: 'Advanced',
            timeEstimate: '65 minutes',
        },
        {
            id: 6,
            title: 'Compare & Contrast: City vs Countryside Living',
            description: 'Compare and contrast living in a big city versus living in the countryside (350–500 words). Discuss advantages and disadvantages of both.',
            tips: [
                'Use point-by-point or block structure',
                'Use comparison phrases (whereas, while, on the other hand)',
                'Remain balanced',
            ],
            difficulty: 'Intermediate',
            timeEstimate: '50 minutes',
        },
        {
            id: 7,
            title: 'Cause & Effect: Social Media on Mental Health',
            description: 'Write a cause-and-effect essay (400–600 words) examining how social media impacts mental health (positive, negative, or both). Use evidence and examples.',
            tips: [
                'Decide if you will focus on causes, effects, or both',
                'Use signal words (because, as a result, therefore)',
                'Support with studies or personal observation',
            ],
            difficulty: 'Advanced',
            timeEstimate: '60 minutes',
        },
        {
            id: 8,
            title: 'Advantages & Disadvantages: Working from Home',
            description: 'Discuss the advantages and disadvantages of remote work (350–550 words) in a balanced essay. Give specific examples from real life or current trends.',
            tips: [
                'One paragraph for advantages, one for disadvantages',
                'Use real examples (productivity, work-life balance, isolation, etc.)',
                'Conclude with your overall view',
            ],
            difficulty: 'Upper-Intermediate',
            timeEstimate: '50 minutes',
        },
        {
            id: 9,
            title: 'Process Essay: How to Achieve Success',
            description: 'Write a process essay (300–450 words) explaining how to achieve success in a field of your choice (career, studies, sports, etc.). Use clear steps and sequencing.',
            tips: [
                'Use imperative verbs and sequence words (First, Next, Finally)',
                'Be specific and realistic',
                'Include tips or warnings',
            ],
            difficulty: 'Intermediate',
            timeEstimate: '40 minutes',
        },
        {
            id: 10,
            title: 'IELTS Task 2: Governments Should Spend More on Public Transport',
            description: 'To what extent do you agree or disagree with this statement: "Governments should invest more in public transportation than in building new roads"? (350–550 words)',
            tips: [
                '4-paragraph structure (Intro, Body 1, Body 2, Conclusion)',
                'Fully address the question',
                'Use formal vocabulary and complex sentences',
            ],
            difficulty: 'Advanced',
            timeEstimate: '55 minutes',
        },
        {
            id: 11,
            title: 'Reflective Essay: The Person Who Influenced Me Most',
            description: 'Write a reflective essay (400–600 words) about the person who has had the greatest influence on your life. Explain who they are, what they did, and how they changed you.',
            tips: [
                'Use past and present tenses appropriately',
                'Be personal and honest',
                'Reflect deeply on lessons learned',
            ],
            difficulty: 'Upper-Intermediate',
            timeEstimate: '55 minutes',
        },
        {
            id: 12,
            title: 'Discursive Essay: Animal Testing – Necessary or Cruel?',
            description: 'Write a balanced discursive essay (450–650 words) exploring both sides of animal testing in medical research. Conclude with your own reasoned opinion.',
            tips: [
                'Present both views fairly',
                'Use objective language',
                'Support with facts or ethical arguments',
                'Clear personal stance in conclusion',
            ],
            difficulty: 'Advanced',
            timeEstimate: '65 minutes',
        },
    ];
    const handleFileUpload = (topicId, event) => {
        const file = event.target.files?.[0];
        if (file && file.type === 'application/pdf') {
            setUploadedFiles((prev) => ({ ...prev, [topicId]: file }));
        }
        else {
            alert('Please upload a valid PDF file');
        }
    };
    // Updated: Handle Analyze with 5-second smooth progress
    const handleAnalyze = () => {
        const uploadedCount = Object.values(uploadedFiles).filter((f) => f !== null).length;
        if (uploadedCount === 0) {
            alert('Please upload at least one essay to analyze');
            return;
        }
        setAnalyzing(true);
        setProgress(0);
        setOpenDialog(false);
        const duration = 5000; // 5 seconds
        const interval = 50;
        const increment = (100 * interval) / duration;
        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setAnalyzing(false);
                    setOpenDialog(true);
                    return 100;
                }
                return Math.min(prev + increment, 100);
            });
        }, interval);
    };
    const getScoreColor = (score) => {
        if (score >= 80)
            return '#10b981';
        if (score >= 60)
            return '#f59e0b';
        return '#ef4444';
    };
    return (_jsxs(_Fragment, { children: [_jsx(Box, { sx: { bgcolor: '#f5f7fa', minHeight: '100vh', py: 4 }, children: _jsxs(Container, { maxWidth: "xl", children: [_jsxs(Box, { sx: { mb: 5, bgcolor: '#1e3a8a', color: 'white', p: 4, borderRadius: 3 }, children: [_jsx(Typography, { variant: "h4", fontWeight: "bold", gutterBottom: true, children: "English Writing Practice Portal" }), _jsx(Typography, { variant: "body1", sx: { mb: 2, opacity: 0.9 }, children: "Improve your English writing skills with instant AI-powered feedback" }), _jsx(Box, { sx: { display: 'flex', gap: 1.5, flexWrap: 'wrap' }, children: ['Practice Writing', 'Get AI Feedback', 'Track Progress'].map((t) => (_jsx(Chip, { label: t, sx: { bgcolor: '#3b82f6', color: 'white' } }, t))) })] }), _jsx(Grid, { container: true, spacing: 4, sx: { mb: 5 }, children: writingTopics.map((topic) => (_jsx(Grid, { item: true, xs: 12, children: _jsxs(Card, { elevation: 6, sx: { borderRadius: 3 }, children: [_jsx(CardHeader, { avatar: _jsx(Icon, { icon: "mdi:pencil-outline", width: 32, color: "#3b82f6" }), title: _jsxs(Typography, { variant: "h6", fontWeight: "bold", children: ["Topic ", topic.id, ": ", topic.title] }), action: _jsxs(Box, { sx: { display: 'flex', gap: 1 }, children: [_jsx(Chip, { label: topic.difficulty, size: "small", color: topic.difficulty === 'Advanced' ? 'error' : 'warning' }), _jsx(Chip, { label: topic.timeEstimate, icon: _jsx(Icon, { icon: "mdi:clock-outline" }), size: "small" })] }) }), _jsxs(CardContent, { children: [_jsx(Typography, { variant: "body1", color: "text.secondary", paragraph: true, children: topic.description }), _jsxs(Paper, { sx: { p: 2, bgcolor: '#f0f9ff', border: '1px solid #bae6fd', mb: 3 }, children: [_jsxs(Typography, { variant: "subtitle2", fontWeight: "bold", color: "#0369a1", children: [_jsx(Icon, { icon: "mdi:lightbulb-on-outline", width: 20, style: { verticalAlign: 'middle' } }), "Writing Tips"] }), _jsx(Box, { component: "ul", sx: { mt: 1, pl: 3, color: '#0c4a6e' }, children: topic.tips.map((tip, i) => (_jsx("li", { children: _jsx(Typography, { variant: "body2", children: tip }) }, i))) })] }), _jsxs(Paper, { onClick: () => document.getElementById(`file-${topic.id}`)?.click(), sx: {
                                                        p: 4,
                                                        textAlign: 'center',
                                                        cursor: 'pointer',
                                                        border: uploadedFiles[topic.id] ? '2px solid #10b981' : '2px dashed #3b82f6',
                                                        borderRadius: 3,
                                                        bgcolor: uploadedFiles[topic.id] ? '#f0fdf4' : '#f8faff',
                                                        transition: 'all 0.3s',
                                                        '&:hover': { bgcolor: uploadedFiles[topic.id] ? '#dcfce7' : '#eff6ff' },
                                                    }, children: [_jsx("input", { id: `file-${topic.id}`, type: "file", accept: "application/pdf", style: { display: 'none' }, onChange: (e) => handleFileUpload(topic.id, e) }), uploadedFiles[topic.id] ? (_jsxs(_Fragment, { children: [_jsx(Icon, { icon: "mdi:check-circle", width: 56, color: "#10b981" }), _jsx(Typography, { variant: "h6", fontWeight: "bold", color: "#059669", mt: 1, children: uploadedFiles[topic.id]?.name }), _jsx(Typography, { variant: "body2", color: "success.main", children: "Ready for analysis!" })] })) : (_jsxs(_Fragment, { children: [_jsx(Icon, { icon: "mdi:cloud-upload-outline", width: 56, color: "#3b82f6" }), _jsx(Typography, { variant: "h6", fontWeight: "bold", mt: 2, children: "Click or drop your PDF essay here" }), _jsx(Button, { variant: "contained", sx: { mt: 2, bgcolor: '#3b82f6' }, children: "Choose PDF File" })] }))] })] })] }) }, topic.id))) }), _jsxs(Box, { textAlign: "center", sx: { position: 'relative' }, children: [_jsx(Button, { variant: "contained", size: "large", onClick: handleAnalyze, disabled: analyzing || Object.values(uploadedFiles).every((f) => f === null), startIcon: analyzing ? _jsx(CircularProgress, { size: 28, color: "inherit" }) : _jsx(Icon, { icon: "mdi:brain", width: 32 }), sx: {
                                        px: 10,
                                        py: 2.5,
                                        fontSize: '1.3rem',
                                        fontWeight: 'bold',
                                        bgcolor: '#1e3a8a',
                                        '&:hover': { bgcolor: '#1e40af' },
                                        '&.Mui-disabled': { bgcolor: '#93c5fd' },
                                    }, children: analyzing ? 'Analyzing Your Essay...' : 'Analyze My Writing' }), _jsxs(Backdrop, { sx: {
                                        color: '#fff',
                                        zIndex: (theme) => theme.zIndex.drawer + 1,
                                        flexDirection: 'column',
                                        gap: 2
                                    }, open: analyzing, children: [_jsx(CircularProgress, { size: 60, thickness: 4, color: "inherit" }), _jsx(Typography, { variant: "h6", sx: { mt: 2, fontWeight: 'bold' }, children: "Analyzing Your Writing..." }), _jsx(Typography, { variant: "body2", sx: { opacity: 0.9 }, children: "Checking grammar, vocabulary, structure, and style" })] })] })] }) }), _jsxs(Dialog, { open: openDialog, onClose: () => setOpenDialog(false), maxWidth: "lg", fullWidth: true, scroll: "paper", children: [_jsx(DialogTitle, { sx: { bgcolor: '#1e3a8a', color: 'white', py: 2 }, children: _jsxs(Box, { display: "flex", justifyContent: "space-between", alignItems: "center", children: [_jsxs(Typography, { variant: "h5", fontWeight: "bold", display: "flex", alignItems: "center", gap: 1.5, children: [_jsx(Icon, { icon: "mdi:chart-bell-curve", width: 32 }), "Writing Analysis Report"] }), _jsx(IconButton, { onClick: () => setOpenDialog(false), sx: { color: 'white' }, children: _jsx(Icon, { icon: "mdi:close", width: 28 }) })] }) }), _jsx(DialogContent, { dividers: true, children: _jsxs(Box, { sx: { py: 3 }, children: [_jsxs(Paper, { elevation: 3, sx: { p: 4, textAlign: 'center', mb: 5, bgcolor: '#f0f9ff' }, children: [_jsxs(Typography, { variant: "h3", fontWeight: "bold", color: getScoreColor(dummyAnalysis.overallScore), children: [dummyAnalysis.overallScore, "/100"] }), _jsx(Typography, { variant: "h6", color: "text.secondary", children: "Overall Writing Score" }), _jsx(Typography, { variant: "body1", mt: 2, color: "#4b5563", children: dummyAnalysis.overallFeedback })] }), _jsx(Grid, { container: true, spacing: 3, mb: 5, children: Object.entries(dummyAnalysis.categories).map(([cat, data]) => (_jsx(Grid, { item: true, xs: 12, sm: 6, md: 4, children: _jsxs(Paper, { sx: { p: 3, textAlign: 'center' }, children: [_jsx(Typography, { variant: "subtitle1", fontWeight: "bold", textTransform: "capitalize", children: cat }), _jsx(Typography, { variant: "h4", color: getScoreColor(data.score), mt: 1, children: data.score }), _jsx(LinearProgress, { variant: "determinate", value: data.score, sx: {
                                                        height: 10,
                                                        borderRadius: 5,
                                                        mt: 2,
                                                        mb: 2,
                                                        bgcolor: '#e5e7eb',
                                                        '& .MuiLinearProgress-bar': { bgcolor: getScoreColor(data.score) },
                                                    } }), _jsx(Typography, { variant: "body2", color: "text.secondary", children: data.feedback })] }) }, cat))) }), _jsxs(Grid, { container: true, spacing: 4, mb: 4, children: [_jsxs(Grid, { item: true, xs: 12, md: 6, children: [_jsx(Alert, { severity: "success", icon: _jsx(Icon, { icon: "mdi:thumb-up-outline", width: 24 }), children: _jsx(Typography, { fontWeight: "bold", children: "Strengths" }) }), _jsx(Box, { component: "ul", pl: 4, mt: 2, children: dummyAnalysis.strengths.map((s, i) => (_jsx("li", { children: _jsx(Typography, { children: s }) }, i))) })] }), _jsxs(Grid, { item: true, xs: 12, md: 6, children: [_jsx(Alert, { severity: "warning", icon: _jsx(Icon, { icon: "mdi:alert-outline", width: 24 }), children: _jsx(Typography, { fontWeight: "bold", children: "Areas for Improvement" }) }), _jsx(Box, { component: "ul", pl: 4, mt: 2, children: dummyAnalysis.weaknesses.map((w, i) => (_jsx("li", { children: _jsx(Typography, { children: w }) }, i))) })] })] }), _jsxs(Paper, { sx: { p: 4, bgcolor: '#fefce8', border: '1px solid #f59e0b', mb: 3 }, children: [_jsxs(Typography, { variant: "h6", fontWeight: "bold", display: "flex", alignItems: "center", gap: 1, mb: 2, children: [_jsx(Icon, { icon: "mdi:star-shooting-outline", width: 24 }), "Specific Improvement Suggestions"] }), _jsx(Box, { component: "ol", pl: 3, children: dummyAnalysis.improvements.map((imp, i) => (_jsx("li", { children: _jsx(Typography, { sx: { mb: 1.5 }, children: imp }) }, i))) })] }), _jsxs(Paper, { sx: { p: 4, bgcolor: '#ecfeff', border: '1px solid #06b6d4' }, children: [_jsxs(Typography, { variant: "h6", fontWeight: "bold", display: "flex", alignItems: "center", gap: 1, mb: 2, children: [_jsx(Icon, { icon: "mdi:compass-outline", width: 24 }), "Your Next Steps"] }), _jsx(Box, { component: "ol", pl: 3, children: dummyAnalysis.nextSteps.map((step, i) => (_jsx("li", { children: _jsx(Typography, { sx: { mb: 1.5 }, children: step }) }, i))) })] })] }) })] })] }));
}
