import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useRef } from 'react';
import { Container, Card, CardContent, CardHeader, Button, Box, Typography, Paper, LinearProgress, Alert, List, ListItem, ListItemIcon, ListItemText, Chip, CircularProgress, Backdrop } from '@mui/material';
import { Icon } from '@iconify/react';
import Grid from '@mui/material/GridLegacy';
export function LMSSpeakingView() {
    const [isRecording, setIsRecording] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);
    const [hasRecording, setHasRecording] = useState(false);
    const [showAnalysis, setShowAnalysis] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false); // New state for loading
    const [progress, setProgress] = useState(0); // Progress from 0 to 100
    const [selectedPassage, setSelectedPassage] = useState(0);
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);
    const timerRef = useRef(null);
    const passages = [
        {
            id: 1,
            title: "The Power of Technology",
            level: "Beginner",
            content: `Technology has transformed the way we live, work, and communicate. In the past few decades, we have witnessed remarkable innovations that have made our lives easier and more connected. From smartphones that fit in our pockets to artificial intelligence that can understand human language, technology continues to evolve at an unprecedented pace.

The internet has become an essential part of our daily routines. We use it to stay in touch with friends and family, access information, shop online, and even work remotely. Social media platforms have created new ways for people to share their thoughts and experiences with others around the world.

However, with these benefits come challenges. We must learn to balance our screen time and maintain face-to-face connections. Privacy and security are also important concerns in our digital age. As technology advances, it is crucial that we use it responsibly and ethically.

Education has been greatly enhanced by technology. Students can now access educational resources from anywhere in the world. Online courses and video tutorials have made learning more accessible and flexible. Virtual reality is beginning to transform how we experience education, allowing students to explore historical sites or conduct scientific experiments in immersive environments.

Looking ahead, technology will continue to shape our future in ways we cannot yet imagine. It is up to us to ensure that these innovations benefit society as a whole and create a better world for future generations.`
        },
        {
            id: 2,
            title: "Climate Change Awareness",
            level: "Intermediate",
            content: `Climate change represents one of the most pressing challenges facing humanity today. The scientific consensus is clear: human activities, particularly the burning of fossil fuels, are causing global temperatures to rise at an alarming rate. This phenomenon is not just about warmer weather; it encompasses a complex web of environmental changes that threaten ecosystems, economies, and communities worldwide.

The evidence of climate change is visible all around us. Glaciers are melting at unprecedented rates, sea levels are rising, and extreme weather events are becoming more frequent and severe. Hurricanes, droughts, wildfires, and floods are affecting millions of people every year, causing devastating losses of life and property.

The impact on biodiversity is equally concerning. Many species are struggling to adapt to rapidly changing conditions, leading to shifts in migration patterns, breeding cycles, and habitat ranges. Some species face extinction as their environments become uninhabitable. Coral reefs, often called the rainforests of the sea, are experiencing massive bleaching events due to warming ocean temperatures.

Addressing climate change requires collective action at all levels of society. Governments must implement policies that reduce greenhouse gas emissions and promote renewable energy. Businesses need to adopt sustainable practices and invest in green technologies. Individuals can make a difference through everyday choices, such as reducing energy consumption, using public transportation, and supporting environmentally responsible companies.

The transition to a sustainable future also presents opportunities. Renewable energy sectors are creating new jobs and driving economic growth. Innovation in clean technology is opening new markets and possibilities. By acting now, we can mitigate the worst effects of climate change and build a more resilient and sustainable world for future generations.`
        },
        {
            id: 3,
            title: "The Art of Communication",
            level: "Advanced",
            content: `Effective communication stands as one of the most valuable skills in both personal and professional contexts. It transcends the mere exchange of information, encompassing the ability to convey ideas clearly, listen actively, and respond appropriately to diverse situations and audiences. Mastering this art requires continuous practice, self-awareness, and a genuine willingness to understand others.

At its core, communication involves multiple dimensions that work in concert. Verbal communication, the words we choose and how we articulate them, represents just one facet. Non-verbal cues, including body language, facial expressions, and tone of voice, often convey more meaning than the words themselves. Research suggests that up to 93% of communication effectiveness is determined by non-verbal factors, highlighting the importance of alignment between what we say and how we express it.

Active listening constitutes a critical yet frequently overlooked component of effective communication. It involves fully concentrating on the speaker, understanding their message, responding thoughtfully, and remembering the conversation. This goes beyond simply hearing words; it requires empathy, patience, and the ability to suspend judgment while seeking to understand the other person's perspective.

In our increasingly globalized world, cross-cultural communication has become essential. Different cultures have varying communication styles, norms, and expectations. What is considered polite and appropriate in one culture may be perceived differently in another. Developing cultural intelligence and sensitivity enables us to navigate these differences successfully and build meaningful connections across cultural boundaries.

The digital age has introduced new dimensions to communication. Email, instant messaging, video conferencing, and social media have transformed how we interact, offering unprecedented convenience and reach. However, these technologies also present challenges, such as the loss of non-verbal cues in text-based communication and the potential for misunderstandings. Adapting our communication strategies to different mediums while maintaining authenticity and clarity is crucial in today's interconnected world.`
        }
    ];
    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;
            audioChunksRef.current = [];
            mediaRecorder.ondataavailable = (event) => {
                audioChunksRef.current.push(event.data);
            };
            mediaRecorder.onstop = () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
                setHasRecording(true);
                stream.getTracks().forEach(track => track.stop());
            };
            mediaRecorder.start();
            setIsRecording(true);
            setShowAnalysis(false);
            setRecordingTime(0);
            timerRef.current = setInterval(() => {
                setRecordingTime(prev => prev + 1);
            }, 1000);
        }
        catch (error) {
            console.error('Error accessing microphone:', error);
            alert('Unable to access microphone. Please check your permissions.');
        }
    };
    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        }
    };
    const analyzeRecording = () => {
        setIsAnalyzing(true);
        setProgress(0);
        setShowAnalysis(false);
        // Simulate 5-second analysis with smooth progress
        const duration = 5000;
        const interval = 50;
        const increment = (100 * interval) / duration;
        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setIsAnalyzing(false);
                    setShowAnalysis(true);
                    return 100;
                }
                return prev + increment;
            });
        }, interval);
    };
    const resetRecording = () => {
        setHasRecording(false);
        setShowAnalysis(false);
        setIsAnalyzing(false);
        setProgress(0);
        setRecordingTime(0);
    };
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };
    // Dummy analysis data
    const analysis = {
        overallScore: 78,
        pronunciation: 82,
        fluency: 75,
        vocabulary: 80,
        grammar: 73,
        strengths: [
            "Clear pronunciation of most words",
            "Good pace and rhythm",
            "Appropriate use of pauses",
            "Confident tone throughout"
        ],
        improvements: [
            "Watch out for 'th' sounds - practice words like 'think' and 'these'",
            "Try to reduce filler words like 'um' and 'uh'",
            "Work on past tense verb endings (-ed sounds)",
            "Some articles (a, an, the) were missing in your speech"
        ],
        suggestions: [
            "Practice reading aloud for 15 minutes daily",
            "Record yourself and listen back to identify patterns",
            "Focus on word stress in multi-syllable words",
            "Try shadowing native speakers (repeat what they say)"
        ]
    };
    return (_jsx(Box, { sx: { backgroundColor: '#f5f7fa', minHeight: '100vh', py: 3 }, children: _jsxs(Container, { maxWidth: "xl", children: [_jsxs(Box, { sx: { mb: 4, backgroundColor: '#1e3a8a', color: 'white', p: 3, borderRadius: 2 }, children: [_jsx(Typography, { variant: "h4", sx: { fontWeight: 'bold', mb: 1 }, children: "English Speaking Practice" }), _jsx(Typography, { variant: "body1", sx: { mb: 2 }, children: "Practice your English speaking skills by reading passages aloud and get instant feedback" }), _jsxs(Box, { sx: { display: 'flex', gap: 2, flexWrap: 'wrap' }, children: [_jsx(Chip, { label: "Interactive Practice", sx: { backgroundColor: '#3b82f6', color: 'white' } }), _jsx(Chip, { label: "Instant Feedback", sx: { backgroundColor: '#3b82f6', color: 'white' } }), _jsx(Chip, { label: "Multiple Levels", sx: { backgroundColor: '#3b82f6', color: 'white' } })] })] }), _jsxs(Grid, { container: true, spacing: 3, children: [_jsx(Grid, { item: true, xs: 12, md: 7, sx: { width: { xs: '100%', md: '50%' } }, children: _jsxs(Card, { sx: { boxShadow: '0 4px 20px rgba(0,0,0,0.1)', height: '100%' }, children: [_jsx(CardHeader, { title: "Reading Passage", sx: { fontWeight: 'bold' }, action: _jsx(Chip, { label: passages[selectedPassage].level, color: "primary", size: "small" }) }), _jsxs(CardContent, { children: [_jsxs(Box, { sx: { mb: 3 }, children: [_jsx(Typography, { variant: "subtitle2", sx: { mb: 1, fontWeight: 'bold' }, children: "Select a passage:" }), _jsx(Box, { sx: { display: 'flex', gap: 1, flexWrap: 'wrap' }, children: passages.map((passage, index) => (_jsx(Button, { variant: selectedPassage === index ? "contained" : "outlined", size: "small", onClick: () => setSelectedPassage(index), sx: { textTransform: 'none' }, children: passage.title }, passage.id))) })] }), _jsxs(Paper, { sx: {
                                                    p: 4,
                                                    backgroundColor: '#ffffff',
                                                    border: '1px solid #e5e7eb',
                                                    borderRadius: 2,
                                                    maxHeight: '600px',
                                                    overflowY: 'auto',
                                                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)',
                                                }, children: [_jsx(Typography, { variant: "h5", sx: { fontWeight: 'bold', mb: 3, color: '#1e3a8a', textAlign: 'center' }, children: passages[selectedPassage].title }), _jsx(Typography, { variant: "body1", sx: {
                                                            lineHeight: 2,
                                                            fontSize: '1.1rem',
                                                            color: '#374151',
                                                            textAlign: 'justify',
                                                            whiteSpace: 'pre-line'
                                                        }, children: passages[selectedPassage].content })] }), _jsx(Alert, { severity: "info", sx: { mt: 2 }, children: _jsxs(Typography, { variant: "body2", children: [_jsx("strong", { children: "Tip:" }), " Read the passage silently first, then record yourself reading it aloud."] }) })] })] }) }), _jsxs(Grid, { item: true, xs: 12, md: 5, sx: { width: { xs: '100%', md: '40%' } }, children: [_jsxs(Card, { sx: { boxShadow: '0 4px 20px rgba(0,0,0,0.1)', mb: 3 }, children: [_jsx(CardHeader, { title: "Voice Recorder", sx: { fontWeight: 'bold' } }), _jsx(CardContent, { children: _jsxs(Box, { sx: {
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'center',
                                                    p: 4,
                                                    backgroundColor: '#f9fafb',
                                                    borderRadius: 2,
                                                    border: '2px dashed #cbd5e1',
                                                }, children: [_jsx(Box, { sx: {
                                                            width: 120,
                                                            height: 120,
                                                            borderRadius: '50%',
                                                            backgroundColor: isRecording ? '#ef4444' : '#3b82f6',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            mb: 3,
                                                            animation: isRecording ? 'pulse 1.5s infinite' : 'none',
                                                            '@keyframes pulse': {
                                                                '0%, 100%': { opacity: 1 },
                                                                '50%': { opacity: 0.6 },
                                                            },
                                                        }, children: _jsx(Icon, { icon: isRecording ? "mdi:microphone" : "mdi:microphone-outline", width: 60, height: 60, color: "white" }) }), _jsx(Typography, { variant: "h4", sx: { fontWeight: 'bold', mb: 3, color: isRecording ? '#ef4444' : '#64748b' }, children: formatTime(recordingTime) }), _jsxs(Box, { sx: { display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap', justifyContent: 'center' }, children: [!isRecording && !hasRecording && (_jsx(Button, { variant: "contained", size: "large", startIcon: _jsx(Icon, { icon: "mdi:record-circle" }), onClick: startRecording, sx: {
                                                                    backgroundColor: '#ef4444',
                                                                    '&:hover': { backgroundColor: '#dc2626' },
                                                                    textTransform: 'none',
                                                                    px: 4,
                                                                }, children: "Start Recording" })), isRecording && (_jsx(Button, { variant: "contained", size: "large", startIcon: _jsx(Icon, { icon: "mdi:stop" }), onClick: stopRecording, sx: {
                                                                    backgroundColor: '#64748b',
                                                                    '&:hover': { backgroundColor: '#475569' },
                                                                    textTransform: 'none',
                                                                    px: 4,
                                                                }, children: "Stop Recording" })), hasRecording && !isRecording && (_jsxs(_Fragment, { children: [_jsx(Button, { variant: "outlined", size: "large", startIcon: _jsx(Icon, { icon: "mdi:refresh" }), onClick: resetRecording, disabled: isAnalyzing, sx: { textTransform: 'none' }, children: "Re-record" }), _jsx(Button, { variant: "contained", size: "large", startIcon: isAnalyzing ? _jsx(CircularProgress, { size: 20, color: "inherit" }) : _jsx(Icon, { icon: "mdi:chart-line" }), onClick: analyzeRecording, disabled: isAnalyzing, sx: {
                                                                            backgroundColor: '#10b981',
                                                                            '&:hover': { backgroundColor: '#059669' },
                                                                            textTransform: 'none',
                                                                            px: 4,
                                                                        }, children: isAnalyzing ? 'Analyzing...' : 'Analyze' })] }))] }), isRecording && (_jsx(Alert, { severity: "error", sx: { mt: 2, width: '100%' }, children: "Recording in progress... Speak clearly into your microphone" })), hasRecording && !isRecording && !isAnalyzing && !showAnalysis && (_jsx(Alert, { severity: "success", sx: { mt: 2, width: '100%' }, children: "Recording saved! Click \"Analyze\" to get feedback" })), _jsxs(Backdrop, { sx: {
                                                            color: '#fff',
                                                            zIndex: 9999,
                                                            flexDirection: 'column',
                                                            gap: 2
                                                        }, open: isAnalyzing, children: [_jsx(CircularProgress, { size: 70, thickness: 5 }), _jsx(Typography, { variant: "h5", fontWeight: "bold", children: "Analyzing Your Speech..." }), _jsx(Typography, { variant: "body2", children: "Detecting pronunciation, fluency, intonation & rhythm" })] })] }) })] }), showAnalysis && !isAnalyzing && (_jsxs(Card, { sx: { boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }, children: [_jsx(CardHeader, { title: "Speaking Analysis", sx: { fontWeight: 'bold' }, avatar: _jsx(Icon, { icon: "mdi:chart-bar", width: 24, height: 24, color: "#3b82f6" }) }), _jsxs(CardContent, { children: [_jsxs(Box, { sx: { textAlign: 'center', mb: 3, p: 3, backgroundColor: '#f0f9ff', borderRadius: 2 }, children: [_jsxs(Typography, { variant: "h3", sx: { fontWeight: 'bold', color: '#3b82f6' }, children: [analysis.overallScore, "%"] }), _jsx(Typography, { variant: "body2", color: "text.secondary", children: "Overall Score" })] }), _jsx(Box, { sx: { mb: 3 }, children: [
                                                        { label: 'Pronunciation', score: analysis.pronunciation, color: '#10b981' },
                                                        { label: 'Fluency', score: analysis.fluency, color: '#3b82f6' },
                                                        { label: 'Vocabulary', score: analysis.vocabulary, color: '#f59e0b' },
                                                        { label: 'Grammar', score: analysis.grammar, color: '#8b5cf6' },
                                                    ].map((item) => (_jsxs(Box, { sx: { mb: 2 }, children: [_jsxs(Box, { sx: { display: 'flex', justifyContent: 'space-between', mb: 0.5 }, children: [_jsx(Typography, { variant: "body2", sx: { fontWeight: 'medium' }, children: item.label }), _jsxs(Typography, { variant: "body2", sx: { fontWeight: 'bold', color: item.color }, children: [item.score, "%"] })] }), _jsx(LinearProgress, { variant: "determinate", value: item.score, sx: {
                                                                    height: 8,
                                                                    borderRadius: 4,
                                                                    backgroundColor: '#e5e7eb',
                                                                    '& .MuiLinearProgress-bar': {
                                                                        backgroundColor: item.color,
                                                                    },
                                                                } })] }, item.label))) }), _jsxs(Box, { sx: { mb: 3 }, children: [_jsxs(Typography, { variant: "subtitle2", sx: { fontWeight: 'bold', mb: 1, color: '#10b981', display: 'flex', alignItems: 'center', gap: 1 }, children: [_jsx(Icon, { icon: "mdi:check-circle", width: 20, height: 20 }), "Strong Points"] }), _jsx(List, { dense: true, children: analysis.strengths.map((strength, index) => (_jsxs(ListItem, { sx: { py: 0.5 }, children: [_jsx(ListItemIcon, { sx: { minWidth: 32 }, children: _jsx(Icon, { icon: "mdi:check", color: "#10b981", width: 20, height: 20 }) }), _jsx(ListItemText, { primary: strength, primaryTypographyProps: { variant: 'body2' } })] }, index))) })] }), _jsxs(Box, { sx: { mb: 3 }, children: [_jsxs(Typography, { variant: "subtitle2", sx: { fontWeight: 'bold', mb: 1, color: '#f59e0b', display: 'flex', alignItems: 'center', gap: 1 }, children: [_jsx(Icon, { icon: "mdi:alert-circle", width: 20, height: 20 }), "Areas for Improvement"] }), _jsx(List, { dense: true, children: analysis.improvements.map((improvement, index) => (_jsxs(ListItem, { sx: { py: 0.5 }, children: [_jsx(ListItemIcon, { sx: { minWidth: 32 }, children: _jsx(Icon, { icon: "mdi:arrow-right", color: "#f59e0b", width: 20, height: 20 }) }), _jsx(ListItemText, { primary: improvement, primaryTypographyProps: { variant: 'body2' } })] }, index))) })] }), _jsxs(Box, { children: [_jsxs(Typography, { variant: "subtitle2", sx: { fontWeight: 'bold', mb: 1, color: '#3b82f6', display: 'flex', alignItems: 'center', gap: 1 }, children: [_jsx(Icon, { icon: "mdi:lightbulb", width: 20, height: 20 }), "Practice Suggestions"] }), _jsx(List, { dense: true, children: analysis.suggestions.map((suggestion, index) => (_jsxs(ListItem, { sx: { py: 0.5 }, children: [_jsx(ListItemIcon, { sx: { minWidth: 32 }, children: _jsx(Icon, { icon: "mdi:star", color: "#3b82f6", width: 20, height: 20 }) }), _jsx(ListItemText, { primary: suggestion, primaryTypographyProps: { variant: 'body2' } })] }, index))) })] })] })] }))] })] })] }) }));
}
