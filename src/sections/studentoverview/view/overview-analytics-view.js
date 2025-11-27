import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Typography from '@mui/material/Typography';
import { DashboardContent } from 'src/layouts/dashboard';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import { Icon } from '@iconify/react';
import SearchIcon from '@mui/icons-material/Search';
import Grid from '@mui/material/GridLegacy';
import { Box, Container, FormControl, InputAdornment, MenuItem, Select, TextField, IconButton, Stack, Avatar } from '@mui/material';
import { useState } from 'react';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PeopleIcon from '@mui/icons-material/People';
import StarIcon from '@mui/icons-material/Star';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { useRouter } from 'src/routes/hooks';
import learning from './learning.png';
import img1 from '../../../../public/assets/1.jpg';
import img2 from '../../../../public/assets/2.jpg';
import img3 from '../../../../public/assets/3.jpg';
import img4 from '../../../../public/assets/4.jpg';
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
    switch (difficulty) {
        case 'Beginner': return '#4CAF50';
        case 'Intermediate': return '#FF9800';
        case 'Advanced': return '#F44336';
        default: return '#757575';
    }
};
const WelcomeCard = () => {
    return (_jsxs(Card, { sx: {
            background: 'white',
            border: '1px solid #8dbbf7',
            color: 'black',
            borderRadius: 3,
            overflow: 'hidden',
            position: 'relative',
            mb: 4,
            // boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)',
        }, children: [_jsx(Box, { sx: {
                    position: 'absolute',
                    top: -50,
                    right: -50,
                    width: 200,
                    height: 200,
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(10px)',
                } }), _jsx(Box, { sx: {
                    position: 'absolute',
                    bottom: -30,
                    left: -30,
                    width: 150,
                    height: 100,
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.08)',
                    backdropFilter: 'blur(10px)',
                } }), _jsx(Box, { sx: { p: 4, position: 'relative', zIndex: 1 }, children: _jsxs(Stack, { direction: { xs: 'column', md: 'row' }, spacing: 4, alignItems: "center", children: [_jsx(Box, { sx: { flex: 1 }, children: _jsx(Stack, { spacing: 2, children: _jsxs(Box, { children: [_jsx(Typography, { variant: "h2", sx: { fontWeight: 700, mb: 1 }, children: "Welcome Back, Parvinder! \uD83C\uDF89" }), _jsx(Typography, { variant: "body1", sx: { opacity: 0.95, mb: 3 }, children: "Continue your learning journey and achieve your goals" })] }) }) }), _jsx(Box, { sx: {
                                width: { xs: '100%', md: 'auto' },
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }, children: _jsx(Box, { component: 'img', src: learning, alt: "Learning illustration", sx: {
                                    width: { xs: '200px', md: '250px', lg: '300px' },
                                    height: 'auto',
                                    maxWidth: '100%',
                                    objectFit: 'contain'
                                } }) })] }) })] }));
};
export default WelcomeCard;
export function OverviewAnalyticsView() {
    const [tabValue, setTabValue] = useState(0);
    const [hoveredCard, setHoveredCard] = useState(null);
    const route = useRouter();
    const handleRoute = () => {
        route.push('/lmsintropage');
    };
    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };
    return (_jsxs(DashboardContent, { maxWidth: "xl", children: [_jsx(WelcomeCard, {}), _jsxs(Container, { maxWidth: "xl", sx: { py: 8 }, children: [_jsx(Typography, { variant: "h2", sx: { fontWeight: 700, mb: 1, textAlign: 'center' }, children: "Explore Courses" }), _jsx(Typography, { variant: "body2", color: "text.secondary", sx: { textAlign: 'center' }, children: "Discover and enroll in top-rated courses from premier institutions" }), _jsx(Box, { sx: {
                            background: 'transparent',
                            borderRadius: 3,
                            p: 4,
                            mb: 4,
                            mt: 4,
                            color: 'black',
                            // boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)',
                        }, children: _jsxs(Grid, { container: true, spacing: 2, sx: { gap: 1 }, alignItems: "center", children: [_jsx(Grid, { xs: 12, md: 3, children: _jsx(TextField, { fullWidth: true, placeholder: "Search courses, instructors...", InputProps: {
                                            startAdornment: (_jsx(InputAdornment, { position: "start", children: _jsx(SearchIcon, { sx: { color: 'black' } }) })),
                                            sx: {
                                                bgcolor: 'rgba(255,255,255,0.2)',
                                                borderRadius: 2,
                                                color: 'black',
                                                '& input': { color: 'black' },
                                                '& input::placeholder': { color: 'rgba(255,255,255,0.7)' },
                                                '& .MuiOutlinedInput-notchedOutline': { border: '1px solid black' },
                                                backdropFilter: 'blur(10px)',
                                            },
                                        }, variant: "outlined" }) }), _jsx(Grid, { xs: 12, sm: 6, md: 2.5, children: _jsx(FormControl, { fullWidth: true, children: _jsxs(Select, { defaultValue: "all", displayEmpty: true, sx: {
                                                bgcolor: 'rgba(255,255,255,0.2)',
                                                color: 'black',
                                                borderRadius: 2,
                                                '.MuiOutlinedInput-notchedOutline': { border: '1px solid black' },
                                                '.MuiSelect-icon': { color: 'black' },
                                                backdropFilter: 'blur(10px)',
                                            }, children: [_jsx(MenuItem, { value: "all", children: "All Categories" }), _jsx(MenuItem, { value: "engineering", children: "Engineering" }), _jsx(MenuItem, { value: "management", children: "Management" }), _jsx(MenuItem, { value: "science", children: "Science" })] }) }) }), _jsx(Grid, { xs: 12, sm: 6, md: 2.5, children: _jsx(FormControl, { fullWidth: true, children: _jsxs(Select, { defaultValue: "all", displayEmpty: true, sx: {
                                                bgcolor: 'rgba(255,255,255,0.2)',
                                                color: 'black',
                                                borderRadius: 2,
                                                '.MuiOutlinedInput-notchedOutline': { border: '1px solid black' },
                                                '.MuiSelect-icon': { color: 'black' },
                                                backdropFilter: 'blur(10px)',
                                            }, children: [_jsx(MenuItem, { value: "all", children: "All Durations" }), _jsx(MenuItem, { value: "4weeks", children: "\u2264 4 weeks" }), _jsx(MenuItem, { value: "8weeks", children: "4\u20138 weeks" }), _jsx(MenuItem, { value: "12weeks", children: "\u2265 12 weeks" })] }) }) }), _jsx(Grid, { xs: 12, md: 3, children: _jsx(FormControl, { fullWidth: true, children: _jsxs(Select, { defaultValue: "upcoming", sx: {
                                                bgcolor: 'rgba(255,255,255,0.2)',
                                                color: 'black',
                                                borderRadius: 2,
                                                '.MuiOutlinedInput-notchedOutline': { border: '1px solid black' },
                                                '.MuiSelect-icon': { color: 'black' },
                                                backdropFilter: 'blur(10px)',
                                            }, children: [_jsx(MenuItem, { value: "upcoming", children: "Enrollment Open" }), _jsx(MenuItem, { value: "ongoing", children: "Ongoing" }), _jsx(MenuItem, { value: "completed", children: "Completed" })] }) }) })] }) }), _jsx(Grid, { container: true, spacing: 2, sx: { gap: 1, py: 2 }, children: allCourses.map((course) => (_jsx(Grid, { xs: 12, sm: 6, md: 2.8, children: _jsxs(Card, { onMouseEnter: () => setHoveredCard(course.id), onMouseLeave: () => setHoveredCard(null), sx: {
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
                                }, children: [_jsxs(Box, { sx: { position: 'relative', overflow: 'hidden', height: 180 }, children: [_jsx(Box, { className: "course-image", component: 'img', src: course.image, sx: {
                                                    width: '100%',
                                                    height: '100%',
                                                    background: `linear-gradient(135deg, ${getDifficultyColor(course.difficulty)}22 0%, ${getDifficultyColor(course.difficulty)}44 100%)`,
                                                    transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                                                } }), _jsx(IconButton, { sx: {
                                                    position: 'absolute',
                                                    top: 12,
                                                    right: 12,
                                                    bgcolor: 'rgba(255,255,255,0.95)',
                                                    backdropFilter: 'blur(10px)',
                                                    '&:hover': { bgcolor: 'white' },
                                                }, children: _jsx(BookmarkBorderIcon, { fontSize: "small" }) }), _jsx(Chip, { label: course.difficulty, size: "small", sx: {
                                                    position: 'absolute',
                                                    bottom: 12,
                                                    left: 12,
                                                    bgcolor: 'rgba(255,255,255,0.95)',
                                                    color: getDifficultyColor(course.difficulty),
                                                    fontWeight: 700,
                                                    backdropFilter: 'blur(10px)',
                                                } })] }), _jsx(CardContent, { sx: { flexGrow: 1, p: 3 }, children: _jsxs(Stack, { spacing: 2, children: [_jsxs(Box, { children: [_jsx(Typography, { variant: "h6", gutterBottom: true, sx: { fontWeight: 600, lineHeight: 1.3 }, children: course.title }), _jsxs(Typography, { variant: "body2", color: "text.secondary", sx: { display: 'flex', alignItems: 'center', gap: 0.5 }, children: [_jsx(Icon, { icon: "mdi:school", width: 16 }), course.institute] })] }), _jsx(Chip, { label: course.badge, size: "small", sx: {
                                                        bgcolor: '#E8F5E9',
                                                        color: '#2E7D32',
                                                        fontWeight: 600,
                                                        height: 28,
                                                        fontSize: '0.75rem',
                                                    } }), _jsxs(Stack, { direction: "row", spacing: 2, sx: { pt: 1 }, children: [_jsxs(Box, { sx: { display: 'flex', alignItems: 'center', gap: 0.5 }, children: [_jsx(AccessTimeIcon, { sx: { fontSize: 16, color: 'text.secondary' } }), _jsx(Typography, { variant: "caption", color: "text.secondary", children: course.duration })] }), _jsxs(Box, { sx: { display: 'flex', alignItems: 'center', gap: 0.5 }, children: [_jsx(PeopleIcon, { sx: { fontSize: 16, color: 'text.secondary' } }), _jsx(Typography, { variant: "caption", color: "text.secondary", children: course.enrolled })] }), _jsxs(Box, { sx: { display: 'flex', alignItems: 'center', gap: 0.5 }, children: [_jsx(StarIcon, { sx: { fontSize: 16, color: '#FFA726' } }), _jsx(Typography, { variant: "caption", fontWeight: 600, children: course.rating })] })] }), _jsx(Box, { sx: { pt: 1, borderTop: '1px solid', borderColor: 'divider' }, children: _jsxs(Typography, { variant: "caption", color: "text.secondary", sx: { display: 'flex', alignItems: 'center', gap: 0.5 }, children: [_jsx(Avatar, { sx: { width: 20, height: 20, fontSize: '0.7rem', bgcolor: 'primary.main' }, children: course.instructor.split(' ')[0][0] }), course.instructor] }) }), _jsx(Button, { variant: "contained", fullWidth: true, sx: {
                                                        mt: 2,
                                                        textTransform: 'none',
                                                        fontWeight: 600,
                                                        py: 1.2,
                                                        borderRadius: 1.5,
                                                        background: '#055cad',
                                                        '&:hover': {
                                                            background: '#265785',
                                                        },
                                                    }, endIcon: _jsx(Icon, { icon: "mdi:arrow-right" }), onClick: handleRoute, children: "View Details" })] }) })] }) }, course.id))) })] })] }));
}
