import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
 
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
  DialogActions,
  DialogContent,
  DialogTitle,
  Dialog,
  CircularProgress,
} from '@mui/material';
import { Icon } from '@iconify/react';
import Grid from '@mui/material/GridLegacy';

import Drawer from '@mui/material/Drawer';
import Fab from '@mui/material/Fab';
import useMediaQuery from '@mui/material/useMediaQuery';



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
const [menuOpen, setMenuOpen] = useState(false);
const isMobile = useMediaQuery('(max-width:960px)');
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

const NextLessonButton = () => {
  const currentItemCompleted = selectedContent && completedItems.includes(selectedContent.id);

  // Find next available lesson (skip locked items)
  const findNextLesson = () => {
    if (!selectedSubtopic || !selectedContent) return null;

    const currentTopic = topics.find(t => t.subtopics.some(st => st.id === selectedSubtopic.id));
    if (!currentTopic) return null;

    const currentSubtopic = currentTopic.subtopics.find(st => st.id === selectedSubtopic.id);
    if (!currentSubtopic) return null;

    const currentIdx = currentSubtopic.content.findIndex(c => c.id === selectedContent.id);

    // 1. Next item in current subtopic
    for (let i = currentIdx + 1; i < currentSubtopic.content.length; i++) {
      const item = currentSubtopic.content[i];
      const prevItem = currentSubtopic.content[i - 1];
      const isLocked = i > 0 && !completedItems.includes(prevItem.id);
      if (!isLocked) return { item, subtopic: currentSubtopic };
    }

    // 2. Next subtopic
    const currentSubIdx = currentTopic.subtopics.findIndex(st => st.id === selectedSubtopic.id);
    for (let i = currentSubIdx + 1; i < currentTopic.subtopics.length; i++) {
      const nextSub = currentTopic.subtopics[i];
      if (nextSub.content.length > 0) {
        return { item: nextSub.content[0], subtopic: nextSub };
      }
    }

    // 3. Next topic
    const currentTopicIdx = topics.findIndex(t => t.id === currentTopic.id);
    for (let i = currentTopicIdx + 1; i < topics.length; i++) {
      const nextTopic = topics[i];
      if (nextTopic.subtopics.length > 0 && nextTopic.subtopics[0].content.length > 0) {
        return { item: nextTopic.subtopics[0].content[0], subtopic: nextTopic.subtopics[0] };
      }
    }

    return null;
  };

  const nextLesson = findNextLesson();
  const hasNext = !!nextLesson;

  const handleNext = () => {
    if (!nextLesson) return;
    setSelectedSubtopic(nextLesson.subtopic);
    setSelectedContent(nextLesson.item);
  };

  if (!currentItemCompleted || !hasNext) return null;

  return (
    <Box sx={{ p: 4, pt: 2, bgcolor: '#f8fafc', borderTop: '1px solid #e2e8f0' }}>
      <Button
        fullWidth
        variant="contained"
        size="large"
        onClick={handleNext}
        startIcon={<Icon icon="mdi:arrow-right-bold" width={24} />}
        sx={{
          height: 60,
          fontSize: '1.2rem',
          fontWeight: 700,
          textTransform: 'none',
          bgcolor: '#10b981',
          '&:hover': { bgcolor: '#059669' },
          borderRadius: 3,
          boxShadow: 6,
        }}
      >
        Next Lesson: {nextLesson.item.title}
      </Button>
    </Box>
  );
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

const Assignment = ({ title, onComplete }: { title: string; onComplete: () => void }) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  // Simulated AI feedback (you can later connect to real API)
  const generateFeedback = () => {
    return {
      score: Math.floor(Math.random() * 25) + 70, // 70–95
      goodPoints: [
        "Excellent use of topic vocabulary (coherence, bandwidth, digital divide)",
        "Clear overall position in introduction and conclusion",
        "Well-developed paragraphs with good supporting examples",
        "Good range of complex structures",
      ],
      suggestions: [
        "Try to use more linking words (e.g., 'Moreover', 'On the other hand')",
        "Some sentences are a bit long – consider splitting for clarity",
        "Include one more real-world example in body paragraph 2",
        "Minor spelling: 'accomodate' → 'accommodate'",
      ],
    };
  };

  const handleSubmit = () => {
    if (!uploadedFile) return;

    setSubmitted(true);
    setAnalyzing(true);

    // Simulate AI analysis delay
    setTimeout(() => {
      setAnalyzing(false);
      setFeedbackOpen(true);
    }, 4500);
  };

  const handleContinue = () => {
    setFeedbackOpen(false);
    setTimeout(() => onComplete(), 800);
  };

  return (
    <>
      <Box sx={{ p: { xs: 3, md: 5 }, maxWidth: 900, mx: 'auto' }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          {title}
        </Typography>
        <Typography color="text.secondary" paragraph>
          Upload your completed essay (PDF format recommended).
        </Typography>

        {/* Upload Area */}
        <Paper
          sx={{
            p: 8,
            textAlign: 'center',
            cursor: uploadedFile ? 'default' : 'pointer',
            border: '2px dashed',
            borderColor: uploadedFile ? '#10b981' : '#cbd5e1',
            bgcolor: uploadedFile ? '#f0fdf4' : '#f8fafc',
            borderRadius: 3,
            mb: 4,
            transition: 'all 0.3s',
            position: 'relative',
            '&:hover': uploadedFile ? {} : { borderColor: '#3b82f6', bgcolor: '#eff6ff' },
          }}
          onClick={() => !uploadedFile && document.getElementById('assign-file')?.click()}
        >
          <input
            id="assign-file"
            type="file"
            accept=".pdf,.doc,.docx"
            style={{ display: 'none' }}
            onChange={(e) => e.target.files?.[0] && setUploadedFile(e.target.files[0])}
          />

          {analyzing ? (
            <Box sx={{ py: 4 }}>
              <CircularProgress size={68} thickness={5} />
              <Typography variant="h6" sx={{ mt: 3, fontWeight: 600 }}>
                Analyzing your essay...
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Our AI is checking vocabulary, grammar, coherence & task response
              </Typography>
            </Box>
          ) : uploadedFile ? (
            <Box>
              <Icon icon="mdi:file-document-check" width={80} color="#10b981" />
              <Typography variant="h6" color="success.main" fontWeight={600} sx={{ mt: 2 }}>
                {uploadedFile.name}
              </Typography>
              <Typography variant="body2" color="success.main">
                Ready for submission
              </Typography>
            </Box>
          ) : (
            <Box>
              <Icon icon="mdi:cloud-upload-outline" width={80} color="#64748b" />
              <Typography variant="h6" sx={{ mt: 2, color: '#475569' }}>
                Click to upload your essay
              </Typography>
              <Typography variant="body2" color="text.secondary">
                PDF, Word • Max 10MB
              </Typography>
            </Box>
          )}
        </Paper>

        {/* Submit Button */}
        <Button
          fullWidth
          variant="contained"
          size="large"
          disabled={!uploadedFile || submitted}
          onClick={handleSubmit}
          sx={{
            height: 60,
            fontSize: '1.2rem',
            fontWeight: 600,
            textTransform: 'none',
            bgcolor: '#1e40af',
            '&:hover': { bgcolor: '#1e3a8a' },
          }}
        >
          {analyzing ? (
            <>Analyzing... Please wait</>
          ) : submitted ? (
            'Submitted – Analyzing Your Work'
          ) : (
            'Submit Assignment for Review'
          )}
        </Button>
      </Box>

      {/* Feedback Dialog */}
      <Dialog
        open={feedbackOpen}
        onClose={() => {}}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 3, p: { xs: 2, md: 4 }, maxHeight: '90vh' },
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography variant="h5" fontWeight={700}>
              AI Feedback Report
            </Typography>
            <IconButton onClick={handleContinue}>
              <Icon icon="mdi:close" />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          {(() => {
            const feedback = generateFeedback();
            return (
              <Box>
                {/* Score Badge */}
                <Box textAlign="center" mb={4}>
                  <Typography variant="h3" fontWeight={800} color="#1e40af">
                    {feedback.score}/100
                  </Typography>
                  <Typography variant="h6" color="success.main" fontWeight={600}>
                    {feedback.score >= 85 ? 'Outstanding!' : feedback.score >= 75 ? 'Very Good!' : 'Good Effort!'}
                  </Typography>
                </Box>

                {/* Good Points */}
                <Typography variant="h6" fontWeight={700} color="success.main" gutterBottom>
                  Excellent Work
                </Typography>
                {feedback.goodPoints.map((point, i) => (
                  <Box key={i} display="flex" alignItems="flex-start" gap={1} mb={1.5}>
                    <Icon icon="mdi:check-circle" color="#10b981" width={22} style={{ marginTop: 2 }} />
                    <Typography variant="body1">{point}</Typography>
                  </Box>
                ))}

                <Box my={3} />

                {/* Suggestions */}
                <Typography variant="h6" fontWeight={700} color="warning.main" gutterBottom>
                  Areas to Improve
                </Typography>
                {feedback.suggestions.map((suggestion, i) => (
                  <Box key={i} display="flex" alignItems="flex-start" gap={1} mb={1.5}>
                    <Icon icon="mdi:alert-circle" color="#f59e0b" width={22} style={{ marginTop: 2 }} />
                    <Typography variant="body1">{suggestion}</Typography>
                  </Box>
                ))}
              </Box>
            );
          })()}
        </DialogContent>

        <DialogActions sx={{ p: 3, pt: 4 }}>
          <Button
            fullWidth
            variant="contained"
            size="large"
            onClick={handleContinue}
            startIcon={<Icon icon="mdi:arrow-right" />}
            sx={{
              height: 56,
              fontSize: '1.1rem',
              bgcolor: '#10b981',
              '&:hover': { bgcolor: '#059669' },
            }}
          >
            Continue to Next Lesson
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
  // Quiz
 const Quiz = ({ title, onComplete }: { title: string; onComplete: () => void }) => {
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [submitting, setSubmitting] = useState(false);
  const [resultOpen, setResultOpen] = useState(false);

  const questions = [
    { q: "What is the correct sentence structure?", options: ["Subject + Verb + Object", "Verb + Subject + Object", "Object + Subject + Verb"], correct: 0 },
    { q: "Which is a complex sentence?", options: ["I ran fast.", "Although it rained, we played.", "She sings well."], correct: 1 },
    { q: "Identify the correct punctuation:", options: ["Let's eat grandma", "Let's eat, grandma", "Lets eat grandma"], correct: 1 }
  ];

  const handleSubmit = () => {
    setSubmitting(true);

    // Simulate processing
    setTimeout(() => {
      setSubmitting(false);
      setResultOpen(true);
    }, 1800);
  };

  const correctCount = questions.filter((q, i) => answers[i] === String(q.correct)).length;
  const totalQuestions = questions.length;
  const passed = correctCount >= 2;

  const handleContinue = () => {
    setResultOpen(false);
    if (passed) {
      setTimeout(() => onComplete(), 600);
    }
  };

  const handleClose = () => {
    setResultOpen(false);
  };

  return (
    <>
      <Box sx={{ p: { xs: 3, md: 5 }, maxWidth: 900, mx: 'auto' }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          {title}
        </Typography>
        <Typography color="text.secondary" paragraph mb={4}>
          You need at least <strong>2 out of 3</strong> correct to pass and unlock the next lesson.
        </Typography>

        {questions.map((q, i) => (
          <Card key={i} sx={{ mb: 3, p: 4, borderRadius: 3, boxShadow: 2 }}>
            <Typography fontWeight={600} gutterBottom>
              Q{i + 1}. {q.q}
            </Typography>
            <RadioGroup
              value={answers[i] || ''}
              onChange={(e) => setAnswers({ ...answers, [i]: e.target.value })}
            >
              {q.options.map((opt, j) => (
                <FormControlLabel
                  key={j}
                  value={String(j)}
                  control={<Radio color="primary" />}
                  label={opt}
                  disabled={submitting || resultOpen}
                  sx={{ mb: 1.5 }}
                />
              ))}
            </RadioGroup>

            {/* Show result feedback after submission */}
            {resultOpen && (
              <Alert
                severity={answers[i] === String(q.correct) ? "success" : "error"}
                icon={answers[i] === String(q.correct)
                  ? <Icon icon="mdi:check-circle" width={20} />
                  : <Icon icon="mdi:close-circle" width={20} />
                }
                sx={{ mt: 2, borderRadius: 2 }}
              >
                <strong>
                  {answers[i] === String(q.correct)
                    ? "Correct!"
                    : `Incorrect – Correct answer: "${q.options[q.correct]}"`}
                </strong>
              </Alert>
            )}
          </Card>
        ))}

        {/* Submit Button */}
        <Button
          fullWidth
          variant="contained"
          size="large"
          disabled={Object.keys(answers).length < questions.length || submitting || resultOpen}
          onClick={handleSubmit}
          sx={{
            height: 64,
            fontSize: '1.25rem',
            fontWeight: 700,
            textTransform: 'none',
            bgcolor: '#1e40af',
            '&:hover': { bgcolor: '#1e3a8a' },
            borderRadius: 3,
            boxShadow: 4,
          }}
        >
          {submitting ? (
            <>
              <CircularProgress size={28} color="inherit" sx={{ mr: 2 }} />
              Checking Answers...
            </>
          ) : resultOpen ? (
            'Quiz Completed'
          ) : (
            'Submit Quiz'
          )}
        </Button>
      </Box>

      {/* Result Dialog */}
      <Dialog
        open={resultOpen}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 4, overflow: 'hidden', boxShadow: 10 },
        }}
      >
        {/* Header - Green if passed, Orange if failed */}
        <Box
          sx={{
            bgcolor: passed ? '#10b981' : '#f59e0b',
            color: 'white',
            p: 4,
            textAlign: 'center',
          }}
        >
          <Typography variant="h3" fontWeight={800}>
            {correctCount}/{totalQuestions}
          </Typography>
          <Typography variant="h5" fontWeight={700} sx={{ mt: 1 }}>
            {passed ? "Great Job! You Passed" : "Not Yet – Keep Practicing"}
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Icon
              icon={passed ? "mdi:trophy-award" : "mdi:school"}
              width={64}
              style={{ opacity: 0.9 }}
            />
          </Box>
        </Box>

        <DialogContent sx={{ p: 4 }}>
          <Typography variant="h6" fontWeight={700} gutterBottom>
            Summary
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            {passed
              ? "You've demonstrated solid understanding of the topic. Well done!"
              : "You got some answers right, but review the mistakes above and try again to pass."}
          </Typography>

          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', gap: 3 }}>
            <Box textAlign="center">
              <Typography variant="h4" fontWeight={800} color="success.main">
                {correctCount}
              </Typography>
              <Typography variant="body2" color="text.secondary">Correct</Typography>
            </Box>
            <Box textAlign="center">
              <Typography variant="h4" fontWeight={800} color="error.main">
                {totalQuestions - correctCount}
              </Typography>
              <Typography variant="body2" color="text.secondary">Incorrect</Typography>
            </Box>
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 3, bgcolor: '#f8fafc' }}>
          {!passed ? (
            <Button
              fullWidth
              variant="outlined"
              size="large"
              onClick={handleClose}
              sx={{ height: 52, fontSize: '1.1rem' }}
            >
              Close & Review Answers
            </Button>
          ) : (
            <Button
              fullWidth
              variant="contained"
              size="large"
              onClick={handleContinue}
              startIcon={<Icon icon="mdi:arrow-right-bold" />}
              sx={{
                height: 56,
                fontSize: '1.1rem',
                fontWeight: 700,
                bgcolor: '#10b981',
                '&:hover': { bgcolor: '#059669' },
              }}
            >
              Continue to Next Lesson
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
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
  <Box sx={{ bgcolor: '#f1f5f9', minHeight: '100vh', position: 'relative' }}>
    {/* Floating Menu Button - Always Visible */}
    <Fab
      color="primary"
      aria-label="menu"
      onClick={() => setMenuOpen(true)}
      sx={{
        position: 'fixed',
        bottom: { xs: 16, md: 24 },
        right: { xs: 16, md: 24 },
        zIndex: 1301,
        bgcolor: '#1e40af',
        '&:hover': { bgcolor: '#1e3a8a' },
        boxShadow: 6,
      }}
    >
      <Icon icon="mdi:menu" width={28} />
    </Fab>

    {/* Backdrop Overlay
    {menuOpen && (
      <Box
        sx={{
          position: 'fixed',
          inset: 0,
          bgcolor: 'rgba(0,0,0,0.5)',
          zIndex: 1299,
          animation: 'fadeIn 0.3s',
        }}
        onClick={() => setMenuOpen(false)}
      />
    )} */}

    {/* Collapsible Drawer Menu */}
    <Drawer
      anchor="right"
      open={menuOpen}
      onClose={() => setMenuOpen(false)}
      sx={{
        '& .MuiDrawer-paper': {
          width: { xs: '85vw', sm: 380, md: 400 },
          maxWidth: '95vw',
          bgcolor: '#ffffff',
          boxShadow: '0 0 30px rgba(0,0,0,0.3)',
          zIndex: 2300,
        },
      }}
      ModalProps={{ keepMounted: true }}
    >
      {/* Drawer Header */}
      <Box
        sx={{
          p: 3,
          bgcolor: '#1e293b',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Icon icon="mdi:bookshelf" width={36} />
          <Typography variant="h6" fontWeight={700}>
            Learning Modules
          </Typography>
        </Box>
        <IconButton onClick={() => setMenuOpen(false)} sx={{ color: 'white' }}>
          <Icon icon="mdi:close" width={28} />
        </IconButton>
      </Box>

      {/* Scrollable Content */}
      <Box sx={{ flex: 1, overflow: 'auto' }}>
        <List sx={{ p: 2 }}>
          {topics.map(topic => (
            <Box key={topic.id}>
              <ListItemButton
                onClick={() => {
                  handleTopicClick(topic.id);
                  // Optional: close menu on mobile after selection
                  // if (isMobile) setMenuOpen(false);
                }}
                sx={{ borderRadius: 2, mb: 1 }}
              >
                <ListItemIcon sx={{ minWidth: 44 }}>
                  <Icon icon={topic.icon} width={26} color={topic.color} />
                </ListItemIcon>
                <ListItemText
                  primary={topic.title}
                  primaryTypographyProps={{ fontWeight: 600 }}
                />
                <Icon
                  icon={openTopics.includes(topic.id) ? "mdi:chevron-up" : "mdi:chevron-down"}
                  width={22}
                />
              </ListItemButton>

              <Collapse in={openTopics.includes(topic.id)} timeout="auto" unmountOnExit>
                <List disablePadding>
                  {topic.subtopics.map(subtopic => (
                    <Box key={subtopic.id}>
                      <ListItemButton
                        sx={{
                          pl: 7,
                          py: 1.5,
                          borderRadius: 1,
                          bgcolor: selectedSubtopic?.id === subtopic.id ? '#dbeafe' : 'transparent',
                        }}
                        onClick={() => {
                          handleSubtopicClick(subtopic);
                          // if (isMobile) setMenuOpen(false);
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          {subtopic.content.every(c => completedItems.includes(c.id)) ? (
                            <Icon icon="mdi:check-circle" width={22} color="#10b981" />
                          ) : (
                            <Icon icon="mdi:circle-outline" width={22} color="#cbd5e1" />
                          )}
                        </ListItemIcon>
                        <ListItemText
                          primary={subtopic.title}
                          primaryTypographyProps={{ fontWeight: 600, fontSize: '0.95rem' }}
                        />
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
                                onClick={() => {
                                  if (!isLocked) {
                                    handleContentClick(item);
                                    // if (isMobile) setMenuOpen(false);
                                  }
                                }}
                                selected={selectedContent?.id === item.id}
                                sx={{
                                  pl: 10,
                                  py: 1.8,
                                  borderRadius: 2,
                                  bgcolor: selectedContent?.id === item.id ? '#fffbeb' : 'transparent',
                                  borderLeft: selectedContent?.id === item.id ? '4px solid #f59e0b' : 'none',
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
                                      <Chip
                                        label={item.type}
                                        size="small"
                                        sx={{ height: 20, fontSize: '0.7rem', bgcolor: getTypeColor(item.type) + '22' }}
                                      />
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
      </Box>

      {/* Progress Summary Footer */}
      <Box sx={{ p: 3, borderTop: '1px solid #e2e8f0', bgcolor: '#f8fafc' }}>
        <Typography variant="body2" color="text.secondary">
          Completed: <strong>{completedItems.length}</strong> /{' '}
          {topics.reduce((a, t) => a + t.subtopics.reduce((b, s) => b + s.content.length, 0), 0)} items
        </Typography>
        <LinearProgress
          variant="determinate"
          value={
            (completedItems.length /
              topics.reduce((a, t) => a + t.subtopics.reduce((b, s) => b + s.content.length, 0), 0)) *
            100
          }
          sx={{ mt: 1, height: 8, borderRadius: 4 }}
        />
      </Box>
    </Drawer>

    {/* Main Content - Full Width Always */}
    <Container maxWidth="xl" sx={{ py: { xs: 3, md: 4 }, pt: { xs: 10, md: 6 } }}>
      <Grid container>
        <Grid item xs={12}>
          <Paper sx={{ borderRadius: 3, overflow: 'hidden', boxShadow: 3, minHeight: '80vh' }}>
            {!selectedContent ? (
              <Box sx={{ p: 8, textAlign: 'center', color: '#64748b' }}>
                <Icon icon="mdi:play-box-outline" width={100} />
                <Typography variant="h4" sx={{ mt: 4, fontWeight: 600 }}>
                  Select a lesson to begin
                </Typography>
                <Typography variant="body1" sx={{ mt: 2 }}>
                  Tap the menu button to explore modules
                </Typography>
              </Box>
            ) : (
              <Box>
                <Box
                  sx={{
                    p: 4,
                    bgcolor: '#f8fafc',
                    borderBottom: '1px solid #e2e8f0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                  }}
                >
                  <IconButton onClick={handleBack}>
                    <Icon icon="mdi:arrow-left" width={28} />
                  </IconButton>
                  <Box>
                    <Typography variant="h5" fontWeight={700}>
                      {selectedContent.title}
                    </Typography>
                    <Typography color="text.secondary">
                      {selectedSubtopic?.title} • {selectedContent.duration}
                    </Typography>
                  </Box>
                </Box>
                <CurrentComponent
                  title={selectedContent.title}
                  onComplete={() => markAsComplete(selectedContent.id)}
                />
                <NextLessonButton />
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  </Box>
);
}