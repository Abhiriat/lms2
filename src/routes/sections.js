import { jsx as _jsx } from "react/jsx-runtime";
import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { varAlpha } from 'minimal-shared/utils';
import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { AuthLayout } from 'src/layouts/auth';
import { DashboardLayout } from 'src/layouts/dashboard';
// ----------------------------------------------------------------------
export const DashboardPage = lazy(() => import('src/pages/dashboard'));
export const Blog2Page = lazy(() => import('src/pages/blog2'));
export const StudentDashboardPage = lazy(() => import('src/pages/studentdashboard'));
export const TeacherPage = lazy(() => import('src/pages/teacherdashboard'));
export const TeacherStudentListPage = lazy(() => import('src/pages/teacherstudent'));
export const InstructorListPage = lazy(() => import('src/pages/instructors'));
export const QuizInterfacePage = lazy(() => import('src/pages/quizinterface'));
export const StudentListPage = lazy(() => import('src/pages/studentlist'));
export const LMSPage = lazy(() => import('src/pages/lms'));
export const LMSSpeakingPage = lazy(() => import('src/pages/lmsspeaking'));
export const LMSWritingPage = lazy(() => import('src/pages/lmswriting'));
export const QuizResultPage = lazy(() => import('src/pages/quizresult'));
export const QuizDetailResultViewPage = lazy(() => import('src/pages/quizdetailresultview'));
export const QuizSuccessPage = lazy(() => import('src/pages/quizsuccess'));
export const CoursesPage = lazy(() => import('src/pages/courses'));
export const QuizPage = lazy(() => import('src/pages/quiz'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const SignInPage = lazy(() => import('src/pages/sign-in'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
const renderFallback = () => (_jsx(Box, { sx: {
        display: 'flex',
        flex: '1 1 auto',
        alignItems: 'center',
        justifyContent: 'center',
    }, children: _jsx(LinearProgress, { sx: {
            width: 1,
            maxWidth: 320,
            bgcolor: (theme) => varAlpha(theme.vars.palette.text.primaryChannel, 0.16),
            [`& .${linearProgressClasses.bar}`]: { bgcolor: 'text.primary' },
        } }) }));
export const routesSection = [
    {
        element: (_jsx(DashboardLayout, { children: _jsx(Suspense, { fallback: renderFallback(), children: _jsx(Outlet, {}) }) })),
        children: [
            { path: 'admindashboard', element: _jsx(DashboardPage, {}) },
            { path: 'studentdashboard', element: _jsx(StudentDashboardPage, {}) },
            { path: 'teacherdashboard', element: _jsx(TeacherPage, {}) },
            { path: 'teacherstudent', element: _jsx(TeacherStudentListPage, {}) },
            { path: 'studentlist', element: _jsx(StudentListPage, {}) },
            { path: 'instructorlist', element: _jsx(InstructorListPage, {}) },
            { path: 'quizresult', element: _jsx(QuizResultPage, {}) },
            { path: 'quizdetailresultview/:id', element: _jsx(QuizDetailResultViewPage, {}) },
            { path: 'lmspage', element: _jsx(LMSPage, {}) },
            { path: 'lmsspeaking', element: _jsx(LMSSpeakingPage, {}) },
            { path: 'lmswriting', element: _jsx(LMSWritingPage, {}) },
            { path: 'quizinterface', element: _jsx(QuizInterfacePage, {}) },
            { path: 'quizsuccess', element: _jsx(QuizSuccessPage, {}) },
            { path: 'courses', element: _jsx(CoursesPage, {}) },
            { path: 'quiz', element: _jsx(QuizPage, {}) },
            { path: 'user', element: _jsx(UserPage, {}) },
            { path: 'products', element: _jsx(ProductsPage, {}) },
            { path: 'blog', element: _jsx(Blog2Page, {}) },
            { path: 'blog2', element: _jsx(Blog2Page, {}) },
        ],
    },
    {
        index: true,
        element: (_jsx(AuthLayout, { children: _jsx(SignInPage, {}) })),
    },
    {
        path: '404',
        element: _jsx(Page404, {}),
    },
    { path: '*', element: _jsx(Page404, {}) },
];
