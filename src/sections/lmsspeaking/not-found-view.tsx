import React, { useState, useRef, useEffect } from 'react';
import {
  Container,
 
  Card,
  CardContent,
  CardHeader,
  Button,
  Box,
  Typography,
  Paper,
  LinearProgress,
  Alert,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  CircularProgress,
  Backdrop
} from '@mui/material';
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

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

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
    } catch (error) {
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

  const formatTime = (seconds: number) => {
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

  return (
    <Box sx={{ backgroundColor: '#f5f7fa', minHeight: '100vh', py: 3 }}>
      <Container maxWidth="xl">
        {/* Header */}
        <Box sx={{ mb: 4, backgroundColor: '#1e3a8a', color: 'white', p: 3, borderRadius: 2 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
            English Speaking Practice
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Practice your English speaking skills by reading passages aloud and get instant feedback
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Chip label="Interactive Practice" sx={{ backgroundColor: '#3b82f6', color: 'white' }} />
            <Chip label="Instant Feedback" sx={{ backgroundColor: '#3b82f6', color: 'white' }} />
            <Chip label="Multiple Levels" sx={{ backgroundColor: '#3b82f6', color: 'white' }} />
          </Box>
        </Box>

        <Grid container spacing={3}>
          {/* Left Side - Reading Passage */}
          <Grid item xs={12} md={7} sx={{width:{xs:'100%',md:'50%'}}}>
            <Card sx={{ boxShadow: '0 4px 20px rgba(0,0,0,0.1)', height: '100%' }}>
              <CardHeader 
                title="Reading Passage" 
                sx={{ fontWeight: 'bold' }}
                action={
                  <Chip 
                    label={passages[selectedPassage].level} 
                    color="primary" 
                    size="small"
                  />
                }
              />
              <CardContent>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>
                    Select a passage:
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {passages.map((passage, index) => (
                      <Button
                        key={passage.id}
                        variant={selectedPassage === index ? "contained" : "outlined"}
                        size="small"
                        onClick={() => setSelectedPassage(index)}
                        sx={{ textTransform: 'none' }}
                      >
                        {passage.title}
                      </Button>
                    ))}
                  </Box>
                </Box>

                <Paper
                  sx={{
                    p: 4,
                    backgroundColor: '#ffffff',
                    border: '1px solid #e5e7eb',
                    borderRadius: 2,
                    maxHeight: '600px',
                    overflowY: 'auto',
                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)',
                  }}
                >
                  <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3, color: '#1e3a8a', textAlign: 'center' }}>
                    {passages[selectedPassage].title}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      lineHeight: 2,
                      fontSize: '1.1rem',
                      color: '#374151',
                      textAlign: 'justify',
                      whiteSpace: 'pre-line'
                    }}
                  >
                    {passages[selectedPassage].content}
                  </Typography>
                </Paper>

                <Alert severity="info" sx={{ mt: 2 }}>
                  <Typography variant="body2">
                    <strong>Tip:</strong> Read the passage silently first, then record yourself reading it aloud.
                  </Typography>
                </Alert>
              </CardContent>
            </Card>
          </Grid>

          {/* Right Side - Recording & Analysis */}
          <Grid item xs={12} md={5} sx={{width:{xs:'100%',md:'40%'}}}>
            <Card sx={{ boxShadow: '0 4px 20px rgba(0,0,0,0.1)', mb: 3 }}>
              <CardHeader title="Voice Recorder" sx={{ fontWeight: 'bold' }} />
              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    p: 4,
                    backgroundColor: '#f9fafb',
                    borderRadius: 2,
                    border: '2px dashed #cbd5e1',
                  }}
                >
                  <Box
                    sx={{
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
                    }}
                  >
                    <Icon
                      icon={isRecording ? "mdi:microphone" : "mdi:microphone-outline"}
                      width={60}
                      height={60}
                      color="white"
                    />
                  </Box>

                  <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3, color: isRecording ? '#ef4444' : '#64748b' }}>
                    {formatTime(recordingTime)}
                  </Typography>

                  <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
                    {!isRecording && !hasRecording && (
                      <Button
                        variant="contained"
                        size="large"
                        startIcon={<Icon icon="mdi:record-circle" />}
                        onClick={startRecording}
                        sx={{
                          backgroundColor: '#ef4444',
                          '&:hover': { backgroundColor: '#dc2626' },
                          textTransform: 'none',
                          px: 4,
                        }}
                      >
                        Start Recording
                      </Button>
                    )}

                    {isRecording && (
                      <Button
                        variant="contained"
                        size="large"
                        startIcon={<Icon icon="mdi:stop" />}
                        onClick={stopRecording}
                        sx={{
                          backgroundColor: '#64748b',
                          '&:hover': { backgroundColor: '#475569' },
                          textTransform: 'none',
                          px: 4,
                        }}
                      >
                        Stop Recording
                      </Button>
                    )}

                    {hasRecording && !isRecording && (
                      <>
                        <Button
                          variant="outlined"
                          size="large"
                          startIcon={<Icon icon="mdi:refresh" />}
                          onClick={resetRecording}
                          disabled={isAnalyzing}
                          sx={{ textTransform: 'none' }}
                        >
                          Re-record
                        </Button>
                        <Button
                          variant="contained"
                          size="large"
                          startIcon={isAnalyzing ? <CircularProgress size={20} color="inherit" /> : <Icon icon="mdi:chart-line" />}
                          onClick={analyzeRecording}
                          disabled={isAnalyzing}
                          sx={{
                            backgroundColor: '#10b981',
                            '&:hover': { backgroundColor: '#059669' },
                            textTransform: 'none',
                            px: 4,
                          }}
                        >
                          {isAnalyzing ? 'Analyzing...' : 'Analyze'}
                        </Button>
                      </>
                    )}
                  </Box>

                  {isRecording && (
                    <Alert severity="error" sx={{ mt: 2, width: '100%' }}>
                      Recording in progress... Speak clearly into your microphone
                    </Alert>
                  )}

                  {hasRecording && !isRecording && !isAnalyzing && !showAnalysis && (
                    <Alert severity="success" sx={{ mt: 2, width: '100%' }}>
                      Recording saved! Click "Analyze" to get feedback
                    </Alert>
                  )}

                  {/* Progress Bar during analysis */}
                 <Backdrop
  sx={{ 
    color: '#fff', 
    zIndex: 9999,
    flexDirection: 'column',
    gap: 2
  }}
  open={isAnalyzing}
>
  <CircularProgress size={70} thickness={5} />
  <Typography variant="h5" fontWeight="bold">
    Analyzing Your Speech...
  </Typography>
  <Typography variant="body2">
    Detecting pronunciation, fluency, intonation & rhythm
  </Typography>
</Backdrop>
                </Box>
              </CardContent>
            </Card>

            {/* Analysis Results - Only show after loading */}
            {showAnalysis && !isAnalyzing && (
              <Card sx={{ boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
                <CardHeader 
                  title="Speaking Analysis" 
                  sx={{ fontWeight: 'bold' }}
                  avatar={<Icon icon="mdi:chart-bar" width={24} height={24} color="#3b82f6" />}
                />
                <CardContent>
                  <Box sx={{ textAlign: 'center', mb: 3, p: 3, backgroundColor: '#f0f9ff', borderRadius: 2 }}>
                    <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#3b82f6' }}>
                      {analysis.overallScore}%
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Overall Score
                    </Typography>
                  </Box>

                  <Box sx={{ mb: 3 }}>
                    {[
                      { label: 'Pronunciation', score: analysis.pronunciation, color: '#10b981' },
                      { label: 'Fluency', score: analysis.fluency, color: '#3b82f6' },
                      { label: 'Vocabulary', score: analysis.vocabulary, color: '#f59e0b' },
                      { label: 'Grammar', score: analysis.grammar, color: '#8b5cf6' },
                    ].map((item) => (
                      <Box key={item.label} sx={{ mb: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                          <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                            {item.label}
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 'bold', color: item.color }}>
                            {item.score}%
                          </Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={item.score}
                          sx={{
                            height: 8,
                            borderRadius: 4,
                            backgroundColor: '#e5e7eb',
                            '& .MuiLinearProgress-bar': {
                              backgroundColor: item.color,
                            },
                          }}
                        />
                      </Box>
                    ))}
                  </Box>

                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1, color: '#10b981', display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Icon icon="mdi:check-circle" width={20} height={20} />
                      Strong Points
                    </Typography>
                    <List dense>
                      {analysis.strengths.map((strength, index) => (
                        <ListItem key={index} sx={{ py: 0.5 }}>
                          <ListItemIcon sx={{ minWidth: 32 }}>
                            <Icon icon="mdi:check" color="#10b981" width={20} height={20} />
                          </ListItemIcon>
                          <ListItemText primary={strength} primaryTypographyProps={{ variant: 'body2' }} />
                        </ListItem>
                      ))}
                    </List>
                  </Box>

                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1, color: '#f59e0b', display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Icon icon="mdi:alert-circle" width={20} height={20} />
                      Areas for Improvement
                    </Typography>
                    <List dense>
                      {analysis.improvements.map((improvement, index) => (
                        <ListItem key={index} sx={{ py: 0.5 }}>
                          <ListItemIcon sx={{ minWidth: 32 }}>
                            <Icon icon="mdi:arrow-right" color="#f59e0b" width={20} height={20} />
                          </ListItemIcon>
                          <ListItemText primary={improvement} primaryTypographyProps={{ variant: 'body2' }} />
                        </ListItem>
                      ))}
                    </List>
                  </Box>

                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1, color: '#3b82f6', display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Icon icon="mdi:lightbulb" width={20} height={20} />
                      Practice Suggestions
                    </Typography>
                    <List dense>
                      {analysis.suggestions.map((suggestion, index) => (
                        <ListItem key={index} sx={{ py: 0.5 }}>
                          <ListItemIcon sx={{ minWidth: 32 }}>
                            <Icon icon="mdi:star" color="#3b82f6" width={20} height={20} />
                          </ListItemIcon>
                          <ListItemText primary={suggestion} primaryTypographyProps={{ variant: 'body2' }} />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                </CardContent>
              </Card>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}