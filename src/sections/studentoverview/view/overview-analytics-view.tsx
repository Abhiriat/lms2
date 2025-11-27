import Typography from '@mui/material/Typography';
import { DashboardContent } from 'src/layouts/dashboard';
import { _posts, _tasks, _traffic, _timeline } from 'src/_mock';
import { AnalyticsNews } from '../analytics-news';
import { AnalyticsTasks } from '../analytics-tasks';
import { AnalyticsCurrentVisits } from '../analytics-current-visits';
import { AnalyticsOrderTimeline } from '../analytics-order-timeline';
import { AnalyticsWebsiteVisits } from '../analytics-website-visits';
import { AnalyticsWidgetSummary } from '../analytics-widget-summary';
import { AnalyticsTrafficBySite } from '../analytics-traffic-by-site';
import { AnalyticsCurrentSubject } from '../analytics-current-subject';
import { AnalyticsConversionRates } from '../analytics-conversion-rates';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import LinearProgress from '@mui/material/LinearProgress';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import Grid from '@mui/material/GridLegacy';
import { Box, Container, FormControl, InputAdornment, InputLabel, MenuItem, Select, TextField, IconButton, Stack, Avatar } from '@mui/material';
import { useState } from 'react';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PeopleIcon from '@mui/icons-material/People';
import StarIcon from '@mui/icons-material/Star';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { useRouter } from 'src/routes/hooks';
import learning from './learning.png'
import img1 from '../../../../public/assets/1.jpg'
import img2 from '../../../../public/assets/2.jpg'
import img3 from '../../../../public/assets/3.jpg'
import img4 from '../../../../public/assets/4.jpg'


// ----------------------------------------------------------------------
const allCourses = [
  // -----------------------------
  // A. Core English Courses
  // -----------------------------
  { 
    id: 1,
    title: "Foundation English (Level 1–3)",
    category: "Core English",
    institute: "English Learning Academy",
    badge: "Certified Course",
    duration: "6 weeks",
    enrolled: "1.2k",
    rating: 4.7,
    image: img1,
    instructor: "Ms. Riya Sharma",
    difficulty: "Beginner"
  },
  { 
    id: 2,
    title: "Grammar Mastery (Beginner to Advanced)",
    category: "Core English",
    institute: "English Learning Academy",
    badge: "Certified Course",
    duration: "8 weeks",
    enrolled: "2.1k",
    rating: 4.8,
    image: img2,
    instructor: "Mr. Arjun Patel",
    difficulty: "Intermediate"
  },
  { 
    id: 3,
    title: "Vocabulary Booster – 1000+ Words",
    category: "Core English",
    institute: "English Learning Academy",
    badge: "Certified Course",
    duration: "4 weeks",
    enrolled: "2.9k",
    rating: 4.6,
    image: img4,
    instructor: "Dr. Swati Mehta",
    difficulty: "Beginner"
  },
  { 
    id: 4,
    title: "Reading Skills & Comprehension Mastery",
    category: "Core English",
    institute: "English Learning Academy",
    badge: "Certified Course",
    duration: "5 weeks",
    enrolled: "3.1k",
    rating: 4.7,
    image: img3,
    instructor: "Prof. Kavita Rao",
    difficulty: "Intermediate"
  },
  { 
    id: 5,
    title: "Creative Writing: Paragraph, Story, Letter, Notice",
    category: "Core English",
    institute: "English Learning Academy",
    badge: "Certified Course",
    duration: "6 weeks",
    enrolled: "2.5k",
    rating: 4.8,
    image: img4,
    instructor: "Ms. Nidhi Sharma",
    difficulty: "Beginner"
  },
  { 
    id: 6,
    title: "Essay Writing & Formal Writing",
    category: "Core English",
    institute: "English Learning Academy",
    badge: "Certified Course",
    duration: "5 weeks",
    enrolled: "2.3k",
    rating: 4.7,
       image: img2,

    instructor: "Mr. Rohan Malhotra",
    difficulty: "Intermediate"
  },
  { 
    id: 7,
    title: "Spoken English & Confidence Building",
    category: "Core English",
    institute: "English Learning Academy",
    badge: "Certified Course",
    duration: "8 weeks",
    enrolled: "4.8k",
    rating: 4.9,
        image: img1,
    instructor: "Ms. Shruti Verma",
    difficulty: "Beginner"
  },
  { 
    id: 8,
    title: "Pronunciation + Accent Training",
    category: "Core English",
    institute: "English Learning Academy",
    badge: "Certified Course",
    duration: "6 weeks",
    enrolled: "3.6k",
    rating: 4.8,
    image: img2,
    instructor: "Dr. Mahesh Sharma",
    difficulty: "Intermediate"
  },
  { 
    id: 9,
    title: "Public Speaking & Presentation Skills",
    category: "Core English",
    institute: "English Learning Academy",
    badge: "Certified Course",
    duration: "6 weeks",
    enrolled: "4.2k",
    rating: 4.9,
        image: img4,
    instructor: "Prof. Aisha Khan",
    difficulty: "Advanced"
  },
  { 
    id: 10,
    title: "Exam English for Classes 6–12",
    category: "Core English",
    institute: "English Learning Academy",
    badge: "Certified Course",
    duration: "10 weeks",
    enrolled: "3.9k",
    rating: 4.7,
    image: img2,
    instructor: "Mr. Vivek Gupta",
    difficulty: "Intermediate"
  },

  // -----------------------------
  // B. Skill Development Courses
  // -----------------------------
  { 
    id: 11,
    title: "Communication Skills for Students",
    category: "Skill Development",
    institute: "Skill Development Academy",
    badge: "Professional Course",
    duration: "5 weeks",
    enrolled: "2.2k",
    rating: 4.6,
    image: img3,
    instructor: "Ms. Preeti Rao",
    difficulty: "Beginner"
  },
  { 
    id: 12,
    title: "Interview Skills + Resume Building",
    category: "Skill Development",
    institute: "Skill Development Academy",
    badge: "Professional Course",
    duration: "4 weeks",
    enrolled: "2.8k",
    rating: 4.8,
    image: img3,
    instructor: "Mr. Karan Meena",
    difficulty: "Intermediate"
  },
  { 
    id: 13,
    title: "Critical Thinking & Problem Solving",
    category: "Skill Development",
    institute: "Skill Development Academy",
    badge: "Professional Course",
    duration: "6 weeks",
    enrolled: "3.1k",
    rating: 4.7,
    image: img4,
    instructor: "Prof. Seema Nair",
    difficulty: "Intermediate"
  },
  { 
    id: 14,
    title: "Digital Literacy & Online Learning Skills",
    category: "Skill Development",
    institute: "Skill Development Academy",
    badge: "Professional Course",
    duration: "4 weeks",
    enrolled: "1.9k",
    rating: 4.5,
    image: img1,

    instructor: "Dr. Niraj Tyagi",
    difficulty: "Beginner"
  },
  { 
    id: 15,
    title: "Soft Skills Development",
    category: "Skill Development",
    institute: "Skill Development Academy",
    badge: "Professional Course",
    duration: "5 weeks",
    enrolled: "2.6k",
    rating: 4.7,
    image: img2,
    instructor: "Mrs. Pooja Sethi",
    difficulty: "Intermediate"
  },

  // -----------------------------
  // C. Special Courses
  // -----------------------------
  { 
    id: 16,
    title: "Listening Lab",
    category: "Special Courses",
    institute: "Learning Labs",
    badge: "Practical Module",
    duration: "4 weeks",
    enrolled: "1.5k",
    rating: 4.6,
       image: img3,
    instructor: "Mr. Deepak Rana",
    difficulty: "Beginner"
  },
  { 
    id: 17,
    title: "Writing Lab",
    category: "Special Courses",
    institute: "Learning Labs",
    badge: "Practical Module",
    duration: "4 weeks",
    enrolled: "1.7k",
    rating: 4.7,
       image: img4,
    instructor: "Ms. Aparna Joshi",
    difficulty: "Intermediate"
  },
  { 
    id: 18,
    title: "Speaking Lab",
    category: "Special Courses",
    institute: "Learning Labs",
    badge: "Practical Module",
    duration: "4 weeks",
    enrolled: "2.0k",
    rating: 4.8,
        image: img2,
    instructor: "Prof. Sanjay Rao",
    difficulty: "Intermediate"
  },
  { 
    id: 19,
    title: "Daily Practice Lab (Assignments + Tests)",
    category: "Special Courses",
    institute: "Learning Labs",
    badge: "Practical Module",
    duration: "12 weeks",
    enrolled: "3.4k",
    rating: 4.9,
    image: img1,
    instructor: "Ms. Radhika Kapoor",
    difficulty: "Advanced"
  },
  { 
    id: 20,
    title: "Teacher Training Module (for Educators)",
    category: "Special Courses",
    institute: "Learning Labs",
    badge: "Professional Certification",
    duration: "8 weeks",
    enrolled: "1.3k",
    rating: 4.8,
    image: img4,

    instructor: "Dr. Hemant Mishra",
    difficulty: "Advanced"
  },
];


const getDifficultyColor = (difficulty) => {
  switch(difficulty) {
    case 'Beginner': return '#4CAF50';
    case 'Intermediate': return '#FF9800';
    case 'Advanced': return '#F44336';
    default: return '#757575';
  }
};



const WelcomeCard = () => {
  return (
    <Card
      sx={{
        background: 'white',
        border:'1px solid #8dbbf7',
        color: 'black',
        borderRadius: 3,
        overflow: 'hidden',
        position: 'relative',
        mb: 4,
        // boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)',
      }}
    >
      {/* Decorative Background Elements */}
      <Box
        sx={{
          position: 'absolute',
          top: -50,
          right: -50,
          width: 200,
          height: 200,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(10px)',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: -30,
          left: -30,
          width: 150,
          height: 100,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.08)',
          backdropFilter: 'blur(10px)',
        }}
      />

      <Box sx={{ p: 4, position: 'relative', zIndex: 1 }}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} alignItems="center">
          {/* Left Section - Welcome Message */}
          <Box sx={{ flex: 1 }}>
            <Stack spacing={2}>
              <Box>
                <Typography variant="h2" sx={{ fontWeight: 700, mb: 1 }}>
                  Welcome Back, Parvinder! 🎉
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.95, mb: 3 }}>
                  Continue your learning journey and achieve your goals
                </Typography>
              </Box>
            </Stack>
          </Box>

          {/* Right Section - Image */}
          <Box 
            sx={{ 
              width: { xs: '100%', md: 'auto' },
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Box 
              component='img' 
              src={learning}
              alt="Learning illustration"
              sx={{
                width: { xs: '200px', md: '250px', lg: '300px' },
                height: 'auto',
                maxWidth: '100%',
                objectFit: 'contain'
              }}
            />
          </Box>
        </Stack>
      </Box>
    </Card>
  );
};
export default WelcomeCard;
export function OverviewAnalyticsView() {
  const [tabValue, setTabValue] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);
const route=useRouter()
const handleRoute=()=>{
  route.push('/lmsintropage')
}
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <DashboardContent maxWidth="xl">
      <WelcomeCard/>

      <Container maxWidth="xl" sx={{ py: 8 }}>
      
            <Typography variant="h2" sx={{ fontWeight: 700, mb: 1,textAlign:'center' }}>
              Explore Courses
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{textAlign:'center'}}>
              Discover and enroll in top-rated courses from premier institutions
            </Typography>
       
       
       
        <Box
          sx={{
            background: 'transparent',
            borderRadius: 3,
            p: 4,
            mb: 4,
            mt:4,
            color: 'black',
            // boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)',
          }}
        >
          <Grid container spacing={2} sx={{gap:1}} alignItems="center">
            <Grid xs={12} md={3}>
              <TextField
                fullWidth
                placeholder="Search courses, instructors..."
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: 'black' }} />
                    </InputAdornment>
                  ),
                  sx: {
                    bgcolor: 'rgba(255,255,255,0.2)',
                    borderRadius: 2,
                    color: 'black',
                    '& input': { color: 'black' },
                    '& input::placeholder': { color: 'rgba(255,255,255,0.7)' },
                    '& .MuiOutlinedInput-notchedOutline': { border: '1px solid black' },
                    backdropFilter: 'blur(10px)',
                  },
                }}
                variant="outlined"
              />
            </Grid>

            <Grid xs={12} sm={6} md={2.5}>
              <FormControl fullWidth>
                <Select
                  defaultValue="all"
                  displayEmpty
                  sx={{
                    bgcolor: 'rgba(255,255,255,0.2)',
                    color: 'black',
                    borderRadius: 2,
                    '.MuiOutlinedInput-notchedOutline': { border: '1px solid black' },
                    '.MuiSelect-icon': { color: 'black' },
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <MenuItem value="all">All Categories</MenuItem>
                  <MenuItem value="engineering">Engineering</MenuItem>
                  <MenuItem value="management">Management</MenuItem>
                  <MenuItem value="science">Science</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid xs={12} sm={6} md={2.5}>
              <FormControl fullWidth>
                <Select
                  defaultValue="all"
                  displayEmpty
                  sx={{
                    bgcolor: 'rgba(255,255,255,0.2)',
                    color: 'black',
                    borderRadius: 2,
                    '.MuiOutlinedInput-notchedOutline': { border: '1px solid black' },
                    '.MuiSelect-icon': { color: 'black' },
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <MenuItem value="all">All Durations</MenuItem>
                  <MenuItem value="4weeks">≤ 4 weeks</MenuItem>
                  <MenuItem value="8weeks">4–8 weeks</MenuItem>
                  <MenuItem value="12weeks">≥ 12 weeks</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid xs={12} md={3}>
              <FormControl fullWidth>
                <Select
                  defaultValue="upcoming"
                  sx={{
                    bgcolor: 'rgba(255,255,255,0.2)',
                    color: 'black',
                    borderRadius: 2,
                    '.MuiOutlinedInput-notchedOutline': { border: '1px solid black' },
                    '.MuiSelect-icon': { color: 'black' },
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <MenuItem value="upcoming">Enrollment Open</MenuItem>
                  <MenuItem value="ongoing">Ongoing</MenuItem>
                  <MenuItem value="completed">Completed</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>

        <Grid container spacing={2} sx={{gap:1,py:2}}>
          {allCourses.map((course) => (
            <Grid xs={12} sm={6} md={2.8} key={course.id}>
              <Card
                onMouseEnter={() => setHoveredCard(course.id)}
                onMouseLeave={() => setHoveredCard(null)}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                  borderRadius: 2,
                  overflow: 'hidden',
                  boxShadow: hoveredCard === course.id ? '0 12px 40px rgba(0,0,0,0.15)' : '0 2px 8px rgba(0,0,0,0.08)',
                  transform: hoveredCard === course.id ? 'translateY(-8px)' : 'translateY(0)',
                  '&:hover .course-image': {
                    transform: 'scale(1.1)',
                  },
                }}
              >
                <Box sx={{ position: 'relative', overflow: 'hidden', height: 180 }}>
                  <Box
                    className="course-image"
                    component='img'
                    src={course.image}
                    sx={{
                      width: '100%',
                      height: '100%',
                      background: `linear-gradient(135deg, ${getDifficultyColor(course.difficulty)}22 0%, ${getDifficultyColor(course.difficulty)}44 100%)`,
                      transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                  />
                  <IconButton
                    sx={{
                      position: 'absolute',
                      top: 12,
                      right: 12,
                      bgcolor: 'rgba(255,255,255,0.95)',
                      backdropFilter: 'blur(10px)',
                      '&:hover': { bgcolor: 'white' },
                    }}
                  >
                    <BookmarkBorderIcon fontSize="small" />
                  </IconButton>
                  <Chip
                    label={course.difficulty}
                    size="small"
                    sx={{
                      position: 'absolute',
                      bottom: 12,
                      left: 12,
                      bgcolor: 'rgba(255,255,255,0.95)',
                      color: getDifficultyColor(course.difficulty),
                      fontWeight: 700,
                      backdropFilter: 'blur(10px)',
                    }}
                  />
                </Box>

                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Stack spacing={2}>
                    <Box>
                      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, lineHeight: 1.3 }}>
                        {course.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Icon icon="mdi:school" width={16} />
                        {course.institute}
                      </Typography>
                    </Box>

                    <Chip
                      label={course.badge}
                      size="small"
                      sx={{
                        bgcolor: '#E8F5E9',
                        color: '#2E7D32',
                        fontWeight: 600,
                        height: 28,
                        fontSize: '0.75rem',
                      }}
                    />

                    <Stack direction="row" spacing={2} sx={{ pt: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <AccessTimeIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                        <Typography variant="caption" color="text.secondary">
                          {course.duration}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <PeopleIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                        <Typography variant="caption" color="text.secondary">
                          {course.enrolled}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <StarIcon sx={{ fontSize: 16, color: '#FFA726' }} />
                        <Typography variant="caption" fontWeight={600}>
                          {course.rating}
                        </Typography>
                      </Box>
                    </Stack>

                    <Box sx={{ pt: 1, borderTop: '1px solid', borderColor: 'divider' }}>
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Avatar sx={{ width: 20, height: 20, fontSize: '0.7rem', bgcolor: 'primary.main' }}>
                          {course.instructor.split(' ')[0][0]}
                        </Avatar>
                        {course.instructor}
                      </Typography>
                    </Box>

                    <Button
                      variant="contained"
                      fullWidth
                      sx={{
                        mt: 2,
                        textTransform: 'none',
                        fontWeight: 600,
                        py: 1.2,
                        borderRadius: 1.5,
                        background: '#055cad',
                        '&:hover': {
                          background: '#265785',
                        },
                      }}
                      endIcon={<Icon icon="mdi:arrow-right" />}
                      onClick={handleRoute}
                    >
                      View Details
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

       
      </Container>
    </DashboardContent>
  );
}