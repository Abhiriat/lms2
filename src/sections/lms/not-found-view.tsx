import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Chip,
  IconButton,
  Button,
  Card,
  CardContent,
  LinearProgress,
  Alert,
  Radio,
  RadioGroup,
  FormControlLabel,
} from '@mui/material';
import { Icon } from '@iconify/react';

type ContentItem = {
  id: string;
  title: string;
  type: 'lesson' | 'video' | 'assignment' | 'quiz';
  component: React.FC<any>;
  duration: string;
};

type Subtopic = {
  id: string;
  title: string;
  category: 'writing' | 'speaking' | 'listening';
  content: ContentItem[];
};

type Topic = {
  id: string;
  title: string;
  icon: string;
  color: string;
  subtopics: Subtopic[];
};

export function LMSView() {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [selectedSubtopic, setSelectedSubtopic] = useState<Subtopic | null>(null);
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null);
  const [openTopics, setOpenTopics] = useState<string[]>(['writing']);
  const [completedItems, setCompletedItems] = useState<string[]>([]);

  // Load & Save Progress
  useEffect(() => {
    const saved = localStorage.getItem('lms-completed-items');
    if (saved) setCompletedItems(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('lms-completed-items', JSON.stringify(completedItems));
  }, [completedItems]);

  const markAsComplete = (itemId: string) => {
    if (!completedItems.includes(itemId)) {
      setCompletedItems(prev => [...prev, itemId]);
    }
  };

  const handleTopicClick = (topicId: string) => {
    setOpenTopics(prev =>
      prev.includes(topicId) ? prev.filter(t => t !== topicId) : [...prev, topicId]
    );
  };

  const handleSubtopicClick = (subtopic: Subtopic) => {
    setSelectedSubtopic(subtopic);
    setSelectedContent(null);
  };

  const handleContentClick = (content: ContentItem) => {
    setSelectedContent(content);
  };

  const handleBack = () => {
    setSelectedContent(null);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return 'mdi:play-circle-outline';
      case 'assignment': return 'mdi:file-document-edit-outline';
      case 'quiz': return 'mdi:clipboard-check-outline';
      default: return 'mdi:book-open-page-variant-outline';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'video': return '#ef4444';
      case 'assignment': return '#f59e0b';
      case 'quiz': return '#8b5cf6';
      default: return '#3b82f6';
    }
  };

  // Video Lesson
 // Replace your current VideoLesson with this upgraded version
const VideoLesson = ({ title, onComplete }: { title: string; onComplete: () => void }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(300); // 5 minutes default (in seconds)
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const controlsTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  // Simulated video duration = 5 minutes (300 seconds)
  const TOTAL_DURATION = 300;

  // Format time helper
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Simulate video progress
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && progress < 100) {
      interval = setInterval(() => {
        setProgress((prev) => {
          const increment = (100 / TOTAL_DURATION) * (playbackRate * 1.8); // speed-adjusted
          const newProgress = Math.min(prev + increment, 100);
          setCurrentTime((newProgress / 100) * TOTAL_DURATION);
          if (newProgress >= 100) {
            setIsPlaying(false);
            onComplete();
          }
          return newProgress;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, playbackRate, onComplete]);

  // Auto-hide controls after 3 seconds of inactivity
  useEffect(() => {
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => setShowControls(false), 3000);
    } else {
      setShowControls(true);
    }
    return () => {
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    };
  }, [isPlaying, progress]);

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => setShowControls(false), 3000);
    }
  };

  const togglePlayPause = () => setIsPlaying(!isPlaying);
  const toggleMute = () => {
    setIsMuted(!isMuted);
    setVolume(isMuted ? 0.8 : 0);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newProgress = Number(e.target.value);
    setProgress(newProgress);
    setCurrentTime((newProgress / 100) * TOTAL_DURATION);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = Number(e.target.value);
    setVolume(newVol);
    setIsMuted(newVol === 0);
  };

  return (
    <Box
      sx={{ p: { xs: 2, md: 5 }, maxWidth: '100%' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      <Typography variant="h5" fontWeight={700} gutterBottom>
        {title}
      </Typography>

      <Box
        sx={{
          position: 'relative',
          borderRadius: 3,
          overflow: 'hidden',
          bgcolor: '#0f172a',
          color: 'white',
          boxShadow: 10,
          aspectRatio: '16/9',
          cursor: showControls ? 'default' : 'none',
          transition: 'all 0.3s ease',
        }}
      >
        {/* Fake Video Thumbnail / Play Button Overlay */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'rgba(0,0,0,0.4)',
            zIndex: 1,
          }}
        >
          <IconButton
            onClick={togglePlayPause}
            sx={{
              bgcolor: 'rgba(255,255,255,0.2)',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.3)', transform: 'scale(1.1)' },
              width: 100,
              height: 100,
              transition: 'all 0.3s',
            }}
          >
            <Icon icon={isPlaying ? 'mdi:pause' : 'mdi:play'} width={60} />
          </IconButton>
        </Box>

        {/* Progress Bar */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 70,
            left: 16,
            right: 16,
            zIndex: 3,
          }}
        >
          <input
            type="range"
            min="0"
            max="100"
            step="0.1"
            value={progress}
            onChange={handleSeek}
            style={{
              width: '100%',
              height: '6px',
              background: `linear-gradient(to right, #ef4444 ${progress}%, #475569 ${progress}%)`,
              borderRadius: '3px',
              outline: 'none',
              appearance: 'none',
            }}
          />
        </Box>

        {/* Controls Bar */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            bgcolor: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
            p: 4,
            pt: 8,
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            opacity: showControls ? 1 : 0,
            transition: 'opacity 0.4s ease',
            pointerEvents: showControls ? 'all' : 'none',
          }}
        >
          {/* Play/Pause */}
          <IconButton onClick={togglePlayPause} sx={{ color: 'white' }}>
            <Icon icon={isPlaying ? 'mdi:pause' : 'mdi:play'} width={32} />
          </IconButton>

          {/* Volume */}
          <IconButton onClick={toggleMute} sx={{ color: 'white' }}>
            <Icon
              icon={
                isMuted || volume === 0
                  ? 'mdi:volume-off'
                  : volume < 0.5
                  ? 'mdi:volume-low'
                  : 'mdi:volume-high'
              }
              width={28}
            />
          </IconButton>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            style={{
              width: '80px',
              height: '4px',
              background: `linear-gradient(to right, #fff ${volume * 100}%, #475569 ${volume * 100}%)`,
              borderRadius: '2px',
            }}
          />

          {/* Time */}
          <Typography variant="body2" sx={{ minWidth: 100, fontFeatureSettings: '"tnum"' }}>
            {formatTime(currentTime)} / {formatTime(TOTAL_DURATION)}
          </Typography>

          {/* Playback Speed */}
          <Button
            size="small"
            onClick={() =>
              setPlaybackRate((prev) => (prev === 2 ? 0.5 : prev + 0.25 > 2 ? 0.5 : prev + 0.25))
            }
            sx={{ color: 'white', fontSize: '0.8rem', ml: 'auto' }}
          >
            {playbackRate.toFixed(2)}x
          </Button>

          {/* Fullscreen */}
          <IconButton sx={{ color: 'white' }}>
            <Icon icon="mdi:fullscreen" width={28} />
          </IconButton>
        </Box>

        {/* Completion Alert */}
        {progress === 100 && (
          <Alert
            severity="success"
            icon={<Icon icon="mdi:check-circle" width={32} />}
            sx={{ position: 'absolute', top: 20, left: 20, right: 20, zIndex: 10 }}
          >
            <strong>Video completed!</strong> You've earned full progress.
          </Alert>
        )}
      </Box>

      {/* Optional: Show playback speed options below */}
      <Box sx={{ mt: 3, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          Tip: Click the video to show/hide controls • Current speed: <strong>{playbackRate}x</strong>
        </Typography>
      </Box>
    </Box>
  );
};

  // Assignment
  const Assignment = ({ title, onComplete }: any) => {
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = () => {
      setSubmitted(true);
      setTimeout(() => onComplete(), 1200);
    };

    return (
      <Box sx={{ p: 5 }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>{title}</Typography>
        <Typography color="text.secondary" paragraph>Upload your completed work below.</Typography>

        <Paper
          sx={{ p: 6, textAlign: 'center', cursor: 'pointer', border: '2px dashed #cbd5e1', bgcolor: '#f8fafc', borderRadius: 3, mb: 4, '&:hover': { borderColor: '#3b82f6', bgcolor: '#eff6ff' } }}
          onClick={() => document.getElementById('assign-file')?.click()}
        >
          <input id="assign-file" type="file" style={{ display: 'none' }} onChange={e => e.target.files?.[0] && setUploadedFile(e.target.files[0])} />
          {uploadedFile ? (
            <Box>
              <Icon icon="mdi:file-check" width={64} color="#10b981" />
              <Typography variant="h6" color="success.main" fontWeight={600} sx={{ mt: 2 }}>{uploadedFile.name}</Typography>
            </Box>
          ) : (
            <Box>
              <Icon icon="mdi:cloud-upload-outline" width={64} color="#64748b" />
              <Typography variant="h6" sx={{ mt: 2, color: '#475569' }}>Click to upload</Typography>
            </Box>
          )}
        </Paper>

        <Button fullWidth variant="contained" size="large" disabled={!uploadedFile || submitted} onClick={handleSubmit} sx={{ height: 56, fontSize: '1.1rem', textTransform: 'none' }}>
          {submitted ? 'Submitted Successfully' : 'Submit Assignment'}
        </Button>
      </Box>
    );
  };

  // Quiz
  const Quiz = ({ title, onComplete }: any) => {
    const [answers, setAnswers] = useState<{[key: number]: string}>({});
    const [showResult, setShowResult] = useState(false);

    const questions = [
      { q: "What is the correct sentence structure?", options: ["Subject + Verb + Object", "Verb + Subject + Object", "Object + Subject + Verb"], correct: 0 },
      { q: "Which is a complex sentence?", options: ["I ran fast.", "Although it rained, we played.", "She sings well."], correct: 1 },
      { q: "Identify the correct punctuation:", options: ["Let's eat grandma", "Let's eat, grandma", "Lets eat grandma"], correct: 1 }
    ];

    const handleSubmit = () => {
      setShowResult(true);
      const score = questions.filter((q, i) => answers[i] === String(q.correct)).length;
      if (score >= 2) setTimeout(() => onComplete(), 2000);
    };

    return (
      <Box sx={{ p: 5 }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>{title}</Typography>
        <Typography color="text.secondary" paragraph>You need 2 out of 3 correct to pass.</Typography>

        {questions.map((q, i) => (
          <Card key={i} sx={{ mb: 3, p: 3 }}>
            <Typography fontWeight={600} gutterBottom>Q{i + 1}. {q.q}</Typography>
            <RadioGroup value={answers[i] || ''} onChange={e => setAnswers({...answers, [i]: e.target.value})}>
              {q.options.map((opt, j) => (
                <FormControlLabel key={j} value={String(j)} control={<Radio />} label={opt} disabled={showResult} />
              ))}
            </RadioGroup>
            {showResult && (
              <Alert severity={answers[i] === String(q.correct) ? "success" : "error"} sx={{ mt: 2 }}>
                {answers[i] === String(q.correct) ? "Correct!" : `Wrong. Answer: ${q.options[q.correct]}`}
              </Alert>
            )}
          </Card>
        ))}

        {!showResult ? (
          <Button fullWidth variant="contained" size="large" onClick={handleSubmit} disabled={Object.keys(answers).length < questions.length} sx={{ height: 56, fontSize: '1.1rem' }}>
            Submit Quiz
          </Button>
        ) : (
          <Alert severity={questions.filter((q, i) => answers[i] === String(q.correct)).length >= 2 ? "success" : "warning"}>
            <strong>Score: {questions.filter((q, i) => answers[i] === String(q.correct)).length}/3</strong><br/>
            {questions.filter((q, i) => answers[i] === String(q.correct)).length >= 2 ? "You passed! Well done." : "Try again to pass."}
          </Alert>
        )}
      </Box>
    );
  };

  // Essay Structure PDF Lesson (NEW!)
  const EssayStructurePDF = ({ title, onComplete }: any) => {
    const pdfUrl = "https://www.ieltsadvantage.com/wp-content/uploads/2015/03/IELTS-Writing-Task-2-Essay-Structures.pdf";

    useEffect(() => {
      const timer = setTimeout(() => {
        onComplete();
      }, 2000); // Auto-complete after ~18 seconds of reading
      return () => clearTimeout(timer);
    }, [onComplete]);

    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>{title}</Typography>
        <Typography color="text.secondary" paragraph sx={{ mb: 4 }}>
          Study this professional guide on IELTS essay structures (Opinion, Discussion, Advantages/Disadvantages, etc.).
        </Typography>

        <Paper elevation={6} sx={{ borderRadius: 3, overflow: 'hidden', mb: 4, boxShadow: 8 }}>
          <Box sx={{ height: '80vh', bgcolor: '#f8fafc' }}>
            <iframe src={pdfUrl} width="100%" height="100%" style={{ border: 'none' }} title="IELTS Essay Structures Guide" />
          </Box>
        </Paper>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Alert severity="success" sx={{ flex: 1, minWidth: 300 }}>
            This lesson will auto-complete in a few seconds after viewing
          </Alert>
          <Button
            variant="contained"
            size="large"
            href={pdfUrl}
            target="_blank"
            startIcon={<Icon icon="mdi:download" width={24} />}
            sx={{ bgcolor: '#1e40af', '&:hover': { bgcolor: '#1e3a8a' } }}
          >
            Download PDF Guide
          </Button>
        </Box>
      </Box>
    );
  };

  const topics: Topic[] = [
    {
      id: 'writing', title: 'Writing Practice', icon: 'mdi:pencil', color: '#3b82f6',
      subtopics: [
        {
          id: 'essays', title: 'Essay Writing', category: 'writing',
          content: [
            { id: 'e1', title: 'Introduction to Essays', type: 'video', component: VideoLesson, duration: '15 min' },
            { id: 'e2', title: 'Essay Structure & Planning', type: 'lesson', component: EssayStructurePDF, duration: '30 min' },
            { id: 'e3', title: 'Write Your First Essay', type: 'assignment', component: Assignment, duration: '45 min' },
            { id: 'e4', title: 'Essay Knowledge Check', type: 'quiz', component: Quiz, duration: '10 min' },
          ]
        },
        {
          id: 'letters', title: 'Formal Letters', category: 'writing',
          content: [
            { id: 'l1', title: 'Letter Writing Basics', type: 'video', component: VideoLesson, duration: '12 min' },
            { id: 'l2', title: 'Write a Formal Letter', type: 'assignment', component: Assignment, duration: '30 min' },
            { id: 'l3', title: 'Letter Format Quiz', type: 'quiz', component: Quiz, duration: '8 min' },
          ]
        },
      ]
    },
    {
      id: 'speaking', title: 'Speaking Practice', icon: 'mdi:microphone', color: '#10b981',
      subtopics: [
        {
          id: 'readaloud', title: 'Read Aloud Practice', category: 'speaking',
          content: [
            { id: 's1', title: 'Pronunciation & Fluency', type: 'video', component: VideoLesson, duration: '18 min' },
            { id: 's2', title: 'Record Your Reading', type: 'assignment', component: Assignment, duration: '15 min' },
          ]
        },
      ]
    },
    {
      id: 'listening', title: 'Listening Practice', icon: 'mdi:headphones', color: '#8b5cf6',
      subtopics: [
        {
          id: 'meetings', title: 'Business Meetings', category: 'listening',
          content: [
            { id: 'l1', title: 'Business Communication', type: 'video', component: VideoLesson, duration: '20 min' },
            { id: 'l2', title: 'Listening Comprehension', type: 'quiz', component: Quiz, duration: '15 min' },
          ]
        },
      ]
    },
  ];

  const CurrentComponent = selectedContent?.component || null;

  return (
    <Box sx={{ bgcolor: '#f1f5f9', minHeight: '100vh' }}>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Grid container spacing={4}>



             {/* Main Content */}
          <Grid item xs={12} md={8} lg={9}  sx={{width:{xs:'100%',md:'60%'}}}>
            <Paper sx={{ borderRadius: 3, overflow: 'hidden', boxShadow: 3, minHeight: '80vh' }}>
              {!selectedContent ? (
                <Box sx={{ p: 8, textAlign: 'center', color: '#64748b' }}>
                  <Icon icon="mdi:play-box-outline" width={100} />
                  <Typography variant="h4" sx={{ mt: 4, fontWeight: 600 }}>Select a lesson to begin</Typography>
                  <Typography variant="body1" sx={{ mt: 2 }}>Choose any topic from the left sidebar to start learning</Typography>
                </Box>
              ) : (
                <Box>
                  <Box sx={{ p: 4, bgcolor: '#f8fafc', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: 2 }}>
                    <IconButton onClick={handleBack}><Icon icon="mdi:arrow-left" width={28} /></IconButton>
                    <Box>
                      <Typography variant="h5" fontWeight={700}>{selectedContent.title}</Typography>
                      <Typography color="text.secondary">{selectedSubtopic?.title} • {selectedContent.duration}</Typography>
                    </Box>
                  </Box>
                  <CurrentComponent title={selectedContent.title} onComplete={() => markAsComplete(selectedContent.id)} />
                </Box>
              )}
            </Paper>
          </Grid>
          {/* Sidebar */}
          <Grid item xs={12} md={4} lg={3}  sx={{width:{xs:'100%',md:'30%'}}}>
            <Paper sx={{ borderRadius: 2, overflow: 'hidden', boxShadow: 3, position: 'sticky', top: 20 }}>
              <Box sx={{ p: 3, color: 'black' }}>
                <Typography variant="h6" fontWeight={700}>Learning Modules</Typography>
              </Box>
              <List sx={{ p: 2, bgcolor: '#ffffff' }}>
                {topics.map(topic => (
                  <Box key={topic.id}>
                    <ListItemButton onClick={() => handleTopicClick(topic.id)} sx={{ borderRadius: 2, mb: 1 }}>
                      <ListItemIcon sx={{ minWidth: 44 }}><Icon icon={topic.icon} width={26} color={topic.color} /></ListItemIcon>
                      <ListItemText primary={topic.title} primaryTypographyProps={{ fontWeight: 600 }} />
                      <Icon icon={openTopics.includes(topic.id) ? "mdi:chevron-up" : "mdi:chevron-down"} width={22} />
                    </ListItemButton>

                    <Collapse in={openTopics.includes(topic.id)} timeout="auto" unmountOnExit>
                      <List disablePadding>
                        {topic.subtopics.map(subtopic => (
                          <Box key={subtopic.id}>
                            <ListItemButton
                              sx={{ pr: 7, py: 1.5, borderRadius: 1, bgcolor: selectedSubtopic?.id === subtopic.id ? '#dbeafe' : 'transparent' }}
                              onClick={() => handleSubtopicClick(subtopic)}
                            >
                              <ListItemIcon sx={{ minWidth: 36 }}>
                                {subtopic.content.every(c => completedItems.includes(c.id))
                                  ? <Icon icon="mdi:check-circle" width={22} color="#10b981" />
                                  : <Icon icon="mdi:circle-outline" width={22} color="#cbd5e1" />
                                }
                              </ListItemIcon>
                              <ListItemText primary={subtopic.title} primaryTypographyProps={{ fontWeight: 600, fontSize: '0.95rem' }} />
                            </ListItemButton>

                            <Collapse in={selectedSubtopic?.id === subtopic.id}>
                              <List disablePadding>
                                {subtopic.content.map((item, idx) => {
                                  const isCompleted = completedItems.includes(item.id);
                                  const isLocked = idx > 0 && !completedItems.includes(subtopic.content[idx - 1].id);

                                  return (
                                    <ListItemButton
                                      key={item.id}
                                      disabled={isLocked}
                                      onClick={() => !isLocked && handleContentClick(item)}
                                      selected={selectedContent?.id === item.id}
                                      sx={{
                                        pr: 10, py: 1.8, borderRadius: 2,
                                        bgcolor: selectedContent?.id === item.id ? '#fffbeb' : 'transparent',
                                        borderLeft: selectedContent?.id === item.id ? '4px solid #f59e0b' : '4px solid transparent',
                                        opacity: isLocked ? 0.5 : 1,
                                      }}
                                    >
                                      <ListItemIcon sx={{ minWidth: 40 }}>
                                        {isCompleted ? (
                                          <Icon icon="mdi:check-circle" width={24} color="#10b981" />
                                        ) : isLocked ? (
                                          <Icon icon="mdi:lock" width={24} color="#94a3b8" />
                                        ) : (
                                          <Icon icon={getTypeIcon(item.type)} width={24} color={getTypeColor(item.type)} />
                                        )}
                                      </ListItemIcon>
                                      <ListItemText
                                        primary={item.title}
                                        secondary={
                                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                                            <Chip label={item.type} size="small" sx={{ height: 20, fontSize: '0.7rem', bgcolor: getTypeColor(item.type)+'22' }} />
                                            <Typography variant="caption">{item.duration}</Typography>
                                          </Box>
                                        }
                                        primaryTypographyProps={{ fontWeight: 500 }}
                                      />
                                    </ListItemButton>
                                  );
                                })}
                              </List>
                            </Collapse>
                          </Box>
                        ))}
                      </List>
                    </Collapse>
                  </Box>
                ))}
              </List>
            </Paper>
          </Grid>

       
        </Grid>
      </Container>
    </Box>
  );
}